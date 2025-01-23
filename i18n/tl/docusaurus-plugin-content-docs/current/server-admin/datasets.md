---
title: "ERDDAP™ - Working with the datasets.xml File"
---
# Paggawang kasama ng mga kapatiddatasets.xmlLarawan

\\[Ang pahinang web na ito ay magiging kawili - wili lamang saERDDAP™Mga administrador.\\]

Pagkatapos mong sundan angERDDAP™ [maglagay ng mga tagubilin](/docs/server-admin/deploy-install), kailangan mong ayusin angdatasets.xmltalaksan sa loob *tomcat* /content/erddap/ upang ilarawan ang mga dataset na iyong binigayERDDAP™Iluluklok ang instalasyon.

- - -

## [Introduksiyon](#introduction) {#introduction} 

### Kailangan ang Isang Asamblea{#some-assembly-required} 
Paglalagay ng datasetERDDAP™ay hindi lamang tumutukoy sa directory o URL ng dataset. Kailangan mong sumulat ng isang tipak ng XML para sadatasets.xmlna naglalarawan sa dataset.

* Para sa mga nakatiklop na dataset, upang makaayon ang datasetERDDAP'''s data structure para sa grided data, kailangan mong matukoy ang isang subset ng mga variable ng dataset na may parehong dimensiyon. ([Bakit?](#why-just-two-basic-data-structures) [Paano?](#dimensions)) 
* Ang kasalukuyang metadata ng dataset ay kusang inaangkat. Subalit kung nais mong baguhin ang metadata o idagdag ang iba pang metadata, kailangan mong tiyakin itodatasets.xml. AtERDDAP™kailangan ang iba pang metadata, pati na ang[Pangglobong mga katangian](#global-attributes)  (gaya nginfoUrl, institusyon,sourceUrl, buod, at pamagat) at[Iba't ibang katangian](#variable-addattributes)  (gaya nglong\\_nameat mga yunit) . Kung paanong ang metadata na kasalukuyang nasa dataset ay nagdaragdag ng naglalarawang impormasyon sa dataset, ang metadata na hinihiling ngERDDAP™ay nagdaragdag ng naglalarawang impormasyon sa dataset. Ang karagdagang metadata ay isang mabuting karagdagan sa iyong dataset at tumutulongERDDAP™gumawa ng mas mabuting gawain na iharap ang iyong impormasyon sa mga gumagamit na hindi pamilyar dito.
*   ERDDAP™Kailangan mong gawin ang pantanging mga bagay sa mga[longhitud, latitud, altitud (o lalim) , at iba't iba ang oras](#destinationname).

Kung bibilhin mo ang mga ideyang ito at gagamitin mo ang pagsisikap upang likhain ang XML para sadatasets.xml, nakukuha mo ang lahat ng mga bentaha ngERDDAP™, pati na:

* Buong tekstong naghahanap ng mga datos
* Hanapin ang mga dataset ayon sa kategorya
* Mga Anyo ng Data ( *datasetID* .html) kaya maaari kang humiling ng isang subset ng datos sa maraming iba't ibang format ng talaksan
* Mga bansag na hihiling ng mga grap at mapa ( *datasetID* .grap) 
* Paglilingkod sa Web Mapa (WMS) para sa nakatiklop na mga datos
*   RESTfulBasahin ang iyong datos

Paggawa ngdatasets.xmlay nangangailangan ng malaking pagsisikap para sa unang ilang datasets, subalit **nagiging mas madali ito** . Pagkatapos ng unang dataset, madalas na maaari mong gamitin muli ang marami sa iyong gawa para sa susunod na dataset. Mabuti na lamang,ERDDAP™sa dalawa[Mga Kasangkapan](#tools)upang tulungan kang lumikha ng XML para sa bawat datasetdatasets.xml.
Kung maipit ka, tingnan ang aming[sa pagkuha ng karagdagang suporta](/docs/intro#support).

### Tagapaglaan ng mga Data Anyo{#data-provider-form} 
Kapag lumapit sa iyo ang isang data provider sa pag - asang magdagdag ng ilang impormasyon sa iyoERDDAP, maaari itong maging mahirap at nakauubos ng panahon upang tipunin ang lahat ng metadata (tungkol sa dataset) Kailangang idagdag ang datasetERDDAP. Maraming pinagmulang datos (Halimbawa, .csv files, Mga excel file, database) walang panloob na metadata, kayaERDDAP™ay may Data Provider Form na nagtitipon ng metadata mula sa data provider at nagbibigay sa tagapaglaan ng impormasyon ng iba pang patnubay, pati na ang malawak na patnubay para sa[Talaan ng mga Nilalaman](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). Ang impormasyon na isinumite ay ginagawang angdatasets.xmlformat at pagkatapos ay emailERDDAP™Tagapangasiwa (ikaw) at isinulat (Iniapela) hanggang sa *Malaking Direktoryo* /logs/data ProviderForm.log . Kaya, ang anyong semi-automates ang proseso ng pagkuha ng datasetERDDAP, ngunit angERDDAP™Kailangan pa ring tapusin ng administrador angdatasets.xmlAyusin at pakitunguhan ang pagkuha ng data file (s) mula sa tagapaglaan o nagdurugtong sa database.

Ang pagsusumite ng mga aktuwal na data files mula sa mga panlabas na pinagmulan ay isang malaking panganib sa seguridad, kayaERDDAP™ay hindi tumatalakay niyan. Kailangan mong alamin ang solusyon na makatutulong sa iyo at sa data provider, halimbawa, sa email (para sa maliliit na file) , Hugot mula sa ulap (Halimbawa, Drive ng DropBox o Google) , isang sftp site (na may mga password) , o palihim Net (isang USB hinlalaki drive o panlabas na hard drive) . Malamang na tanggapin mo lamang ang mga file mula sa mga taong kilala mo. Kailangan mong suriin ang mga salansan ng mga virus at gumawa ng iba pang mga pag - iingat sa seguridad.

Walang linkERDDAP™sa Puri ng Data (halimbawa, saERDDAP™pantahanang pahina) . Sa halip, kapag may nagsabi sa iyo na nais nilang ang kanilang impormasyon ay isilbi sa iyoERDDAP, maaari mo silang padalhan ng email na nagsasabi ng gaya ng:
Oo, maaari nating makuha ang iyong datosERDDAP. Upang magsimula, pakisuyong punan ang porma https://*yourUrl*/erddap/dataProviderForm.html   (ohttp://kung gayonhttps://ay hindi magawa) .
Pagtapos mo, makikipag - ugnayan ako sa iyo para malaman ang mga detalye.
Kung nais mo lamang tingnan ang anyo (nang hindi ito pinupuno) , makikita mo ang anyo saERD'ERDDAP:[Introduksiyon](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html),[Bahagi 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html),[Bahagi 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html),[Bahagi 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html), at[Bahagi 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Ang mga kawing na ito saERD ERDDAP™magpadala ng impormasyon sa akin, hindi sa inyo, kaya huwag kayong magpadala ng impormasyon sa kanila malibang talagang nais ninyong dagdagan ng datos ang mga itoERD ERDDAP.

Kung nais mong alisin ang Data Provider Form sa iyong FormERDDAP™, sabihin
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
sa inyong setup.xml file.

Ang nagpasigla rito ayNOAA' s 2014[Resulta ng Pangmadlang Pag - aaral (HANDA) Tagubilin](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), na nangangailangan ng lahatNOAAAng mga impormasyong pangkapaligiran na tinutustusan sa pamamagitan ng pagbabayad ng buwis ay makukuha sa pamamagitan ng isang serbisyo ng datos (hindi lamang ang mga file) Sa loob ng 12 buwan ng paglalang. Kaya lumalaki ang interes sa paggamitERDDAP™upang makagawa ng mga dataset na magagamit sa pamamagitan ng isang service ASAP. Kailangan namin ang mas mahusay na paraan ng pakikitungo sa maraming tagapaglaan ng impormasyon.

Pagpapakain/Ingles? Bago ang anyong ito, kaya pakisuyong mag - emailerd dot data at noaa dot govkung mayroon kang anumang impormasyon o mga mungkahi upang mapasulong ito.

### Mga Kasangkapan{#tools} 
ERDDAP™ay may dalawang programa ng command line na mga kasangkapan upang tulungan kang lumikha ng XML para sa bawat dataset na nais moERDDAP™upang maglingkod. Minsang naitayo mo naERDDAP™at patakbuhin ito (Minsan) , makikita at magagamit mo ang mga programang ito sa *tomcat* /webapps/erddap/WEB-INF directory. Mayroong mga sulatang Linux/Unix (na may karugtong na .sh) at mga iskrip sa Windows (na may karugtong na .bat) para sa bawat programa.\\[Sa Linux, patakbuhin ang mga kasangkapang ito na katulad ng sa gumagamit nito (tomcat?) na tatakbo sa Tomcat.\\]Kapag pinapatakbo mo ang bawat programa, tatanungin ka nito. Para sa bawat tanong, mag-uri ng tugon, pagkatapos ay pindutin ang Enter. O pindutin ang ^C upang lumabas sa isang programa anumang oras.

#### Hindi tatakbo ang programa?{#program-wont-run} 

* Kung magkaroon ka ng di - kilalang programa (o kahawig) maling mensahe, ang problema ay marahil hindi masumpungan ng operating systemJava. Kailangan mong malaman kung saanJavaay nasa iyong computer, pagkatapos ay ayusin ang pagtukoy sa java sa .bat o .sh file na sinisikap mong gamitin.
* Kung makakuha ka ng talaksang garapon na hindi nakita o hindi nakita ng klase ang mensahe ng pagkakamali, kung gayon ayJavaay hindi mahanap ang isa sa mga klase na nakatala sa .bat o .sh file na sinusubukan mong gamitin. Ang solusyon ay alamin kung nasaan ang talaksang .jar na iyon, at ayusin ang pagtukoy dito ng java sa .bat o .sh.
* Kung gumagamit ka ng bersiyon ngJavana napakatanda na para sa isang programa, ang programa ay hindi tatakbo at makikita mo ang maling mensahe na gaya ng
Maliban sa sinulid na "main" juva.lang.Un supportedClassVersionError:
     *mga/class/pangalan* : Hindi suportadong pangunahing bersiyon. *sabi ng iba*   
Ang solusyon ay i - update ang pinakabagong bersiyon ngJavaat tiyakin ang .sh o .bat file para sa programa ay ginagamit ito.

#### Ang mga kasangkapan ay naglilimbag ng iba't ibang mensahe ng pagsusuri:{#the-tools-print-various-diagnostic-messages} 

* Ang salitang "ERROR" ay ginagamit kapag ang isang bagay na labis na mali ay hindi natapos ang pamamaraan. Bagaman nakayayamot na magkamali, ang pagkakamali ang pumipilit sa iyo na harapin ang problema.
* Ginagamit ang salitang "WARNING" kapag may nangyaring mali, ngunit natapos ang pamamaraan. Bihirang - bihira ang mga ito.
* Anumang bagay ay isa lamang nakapagtuturong mensahe. Maaari mong idagdag ang \\-verbose sa[GenerateDatasetsXml](#generatedatasetsxml)o[Mga Dasd](#dasdds)mag - utos na kumuha ng karagdagang nakapagtuturong mga mensahe, na kung minsan ay tumutulong sa paglutas ng mga problema.

Malaking tulong ang dalawang kasangkapang ito, pero dapat mo pa ring basahing mabuti ang lahat ng tagubiling ito sa pahinang ito at gumawa ng mahahalagang desisyon.

### GenerateDatasetsXml{#generatedatasetsxml} 
*    **GenerateDatasetsXml** ay isang programa ng command line na maaaring lumikha ng isang magaspang na draft ng dataset XML para sa halos anumang uri ng dataset.
    
NATATAGUMPAYAN namin NA gumamit kayo ng GenerateDatasets Xml sa halip na lumikha ng mga tipak ngdatasets.xmlsa pamamagitan ng kamay sapagkat:
    
    * Mga GenerateDataset Ang Xml ay gumagana sa mga segundo. Ang paggawa nito sa pamamagitan ng kamay ay di - kukulangin sa isang oras na trabaho, kahit na alam mo kung ano ang ginagawa mo.
    * Mga GenerateDataset Mas mahusay ang trabaho ni Xml. Ang paggawa nito sa pamamagitan ng kamay ay nangangailangan ng malawak na kaalaman kung paanoERDDAP™ay mabisa. Malamang na hindi ka makagagawa ng mas mabuting trabaho sa pamamagitan ng kamay. (Si Bob Simons ay laging gumagamit ng GenerateDatasets Xml para sa unang draft, at siya ay sumulatERDDAP.) 
    * Mga GenerateDataset Ang Xml ay laging gumagawa ng mabisang tipak ng tubigdatasets.xml. Anumang Bahagidatasets.xmlna isinusulat mo ay malamang na may ilang pagkakamali na humahadlangERDDAP™mula sa pagkarga ng dataset. Kadalasang gumugugol ng mga oras ang mga tao upang masuri ang mga problemang ito. Huwag sayangin ang iyong panahon. Hayaang Maging Walang Asawa Mga Data Xml gawin ang mahirap na gawain. Kung gayon maaari mong dalisayin ang .xml sa pamamagitan ng kamay kung nais mo.
    
Kapag ginagamit mo ang GenerateDatasets programang Xml:
    
    * Sa Windows, ang unang pagkakataon na tumakbo ka ng GenerateDatasetsXml, kailangan mong ayusin ang GenerateDatasetsXml.bat file na may text editor upang baguhin ang landas patungo sa java. Exe file upang makahanap ng WindowsJava.
    * Mga GenerateDataset Unang hiniling sa iyo ni Xml na tiyakin ang EDDType (Sikat na Dap Dapset Uri) ng dataset. Tingnan ang[Talaan ng mga Uri ng Dataset](#list-of-types-datasets)  (sa dokumentong ito) upang malaman kung alin ang tipo na angkop sa dataset na ginagawa mo. Bukod sa regular na EDDTypes, mayroon ding ilan[Pantangi/Pseudo Dataset Types](#specialpseudo-dataset-types)  (e.g., isa na gumagapang sa katalogo ng THEDDS upang lumikha ng isang tipak ng mga katalogodatasets.xmlsa bawat datos sa katalogo) .
    * Mga GenerateDataset Xml ang isang serye ng mga tanong na espisipiko sa EDDType na iyon. Ang mga tanong ay nagtitipon ng impormasyon na kailangan para saERDDAP™upang makuha ang pinagmulan ng dataset. Upang maunawaan kung anoERDDAP™ay humihingi, tingnan ang dokumentasyon para sa EDDType na tinukoy mo sa pamamagitan ng pagpindot sa katulad na dataset na tipo sa larawan[Talaan ng mga Uri ng Dataset](#list-of-types-datasets).
        
Kung kailangan mong pumasok sa isang strando na may pantanging mga karakter (e.g., mga karakter na unggulado sa simula o dulo, mga karakter na non-ASCII) , pumasok sa[string ng JSON-style](https://www.json.org/json-en.html)  (na may pantanging mga karakter na nakaligtas na may \\ karakter) . Halimbawa, upang makapasok lamang sa isang tab karakter, ipasok ang "\t" (kasama ang nakapaligid na dobleng mga sinipi, na nagsasabiERDDAP™na ito ay isang strandong JSON-style.
        
    * Kadalasan, ang isa sa iyong mga sagot ay hindi ang kailangan ng GenerateDatasetsXml. Pagkatapos ay maaari mong subukang muli, taglay ang nirebisang mga sagot sa mga tanong, hanggang sa GenerateDatasets Ang Xml ay matagumpay na mahahanap at mauunawaan ang pinagkunang datos.
    * Kung tama ang sagot mo sa mga tanong (o sapat nang tama) , GenerateDatasets Ang Xml ay mag-uugnay sa pinagmulan ng dataset at magtitipon ng saligang impormasyon (Halimbawa, iba't ibang pangalan at metadata) .
Para sa mga datos na mula sa lokalNetCDF .ncat kaugnay na mga file, GenerateDatasets Ang Xml ay kadalasang maglilimbag ng ncdump-tulad na istruktura ng file matapos nitong unang basahin ang file. Ito ay maaaring magbigay sa iyo ng impormasyon upang mas masagot ang mga tanong sa isang kasunod na silo sa pamamagitan ng GenerateDatasetsXml.
    * Mga GenerateDataset Pagkatapos ay lilikha ang Xml ng isang magaspang na draft ng dataset na XML para sa dataset na iyon.
    * Ang impormasyong diagnostic at ang magaspang na draft ng dataset na XML ay isusulat sa *Malaking Direktoryo* /logs/GenerateDatasetsXml.log .
    * Ang magaspang na draft ng dataset na XML ay isusulat sa *Malaking Direktoryo* /logs/GenerateDatasetsXml.out .
#### "0 files" Error sa pagbasa ng Mensahe{#0-files-error-message} 
Kung ikaw ay nagpapatakbo ng GenerateDatasets Xml o[Mga Dasd](#dasdds), o kung papasanin moEDDGridMula sa... Sawi ang pagbasa ng datosERDDAP™, at nakakuha ka ng "0 files" error message na nagpapahiwatig naERDDAP™nakakita ng 0 katugmang files sa directory (kung inaakala mong may katugmang mga file sa directory na iyon) :
* Tingnan kung natukoy mo na ang buong pangalan ng directory. At kung itsek mo ang pangalan ng sampol, tiyaking tama ang buong pangalan ng file, pati na ang buong directory.
* Tingnan kung talagang nasa directoryng iyon ang mga file.
* Tingnan ang baybay ng pangalang directory.
* Tingnan ang fileNameRegex. Sa totoo lang, talagang madaling magkamali gamit ang regexes. Para sa mga layuning pangsubok, subukan ang regex .\\* na dapat tumugma sa lahat ng mga pangalan. (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Tiyakin na ang gumagamit na nagpapatakbo ng programa (e.g., gumagamit ng=tomcat (?) para sa Tomcat/ERDDAP) ay may pahintulot ng 'read' para sa mga file na iyon.
* Sa ilang operating system (Halimbawa, ang SCORINux) at depende sa system settings, ang gumagamit na nagpapatakbo ng programa ay dapat na may 'read' na pahintulot para sa buong kadena ng mga directories na humahantong sa directory na may mga files.


* Kung may mga problema kang hindi mo malutas,[humingi ng tulong](/docs/intro#support)sa pinakamaraming impormasyon hangga't maaari. Sa katulad na paraan, kung ito'y waring angkop na EDDType para sa isang ibinigay na dataset ay hindi gumagana sa dataset na iyon, o kung walang angkop na EDDType, pakisuyong magharap ng isang file[tungkol sa GitHub](https://github.com/ERDDAP/erddap/issues)sa mga detalye (at isang sampol na talaksan kung mahalaga) .
         
#### Kailangan mong baguhin ang output mula sa GenerateDatasets Xml upang mapabuti ito.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISKLAIMER:
ANG KUKTO NGdatasets.xmlMADE BE GenerateDatasets Xml ISN'T PERFECT. TANGGAPIN MO ANG PAGBABASA AT PAGTANGGAP SA PUBLICERDDAP. Mga GenerateDataset Xml RELIES SA ISANG LOT NG RULES-OF-THUMB AN LEN'T ALLS CORRECT. NAG - AABULOY KA UPANG MAGPAPAKITA NG KARAPATAN NG DUGOERDDAP'Sdatasets.xmlMAKINIG.
    
     (Magandang Katotohanan: Hindi ako sumisigaw. Sa makasaysayang legal na mga kadahilanan, ang mga di - nagdiriwang ay dapat na isulat sa lahat ng dako.) 
    
Ang output ng GenerateDatasetsXml ay isang magaspang na draft.
Halos lagi mo itong kakailanganin.
Kami ay gumawa at patuloy na gumawa ng malaking pagsisikap upang gawin ang output bilang handa-to-go hangga't maaari, ngunit may mga limitasyon. Kadalasan, ang kinakailangang impormasyon ay talagang hindi makukuha mula sa pinagkunang metadata.
    
Ang isang mahalagang problema ay na kami'y humihingi ng isang programa sa computer (GenerateDatasetsXml) upang gawin ang isang atas kung saan, kung bibigyan mo ng gayunding atas ang 100 katao, magkakaroon ka ng 100 iba't ibang resulta. Walang kahit isang "tamang" sagot. Maliwanag, ang programa ay pinakamalapit sa pagbabasa ng isip ni Bob (hindi iyo) , ngunit gayon pa man, ito ay hindi isang programang pang-unawang AI, isang kumpol lamang ng mga huristiko na pinagsama-sama upang gawin ang isang AI-tulad na gawain. (Ang araw na iyon ng programang pang-unawa ng AI ay maaaring dumating, ngunit hindi pa ito dumarating. Kung/kapag nagkagayon, tayong mga tao ay maaaring magkaroon ng mas malalaking problema. Ingatan kung ano ang gusto mo.) 
    
* Para sa mga layuning pang-edukasyon, ang output ay nagpapakita ng global source Attributes at variable source Attributes bilang mga komento.ERDDAP™Pinagsasama ang mga pinagkunang Attributes ataddAttributes  (na nauuna) upang pagsamahin Attributes na ipinapakita sa gumagamit. (At ang iba pang mga katangian ay kusang idinaragdag sa longhitud, latitud, altitud, lalim, at iba't ibang panahon kapag ang panahon ay nagbabagoERDDAP™sa katunayan ay ginagawa ang dataset) .
     
* Kung hindi mo gusto ang isang source Attribute, isulat ito sa pamamagitan ng pagdaragdag ng isang admixtribute na may parehong pangalan ngunit ibang halaga (o walang halaga, kung nais mong alisin ito) .
     
* Lahat ng itoaddAttributesang mga mungkahi ng computer-generated. Baguhin sila&#33; Kung ayaw mo ng isang admixtribute, palitan ito.
     
* Kung nais mong magdagdagaddAttributes, idagdag.
     
* Kung gusto mong magbagodestinationName, palitan ito. Subalit huwag kang magbagosourceNames.
     
* Maaari mong baguhin ang kaayusandataVariables o tanggalin ang alinman sa mga ito.


    * Pagkatapos ay magagamit mo[Mga Dasd](#dasdds)  (Tingnan ang ibaba) upang paulit - ulit na suriin ang XML para sa dataset na iyon upang tiyakin na ang resultang dataset ay lumilitaw gaya ng nais mong gawin nitoERDDAP.
    * Malayang magbagodatasets.xmlHalimbawa, ang mga tipak ng yelo na ginawa ay nagbibigay ng mas mabuting resultainfoUrl, buod, o titulo.
#### Huwag Magdagdag ng mga StandardName{#donotaddstandardnames} 
Kung isasama mo ang `-do Not Address StandardNames bilang command line parameter kapag ikaw ay tumakbo na lumilikha Mga Data Xml, lumikha Mga Data Xml ay hindi magdadagdagstandard\\_namesaaddAttributespara sa anumang mga variables maliban sa mga variable na pinangalanang latitud, longhitud, altitud, lalim o panahon (na maliwanagstandard\\_names) . Ito'y maaaring maging kapaki - pakinabang kung ginagamit mo ang output mula sa produksiyon Mga Data Diretso sa XmlERDDAP™nang hindi inaayos ang output, sapagkat lumilikha Mga Data Ang Xml ay kadalasang humuhulastandard\\_nameay mali. (Pansinin na lagi naming inirerekomenda na ayusin ninyo ang output bago gamitin itoERDDAP.) Ang paggamit sa parameter na ito ay magkakaroon ng iba pang maliliit na kaugnay na mga epekto dahil sa hulastandard\\_nameay kadalasang ginagamit para sa ibang gamit, e.g., upang lumikha ng isang bagonglong\\_name, at upang lumikha ng colorBar settings.
#### Paglalarawan{#scripting} 
Bilang isang mapagpipilian sa pagsagot sa mga tanong nang interaktibo sa keyboard at pagsilo upang lumikha ng karagdagang mga dataset, maaari kang magbigay ng mga argumentong command line upang sagutin ang lahat ng mga tanong upang lumikha ng isang dataset. Mga GenerateDataset Xml ang mga parameter na iyon, isusulat ang output sa output file, at lalabas sa programa.
        
Upang maitatag ito, gamitin muna ang programa sa interaktibong paraan at isulat ang iyong mga sagot. Narito ang isang maliit na halimbawa:
Sabihin nating ikaw ang nagpapatakbo ng iskrip: ./GenerateDatasetsXml.sh.
Pagkatapos ay pumasok: EDDTable FromAsciiFiles
Pagkatapos ay ipasok: /u00/data/
Pagkatapos ay pumasok: .\\*\\\______)
Pagkatapos ay ipasok: /u00/data/sampleFile.ascc
Pagkatapos ay pumasok: ISO-8859-1
        
Upang mapatakbo ito sa paraang hindi-interactive, gamitin ang command line na ito:
./GenerateDatasetsXml.sh EDDTable FromAsciiFiles /u00/data/ .\\*\\.asc /u00/data/sampleFile.asc ISO-8859-1
Kaya karaniwan nang itinatala mo lamang ang lahat ng sagot sa command line.
Ito ay dapat kapakipakinabang sa datasets na madalas magbago sa paraang nangangailangan ng re-running GenerateDatasets Xml (Partikular naEDDGridMula sa ThreddsCatalog) .
        
Mga Detalye:

* Kung ang isang parametro ay naglalaman ng isang espasyo o isang pantanging karakter, pagkatapos ay i-record ang parameter bilang isang[string ng JSON-style](https://www.json.org/json-en.html), e.g., "ang aking parameter na may espasyo at dalawang espasyo\\nmga linya".
* Kung nais mong magtakda ng isang walang laman na pisi bilang isang parameter, gamitin: walang anumang bagay
* Kung nais mong tiyakin ang default na halaga ng isang parameter, gamitin: default
             
* Mga GenerateDataset Sinusuportahan ng Xml ang a -i *datos XmlName* # *" tagName "* command line parameter na ipinapasok ang output sa espesipikongdatasets.xmltalaksan (ang default ay *tomcat* /content/erddap/datasets.xml) . Mga GenerateDataset Xml ay naghahanap ng dalawang linya sa datasets XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
at
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
at pinapalitan ang lahat ng bagay sa pagitan ng mga linyang iyon ng bagong nilalaman, at binabago ang panahon ng aleDate.
* Ang -i switch ay pinoproseso lamang (at nagbabagodatasets.xmlay ginawa lamang) kung ikaw ay tatakbo ng GenerateDatasets Xml na may mga argumentong command line na nagsasaad ng lahat ng mga sagot sa lahat ng mga tanong para sa isang loop ng programa. (Tingnan ang 'Scripting' sa itaas.)   (Ang kaisipan ay: Ang parameter na ito ay para gamitin sa mga script. Kung gagamitin mo ang programa sa interactive na paraan (Pagmamakinilya ng info sa teklado) , malamang na lumikha ka ng ilang maling tipak ng XML bago mo likhain ang isa na nais mo.) 
* Kung ang mga linya ng Pasimula at Wakas ay hindi matagpuan, kung gayon ang mga guhit na iyon at ang bagong nilalaman ay isinisingit sa mismong sandali bago&lt;/erddapDatasets&gt;.
* Mayroon ding -I (kabisera i) Palitan ang mga layunin sa pagsubok na gumagana na katulad ng -i, ngunit lumilikha ng talaksang tinatawag nadatasets.xml *Petsa* at hindi gumagawa ng mga pagbabagodatasets.xml.
* Huwag patakbuhin ang GenerateDatasets Xml na may -i sa dalawang proseso nang sabay. May pagkakataon na isang set lamang ng mga pagbabago ang iingatan. Maaaring magkaroon ng malubhang problema (halimbawa, sirang talaksan) .
    
Kung gagamit ka ng "GenerateDatasetsXml -verbose", maglilimbag ito ng mas maraming diagnostikong mensahe kaysa karaniwan.
    
#### Pantangi/Pseudo Dataset Types{#specialpseudo-dataset-types} 
Sa pangkalahatan, ang mga opsyon ng EDDType sa GenerateDatasets Xml posporo ng mga tipo ng EDD na inilarawan sa dokumentong ito (tingnan ang[Talaan ng mga Uri ng Dataset](#list-of-types-datasets)) at lumikha ng isadatasets.xmlLumikha ng isang dataset mula sa isang espesipikong impormasyon. May ilang eksepsiyon at pantanging mga kaso:
    
##### EDDGridMula sa Erddap{#eddgridfromerddap} 
Ang EDDType na ito ang gumagawa ng lahat ngdatasets.xmlMga tipak na kailangang gawin[EDDGridMula sa Erddap](#eddfromerddap)datos mula sa lahatEDDGriddatos sa malayoERDDAP. Mapipili mong panatilihin ang orihinaldatasetIDs (na maaaring gayahin ang ilandatasetIDnasa loob na ninyoERDDAP) o gumagawa ng bagong mga pangalan na magiging natatangi (ngunit karaniwang hindi bilang tao-basahin) .
     
##### Mapagkakatiwalaang Mula sarddap{#eddtablefromerddap} 
Ang EDDType na ito ang gumagawa ng lahat ngdatasets.xmlMga tipak na kailangang gawin[Mapagkakatiwalaang Mula sarddap](#eddfromerddap)mga datos mula sa lahat ng EDDTable datasets sa isang remoteERDDAP. Mapipili mong panatilihin ang orihinaldatasetIDs (na maaaring gayahin ang ilandatasetIDnasa loob na ninyoERDDAP) o gumagawa ng bagong mga pangalan na magiging natatangi (ngunit karaniwang hindi bilang tao-basahin) .
     
##### EDDGridMula sa ThreddsCatalog{#eddgridfromthreddscatalog} 
Ang EDDType na ito ang gumagawa ng lahat ngdatasets.xmlMga tipak na kailangan para sa lahat[EDDGridMula sa Dap](#eddgridfromdap)mga datos na masusumpungan nito sa pamamagitan ng paggapang na pabalik - balik sa pamamagitan ng THEDDS (Ilalim) katalogo. Maraming uri ng katalogo ng THEDDS na URL. Ang option na ito REQURE ISANG THREDS .xml URL na may /catalog/ dito, halimbawa,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml o
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(Ang isang kaugnay na .html katalogo ay nasa
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , na hindi katanggap-tanggap saEDDGridMula sa ThreddsCatalog).
Kung may problema kaEDDGridMga Mula sa Thredd Catalog:
* Tiyakin ang URL na ginagamit mo ay tama, kasama ang /catalog/, at nagtatapos sa /catalog.xml .
* Hangga't maaari, gumamit ng adres na pampubliko (Halimbawa, https://oceanwatch.pfeg.noaa.gov ) sa URL, hindi isang lokal na direksiyon ng numero (Halimbawa, https://12.34.56.78 ) . Kung ang THEDDS ay mararating lamang sa pamamagitan ng lokal na numerong IP address, magagamit mo [&lt;kumbinasyon sa PubliSourceUrl&gt;] (#convertto Publicsourceurl) gayo'yERDDAP™nakikita ng mga gumagamit ang pahayag pangmadla, bagamanERDDAP™ay kumukuha ng impormasyon mula sa lokal na direksiyon ng numero.
* Kung may mga problema kang hindi mo malutas,[Tingnan ang problema sa pagpapaputok ng mga tip](#troubleshooting-tips).
* Ang mababang antas na kodigo para rito ngayon ay gumagamit ng kodigoUnidata" netcdf-java katalogo " na kodigong gumagapang (th. uri ng katalogo) upang pangasiwaan nito ang lahat ng katalogo ng THEDS (na maaaring maging nakagugulat at masalimuot) SalamatUnidatapara sa kodigong iyan.
         
##### EDDGridLonPM180 Mula sa UpdapCatalog{#eddgridlonpm180fromerddapcatalog} 
Ang EDDType na ito ang lumilikha ngdatasets.xmlupang makagawa[EDDGridLonPM180](#eddgridlonpm180)datos mula sa lahatEDDGridmga datos sa loob ng isangERDDAPna may anumang halaga ng longhitud na higit pa sa 180.
* Hangga't maaari, gumamit ng adres na pampubliko (Halimbawa, https://oceanwatch.pfeg.noaa.gov ) sa URL, hindi isang lokal na direksiyon ng numero (Halimbawa, https://12.34.56.78 ) . Kung gayonERDDAP™ay makukuha lamang sa pamamagitan ng lokal na numerong direksiyon ng IP, magagamit ninyo [&lt;kumbinasyon sa PubliSourceUrl&gt;] (#convertto Publicsourceurl) gayo'yERDDAP™nakikita ng mga gumagamit ang pahayag pangmadla, bagamanERDDAP™ay kumukuha ng impormasyon mula sa lokal na direksiyon ng numero.
         
##### EDDGridLon0360 MulaErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Ang EDDType na ito ang lumilikha ngdatasets.xmlupang makagawa[EDDGridLon0360](#eddgridlon0360)datos mula sa lahatEDDGridmga datos sa loob ng isangERDDAPna may anumang halaga ng longhitud na wala pang 0.
* Hangga't maaari, gumamit ng adres na pampubliko (Halimbawa, https://oceanwatch.pfeg.noaa.gov ) sa URL, hindi isang lokal na direksiyon ng numero (Halimbawa, https://12.34.56.78 ) . Kung gayonERDDAP™ay makukuha lamang sa pamamagitan ng lokal na numerong direksiyon ng IP, magagamit ninyo [&lt;kumbinasyon sa PubliSourceUrl&gt;] (#convertto Publicsourceurl) gayo'yERDDAP™nakikita ng mga gumagamit ang pahayag pangmadla, bagamanERDDAP™ay kumukuha ng impormasyon mula sa lokal na direksiyon ng numero.
         
##### Mga EDD Mula sa mga Bakod{#eddsfromfiles} 
Nagbibigay ng panimulang directory, ito ay tumatawid sa directory at sa lahat ng subdirectories at nagsisikap na lumikha ng isang dataset para sa bawat pangkat ng mga data file na nasusumpungan nito.
* Ito ay nagpapalagay na kapag ang isang dataset ay natagpuan, ang dataset ay kinabibilangan ng lahat ng mga subdirectories.
* Kung masumpungan ang isang dataset, ang katulad na mga direktoryo ng kapatid ay pakikitunguhan bilang magkahiwalay na mga dataset (Halimbawa, ang mga directories para sa 1990's, ang 2000's, ang 2010's, ay lilikha ng hiwalay na datasets) . Ang mga ito ay dapat madaling pagsamahin sa pamamagitan ng kamay -- palitan lamang ang unang dataset's&lt;fileDir&gt; sa magulang na directory at i-delete ang lahat ng susunod na kapatid datasets.
* Susubukan lamang nitong lumikha ng isang tipak ng yelodatasets.xmlpara sa pinakakaraniwang uri ng extension ng talaksan sa isang directory (hindi kabilang ang .md5, na hindi pinapansin) . Kaya, binigyan ng isang directory na may 10.ncmga talaksan at 5 .txt file, isang dataset ang gagawin para sa.ncmga talaksan lamang.
* Ito ay nagpapalagay na ang lahat ng mga file sa isang directory na may parehong extension ay kabilang sa parehong dataset. Kung ang isang directory ay may ilan.ncmga talaksan na may SST data at ilan.ncmga talaksan na may data ng chlorophyll, isa lamang sampol.ncAng talaksan ay babasahin (SST? chlorophyll?) at isa lamang dataset ang lilikhain para sa uring iyon ng talaksan. Ang dataset na iyon ay malamang na hindi magkarga dahil sa mga komplikasyon sa pagsisikap na magkarga ng dalawang uri ng files sa parehong dataset.
* Kung wala pang 4 na files na may pinakakaraniwang extension sa isang directory, ito ay nagpapalagay na ang mga ito ay hindi data files at nilalampasan lamang ang directory.
* Kung may 4 o higit pang mga file sa isang directory, subalit hindi ito maaaring lumikha ng isang tipak ng talaksandatasets.xmlpara sa mga file (halimbawa, isang hindi suportadong uri ng talaksan) , ito ay lilikha ng[Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)datos para sa mga file.
* Sa dulo ng mga pagsusuri na ito ay sumusulat sa log file, bago ang pagsusuridatasets.xmlMga tipak, ito ay maglilimbag ng isang mesa na may sumaryo ng impormasyon na natipon sa pamamagitan ng pagtawid sa lahat ng subdirectories. Ang mesa ay magtatala ng bawat subdirectory at magpahiwatig ng pinaka-karaniwang uri ng extension ng file, ang kabuuang bilang ng mga file, at kung aling uri ng dataset ang nilikha para sa mga file na ito (kung mayroon) . Kung ikaw ay nakaharap sa isang masalimuot, malalim na kayarian ng talaksan, isaalang - alang ang pagpapatakbo ng GenerateDatasets Xml na may EDDType=EDDs FromFiles upang malikha lamang ang impormasyong ito,
* Ang opsiyon na ito ay maaaring hindi malaking gawain na hulaan ang pinakamahusay na EDDType para sa isang ibinigay na grupo ng mga data file, ngunit ito ay mabilis, madali, at sulit sa isang pagsubok. Kung ang source files ay angkop, ito ay gumaganang mahusay at isang mahusay na unang hakbang sa paglikha ngdatasets.xmlpara sa sistema ng talaksan na may maraming subdirectories, bawat isa ay may mga data file mula sa iba't ibang datasets.
         
##### EDDTTable MulaEML at EDDTable MulaEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Ang pantanging EDDType na ito ang lumilikha sadatasets.xmlupang makagawa ng isang[Mapagkakatiwalaan Buhat sa mga AsiciiFile](#eddtablefromasciifiles)datos mula sa bawat talahanayan na inilarawan sa isang[Ekolohikal na Wikang Metadata](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML file. Ang "Batch" variant ay gumagana sa lahat ng mga file ng EML sa isang lokal o malayong directory. Pakisuyong tingnan ang hiwalay[Dokumento para sa EDDTTable Mula sa EML](/docs/server-admin/EDDTableFromEML).
     
##### Mapagkakatiwalaan Mula sa InPort{#eddtablefrominport} 
Ang pantanging EDDType na ito ang lumilikha sadatasets.xmlupang makagawa ng isang[Mapagkakatiwalaan Buhat sa mga AsiciiFile](#eddtablefromasciifiles)datos mula sa impormasyon sa isang[inport-xml](https://inport.nmfs.noaa.gov/inport)talaksan. Kung magagamit mo ang source data file (ang inport-xml file ay dapat may mga clue kung saan ito matatagpuan) , maaari kang gumawa ng working dataset saERDDAP.

Ang sumusunod na mga hakbang ay bumabalangkas kung paano gagamitin ang mga GenerateDataset Xml na may inport-xml file upang makakuha ng working datasetERDDAP.

1. Minsang ma-access mo ang inport-xml file (alinman sa bilang isang URL o isang lokal na file) : patakbuhin ang GenerateDatasets Xml, Espesipikong EDDType=EDDTable FromInPort, magtakda ng inport-xml URL o buong pangalan, magtakda kung aling CAR=0, at magtakda ng isa pang hiniling na impormasyon (kung alam) . (Sa puntong ito, hindi mo na kailangan pang magkaroon ng source data file o magtakda ng pangalan nito.) Ang tagpong ito ay nagsasabi sa GenerateDatasets Xml para isulat ang impormasyon **lahat** ng&lt;entity-atribute-impormasyon&gt;&lt;entity&gt;' sa inport-xml file (kung mayroon man) . Naglilimbag din ito ng buod ng impormasyong pang-edukasyon, kasama na ang lahat ng download-url's na nakatala sa inport-xml file.
2. Suriin ang lahat ng impormasyong iyan (pati na ang impormasyon sa likuran na nakuha ng GenerateDatasets Xml prints) at puntahan ang download-url (s) upang hanapin ang pinagmulang data file (s) . Kung masusumpungan mo ito (sila) , i-download ito (sila) sa isang directory na madaling puntahanERDDAP. (Kung wala kang makita na anumang source data files, walang dahilan upang magpatuloy.) 
3. Kagyat na Tatakbo Mga Data Xml muli.
Kung ang source data file ay katumbas ng isa sa inport-xml file'&lt;entity-atribute-impormasyon&gt;&lt;entity&gt;'s, Itinakda kung aling Anak= *Ang Number ng Ententity*   (e.g., 1, 2, 3, ...) .ERDDAP™ay sisikaping itugma ang mga pangalan ng kolum sa source data file sa mga pangalan sa entity information, at mag-udyok na tanggapin/reject/fix ang anumang mga direksyon.
O, kung ang inport-xml file ay walang kahit anong&lt;entity-atribute-impormasyon&gt;&lt;entity&gt;'s, magtakda kung aling Anak=0.
4. Sa Isipan ngdatasets.xmlna ginawa ng GenerateDatasets Xml, baguhin ang [global]&lt;addAttributes&gt;] (#Global-attributes) kung kinakailangan/nais.
5. Sa Isipan ngdatasets.xmlna ginawa ng GenerateDatasetsXml, idagdag/revise ang [&lt;dataVariable&gt;] (Nakatatawa) impormasyon ayon sa kinakailangan/nais na ilarawan ang bawat isa sa mga variables. Tiyaking tama ang pagkakatukoy mo sa bawat variable'
[&lt;sourceName&gt;] (#sourcename)   (gaya ng makikita sa pinagkunan) ,
[&lt;destinationName&gt;] (#Shinationname)   (na may higit na limitasyon sa pinahihintulutang mga karakter kaysasourceName) ,
[&lt;mga yunit&gt;] (Mga #unit)   (lalo na kung ito ay isang[iba't ibang oras o timestamp](#timestamp-variables)kung saan kailangang tiyakin ng mga yunit ang format) , at
[&lt;missing\\_value&gt;] (#Pagkulang sa Halaga ng_) ,
6. Kapag malapit ka nang matapos, paulit - ulit na gamitin ang[Mga Dasd](#dasdds)upang mabilis na makita kung ang paglalarawan ng dataset ay mabisa at kung ang dataset ay lilitawERDDAP™kung ano ang nais mong gawin nito.
     

Magiging dakila kung gagamitin din ng mga grupong gumagamit ng InPort upang i-record ang kanilang mga datasetsERDDAP™upang makuha ang aktuwal na datos:

*   ERDDAP™ay isang solusyon na magagamit ngayon para matupadNOAA'[Resulta ng Pangmadlang Pag - aaral (HANDA) mga kahilingan](https://nosc.noaa.gov/EDMC/PD.DSP.php)Ngayon mismo, hindi sa malabong panahon sa hinaharap.
*   ERDDAP™ang aktuwal na impormasyong makukuha ng mga gumagamit nito, hindi lamang ang metadata. (Anong kabutihan ang metadata na walang datos?) 
*   ERDDAP™metadata (Partikular na ang mga yunit ng mga variable) , hindi tulad ng ibang data server software na isinasaalang-alang. (Anong kabutihan ang data kung walang metadata?) Ang paggamit ng software na hindi sumusuporta sa metadata ay ang pag-imbita ng datos na maling maunawaan at maling ginagamit.
*   ERDDAP™ay malaya at bukas-oras na software di tulad ng ibang software na isinasaalang-alang. Patuloy na paglakiERDDAP™ay binabayaran na. TulongERDDAP™libre ang mga gumagamit.
*   ERDDAP'Ang hitsura ay maaaring madaling baguhin upang pag - isipan at itampok ang iyong grupo (hindiERDoERDDAP) .
*   ERDDAP™ay nag-aalok ng hindi pabagu-bagong paraan upang makuha ang lahat ng datasets.
*   ERDDAP™ay maaaring magbasa ng datos mula sa maraming uri ng data files at mula sa mga kaugnay na database.
*   ERDDAP™ay maaaring makitungo sa malalaking datasets, kabilang ang mga dataset kung saan ang source data ay nasa maraming data file.
*   ERDDAP™ay makapagsusulat ng datos sa maraming uri ng data files, sa kahilingan ng gumagamit, kabilang na ang mga siyentipikong data file na tulad ng netCDF, ESRI .csv, at ESRI .ODV .txt.
*   ERDDAP™ay maaaring gumawa ng mga grap ng kaugalian at mapa ng mga subset ng datos, batay sa mga detalye ng gumagamit.
*   ERDDAP™ay maaaring makitungo sa mga hindi-data datasets tulad ng koleksiyon ng imahe, video, o audio files.
*   ERDDAP™ay ikinabit at ginamit sa[mahigit na 60 institusyon sa buong daigdig](/#who-uses-erddap).
*   ERDDAP™ay nakatala bilang isa sa mga data server na inirerekomenda para gamitin sa loobNOAAsa loob[NOAAMga Access ng Data Access Procedual Directive](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), hindi tulad ng ibang software na isinasaalang-alang.
*   ERDDAP™ay produkto ngNMFS/NOAA, kaya gamitin ito sa loobNMFSatNOAAdapat na maging dahilan ng pagmamapuriNMFSatNOAA.

Pakisuyong magbigayERDDAP™subukan. Kung kailangan mo ng tulong, pakisuyong magpaskil ng mensahe saERDDAP™Google group.
     
##### Idagdag angFillValue Attributes{#addfillvalueattributes} 
Ang espesyal na option na ito ng EDDType ay hindi isang dataset type. Isa itong kasangkapan na maaaring magdagdag ng \\_FillValue na katangian sa ilang mga variable sa ilang mga dataset. Tingnan[Idagdag angFillValue Attributes](#add-_fillvalue-attributes).
     
##### mahanap Panahon{#findduplicatetime} 
Ang espesyal na option na ito ng EDDType ay hindi isang dataset type. Sa halip, sinasabi nito sa GenerateDatasets Xml upang maghanap sa pamamagitan ng isang koleksiyon ng mga gridd.nc  (at nauugnay) ang mga files upang mahanap at i-print ang isang listahan ng mga file na may nadobleng halaga ng oras. Kapag tiningnan nito ang mga pamantayan sa panahon, binabago nito ang mga ito mula sa orihinal na mga yunit tungo sa"seconds since 1970-01-01"sa kaso ang iba't ibang file ay gumagamit ng iba't ibang unit strando. Kailangan mong maglaan ng panimulang directory (mayroon man o wala ng pasikut - sikot) , ang pangalan ng talaksan ay regular (e.g., .\\*\\*\\.nc ) , at ang pangalan ng time variable sa mga files.
     
##### umere{#ncdump} 
Ang espesyal na option na ito ng EDDType ay hindi isang dataset type. Sa halip, sinasabi nito sa GenerateDatasets Xml upang maglimbag ng isang[umere](https://linux.die.net/man/1/ncdump)\\-tulad ng printout ng isang.nc,.ncml, o.hdftalaksan. Sa katunayan ay ginagamit nito ang netcdf-java's[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), na isang mas limitadong kasangkapan kaysa sa C na bersyon ng NCdump. Kung gagamitin mo ang opsyong ito, hihilingin sa iyo ni GenerateDatasetsXml na gamitin ang isa sa mga opsyon: "-h" (header) , "-c" (coordinate vars) , "-vall" (default) , "-v var1;var2", "-v var1 (0,0:10,0:20) ". Ito'y kapaki - pakinabang sapagkat, kung walang ncdump mahirap malaman kung ano ang nasa loob nito.nc,.ncml, o.hdftalaksan at sa gayon kung aling EDDType ang dapat mong itakda para sa GenerateDatasets Xml. Para sa Isang.ncBilaw na talaksan, ililimbag nito ang nicdump output para sa resulta ng.ncMga pagbabago ng talaksang ml na inilagay sa ilalim.nco.hdftalaksan.
         
### Mga Dasd{#dasdds} 
*   [ **Mga Dasd** ](#dasdds)ay isang programa ng command line na magagamit mo pagkatapos mong makagawa ng unang pagtatangka sa XML para sa isang bagong datasetdatasets.xml. Sa mga DasDd, maaari mong paulit - ulit na subukin at dalisayin ang XML. Kapag ginagamit mo ang programang DasDds:
    1. Sa Windows, sa unang pagkakataon na tumakbo ka ng DasDds, kailangan mong ayusin ang DasDds. Ang talaksan ng paniki na may editor ng teksto upang baguhin ang landas patungo sa java. Exe file upang makahanap ng WindowsJava.
    2. Hinihiling sa iyo ng mga DasDd angdatasetIDpara sa dataset na ginagawa mo.
    3. Sinisikap ng mga DasDd na lumikha ng dataset sa pamamagitan niyandatasetID.
        * Ang mga DasDd ay laging naglilimbag ng maraming diagnostikong mensahe.
Kung gagamit ka ng "DasDds -verbose", maglilimbag ang DasDds ng mas maraming diagnostikong mensahe kaysa sa karaniwan.
        * Para sa kaligtasan, laging inaalis ng mga DasDd ang lahat ng impormasyon na nasa loob ng imbakan ng dataset (mga talaksan) para sa dataset bago subukang likhain ang dataset. Katumbas ito ng pagtatakda ng isang[matigas na watawat](/docs/server-admin/additional-information#hard-flag)Kaya para sa aggregated datasets, baka nais mong baguhin ang fileNameRegex nang pansamantala upang limitahan ang bilang ng mga files na natuklasan ng data constructionor.
        * Kung hindi maikarga ang dataset (sa anumang dahilan) , DasDds ay hihinto at ipakita sa iyo ang maling mensahe para sa unang pagkakamali na matatagpuan nito.
             **Huwag mong hulaan kung ano kaya ang problema. Basahing mabuti ang mensaheng EROR.**   
Kung kinakailangan, basahin ang naunang mga mensahe ng pagsusuri upang makasumpong din ng higit pang mga himaton at impormasyon.
        *    **Palitan ang XML ng dataset upang lutasin ang problemang iyan**   
at hayaang subukan ng mga DasDd na muling likhain ang dataset.
        *    **Kung paulit - ulit mong lulutasin ang bawat problema, sa wakas ay malulutas mo ang lahat ng problema**   
at ang dataset ay magkakarga.
    4. Lahat ng DasDd ay may output (Mga pagsusuri at mga resulta) ay isinusulat sa iskrin at sa *Malaking Direktoryo* /logs/DasDds.log .
    5. Kung magagawa ng mga DasDd ang dataset, ipakikita sa iyo ng mga DasDd kung gayon[.das (Pag - iingat ng Dataset Attribute) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das),[.ds (Deskriptor ng Data Pag - iingat) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds), at[.timeGaps (puwang sa oras) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)para sa dataset sa iyong screen at isulat ito *Malaking Direktoryo* /logs/DasDds.out .
    6. Kadalasan, nanaisin mong gumawa ng kaunting pagbabago sa XML ng dataset upang linisin ang metadata ng dataset at muling i-run DasDds.

### Bonus Ikatlong-Party Kasangkapan:ERDDAP-lint{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint ay isang programa mula sa Rob Fuller at Adam Leader na mas mabuti sa Irish Marine Institute na magagamit mo upang pagbutihin ang metadata ng iyong katawanERDDAP™mga datos.ERDDAP-lint "mga tuntunin at isang simpleng static web application para sa pagtakbo ng ilang pagsubok laban sa iyong beripikasyonERDDAP™server. Lahat ng mga pagsubok ay pinapatakbo sa web browser." Tulad ng[Walangix/Linux na lint tool](https://en.wikipedia.org/wiki/Lint_(software)), maaari mong baguhin ang umiiral na mga tuntunin o magdagdag ng bagong mga tuntunin. Tingnan[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)para sa higit pang impormasyon.

Ang kasangkapang ito ay lalo nang kapaki-pakinabang sa mga dataset na nilikha mo mga ilang panahon na ang nakaraan at ngayon ay nais na i-up-to-date na may iyong kasalukuyang metadata na mga kagustuhan. Halimbawa, ang unang mga bersiyon ng GenerateDatasets Hindi nagsikap si Xml na lumikha ng buong mundocreator\\_name,creator\\_email, manlilikha\\_type, ocreator\\_urlmetadata. Puwede mong gamitinERDDAP-lint upang matukoy ang mga dataset na wala ng mga katangiang metadata na iyon.

Salamat kina Rob at Adam sa paglikha ng kasangkapang ito at sa pagpapagamit nitoERDDAP™pamayanan.
 
## Ang Pangunahing Katatagan ngdatasets.xmlLarawan{#the-basic-structure-of-the-datasetsxml-file} 
Ang kinakailangan at opsyonal na mga tag na ipinahihintulot sa loob ng isangdatasets.xmltalaksan (at kung ilang beses silang lilitaw) ay ipinakikita sa ibaba. Sa gawa, ang iyong gawaindatasets.xmlmagkakaroon ng maraming&lt;dataset&gt;'s tags at gamitin lamang ang ibang tag sa loob&lt;ErddapDatasets&gt; kung kinakailangan.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Posible na ang ibang mga ekwasyon ay pahihintulutan sa hinaharap, ngunit sa ngayon, tanging ang ISO-8859-1 ang inirerekomenda.
 
### XInclude{#xinclude} 
Bago sa bersyon 2.25 ay suporta para sa XInclude. Kailangan mong gamitin ang SAX parser&lt;gumagamit ng SaxParser&gt; Totoo&lt;/usesaxParser&gt; sa iyong setup.xml. Magpapahintulot ito sa iyo na isulat ang bawat dataset sa sarili nitong file, pagkatapos ay isama ang lahat ng ito sa pangunahing datasetdatasets.xml, muling gamitin ang mga bahagi ng dataset depinisyon, o pareho. Kung gusto mong makakita ng halimbawa,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)ay gumagawa ng XInclude upang muling gamitin ang iba't ibang kahulugan.
 

- - -

## Mga Noble{#notes} 

Paggawang kasama ng mga kapatiddatasets.xmlAng talaksan ay isang proyektong hindi-trivial. Pakisuyong basahing mabuti ang lahat ng mga notang ito. Pagkatapos mong pumili[anyong datos](#list-of-types-datasets), pakisuyong basahin nang maingat ang detalyadong paglalarawan nito.
     
### Pagpili ng Uri ng Dataset{#choosing-the-dataset-type} 
Sa karamihan ng mga kaso, mayroon lamang iisaERDDAP™dataset type na angkop sa isang ibinigay na pinagmulan ng datos. Sa ilang kaso (e.g.,.ncmga talaksan) , may ilang posibilidad, subalit karaniwan nang isa sa mga ito ang tiyak na pinakamabuti. Ang una at pinakamalaking pasiya na dapat mong gawin ay: angkop ba na ituring ang dataset bilang isang grupo ng multidimensional na mga hanay (kung gayon ay tingnan mo ang[EDDGridmga uri ng datos](#eddgrid)) o bilang isang database-tulad na mesa ng datos (kung gayon ay tingnan mo ang[EDDTable dataset types](#eddtable)) .
     
### Paglilingkod sa Data Gaya ng Dati{#serving-the-data-as-is} 
Karaniwan na, hindi kailangang baguhin ang pinagmulan ng datos (e.g., ikumberte ang mga file sa ibang uri ng file) upangERDDAP™ay maaaring magsilbi nito. Isa sa mga palagay ngERDDAP™ay na ang pinagmulan ng datos ay gagamitin na gaya ng ay. Karaniwan nang ito'y mahusay. Ang ilang eksepsiyon ay:
* Mga Relyonal na Databas at Cassandra --ERDDAP™ay maaaring magsilbi ng datos nang direkta mula sa mga kaugnay na database at Cassandra. Subalit para sa seguridad, pagbabalanse, at mga isyu sa pagsasagawa, maaari mong piliing magtatag ng isa pang database na may gayunding impormasyon o itabi ang impormasyon saNetCDFv3.ncat mayroonERDDAP™sertuhin ang datos mula sa bagong source ng datos. Tingnan[EDDTable Mula sa Didabasa](#eddtablefromdatabase)at[EDDTable Mula saCassandra](#eddtablefromcassandra).
* Hindi suportadong mga Pinagmulan ng Data --ERDDAP™ay maaaring sumuporta sa isang malaking bilang ng mga uri ng mapagkukunan ng datos, ngunit ang mundo ay puno ng 1000's (milyun - milyon?) ng iba't ibang pinagmumulan ng impormasyon (Partikular, ang data file structures) . KungERDDAP™ay hindi sumusuporta sa iyong pinagmulang datos:
    * Kung ang pinagmulang datos ayNetCDF .ncmga talaksan, magagamit mo[NcML](#ncml-files)upang baguhin ang data files sa-the-fly, o gamitin[NCO](#netcdf-operators-nco)sa permanenteng pagbabago ng mga data file.
    * Maaari mong isulat ang impormasyon sa isang source type ng datos naERDDAP™ay umaalalay.NetCDF-3.ncAng mga file ay mabuti, pangkalahatang rekomendasyon dahil ang mga ito ay binary files naERDDAP™ay madaling basahin. Para sa impormasyong taskular, isaalang - alang ang pag - iimbak ng impormasyon sa koleksiyon ng mga ito.ncmga talaksan na gumagamit ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array data istruktura kaya't maaaring hawakan gamit angERDDAP'[Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)). Kung sila ay makatuwirang organisado (bawat isa ay may datos para sa isang tipak ng espasyo at panahon) ,ERDDAP™ay madaling makakuha ng impormasyon mula sa mga ito.
    * Maaari kang humiling ng suporta para sa mapagkukunang iyon ng impormasyonERDDAP™sa pamamagitan ng emailing si Chris. John sa noaa.gov.
    * Maaari kang magdagdag ng suporta para sa impormasyong iyon sa pamamagitan ng pagsulat ng kodigo upang pangasiwaan ito mismo. Tingnan[angERDDAP™Patnubay ng Programmer](/docs/contributing/programmer-guide)
* Bilis --ERDDAP™ay mas mabilis na makabasa ng impormasyon mula sa ilang pinagmumulan ng impormasyon kaysa sa iba. Halimbawa, ang pagbabasaNetCDFv3.ncang mga file ay mabilis at ang pagbasa ng mga talaksang ASCII ay mas mabagal. At kung may malaki (&gt;1000) o napakalaki (&gt;10,000) ng pinagmulang mga data file,ERDDAP™ang ilang kahilingan ng datos nang dahan - dahan. Karaniwan, ang pagkakaiba ay hindi napapansin ng mga tao. Gayunman, kung sa palagay moERDDAP™ay mabagal para sa isang ibinigay na dataset, maaari mong piliing lutasin ang problema sa pamamagitan ng pagsulat ng impormasyon sa mas mahusay na setup (karaniwang: iilan, maayos,NetCDFv3.ncmga talaksan) . Para sa datos ng taskular, tingnan[ang payong ito](#millions-of-files).
         
### Mungkahi{#hint} 
Kadalasang mas madaling likhain ang XML para sa isang dataset sa pamamagitan ng paggawa ng isang kopya ng gumaganang dataset na paglalarawan sa dataset.xml at pagkatapos ay baguhin ito.
    
### Pag - uugnay sa Pantanging mga Katangian{#encoding-special-characters} 
Mula Noondatasets.xmlay isang XML file, ikaw MUST[&-encode](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"Bi", "&lt;", at "&gt;" sa anumang nilalaman bilang "bamp;", "&lt;", at "&".
Mali:&lt;pamagat&gt; Oras & Tides&lt;/title&gt;
Kanan:&lt;pamagat&gt; Oras; Tides&lt;/title&gt;
     
### Hindi kinukunsinti ng XML ang mga pagkakamali sa pag - inom{#xml-doesnt-tolerate-syntax-errors} 
Pagkatapos mong ayusin ang dataset.xml file, isang mabuting ideya na tiyakin na ang resulta[maayos na XML](https://www.w3schools.com/xml/xml_dtd.asp)sa pamamagitan ng paglalagay ng XML na teksto sa isang XML checker na gaya ng XML[Paglaganap ng xmlvalid](https://www.xmlvalidation.com/).
     
### Problema sa Pagputok ng Tip{#troubleshooting-tips} 
*    **Iba Pang Paraan Upang Suriin ang mga Problema sa mga Daket**   
Bukod sa dalawang pangunahing aklat[Mga Kasangkapan](#tools),
    *   [log.txt](/docs/server-admin/additional-information#log)ay log file na lahat ayERDDAP'Ang diagnostikong mga mensahe.
    * Ang[Pang - araw - araw na Report](/docs/server-admin/additional-information#daily-report)ay may higit na impormasyon kaysa sa status page, kabilang na ang listahan ng mga dataset na hindi nagkarga at ang mga eksepsiyon (error) ang sabi nila.
    * Ang[Katayuan Pahina](/docs/server-admin/additional-information#status-page)ay isang mabilis na paraan ng pagsusuriERDDAP' status mula sa anumang web browser. Kasama rito ang listahan ng mga dataset na hindi nakakarga (bagaman hindi ang kaugnay na mga eksepsiyon) at subukang basahin ang mga estadistika (nagpapakita ng pagsulong ng[EDDGridKopya](#eddgridcopy)at[Mapagkakatiwalaang Komponiya](#eddtablecopy)mga datos at anumang[EDDGridMula sa mga Labi](#eddgridfromfiles)o[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles)datos na gumagamit ng[Hache Mula sa Url](#cachefromurl)  (ngunit hindi cache SizeGB) ) .
    * Kung maipit ka, tingnan ang aming[sa pagkuha ng karagdagang suporta](/docs/intro#support).
         
### Pantanging mga Pagbabago{#special-variables} 
*    **[Ang longhitud, latitud, altitud (o lalim) , at panahon (LLAT) Iba - iba](#destinationname) [destinationName](#destinationname)espesyal ang mga s.** 
    * Sa pangkalahatan:
        * Ipinaaalam ang mga pagkakaiba - iba ng LLATERDDAP™kung ang axis variable' (para saEDDGriddatos) o mga data variable' (para sa EDDTable datasets)  [destinationName](#destinationname)ay "mahahabang bahagi", "pundamental", "katangian", "depth", o "depth""time".
        * Hinihimok ka namin na gamitin ang pamantayang mga pangalang ito sa mga pagbabagong ito kailanma't maaari. Wala sa mga ito ang hinihiling. Kung hindi mo gagamitin ang pantanging iba't ibang pangalang ito,ERDDAP™ang kahulugan nito. Halimbawa, ang mga variable ng LLAT ay pantanging ginagamot ng Make A Graph ( *datasetID* .grap) : Kung ang X Axis variable ay "mahahaba" at ang Y Axis variable ay "latude", makakakuha ka ng mapa (gumagamit ng pamantayang projection, at may maskarang panlupa, mga hangganang pampolitika, atbp.) sa halip ng graph.
        *   ERDDAP™awtomatikong magdaragdag ng maraming metadata sa LLAT variables (halimbawa, "[ioos\\_category](#ioos_category)", "[mga yunit](#units)", at ilang mga pamantayan-relatibong mga katangian tulad ng "\\_CoordinateAxisType".) .
        *   ERDDAP™ay awtomatikong magdadagdag ng maraming global metadata na nauugnay sa mga halaga ng LLAT ng napiling subset ng datos (Halimbawa, "geospatial\\_lon\\_min".) .
        * Ang mga Client na sumusuporta sa mga pamantayang metadata na ito ay maaaring samantalahin ang karagdagang metadata upang ilagay ang data sa panahon at espasyo.
        * Ang mga Client ay madadaling makalikha ng mga queries na kinabibilangan ng LLAT variables dahil ang mga pangalan ng variable ay pareho sa lahat ng mga kaugnay na dataset.
    * Para sa "habahan" na variable at ang "latitude" na variable:
        * Gamitin ang[destinationName](#destinationname)s "matagal" at "palatandaan" tangi lamang kung ang[mga yunit](#units)ay mga digri\\_east at digris\\_north, ayon sa pagkakasunod. Kung ang iyong datos ay hindi angkop sa mga kahilingang ito, gumamit ng iba't ibang pangalan (Halimbawa, x, y, lonRadians, latRadians) .
        * Kung mayroon kang longitude at latitud na impormasyon na ipinahahayag sa iba't ibang yunit at sa gayo'y may iba't ibang impormasyondestinationNameHalimbawa, ang mga lonRadian at mga latRadian, Make A Graph ( *datasetID* .grap) ay gagawa ng mga graph (Halimbawa, mga seryeng time) sa halip na mga mapa.
    * Para sa "altitude" variable at ang "depth" variable:
        * Gamitin ang[destinationName](#destinationname)"altitude" upang matukoy ang layo ng datos sa ibabaw ng antas ng dagat (positive="up" mga pagpapahalaga) . Sa optionly, maaaring gamitin mo ang "altitude" para sa mga distansiyang mas mababa sa antas ng dagat kung ang mga halaga ay negatibo sa ibaba ng dagat (o kung ginagamit mo, halimbawa,
[&lt;pangalan="scale\\_factor" type=" (sa Ingles)&gt;- 1&lt;/att&gt;] (#scale_factor) upang gawing mga pamantayan sa altitud ang lalim.
        * Gamitin angdestinationName"depth" upang matukoy ang layo ng datos sa ibaba ng antas ng dagat (positive="down" mga pagpapahalaga) .
        * Ang isang dataset ay maaaring walang parehong "altitude" at "depth" variables.
        * Para sa iba't ibang pangalang ito, ang[mga yunit](#units)dapat ay "m", "meter", o "meters". Kung ang mga yunit ay naiiba (Halimbawa, mga dipa) , magagamit mo
[&lt;pangalan="scale\\_factor"&gt; *ilan Halaga* &lt;/att&gt;] (#scale_factor) at [&lt;pangalan= "units"&gt;meters&lt;/att&gt;] (Mga #unit) upang gawing metro ang mga yunit.
        * Kung ang iyong data ay hindi angkop sa mga kahilingang ito, gumamit ng ibang impormasyondestinationName  (Halimbawa, sa itaas ngGround, distansiya Tobotom) .
        * Kung alam mo ang vertical CRS pakisuyong i-dety ito sa metadata, e.g., "EPSG:5829". (Biglang taas sa ibabaw ng antas ng dagat) , "EPSG:5831" (Biglang lalim sa ilalim ng antas ng dagat) , o "EPSG:5703". (Ang taas ng NAVD88) .
    * Para sa"time"Iba't iba:
        * Gamitin ang[destinationName](#destinationname) "time"para lamang sa mga variable na kinabibilangan ng buong petsa+time (o petsa, kung iyan lamang ang mayroon) . Halimbawa, kung may magkahiwalay na mga tudling para sa petsa at timeOfDay, huwag mong gamitin ang iba't ibang pangalan"time".
        * Tingnan[mga yunit](#time-units)para sa higit pang impormasyon tungkol sa mga yunit na ipinalalagay na sa loob ng panahon at timeStamp variables.
        * Ang panahon ay iba - iba at nauugnay[panahon Iba't Ibang Uri ng Selyo](#timestamp-variables)ay natatangi sa bagay na lagi nilang binabago ang mga halaga ng impormasyon mula sa format ng source (anuman ito) sa halagang numero (mga segundo simula 1970-01-01T00:00:00Z) o ang halagang String (ISO 8601:2004 (E) format) , depende sa kalagayan.
        * Kapag ang gumagamit ay humihiling ng time data, maaari nilang hilingin ito sa pamamagitan ng pagtatakda sa panahon bilang isang halaga ng numero (mga segundo simula 1970-01-01T00:00:00Z) o ang halagang String (ISO 8601:2004 (E) format) .
        *   ERDDAP™may gamit sa[Pagkumberte sa Isang Numerikano Panahon na Upang/mula sa Pabagu - bagong Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Tingnan[PaanoERDDAPPakikitungo sa Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Bakit mayroon lamang dalawang pangunahing data structure?{#why-just-two-basic-data-structures} 
* Yamang mahirap para sa mga kliyenteng tao at mga kliyente ng computer na pakitunguhan ang isang masalimuot na set ng posibleng mga dataset istruktura,ERDDAP™ay gumagamit lamang ng dalawang pangunahing istruktura ng datos:
    * a[Nakatiklop na istruktura ng datos](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (Halimbawa, para sa satellite data at model data) at
    * a[strakular data structure](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (Halimbawa, para sa in-situ boya, station, at trajectory data) .
* Tiyak, hindi lahat ng impormasyon ay maaaring ipahayag sa mga kayariang ito, subalit ang karamihan nito ay maaari. Ang mga kopya, lalo na, ay lubhang nababaluktot na mga data structures (Tingnan ang tagumpay ng mga programa ng connectional database) .
* Ginagawa nitong mas madaling itayo ang mga data queries.
* Ito ang gumagawa sa mga pagtugon ng datos na may payak na kayarian, na gumagawa ritong mas madaling isilbi ang datos sa mas malawak na iba't ibang pamantayang uri ng talaksan (na kadalasang sumusuporta lamang sa simpleng mga data structure) . Ito ang pangunahing dahilan kung bakit kami nagtayoERDDAP™Dito.
* Kaya naman napakadali para sa atin (o sinuman) upang magsulat ng client software na gumagana sa lahatERDDAP™mga datos.
* Ginagawa nitong mas madali na ihambing ang impormasyon mula sa iba't ibang pinagmumulan.
* Alam na alam namin na kung ikaw ay sanay na sa paggawa ng mga datos sa iba pang data istruktura maaaring sa simula ay isipin mo na ang pamamaraang ito ay simple o hindi sapat. Subalit ang lahat ng mga data istruktura ay may tradeoff. Walang sakdal. Kahit na ang mga do-it-all na istruktura ay may kani-kanilang downside: ang paggawang kasama nila ay masalimuot at ang mga file ay maaari lamang isulat o basahin gamit ang mga espesyal na software na aklatan. Kung tatanggapin moERDDAP' sapat na paraan upang sikaping makipagtulungan dito, maaaring masumpungan mo na ito ay may mga bentaha (Partikular na ang suporta para sa maramihang uri ng talaksan na maaaring magtaglay ng mga pagtugon ng datos) . Ang[ERDDAP™slide show](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (lalo na ang[slide ng data istruktura](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) tungkol sa mga isyung ito.
* At kahit na kung ang paraang ito ay waring kakatwa sa iyo, ang karamihan ay kakaiba sa iyoERDDAP™Hinding - hindi mapapansin ng mga kliyente - makikita lamang nila na ang lahat ng datasets ay may magandang payak na kayarian at sila'y pasasalamatan na makakakuha sila ng datos mula sa iba't ibang pinagmulan na ibinalik sa isang malawak na iba't ibang format ng talaksan.
         
### Dimensiyon{#dimensions} 
*    **Paano kung ang grid variable sa source dataset ay hindi magkapareho ng axis?**   
Sa loobEDDGriddatasets, lahat ng data variables MUST gamitin (makibahagi) lahat ng axis ay iba't iba. Kaya kung ang isang source dataset ay may ilang mga variable na may isang set ng mga dimensiyon, at iba pang mga variable na may ibang set ng dimensiyon, kailangan mong gumawa ng dalawang datasets saERDDAP. Halimbawa, maaari kang gumawa ng isa nitoERDDAP™datos na pinamagatang "Ilang Titulo (nasa ibabaw) " upang magkaroon ng iba't ibang bagay na ginagamit lamang\\[panahon\\]\\[latitud\\]\\[longhitud\\]Mga sukat at iba pang sukatERDDAP™datos na pinamagatang "Ilang Titulo (sa kalaliman) " upang panatilihin ang iba't ibang bagay na ginagamit\\[panahon\\]\\[altitud\\]\\[latitud\\]\\[longhitud\\]. O marahil ay mababago mo ang pinagmulan ng datos upang dagdagan ang dimensiyon na may iisang halaga (Halimbawa, altitud=0) upang gawing hindi pabagu - bago ang mga variable.
    
    ERDDAP™hindi humahawak ng mas komplikadong datos (Halimbawa, mga modelo na gumagamit ng isang mesh ng mga tatsulok) Mabuti. Maaari mong ihain ang mga dataset na ito saERDDAP™sa pamamagitan ng paglikha ng dalawa o higit pang datasets saERDDAP™  (upang ang lahat ng mga data variable sa bawat bagong dataset ay maghati sa iisang set ng axis variables) , ngunit hindi iyan ang gusto ng mga gumagamit. Para sa ilang datasets, maaari mong isaalang - alang ang paggawa ng regular na nakalinyang bersiyon ng dataset at pag - aalok na karagdagan sa orihinal na impormasyon. Ang ilang kliente software ay maaari lamang makitungo sa isang regular na grid, kaya sa paggawa nito, nakararating ka sa karagdagang mga kliyente.
     
    
### Niliwanag na mga Data{#projected-gridded-data} 
Ang ilang detalyadong impormasyon ay may masalimuot na kayarian. Halimbawa, ang antas ng satelayt 2 ("mahabang track") ang datos ay hindi gumagamit ng payak na projection. Mga Modelo (at ang iba pa) ay kadalasang gumagana sa mga grid data sa iba't ibang non-cylindrical projections (Halimbawa, conic, polar stereographic, tripolar) o sa mga grid na hindi pa naiaayos (mas masalimuot na data structure) . Nais ng ilang gumagamit ng dulo ang impormasyong ito, kaya't walang nawawalang impormasyon. Para sa mga kliyenteng iyon,ERDDAP™ay maaaring magsilbi sa impormasyon, gaya ng, tangi lamang kung angERDDAP™Hinahati ng administrador ang orihinal na dataset sa ilang datasets, na ang bawat bahagi ay kinabibilangan ng mga variable na may parehong axis variables. Oo, iyan ay waring kakatwa sa mga taong nasasangkot at ito ay naiiba sa karamihanOPeNDAPMga server. SubalitERDDAP™Idiniriin na ang impormasyon ay makukuha sa maraming format. Posible iyan dahilERDDAP™gumamit/requires ng mas pare-parehong data structure. Bagaman medyo asiwa (I.e., naiiba kaysa inaasahan) ,ERDDAP™ay maaaring mamahagi ng inaasahang impormasyon.

\\[Oo,ERDDAP™ay maaaring magkaroon ng mas maluwag na mga kahilingan para sa data structure, subalit panatilihin ang mga kahilingan para sa output formats. Subalit iyan ay hahantong sa kalituhan sa gitna ng maraming gumagamit, lalo na sa mga baguhan, yamang maraming waring makatuwirang mga kahilingan para sa impormasyon na may iba't ibang kayarian ay magiging walang bisa sapagkat ang impormasyon ay hindi magiging angkop sa uri ng talaksan. Patuloy tayong bumabalik sa disenyo ng kasalukuyang sistema.\\]

Ang ilang mga dulong gumagamit ay nagnanais ng datos sa isang lat unclaide projection tulad ng Equirectanguilar / plate carrée o Mercator) para sa free-of-use sa iba't ibang sitwasyon. Para sa mga situwasyong ito, pinasisigla natin angERDDAP™Tagapangasiwa na gumamit ng iba pang software (NCO?Matlab? R? IDV? ...?) upang i-reproject ang data sa isang heograpiko (Equirectanguular projection / plate carrée) o iba pang hugis - guhit na kalkulasyon at nagsisilbi sa anyong iyon ng impormasyon saERDDAP™bilang ibang dataset. Katulad ito ng ginagawa ng mga tao kapag binabago nila ang satellite level 2 data sa antas 3 data. Ang isa sa gayong kasangkapan ay[NCO](https://nco.sourceforge.net/nco.html#Regridding)na nagbibigay ng karagdagang mapagpipilian para sa muling paglalagay ng impormasyon.

#### GSIS at Reproktibong Data{#gis-and-reprojecting-data} 
Yamang ang daigdig ng GIS ay kadalasang mahilig sa mapa, ang mga programa ng GSIS ay karaniwang nagbibigay ng suporta para sa muling pagpapasok ng impormasyon, i.e., pinag - iisipan ang impormasyon sa isang mapa na may ibang tantiya.

Sa kasalukuyan,ERDDAP™ay walang mga kasangkapan upang i-project ang datos. Sa halip, inirerekomenda namin na gumamit kayo ng isang panlabas na kasangkapan upang gumawa ng iba't ibang dataset, kung saan ang impormasyon ay muling ini - project mula sa orihinal na anyo nito tungo sa parihaba (longhitud) angkop para saERDDAP.

Sa aming palagay, ang CF/DAPAng daigdig ay medyo naiiba kaysa daigdig ng GSIS at gumagana sa mas mababang antas.ERDDAP™ang ganiyan. Sa pangkalahatan,ERDDAP™ay dinisenyo upang magtrabaho pangunahin na sa pamamagitan ng datos (hindi mga mapa) at ayaw magbago (e.g., reproject) na datos. SapagkatERDDAP™, grided data ay madalas/karaniwan/maituturing na nauugnay sa mga halaga ng lat lon at isang platform projection, at hindi ang ilang produksyon ng x,y mga halaga. Anuman ang kalagayan,ERDDAP™ay hindi gumagawa ng anumang bagay sa pagtaya ng impormasyon; ipinapasa lamang nito ang impormasyon sa, gaya ng, sa kasalukuyang tantiya nito, sa teoriya na ang isang reprojection ay isang malaking pagbabago sa impormasyon atERDDAP™ay ayaw masangkot sa malalaking pagbabago. Gayundin, maaaring walang kamalay - malay na uliting muli ng mga sumunod na gumagamit ang impormasyon, na hindi magiging kasingbuti ng paggawa lamang ng isang reprojection. (Kaya, kung angERDDAP™Nais ng administrador na mag - alok ng impormasyon sa ibang tantiya, multa; baguhin lamang ang data offline at mag - alok na bilang ibang dataset saERDDAP. Maraming satelayt-based datasets ang iniaalok bilang kung ano ang tinatawag ng NASA na Level 2 (Bahagi) at Bilang Level 3 (Equirectanguular projection) bersyon.) KailanERDDAP™gumagawa ng mga mapa (Tuwiran o sa pamamagitanWMSo KML) ,ERDDAP™Sa kasalukuyan ay nag - aalok lamang ng mga mapa sa Equirectanguilar / plate carrée projection na, mabuti na lamang, tinatanggap ng karamihan ng mga programa sa paggawa ng mapa.

Nakapagpapatibay - loobERDDAP™Mga administrador na gagamit ng iba pang software (NCO?Matlab? R? IDV? ...?) upang i-reproject ang data sa isang heograpiko (Equirectanguular projection / plate carrée) o iba pang hugis - guhit na kalkulasyon at nagsisilbi sa anyong iyon ng impormasyon saERDDAP™bilang ibang dataset. Katulad ito ng ginagawa ng mga tao kapag binabago nila ang satellite level 2 data sa antas 3 data. Ang isa sa gayong kasangkapan ay[NCO](https://nco.sourceforge.net/nco.html#Regridding)na nagbibigay ng karagdagang mapagpipilian para sa muling paglalagay ng impormasyon.

Umaasa kami naERDDAP™ay makakagawa ng mga kasangkapang-in upang mag-alok ng mga mapa na may iba pang mga produksyon sa hinaharap. Umaasa rin kami na magkakaroon ng mas mabuting kaugnayan sa daigdig ng GIS sa hinaharap (maliban sa agosWMSpaglilingkod) . Kakila-kilabot na sa "modernong" daigdig na ito, ang mga kawing sa pagitan ng CF/DAPNapakahina pa rin ng daigdig at ng daigdig ng GIS. Ang dalawang bagay na iyon ay nasa listahang To Do. (Kung nais mong tumulong, lalo na kung may kaugnayanERDDAP™sa MapFER, pakisuyong email Chris. Juan sa noaa.gov .) 
    
### Mga Uri ng Data{#data-types} 
ERDDAP™sumusuporta sa mga sumusunod na uri ng datos
 (ang mga pangalan ay sensitibo;'u'Ang unlapi ay kumakatawan sa "unsigned"; ang bilang ng mga pangalan sa ibang sistema ay ang bilang ng mga bits) :

#### byte{#byte} 
*    **byte** ay lumagda ng mga integridad na may lawak na -128 hanggang 127.
Sa ibang mga sistema, ito kung minsan ay tinatawag na int8.
Ito ay tinatawag na "tinyin" ng SQL at Cassandra.
    ERDDAP™mga kumberte[Ekstasi](#boolean-data)mula sa ilang pinagmumulan (e.g., SQL at Cassandra) papasok saERDDAP™na may halagang 0= false, 1=tunay, at 127=missing\\_value.
#### umbyte{#ubyte} 
*    **umbyte** ay may di-pirmadong integrasyon na may saklaw na 0 hanggang 255.
Sa ibang mga sistema, ito kung minsan ay tinatawag na uint8.
#### maikli{#short} 
*    **maikli** ay lumagda ng integridad na may lawak na -32768 hanggang 32767.
Sa ibang mga sistema, ito kung minsan ay tinatawag na int16.
Ito ay tinatawag na "maliit" ng SQL at Cassandra.
#### umikli{#ushort} 
*    **umikli** ay may unsigned integer na halaga na 0 hanggang 65535.
Sa ibang sistema, ito kung minsan ay tinatawag na uint16.
#### int{#int} 
*    **int** ay lumagda ng integridad na may lawak na -2147483648 hanggang 2147483647.
Sa ibang mga sistema, ito kung minsan ay tinatawag na int32.
Ito ay tinatawag na "integer|numeriko (?) "Sa pamamagitan ng SQL at "int" ni Cassandra.
#### uint{#uint} 
*    **uint** ay nag-unsign ng integrations na may saklaw na 0 hanggang 4294967295.
Sa ibang mga sistema, ito kung minsan ay tinatawag na uint32.
#### mahaba{#long} 
*    **mahaba** ay lumagda ng integrations na may lawak na -9223372036854775808 hanggang 9223372036854775807.
Sa ibang mga sistema, ito kung minsan ay tinatawag na int64.
Ito ay tinatawag na "bigint|numeriko (?) "Sa pamamagitan ng SQL at "bigint" ni Cassandra.
Dahil sa maraming uri ng file ay hindi sumusuporta sa mahabang datos, ang paggamit nito ay hindi hinihimok. Kung maaari, gumamit ng doble sa halip na (Tingnan ang ibaba) .
#### Umabot{#ulong} 
*    **Umabot** ay may di-signed integer na halaga na 0 hanggang 184467473709551615
Sa ibang mga sistema, ito kung minsan ay tinatawag na uint64.
Dahil maraming uri ng file ay hindi sumusuporta sa ulong data, ang paggamit nito ay hindi hinihimok. Kung maaari, gumamit ng doble sa halip na (Tingnan ang ibaba) .
#### Palutang{#float} 
*    **Palutang** ay isang IEE 754 na lumulutang na may saklaw na humigit-kumulang +/- 3.402823466e+38.
Sa ibang mga sistema, ito kung minsan ay tinatawag na boat32.
Ito ay tinatawag na "tunay|Palutang (?) |MUNGKAHI (?) |numeriko (?) "Sa pamamagitan ng SQL at "float" ni Cassandra.
Ang espesyal na halaga na NaN ay nangangahulugang Not-a-Number.
    ERDDAP™Komberte ng positibo at negatibong infinity values kay NaN.
#### doble{#double} 
*    **doble** ay isang IEE 754 na doble ang agwat sa humigit - kumulang
+/- 1.7976931348623157E+308.
Sa ibang mga sistema, ito kung minsan ay tinatawag na float64.
Ito ay tinatawag na "dobleng prekwensiya|Palutang (?) |MUNGKAHI (?) |numeriko (?) "Sa pamamagitan ng SQL at "doble" ni Cassandra.
Ang espesyal na halaga na NaN ay nangangahulugang Not-a-Number.
    ERDDAP™Komberte ng positibo at negatibong infinity values kay NaN.
#### char{#char} 
*    **char** ay isang single, 2-byte (16-bit)  [Unicode UCS-2 karakter](https://en.wikipedia.org/wiki/UTF-16)mula sa\\u0000  (#0) sa pamamagitan ng\\uffff  (#65535) .
    \\uffff'Ang kahulugan ay Not-a-Character, analogous sa dobleng halaga ng NaN.
Hindi hinihimok ang paggamit ng char dahil maraming uri ng file ang alinman sa hindi sumusuporta sa mga char o sumusuporta lamang sa 1-byte chars (Tingnan ang ibaba) . Isaalang - alang sa halip ang paggamit ng String.
Ang mga user ay maaaring gumamit ng mga char variable upang gumawa ng mga graph.ERDDAP™ang mga karakter sa kanilang Unicode code point number, na maaaring gamitin bilang numeric data.
#### Pagpiga{#string} 
*    **Pagpiga** ay isang pagkakasunod-sunod ng 0 o higit pa, 2-byte (16-bit)  [Unicode UCS-2 karakter](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™gumamit ng/interpretes ang isang 0-habang strando bilang nawawalang halaga.ERDDAP™ang isang tunay na null string.
Ang teoretikal na sukdulang haba ng kuwerdas ay 2147483647 karakter, ngunit malamang ay may iba't ibang problema sa iba't ibang lugar kahit na may medyo mas maikling Strings.
GamitinERDDAP'S String for SQL's character, varchar, character iba-iba, binary, varbinary, interval, array, multiset, xml, at anumang ibang database data type na hindi lapat nang malinis sa anumang iba pang iba pang mga uri ng datosERDDAP™tipo ng datos.
GamitinERDDAP'S String for Cassandra's "text" at anumang iba pang uri ng datos na Cassandra na hindi angkop ng malinis sa iba pang ibaERDDAP™tipo ng datos.
     

BagoERDDAP™v2.10,ERDDAP™ay hindi sumusuporta sa mga di-signed integer types internasyunal at nag-aalok ng limitadong suporta sa mga mambabasa at manunulat nito ng datos.
    
### Type na mga Kahinaan ng Data{#data-type-limitations} 
Maiisip moERDDAP™bilang isang sistema na may birtwal na datasets, at gumagana sa pamamagitan ng pagbabasa ng datos mula sa isang dataset's source sa isang panloob na modelo ng datos at pagsulat ng datos sa iba't ibang mga serbisyo (e.g.,(OPeN)DAP,WMS) at mga uri ng file bilang tugon sa mga kahilingan ng gumagamit.

* Ang bawat input na mambabasa ay sumusuporta sa isang subset ng mga uri ng datos naERDDAP™ay umaalalay. Kaya basahin ang datosERDDAP'di problema ang panloob na data structures.
* Ang bawat manunulat ng output ay sumusuporta rin sa isang subset ng mga uri ng datos. Problema iyan dahilERDDAPay kailangang magsiksik, halimbawa, ng mahabang datos sa mga uri ng talaksan na hindi sumusuporta sa mahabang datos.
     

Nasa ibaba ang mga paliwanag tungkol sa mga limitasyon (o wala) ng iba't ibang manunulat ng output at kung paanoERDDAP™ang mga problema. Ang gayong mga komplikasyon ay likas na bahagi ngERDDAP'Ang tunguhin na gawing interoperable ang mga sistema ng disparate.

#### ASI{#ascii} 
* ASI (.csv,.tsv, atbp.) teksto -
    * Ang lahat ng mga numerikong datos ay nakasulat sa pamamagitan ng representasyon nitong String (na may nawawalang data values na lumilitaw na 0-habang mga strando) .
    * BagamanERDDAP™sumulat ng mahaba at mahabang halaga nang wasto sa mga pakete ng teksto sa ASCII, maraming mambabasa (e.g., kumalat na mga programa) ay hindi wastong mapakitunguhan ang mahaba at mahabang halaga at sa halip ay makukumberte ang mga ito sa dobleng mga pamantayan (na hindi eksakto sa ilang kaso) .
    * Char at String data ay nakasulat sa pamamagitan ng JSON Strings, na humahawak sa lahat ng mga karakter ng Unicode (Partikular, ang mga "unuswal" na karakter na lampas sa ASCII #127, e.g., ang Euro character ay lumilitaw bilang "\\u20ac".) .
    
        
#### JON{#json} 
* JON (.json,.jsonlCSV, atbp.) teksto -
    * Ang lahat ng mga numerikong datos ay nakasulat sa pamamagitan ng representasyon nitong String.
    * Char at String data ay isinusulat bilang JSON Strings, na humahawak sa lahat ng mga karakter ng Unicode (Partikular, ang mga "unuswal" na karakter na lampas sa ASCII #127, e.g., ang Euro character ay lumilitaw bilang "\\u20ac".) .
    * Ang nawawalang mga halaga para sa lahat ng mga uring numerikong datos ay lumilitaw bilang null.
         
#### .nc3 files{#nc3-files} 
*   .nc3 files ay hindi katutubong suportado ang anumang mga hindi-signed integer data types. Bago ang CF v1.9, ang CF ay hindi sumusuporta sa mga di-signed integer types. Upang maharap ito,ERDDAP™Ang 2.10+ ay sumusunod sa pamantayang NUG at palaging nagdaragdag ng isang "\\_Unsigned" na attribute na may halagang "tunay" o "mali" upang ipahiwatig kung ang datos ay mula sa isang hindi nakasulat o nakalagdang variable. Ang lahat ng di - magagandang katangian ay isinulat bilang mga katangiang pirmado (e.g., byte) na may nilagdaang mga pamantayan (hal.g., isang ubyteactual\\_rangeIbilang sa mga halagang 0 hanggang 255, ay lumilitaw bilang isang byte attribute na may mga halagang 0 hanggang -1 (ang inverse ng complemental na halaga ng out-of-range na halaga). Walang madaling paraan upang malaman kung aling (signed) integrasyong mga katangian ang dapat basahin bilang mga katangiang hindi pa nailalathala.ERDDAP™ay sumusuporta sa "\\_Unsigned" attribute kapag ito ay nagbabasa.nc3 files.
*   .nc3 files ay hindi sumusuporta sa mahaba o ulong data types.ERDDAP™ang bagay na ito sa pamamagitan ng pansamantalang pagkumberte sa kanila upang maging dobleng variables. Ang mga doble ay maaaring eksaktong kumatawan sa lahat ng mga halaga hanggang +/- 9,007,199,254,740,992 na 2^53. Ito ay isang di - sakdal na solusyon.UnidataHuwag gumawa ng maliit na upgrade.nc3 upang harapin ito at ang kaugnay na mga problema, na binabanggit.nc4 (malaking pagbabago) bilang lunas.
* Ang Kahulugan ng CF (bago ang v1.9) ang sabi nito na sumusuporta sa isang uri ng char data ngunit hindi malinaw kung ang char ay nilayon lamang bilang mga building block ng mga char array, na epektibong Strings. Ang mga tanong sa kanilang talaan sa koreo ay naglalaman lamang ng nakalilitong mga kasagutan. Dahil sa mga komplikasyong ito, pinakamabuting iwasan ang mga char variableERDDAP™at gamitin ang String variables kailanma't maaari.
* Karaniwan na,.nc3 files suportadong strando lamang na may ASCII-encoded (7-bit, #0 - #127) mga tauhan. NIUG (atERDDAP) palawigin iyan (simula ~2017) sa pamamagitan ng paglalakip ng katangiang "\\_Encoding" na may halagang "ISO-8859-1". (karugtong ng ASCII na nagbibigay kahulugan sa lahat ng 256 na halaga ng bawat 8-bit na karakter) o "UTF-8" upang ipahiwatig kung paanong ang data ng String ay naka-install. Ang iba pang mga pag - apela ay maaaring legal ngunit nasisiraan ng loob.
         
#### .nc4 na talaksan{#nc4-files} 
*   .nc4 files sumusuporta sa lahatERDDAP'mga data type.
    
#### Mga talaksang NCCSV{#nccsv-files} 
Ang NCCSV 1.0 files ay hindi sumusuporta sa anumang hindi nakasigned integer data types.
[NCCSV 1.1+ files](/docs/user/nccsv-1.00)ay sumusuporta sa lahat ng mga hindi naka-signed integer data types.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII files, at .dods binary files) -
    *   (OPeN)DAPHawak nang maikli, maikli, int, uint, palutang at dobleng halaga nang tama.
    *   (OPeN)DAPay may "byte" na data type na binibigyang kahulugan nito bilang di-signed, samantalang makasaysayan, THEDDS atERDDAP™ay gumampan ng "byte" gaya ng nilagdaan sa kanilang(OPeN)DAPmga serbisyo. Upang maharap ito nang mas mabuti,ERDDAP™Ang 2.10+ ay sumusunod sa pamantayang NUG at palaging nagdaragdag ng "\\_Unsigned" na attribute na may halagang "tunay" o "mali" upang ipahiwatig kung ang datos ay kung ano angERDDAP™byte o ubyte. Ang lahat ng mga katangiang byte at ubyte ay isinusulat bilang "byte" na mga katangiang may lagdang mga halaga (e.g., isang ubyteactual\\_rangeIbilang sa mga halagang 0 hanggang 255, ay lumilitaw bilang isang byte attribute na may mga halagang 0 hanggang -1 (ang inverse ng complemental na halaga ng out-of-range na halaga). Walang madaling paraan upang malaman kung aling "byte" na mga katangian ang dapat basahin bilang mga katangiang ubyte.
    *   (OPeN)DAPay hindi sumusuporta sa nilagdaan o hindi nilagdaang mahahabang taon.ERDDAP™ang bagay na ito sa pamamagitan ng pansamantalang pagkumberte sa kanila upang maging dobleng mga bagay at mga katangian. Ang mga doble ay maaaring eksaktong kumatawan sa lahat ng halaga hanggang sa 9,007,199,254,740,992 na 2^53. Ito ay isang di - sakdal na solusyon.OPeNDAP  (ang organisasyon) Huwag gumawa ng maliit na upgradeDAP2.0 upang harapin ito at ang kaugnay na mga problema, binabanggitDAP4 (malaking pagbabago) bilang lunas.
    * Sapagkat(OPeN)DAPwalang hiwalay na uri ng char data at teknikal na sumusuporta lamang sa 1-byte ASCII karakter (#0 - #127) sa Strings, char data variables lilitaw bilang 1-character-long Strings sa(OPeN)DAP.das, .dds, at .dods mga tugon.
    * Sa teknikal na paraan, ang(OPeN)DAPAng detalye ay sumusuporta lamang sa mga strandong may mga karakter na ASCII-encoded (#0 - #127) . NIUG (atERDDAP) palawigin iyan (simula ~2017) sa pamamagitan ng paglalakip ng katangiang "\\_Encoding" na may halagang "ISO-8859-1". (karugtong ng ASCII na nagbibigay kahulugan sa lahat ng 256 na halaga ng bawat 8-bit na karakter) o "UTF-8" upang ipahiwatig kung paanong ang data ng String ay naka-install. Ang iba pang mga pag - apela ay maaaring legal ngunit nasisiraan ng loob.
         
### Uri ng Komento ng Data{#data-type-comments} 
* Dahil sa mahinang suporta sa mahaba, ulong, at char data sa maraming uri ng file, hindi namin hinihimok ang paggamit ng mga uring ito ng datos saERDDAP. Kung maaari, gumamit ng doble sa halip ng mahaba at ulong, at gamitin ang String sa halip na char.
     
* Metadata - Dahil sa(OPeN)DAP'Ang mga tugong .da at .dds ay hindi sumusuporta sa mga mahahaba o ulong attribute o mga uri ng datos (at sa halip ipakita ang mga ito bilang doble) , sa halip ay baka gusto mong gamitinERDDAP's tabular representasyon ng metadata gaya ng makikita sahttp.../erddap/ **Pagkain** / *datasetID* .html web page (Halimbawa,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (na makukuha mo rin sa ibang uri ng talaksan, e.g., .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv,.xhtml) o ang.nccsvAng tugon ng Metadata (Halimbawa,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)bagaman.nccsvAng metadata ay makukuha lamang para sa tabular datasets) , parehong sumusuporta sa lahat ng uri ng datos (Partikular, ang mahaba, ulong, at char) .
         
### Ang Media Files{#media-files} 
Hindi lahat ng datos ay mga hanay ng bilang o teksto. Ang ilang mga dataset ay binubuo o kinabibilangan ng mga file ng media, tulad ng imahe, audio at video files.ERDDAP™ay may ilang pantanging katangian upang gawing mas madali para sa mga gumagamit na ma-access ang mga file ng media. Dalawang hakbang:
 

1. Gawing madaling marating ang bawat file sa pamamagitan ng sarili nitong URL, sa pamamagitan ng isang sistema na sumusuporta sa mga kahilingan ng range.
Ang pinakamadaling paraan upang gawin ito ay ilagay ang mga salansan sa isang directory naERDDAP™ay magagamit. (Kung ang mga ito ay nasa isang lalagyan na parang isang lalagyan.zipwalang laman ang talaksan, bagaman baka gusto mong ialok ang mga ito.zipsa mga gumagamit din.) Pagkatapos, gumawa ng isang[Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)datos na magagamit sa pamamagitan ngERDDAP™, lalo na sa pamamagitan ngERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Lahat ng file ay nakarating sa EDDTable FromFileNames atERDDAP'"files"suporta ng sistema[mga kahilingan ng byte range](https://en.wikipedia.org/wiki/Byte_serving). Karaniwan na, kapag ang isang kliyente (e.g., isang browser) ay humihiling sa isang URL, makukuha nito ang buong file bilang tugon. Subalit sa pamamagitan ng isang byte range request, binabanggit ng kahilingan ang isang hanay ng mga byte mula sa file, at ibinabalik lamang ng server ang mga byte na iyon. Mahalaga ito dito sapagkat ang mga audio at video player sa mga browser ay nagtatrabaho lamang kung ang file ay magagamit sa pamamagitan ng byte range requests.
    
Mapagpipilian: Kung mayroon kang mahigit sa isang dataset na may kaugnay na mga file ng media, makagagawa ka lamang ng isang EDDTable FromFileNames na may subfolder para sa bawat grupo ng mga file. Ang bentaha ay na kapag nais mong magdagdag ng bagong mga file ng media para sa isang bagong dataset, ang kailangan mo lamang gawin ay lumikha ng isang bagong folder at ilagay ang mga file sa folder na iyon. Ang folder at files ay awtomatikong idaragdag sa EDDTable FromFileNames dataset.
    
2. Mapagpipilian: Kung mayroon kang dataset na may mga reperensiya sa media file, idagdag itoERDDAP.
Halimbawa, maaaring mayroon kang isang .csv file na may hanay sa tuwing may nakakakita ng isang balyena at isang kolum na kinabibilangan ng pangalan ng isang talaksan ng imahe na may kaugnayan sa pagtanaw na iyon. Kung ang pangalan ng talaksang larawan ay pangalan lamang ng pangalan, e.g., Img20141024T192403Z, hindi isang buong URL, kung gayon kailangan mong magdagdag[babyse ng talaksan Url at/o fileAccessSuffix](#fileaccessbaseurl)Mga katangian ng metadata dahil diyandataVariablena bumabanggit sa baseURL at hulapi para sa mga pangalan na iyon. Kung gagawin mong madaling makuha ang mga file sa pamamagitan ng EDDTable FromFileNames, ang URL ay magiging nasa anyong
     *base Url* /erddap/files/ *datasetID* /
Halimbawa,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Kung mayroon.zipo iba pang file ng container na may lahat ng media files na may kaugnayan sa isang data variable, inirerekomenda namin na gamitin din ninyo ang file na iyon sa mga gumagamit (tingnan ang hakbang 1 sa itaas) at pagkatapos ay iiugnay ito sa isang[Tagas ng talaksan Url](#fileaccessarchiveurl)Sabihin pa.
    

\\[PasimulaERDDAP™v1.82\\]Kung gagawin mo ang unang hakbang sa itaas (o dalawang hakbang) , kung gayon kapag minamalas ng gumagamit angERDDAP™ "files"sistema para sa dataset na iyon (o humiling na makita ang isang subset ng dataset sa pamamagitan ng isang.htmlTablehilingin, kung ginawa mo ang ikalawang hakbang) ,ERDDAP™ay magpapakita ng isang imaheng '?' sa kaliwa ng pangalan. Kung ang gumagamit ay aali - aligid sa ibabaw ng imaheng iyon, makikita nila ang isang popup na nagpapakita ng larawan, o isang audio player, o isang video player. Sinusuporta lamang ng mga Browser ang limitadong bilang ng mga uri ng

* Larawan (karaniwang .gif, .jpg, at .png) ,
* audio (karaniwang .mp3, .gg, at .wav) , at
* mga talaksang video (karaniwang .mp4, .ogv, at . webm) .

Ang suporta ay nag-iiba-iba sa iba't ibang bersyon ng iba't ibang browser sa iba't ibang operating system. Kaya kung may mapagpipilian ka kung aling uri ng talaksan ang ihahandog, makabubuting ialok ang mga uring ito.

O, kung ang gumagamit ay kumukumpas sa pangalan na ipinakikita sa isang pangalanERDDAP™web page, ipakikita ng kanilang browser ang imahe, audio o video file bilang hiwalay na web page. Ito ay karamihang kapaki-pakinabang upang makita ang isang napakalaking imahe o video na umabot sa buong screen, sa halip na sa isang pop-up.
    
### Paggawang Kasama ng AWS S3 Files{#working-with-aws-s3-files} 
[Paglilingkod sa Web ng Amazon (MGA AW) ](https://aws.amazon.com)ay isang nagbebenta ng[pagpupuslit ng ulap](https://en.wikipedia.org/wiki/Cloud_computing)mga serbisyo.[S3](https://aws.amazon.com/s3/)ay isang bagay na nakaimbak na sistema na iniaalok ng AWS. Sa halip ng sistemang herarkiya ng mga direktoryo at mga salansan ng isang tradisyunal na sistema ng talaksan (tulad ng isang hard drive sa iyong PC) , ang S3 ay nag-aalok lamang ng "buckets" na may hawak na "mga bagay". (Tatawagin natin"files") .

Para sa mga talaksang ASCII (e.g., .csv) ,ERDDAP™ay maaaring gumawa sa mga salansan sa mga timba nang tuwiran. Ang tanging bagay na kailangan mong gawin ay magtakda ng&lt;fileDir&gt; para sa dataset gamit ang espesipikong format para sa AWS bucket, e.g., https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Hindi mo dapat gamitin&lt;Hache Mula sa Url&gt; . Tingnan ang ibaba para sa mga detalye.

Subalit para sa binary files (e.g.,.nc, .grib, .bufr, at.hdfmga talaksan) , kailangan mong gamitin ang&lt;cache FromUrl&gt; system na inilarawan sa ibaba.ERDDAP, netcdf-java (alinERDDAP™gamit sa pagbasa ng datos mula sa mga talaksang ito) , at ang iba pang siyentipikong data software ay dinisenyo upang gumana sa pamamagitan ng mga file sa isang tradisyonal na file system[antas ng bloke](https://en.wikipedia.org/wiki/Block-level_storage)pagkuha ng talaksan (na nagpapahintulot sa pagbasa ng mga tipak ng talaksan) , ngunit S3 lamang ang nag-aalok[antas ng talaksan (bagay) ](https://en.wikipedia.org/wiki/Block-level_storage)pagkuha ng talaksan (na nagpapahintulot lamang na mabasa ang buong talaksan) . Nag-aalok ang AWS ng alternatibo sa S3,[Elastic Block Store (EBS) ](https://aws.amazon.com/ebs/)), na sumusuporta sa pag-access ng block level sa mga file ngunit ito ay mas mahal kaysa sa S3, kaya ito ay bihirang gamitin para sa maramihang pag-iimbak ng maraming data files. (Kaya kapag sinasabi ng mga tao na nag - iimbak ng impormasyon sa ulap (S3) ay mura, ito ay karaniwang isang mansanas sa mga kahel na paghahambing.) 

#### S3 Buckets{#s3-buckets} 
 **Mga Nilalaman ng isang Bucket. Mga susi. Mga bagay na walang halaga.**   
Sa teknikal na paraan, ang S3 timba ay hindi organisado sa isang istruktura ng talaksan na gaya ng isang file system sa isang computer. Sa halip, ang mga timba ay naglalaman lamang ng "mga bagay" (mga talaksan) , bawat isa ay may "key" (isang pangalan) . Isang halimbawa ng isang susi sa baldeng noa-goes17

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
Ang katumbas na URl para sa bagay na iyon ay

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

Sinusuportahan ng AWS ang kaunting pagkakaiba sa kung paano ginagawa ang URL na iyon, subalitERDDAP™kailangan ang isang espesipikong format:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Karaniwan na, gaya ng halimbawang ito, na gawing parang trahektoriko ang mga pangunahing pangalan at pangalan ng talaksan, subalit sa teknikal na paraan ay hindi gayon. Yamang ito ay karaniwan at kapaki - pakinabang,ERDDAP™ang mga susi na may /'s na para bang ang mga ito ay isang landas ng herarkiya at pangalan ng talaksan, at ang mga ito ay tatawaging gayon ng dokumentong ito. Kung ang mga susi ng timba ay hindi gumagamit ng /'s (e.g., isang susing katulad ng
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s2018052275), pagkatapos,ERDDAP™ang buong susi bilang isang mahabang pangalan ng talaksan.

Lihim na mga Bucket -- Ang administrador ng baldeng S3 ay maaaring gumawa ng timba at ang laman nito ay publiko o pribado. Kung publiko, ang anumang file sa balde ay maaaring download ng sinumang gumagamit ng URL para sa file. May Amazon[Bukás na Data](https://aws.amazon.com/opendata/)programa na kinaroroonan ng mga datos ng publiko (kasama ang datos mula saNOAA, NASA, at USGS) para sa libre at walang bayad para sa sinuman na mag-download ng mga file mula sa mga baldeng iyon. Kung ang timba ay pribado, ang mga file sa timba ay makukuha lamang ng awtorisadong mga gumagamit at ang AWS ay may bayad (karaniwang binabayaran ng may - ari ng timba) para sa pag-download ng files sa isang non-AWS S3 computer.ERDDAP™ay maaaring gumana sa pamamagitan ng datos sa mga pampubliko at pribadong timba.

#### Mga Kredential ng AWS{#aws-credentials} 
Upang gawin ito na gayonERDDAP™ay maaaring bumasa ng laman ng pribadong mga timba, kailangan mo ang mga kredensiyal ng AWS at kailangan mong mag - imbak ng isang talaksan ng kredensiyal sa pamantayang dako kaya't kailangan mong mag - imbak ng isang rekordERDDAP™ay makasusumpong ng impormasyon. Tingnan ang AWS SDK para saJavaDokumento ng 2.x:[Magtakda ng default na kredensiyal](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (Ang mapagpipiliang mag - imbak ng mga pamantayan bilangJavamga command line parameter sa\\[tomcat\\]/bin/setenv.sh ay maaaring mabuting opsyon.) 
#### AWS /files/{#aws-files} 
* / Mgafile/ sistema -- AngERDDAP™ [/ Mgafile/ sistema](#accessibleviafiles)Pinahihintulutan ng mga gumagamit na i-download ang mga source file para sa isang dataset. Iminumungkahi namin na buksan ninyo ito para sa lahat ng datasets na may source files sapagkat nais ng maraming gumagamit na i - download ang orihinal na source files.
    * Kung ang mga file ay nasa isang pribadong S3 back, ang kahilingan ng gumagamit na download ang isang file ay pangangasiwaan ngERDDAP™, na siyang babasa ng impormasyon mula sa talaksan at pagkatapos ay maghahatid nito sa gumagamit, sa gayo'y dinaragdagan ang pasan sa iyong katawanERDDAP™, ginagamit ang dumarating at palakaibigang bandwidth, at ginagawa ka (angERDDAP™Tagapangasiwa) Bayaran ang bayad ng data egress sa AWS.
    * Kung ang mga file ay nasa isang pampublikong S3 bucket, ang kahilingan ng gumagamit na mag-download ng isang file ay iredirect sa AWS S3 URL para sa file na iyon, kaya ang data ay hindi dadaloyERDDAP™, sa gayo'y binabawasan ang pasanERDDAP. At kung ang mga file ay nasa isang Open Data ng Amazon (malaya) pampublikong timba, pagkatapos ay ikaw (angERDDAP™Tagapangasiwa) Hindi na kakailanganing magbayad ng anumang bayad sa data egress sa AWS. Sa gayon, may malaking bentaha ang pagbibigay ng impormasyon mula sa publiko (hindi pribado) Mga baldeng S3, at malaking bentaha sa pag - aalaga ng impormasyon mula sa Amazon Open Data (malaya) mga timba.

#### ERDDAP™at WAS S3 Buckets{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™at WAS S3 Buckets** ](#erddap-and-aws-s3-buckets)  
Mabuti na lamang, pagkatapos ng maraming pagsisikap,ERDDAP™ay may ilang katangian na nagpapahintulot dito na harapin ang likas na mga problema ng paglutas sa antas ng bloke ng S3 sa makatuwirang mahusay na paraan:

*   \\[Tagatanggi: Ang paggawa sa pamamagitan ng AWS S3 backs ay isang malaking ekstrang trabaho. Ang AWS ay isang malaking ekosistema ng mga serbisyo at katangian. Maraming dapat matutuhan. Nangangailangan ito ng panahon at pagsisikap, ngunit do-able ito. Maging matiyaga at magtatrabaho ka. Humingi ng tulong
([Dokumento ng AWS](https://aws.amazon.com/documentation/gettingstarted/), website tulad ng[Pag - apaw ng Siksik](https://stackoverflow.com/), at ang regular
    [ERDDAP™opsyon ng suporta](/docs/intro#support)) kung/kapag naipit ka.\\]  
     
* Maaari pa ngang mahirap malaman ang kayarian ng directory at mga pangalan ng salansan sa isang timba na S3.ERDDAP™ay may lunas sa problemang ito: Ang EDDTable FromFileNames ay may pantanging lunas[\\*\\*\\* mula sa On theFly](#fromonthefly)Mapagpipilian na nagpapahintulot sa iyo na gumawa ng isang EDDTable FromFileNames dataset na nagpapangyari sa mga gumagamit na suriin ang nilalaman ng isang timba na S3 (at mag-download ng mga file) sa pamamagitan ng datos"files"Pumili. Meron[halimbawa nito sa ibaba](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™ay makababasa ng datos mula sa[panlabas na siksik na mga data file](#externally-compressed-files), kaya mainam kung ang mga files sa S3 ay naka-imbak bilang.gz,.gzip,.bz2, .Z, o iba pang uri ng panlabas na siksik na mga data file, na maaaring lubhang makagulat (2 - 20X) ay bumaba sa halaga ng pag - iimbak ng talaksan. Kadalasan ay walang parusang panahon sa paggamit ng panlabas na mga talaksang siniksik, yamang ang panahong natitipid sa pamamagitan ng paglilipat ng mas maliit na salansan mula sa S3 tungo saERDDAPHalos balansehin ang ekstrang panahon na kinakailangan para saERDDAP™upang i-decompress ang file. Upang magamit ang bahaging ito, kailangan mo lamang tiyakin na ang dataset's&lt;fileNameRegex&gt; pinapayagan ang siksik na uri ng talaksan (e.g., sa pamamagitan ng pagdaragdag (|.gz) sa dulo ng regex) .
     
* Para sa pinakakaraniwang kaso, kung saan mayroon kangERDDAP™naka-install sa iyong PC para sa test/pagpapaunlad at kung saan ang dataset ay may binary data files na nakaimbak bilang mga bagay sa isang S3 back, isang paraan upang makuha ang datasetERDDAP™ay:
    1. Gumawa ng isang directory sa iyong PC upang magdaos ng ilang test data files.
    2. I - download ang dalawang data file mula sa pinagmulan patungo sa directory na kalilikha mo lamang.
    3. Gamitin[GenerateDatasetsXml](#generatedatasetsxml)upang lumikha ng malaking bahagi ngdatasets.xmlpara sa dataset batay sa dalawang lokal na data file.
    4. Suriin na ang dataset ay gumagana ayon sa nais[Mga Dasd](#dasdds)at/o ang inyong lugarERDDAP.
        
         **Ang sumusunod na mga hakbang ay gumagawa ng kopya ng dataset na iyon (na makakakuha ng impormasyon mula sa timba ng S3) sa publikoERDDAP.** 
        
    5. Kopyahin ang Pitak ngdatasets.xmlpara sa datosdatasets.xmlsa publikoERDDAP™na magsisilbi sa impormasyon.
    6. Gumawa ng isang directory sa publikoERDDAP'Ang lokal na hard drive upang maghawak ng isang cache ng mga temporary files. Ang directory ay hindi gagamit ng maraming disk space (tingnan ang cacheSizeGB sa ibaba) .
    7. Palitan ang halaga ng dataset'&lt;tag ng talaksangDir&gt; upang ituro nito ang directory na kalikha mo lamang (kahit na walang laman ang directory) .
    8. Magdagdag ng a[Hache Mula sa Url](#cachefromurl)tag na nagsasaad sa pangalan ng timba ng dataset at opsyonal na unlapi (I.e., directory) sa espesipikong[Haws S3 URL Format naERDDAP™kailangan](#accessing-files-in-an-aws-s3-bucket).
    9. Magdagdag ng [&lt;cachesizeGB&gt;] (#cache simulaurl) tag sa xml ng dataset (e.g., 10 ay mahusay na halaga para sa karamihan ng datasets) upang magsumbongERDDAP™upang limitahan ang laki ng lokal na cache (I.e., huwag subuking ibalot ang lahat ng remote files) .
    10. Tingnan kung mabisa iyan sa publikoERDDAP. Pansinin na sa unang pagkakataonERDDAP™ang dataset, mangangailangan ng mahabang panahon upang magkarga, sapagkatERDDAP™Kailangang i-download at basahin ang lahat ng data files.
        
Kung ang dataset ay isang pagkalaki - laking koleksiyon ng mga talaksan ng impormasyon na nakatiklop, mangangailangan ito ng napakahabang panahon at hindi praktikal. Sa ilang mga kaso, para sa mga nakatiklop na data file,ERDDAP™ay makakakuha ng kinakailangang impormasyon (e.g., ang time point para sa datos sa isang naka-link na talaksan ng datos) mula sa pangalan ng talaksan at iwasan ang problemang ito. Tingnan[Pag - aalsa Mga Pangalan ng File](#aggregation-via-file-names-or-global-metadata).
        
    11. Mapagpipilian (ngunit lalo na sa EDDTable FromFiles datasets) , maaari kang magdagdag[Mga "nThread "](#nthreads)tag sa dataset na sasabihinERDDAPupang gamitin ang mahigit na 1 sinulid kapag tumutugon sa kahilingan ng gumagamit ng impormasyon. Binabawasan nito ang mga epekto ng pagkaantala na nangyayari kapagERDDAP™ng datos mula sa (malayo) AWS S3 backs sa lokal na cache at (marahil) Pagpapahina sa kanila.

#### WAWS S3 Open Data{#aws-s3-open-data} 
Bilang bahagi ngNOAA'[Programa ng Malalaking Data](https://www.noaa.gov/nodd/about),NOAAay may mga pakikipagsosyo sa limang organisasyon, kabilang ang AWS, "upang galugarin ang potensiyal na mga benepisyo ng pag-iimbak ng mga kopya ng mga pangunahing obserbasyon at modelong output sa Cloud upang payagan ang direktang pag-computing sa data nang hindi nangangailangan ng karagdagang pamamahagi". Ang AWS ay kinabibilangan ng mga datos na nakukuha nito mula saNOAAbilang bahagi ng programa nito na mag - alok ng pampublikong access sa isang malaking koleksiyon ng[Bukás na Data sa AWS S3](https://registry.opendata.aws/)mula sa anumang computer, ito man ay isang pangyayari sa Amazon (isang inupahang computer) sa AWS network o sa iyong sariling PC sa anumang network. Ang halimbawa sa ibaba ay nagpapalagay na ikaw ay nagtatrabaho sa isang pampublikong dataset.

#### Pagkakuha ng mga Filyon sa Isang AWS S3 Bucket{#accessing-files-in-an-aws-s3-bucket} 
Para sa isang pribadong kahon ng datos na S3, ang may - ari ng timba ay dapat na magbigay sa iyo ng daan patungo sa timba. (Tingnan ang AWS dokumentasyon.) 

Sa lahat ng kaso, kakailanganin mo ang isang ulat ng WAS sapagkat ang WAS SDK para saJava  (alinERDDAP™para makuha ang impormasyon tungkol sa laman ng timba) ay nangangailangan ng mga kredensiyal sa kuwenta ng AWS. (sa ibaba) 

ERDDAP™magagamit lamang ang AWS S3 balde kung itatakda mo ang [&lt;Hache Mula sa Url&gt;] (#cache simulaurl) (o&lt;fileDir&gt;) sa isang espesipikong format:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
kung saan

* Ang baldeName ay ang maikling anyo ng pangalan ng timba, e.g. noaa-goes17 .
* Ang aws-region, e.g., we-east-1, ay mula sa "Region" column sa isa sa mga mesa ng[Nagwakas ang Paglingkurang WOS](https://docs.aws.amazon.com/general/latest/gr/rande.html)kung saan aktuwal na matatagpuan ang timba.
* Ang unlapi ay opsyonal. Kung sa kasalukuyan, dapat itong matapos sa'/'.

Halimbawa, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Ang URL format na ito ay isa sa mga rekomendasyon ng WAS S3: tingnan ang[Pagkakuha ng Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)at[ang paglalarawang ito ng mga unlapi](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™Kailangan mong pagsamahin ang timba na URL at ang opsyonal na panlapi sa isang URL upang matiyak ang&lt;Oches Mula sa Url&gt; (o&lt;fileDir&gt;) kung saan matatagpuan ang mga files.

#### Subukin ang mga AWS S3 Bucket{#test-public-aws-s3-buckets} 
Para sa pampublikong mga timba, maaari at dapat mong subukin ang timba na URL ng WAS S3 directory sa iyong browser, e.g.,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Kung ang timba ay tama at angkop para saERDDAP, ibabalik nito ang isang dokumentong XML na mayroon na (bahagi) Itinala ang laman ng timba. Nakalulungkot, ang buong URL (I.e., timba URL plus panlapi) yaon pangERDDAP™ang kagustuhan para sa isang ibinigay na dataset ay hindi gumagana sa isang browser. Ang AWS ay hindi nag - aalok ng isang sistema upang mabilis na manginain ng herarkiya ng isang timba sa iyong browser. (Kung mali iyan, pakisuyong email Chris. John sa noaa.gov. Kung hindi, ang Amazon, pakisuyong magdagdag ng suporta rito&#33;) 

#### Pagtingin sa mga Nilalaman{#viewing-the-contents-of-a-bucket} 
Ang mga timba na S3 ay kadalasang naglalaman ng dalawang kategorya ng mga salansan, sa dalawang pseudo subdirectories, na maaaring maging dalawa sa mga itoERDDAP™mga datos. Upang makagawa ngERDDAP™mga dataset, kailangan mong malaman ang panimulang directory para sa&lt;Oches Mula sa Url&gt; (o&lt;fileDir&gt;) at ang format ng mga pangalan ng talaksan na nagpapakilala sa subset na iyon ng mga file. Kung titingnan mo ang buong laman ng timba sa isang browser, ipakikita lamang sa iyo ng S3 ang unang 1000 file, na hindi sapat. Sa kasalukuyan, ang pinakamabuting paraan upang makita mo ang lahat ng laman ng timba ay ang gumawa ng isang timba[Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)datos (sa iyong PCERDDAP™at/o sa publikoERDDAP) , na nagbibigay rin sa iyo ng madaling paraan upang browse ang istraktura ng directory at mag-download ng mga file. Ang&lt;fileDir&gt; para diyan ang URL na ginawa mo sa itaas, e.g. https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Bakit ang AWS S3 ay hindi nag-aalok ng mabilis at madaling paraan para sa sinuman na gawin ito nang walang salaysay ng AWS?\\]Pansinin na kapag ginagawa ko ito sa aking PC sa isang non-Amazon network, lumilitaw na ang Amazon ay nagpapabagal sa pagtugon sa isang patak (mga 100 (?) mga talaksan sa bawat tipak) pagkatapos ng unang ilang tipak (ng 1000 talaksan sa bawat tipak) ay downloaded. Yamang ang mga timba ay maaaring maraming salansan (Ang noaa-goes17 ay may 26 milyon) , ang pagkuha ng lahat ng laman ng isang timba ay maaaring kumuha ng EDDTable FromFileNames ng ilang oras (e.g., 12&#33;) upang matapos.\\[Amazon, tama ba iyan?\\]

#### Paggawang Mapagkakatiwalaan Mula sa FaileNames Dataset na may AWS S3 Bucket{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Kung may pangalan ka nang timba, subalit wala ka nang listahan ng mga file sa timba ng S3 o ang unlapi na nagpapakilala sa kinaroroonan ng kaugnay na mga file sa timba, gamitin ang mga instruksiyon sa ibaba upang gumawa ng EDDTable FromFileNames dataset upang makita mo ang pamunuan ng directory ng timba na S3ERDDAP'"files"sistema.

1. Buksan ang Ulat ng IWS
    ERDDAP™gamitin ang[SDK NG WASJava](https://docs.aws.amazon.com/sdk-for-java/index.html)upang makakuha ng impormasyon sa timba mula sa AWS, kaya kailangan mong kumuha[lumikha at mag - udyok ng isang ulat ng WAS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). Iyan ay isang malaking trabaho, na maraming bagay na dapat matutuhan.
     
2. Ilagay ang Iyong AWS Credentials kung saanERDDAP™ay maaaring masumpungan ang mga ito.
Sundin ang mga tagubilin[Magtatag ng AWS Credentials and Region for Development](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)gayo'yERDDAP™  (Espesipiko, ang AWS SDK para saJava) ay mahahanap at magagamit ang iyong mga kredensiyal ng AWS. KungERDDAP™Hindi mo makita ang mga kredensiyal, makakakita ka ng isang
java.lang. Ilegal na ArgumentException: ang talaksang profile ay hindi maaaring maging null error saERDDAP's log.txt file.
    
Mungkahi para sa Linux at Mac OS: ang talaksan ng kredensiyal ay dapat na nasa home directory ng gumagamit na nagpapatakbo sa Tomcat (atERDDAP)   (para sa parapong ito, iaakala natin ang gumagamit na=tomcat) sa isang file na tinatawag na ~/.aws/credentials . Huwag ipalagay na ang ~ ay /home/tomcat -- aktuwal na gumamit ng cd ~ upang malaman kung saan ang operating system ay nag-iisip ng ~ para sa gumagamit na=tomat ay. Gumawa ng directory kung hindi ito umiiral. Gayundin, pagkatapos ninyong ilagay ang talaksang kredensiyal, tiyakin ang tagagamit at grupo para sa file ay tomcat at pagkatapos ay gumamit ng chmod 400 kredensiyal upang matiyak na ang file ay basahin-lamang para sa user=tomcat.
    
3. Gawing URL ang timba[formatin naERDDAP™kailangan](#accessing-files-in-an-aws-s3-bucket), e.g.,
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com), at (para sa pampublikong timba) Subukin ito sa isang browser upang matiyak na ito'y babalik sa isang dokumento ng XML na may bahagyang talaan ng nilalaman ng timba na iyon.
     
4. Gamitin[GenerateDatasetsXml](#generatedatasetsxml)upang lumikha ng isang[Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)datos:
    * Para sa Begint directory, gamitin ang total na ito:
        \\*\\*\\ *Mula sa Paalam,* iyongBucketUrl*
Halimbawa,
        \\*\\*\\* mula sa On theFly, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Pangalan ng talaksan na regex? .\\*
    * Muling Pag - opera? totoo
    * Muling pagkarga Bawat UNMinute? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * institusyon?NOAA
    * sumaryo? wala (ERDDAP™ay kusang lilikha ng isang disenteng sumaryo.) 
    * ang pangalan? wala (ERDDAP™ay kusang lilikha ng isang disenteng titulo.) Gaya ng dati, dapat mong isaayos ang resultang XML upang matiyak ang pagiging tama at gumawa ng mga pagsulong bago ang mga dataset na gumagamit nitodatasets.xml.
5. Kung susundin mo ang mga tagubilin sa itaas at ikarga ang datasetERDDAP, lumikha ka ng isang EDDTable FromFiles dataset. Bilang isang halimbawa, at upang gawing mas madali para sa sinuman na mag - browse at mag - download ng mga file mula sa mga timba ng AWS Open Data, nilikha namin ang EDDTable FromFileNames datasets (tingnan ang talaan sa
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) para sa halos lahat ng[Buksan ng AWS S3 ang mga balde ng Data](https://registry.opendata.aws/).
    \\[Ang ilang timba na hindi namin isinama ay may maraming file sa root directory (higit pa sa maaaring i - download sa makatuwirang haba ng panahon) , o huwag hayaang makapasok ang publiko (Hindi ba silang lahat ay dapat na maging hayagan?) , o kaya'y humihiling ng mga timba (e.g., Sentinel) .\\]  
Kung i - click mo ito"files"link para sa isa sa mga datasets na ito, maaari mong browse ang directory tree at files sa bucket na iyon ng S3. Dahil sa daan\\*\\*\\* from On TheFly EDDTable FromFiles works, ang mga talaang ito ng directory ay laging ganap na up-to-date dahilERDDAP™makuha ang mga ito on-the-fly. Kung itunugan mo ang puno ng directory sa aktuwal na pangalan ng talaksan at i- click ang pangalan ng talaksan,ERDDAP™ang iyong kahilingan sa AWS S3 upang mai - download mo ang file nang tuwiran mula sa AWS. Pagkatapos ay maaari mong suriin ang salansan na iyon.
    
Suliranin?
Kung ang iyong EDDTTable FromFiles ay hindi magkakargaERDDAP™  (o Mga DasDd) , Tingnan sa log.txt file para sa maling mensahe. Kung may makita ka
java.lang. Ilegal na ArgumentException: hindi maaaring maging pagkakamali ang talaksang profile, ang problema ay na ang AWS SDK para sa AWSJava  (ginamit niERDDAP) ay hindi nahahanap ang talaksan ng kredensiyal. Tingnan ang kredensiyal na mga tagubilin sa itaas.
     

Nakalulungkot na ang AWS ay hindi lamang nagpapahintulot sa mga tao na gumamit ng browser upang tingnan ang nilalaman ng isang pampublikong timba.

 **Kung gayon maaari kang gumawaERDDAP™mga dataset na nagbibigay sa mga gumagamit ng access sa data sa mga files.**   
Tingnan ang mga tagubilin[ERDDAP™at S3 Buckets](#erddap-and-aws-s3-buckets)  (sa itaas) .
Para sa sampol na EDDTable FromFileNames dataset na ginawa mo sa itaas, kung lalagyan mo ng kaunting pangalan ang directory at file sa directory tree, nagiging maliwanag na ang itaas na mga pangalan ng directory (e.g., ABI-L1b-RadC) katumbas ngERDDAP™ay tatawag ng hiwalay na mga dataset. Ang timba na ginagamit mo ay maaaring katulad nito. Pagkatapos ay maaari mong ipagpatuloy ang paglikha ng hiwalay na mga datasetsERDDAP™para sa bawat isa sa mga dataset na iyon, gamit ang e.g.,
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
bilang ang&lt;Hache Mula sa Url&gt;. Sa kasamaang palad, para sa partikular na halimbawang ito, ang mga dataset sa timba ay pawang waring may antas na 1 o may antas na 2 datasets, na siyang bumubuo sa 2 datasetsERDDAP™ [ay hindi gaanong mabuti](#dimensions), dahil ang dataset ay isang mas komplikadong kalipunan ng mga variable na gumagamit ng iba't ibang dimensiyon.
     
    
### Mga talaksang NcML{#ncml-files} 
Ang NcML files ay magpapahintulot sa iyo na magtakda ng mga pagbabago sa-the-fly tungo sa isa o higit pang orihinal na pinagmulanNetCDF  (v3 o v4)  .nc, .grib, .bufr, o.hdf  (v4 o v5) at pagkatapos ay mayroonERDDAP™gamutin.ncAng mga talaksang ml ang pinagmulang mga file.ERDDAP™Tatanggapin ng datasets.ncMga talaksang ml kailanma't isa.ncinaasahan ang mga file. Ang NcML files MUST ay may karugtong.ncml. Tingnan ang[UnidataDokumento ng NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). Ang NcML ay kapaki - pakinabang sapagkat magagawa mo ang ilang bagay rito (Halimbawa, gumagawa ng iba't ibang pagbabago sa iba't ibang salansan sa isang koleksiyon, pati na ang pagdaragdag ng dimensiyon na may espesipikong halaga sa isang file) , na hindi mo magagawaERDDAP'datasets.xml.

* Mga Pagbabago sa Isang.ncAng huling takdang oras ng talaksang ml ay magpapangyari na muling maikarga ang talaksan kailanma't muling ikarga ang dataset, subalit magbabago sa ilalim.ncang mga data file ay hindi tuwirang mapapansin.
* Mungkahi: NcML\\*ang mismong\\*sensitibo sa pagkakasunud-sunod ng ilang mga bagay sa talaksang NcML. Isipin ang NcML na nagtatakda ng isang serye ng mga instruksiyon ayon sa pagkakasunud - sunod, na may layuning baguhin ang mga source file (ang estado sa simula/itaas ng talaksang NcML) sa mga file ng destinasyon (ang estado sa dulo/botom ng talaksang NcML) .

Ang isang mapagpipilian sa NcML ay ang[NetCDFMga Operator (NCO) ](#netcdf-operators-nco). Ang malaking pagkakaiba ay na ang NcML ay isang sistema para sa paggawa ng mga pagbabago sa-the-fly (kaya ang mga talaksan ng pinagmulan ay hindi binago) , samantalangNCOay magagamit upang gumawa ng mga pagbabago (o mga bagong bersiyon ng) ang mga files. KapuwaNCOat ang NcML ay masyadong madaling makibagay at hinahayaan kang gumawa ng halos anumang pagbabago na maiisip mo sa mga file. Para sa inyong dalawa, maaaring maging hamon kung paano eksaktong gagawin ang gusto ninyong gawin -- tingnan ang web para sa mga katulad na halimbawa. Kapuwa ito kapaki - pakinabang na mga kasangkapan sa paghahanda ng netCDF atHDFmga file na gagamitinERDDAP, lalo na, upang gumawa ng mga pagbabago na higit pa sa anoERDDAP'May magagawa ang sistemang manipulasyon.

Halimbawa #1: Pagdaragdag ng Panahon na May Iisang Halaga
Narito ang isang.ncAng talaksang ml na lumilikha ng bagong panlabas na dimensiyon (panahon, na may 1 halaga: 1041379200) at idinagdag pa na ang dimensiyon sa pic variable sa file na may pangalang A2003001.L3m\\_EPIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Halimbawa #2: Pagbabago sa Kasalukuyang Halaga ng Panahon
Kung minsan ang pinagmumulan.ncAng talaksan ay mayroon nang sukat ng panahon at halaga ng panahon, subalit ang halaga ay mali (para sa iyong mga layunin) . Ito.ncAng talaksang ml ay nagsasabi: para sa talaksang datos na pinangalanang "198108252,30030-NCEI...", para sa dimensiyong variable"time", itakda ang mga yunit na attribute na 'seconds mula 1970-01-01T00:00:00Z' at itinakda ang halaga ng oras na 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFMga Operator (NCO)  {#netcdf-operators-nco} 
"Ang mga Operator ng netCDF (NCO) Binubuo ng isang dosenang standalone, command-line programs na kumukuha ng netCDF\\[v3 o v4\\],HDF \\[v4 o v5\\],\\[.grib, .bufr,\\]at/oDAPbilang input, pagkatapos ay magpatakbo (e.g., kumuha ng bagong datos, compute statistics, maglimbag, hyperslab, magmanipula ng metadata) at output Ang resulta sa screen o files sa teksto, binary, o netCDF formats.NCOay tumutulong sa pagsusuri ng magkakaugnay na siyentipikong impormasyon. Ang shell-utos na estilo ngNCOay nagpapahintulot sa mga gumagamit na kontrolin at suriin ang mga file interactively, o sa pamamagitan ng mga depressing scripts na iniiwasan ang ilang itaas ng mga mas mataas na-level programming kapaligiran." (mula sa[NCO](https://nco.sourceforge.net/)Pagguho ng tahanan) .

Isang mapagpipilianNCOay[NcML](#ncml-files). Ang malaking pagkakaiba ay na ang NcML ay isang sistema para sa paggawa ng mga pagbabago sa-the-fly (kaya ang mga talaksan ng pinagmulan ay hindi binago) , samantalangNCOay magagamit upang gumawa ng mga pagbabago (o mga bagong bersiyon ng) ang mga files. KapuwaNCOat ang NcML ay masyadong madaling makibagay at hinahayaan kang gumawa ng halos anumang pagbabago na maiisip mo sa mga file. Para sa inyong dalawa, maaaring maging hamon kung paano eksaktong gagawin ang gusto ninyong gawin -- tingnan ang web para sa mga katulad na halimbawa. Kapuwa ito kapaki - pakinabang na mga kasangkapan sa paghahanda ng netCDF atHDFmga file na gagamitinERDDAP, lalo na, upang gumawa ng mga pagbabago na higit pa sa anoERDDAP'May magagawa ang sistemang manipulasyon.

Halimbawa, magagamit moNCOupang gawin ang mga yunit ng panahon na pabagu - bago sa isang pangkat ng mga file kung saan ang mga ito ay hindi pabagu - bago sa orihinal. O, maaari mong gamitinNCOupang ikapitscale\\_factoratadd\\_offsetsa isang grupo ng mga file kung saanscale\\_factoratadd\\_offsetay may iba't ibang halaga sa iba't ibang source file.
 (O, maaari mo na ngayong harapin ang mga problemang iyonERDDAP™gagamitin[EDDGridMula sa mga Liwasang Hindi Nabuklat](#eddgridfromncfilesunpacked), na iba't ibaEDDGridMula sa NNcFiles na nag-i-upload ng datos at nagreresulta sa mga halaga ng oras sa mababang antas upang harapin ang mga talaksang pang-koleksiyon na may iba't ibang antasscale\\_factormga s atadd\\_offset, o iba't ibang yunit ng oras.) 

NCOay Malaya at Open Software na gumagamit ng[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)lisensiya.

Halimbawa #1: Ginagawang Hindi Pabagu - bago ang mga Unit
EDDGridMula sa mga Latian at Uso Iginiit ng From Files na ang mga yunit para sa isang ibinigay na variable ay magkatulad sa lahat ng mga files. Kung ang ilan sa mga file ay maliit lamang (hindi sa gamit) Naiiba sa iba (hal.g., yunit ng oras
"Mga segundo mula noong 1970-01-01 00:00:00 UTC" versus
"seconds since 1970-01-01T00:00:00Z", magagamit moNCO'[n](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). upang baguhin ang mga yunit sa lahat ng mga file upang maging magkatulad sa mga files
nco/ncled -a units,time,o,c,'seconds mula 1970-01-01T00:00:00Z' \\*.nc  
\\[Para sa maraming problemang gaya nito sa EDDTable From... Mga file dataset, magagamit mo na ngayon[Maging limitado Ano](#standardizewhat)upang magsumbongERDDAPupang gawing pamantayan ang mga source file habang ito ay binabasaERDDAP.\\]
    
### Mga Hangganan sa Laki ng Isang Daktura{#limits-to-the-size-of-a-dataset} 
Makikita mo ang maraming pagtukoy sa "2 bilyon" sa ibaba. Mas tumpak, iyan ay tumutukoy sa 2,147,483,647 (2^31-1) , na siyang sukdulang halaga ng isang 32-bit na nilagdaang integer. Halimbawa, sa ilang wika sa computerJava  (alinERDDAP™ay isinusulat sa) , iyan ang pinakamalaking uri ng datos na magagamit para sa maraming data istruktura (Halimbawa, ang laki ng isang hanay) .

Sa Pag - aayos ng mga Pamantayan (Halimbawa, para sa iba't ibang pangalan, mga pangalan ng attribute, String attribute values, at String data values) , ang pinakamaraming bilang ng mga karakter sa bawat StringERDDAP™ay ~2 bilyon. Subalit sa halos lahat ng kaso, magkakaroon ng maliliit o malalaking problema kung ang isang String ay lumampas sa makatuwirang laki (e.g., 80 karakter para sa iba't ibang pangalan at pangalan ng attribute, at 255 karakter para sa karamihan ng String attribute values at data values) . Halimbawa, ang mga web page na nagpapakita ng mahahabang variable na mga pangalan ay makaaasiwang malawak at mahabang iba't ibang mga pangalan ay irereregula kung ang mga ito ay lumampas sa limitasyon ng response file type.

Para sa nakatiklop na mga datos:

* Ang pinakamaraming bilangaxisVariableang ~2 bilyon.
Ang pinakamaraming bilangdataVariableang ~2 bilyon.
Subalit kung ang isang dataset ay may &gt;100 variables, mahirap itong gamitin ng mga gumagamit.
At kung ang isang dataset ay may &gt;1 milyong variables, ang iyong server ay mangangailangan ng maraming pisikal na memorya at magkakaroon ng iba pang problema.
* Ang pinakamataas na sukat ng bawat dimensiyon (axisVariable) ay ~2 bilyong halaga.
* Sa palagay ko ang pinakamaraming kabuuang bilang ng mga selula (produkto ng lahat ng dimensiyon) ay walang hangganan, ngunit maaaring ~9e18.

Para sa mga tabular datasets:

* Ang pinakamaraming bilangdataVariableang ~2 bilyon.
Subalit kung ang isang dataset ay may &gt;100 variables, mahirap itong gamitin ng mga gumagamit.
At kung ang isang dataset ay may &gt;1 milyong variables, ang iyong server ay mangangailangan ng maraming pisikal na memorya at magkakaroon ng iba pang problema.
* Ang pinakamaraming mapagkukunan (halimbawa, mga files) na maaaring igregated ay ~2 bilyon.
* Sa ilang kaso, ang pinakamaraming hanay mula sa indibiduwal na pinagmulan (Halimbawa, ang talaksan, ngunit hindi ang database) ay ~2 bilyong hanay.
* Sa palagay ko'y wala nang iba pang limitasyon.

Para sa kapuwa grid at tabular datasets, may ilang panloob na limitasyon sa laki ng subset na maaaring hilingin ng isang gumagamit sa isang kahilingan (ay kadalasang nauugnay sa &gt;2 bilyon ng isang bagay o ~9e18 ng isang bagay) , ngunit mas malamang na ang isang gumagamit ay tumama sa mga limitasyong file-type-specific.

*   NetCDFbersyon 3.ncAng mga file ay limitado sa 2GB byte. (Kung talagang problema ito sa isang tao, sabihin mo sa akin: Maaari akong magdagdag ng suporta para saNetCDFbersyon 3.nc64-bit na karugtong oNetCDFBersiyong 4, na lubhang magpapalawak sa limitasyon, subalit hindi naman lubusan.) 
* Ang mga browser ay bumabagsak pagkatapos lamang ng ~500MB ng datos, kayaERDDAP™takdaan ang pagtugon.htmlTableay humihiling ng ~400MB ng datos.
* Maraming programa sa pagsusuri ng datos ang may gayunding limitasyon (Halimbawa, ang pinakamalaking sukat ng isang dimensiyon ay kadalasang ~2 bilyong halaga) , kaya't walang dahilan upang magpagal upang malibot ang mga limitasyong file-type-specific.
* Ang mga limitasyong file-type-specific ay kapakipakinabang sa bagay na ang mga ito ay pumipigil sa mga walang muwang na kahilingan para sa tunay na napakalaking halaga ng datos (Halimbawa, "ibigay mo sa akin ang lahat ng dataset na ito" kapag ang dataset ay may 20TB ng datos) , na gugugol ng mga linggo o buwan upang mag-download. Mientras mas mahaba ang download, mas malamang na ito'y mabigo sa iba't ibang kadahilanan.
* Ang mga limitasyong file-type-specific ay kapakipakinabang sa bagay na pinipilit nila ang gumagamit na makitungo sa mga subset na may random-sized (Halimbawa, sa pamamagitan ng mga file na may data mula sa isang time point, may kinalaman sa isang malaking dataset na naka - grid) .
         
### Hudyatan ang ACDD-1.3{#switch-to-acdd-13} 
Kami (Partikular na[GenerateDatasetsXml](#generatedatasetsxml)) kasalukuyang inirerekomenda[bersyon ng ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), na pinagtibay noong unang bahagi ng 2015 at tinutukoy bilang "ACDD-1.3" sa global Conventions attribute. BagoERDDAP™bersyon 1.62 (inilabas noong Hunyo 2015) ,ERDDAP™ginamit/recommented ang orihinal, bersyon 1.0, ng[NetCDFAttribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)na tinukoy na "UnidataDataset Discovery v1.0" sa mga global Conventions atMetadata\\_Conventionsmga katangian.

Kung ang mga dataset mo ay gumagamit ng mga naunang bersyon ng ACDD, RECOMMEND na ipinapalit mo sa ACD-1.3. Hindi ito mahirap. Ang ACDD-1.3 ay labis na paatras na tumutugma sa bersyon 1.0. Upang magpalit, para sa lahat ng datasets (malibanEDDGridMula sa Erddap at Mapagkakatiwalaan Mula sa mga datos ng Erddap) :

1. Alisin ang bagong - tatag na globoMetadata\\_ConventionsMakipagkaibigan sa pamamagitan ng pagdaragdag (o sa pamamagitan ng pagbabago sa umiiralMetadata\\_Conventionsattribute)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
sa buong mundo ng dataset&lt;addAttributes&gt;.
     
2. Kung ang dataset ay may katangiang Kombensiyon sa buong daigdig&lt;addAttributes&gt;, baguhin ang lahat "UnidataDataset Discovery v1.0" Mga pagtukoy sa "ACDD-1.3".
Kung ang dataset ay walang isang kombensiyon na kabilang sa buong daigdig&lt;addAttributes&gt;, saka idagdag ang isa na tumutukoy sa ACDD-1.3. Halimbawa,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Kung ang dataset ay may pangglobong datasetstandard\\_name\\_vocabularyHalimbawa, ipagpalagay nang baguhin ninyo ang format ng halaga
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Kung ang tinutukoy ay isang mas matandang bersiyon ng[Pamantayang talaan ng pangalan ng CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). marahil isang mabuting ideya na bumaling sa kasalukuyang bersiyon (65, habang isinusulat namin ito) , dahil ang mga bagong pamantayang pangalan ay idinagdag sa mesang iyon na may kasunod na mga bersyon, ngunit ang mga lumang pamantayang pangalan ay bihirang alisin at hindi kailanman alisin.
     
4. Bagaman kabilang sa ACDD-1.0 ang mga katangiang global para sa ACDD-1.0creator\\_name,creator\\_email,creator\\_url,[GenerateDatasetsXml](#generatedatasetsxml)ay hindi awtomatikong idinagdag ito hanggang sa ilang panahonERDDAP™v1.50. Mahalagang impormasyon ito:
        
    *   creator\\_nameIpinaaalam sa mga gumagamit/pag-ibig ang manlilikha ng dataset.
    *   creator\\_emailay nagsasabi sa mga gumagamit ng mas gustong adres ng email para sa pakikipag-ugnayan sa maylikha ng dataset, halimbawa kung sila ay may mga tanong tungkol sa dataset.
    *   creator\\_urlay nagbibigay sa mga gumagamit ng paraan upang malaman ang higit pa tungkol sa maylikha.
    *   ERDDAP™ay gumagamit ng lahat ng impormasyong ito kapag gumagawa ng FGDC at ISO 19115-2/19139 na mga dokumentong metadata para sa bawat dataset. Ang mga dokumentong iyon ay kadalasang ginagamit ng panlabas na mga serbisyo sa paghahanap.
    
Pakisuyong idagdag ang mga katangiang ito sa pangglobong dataset&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Iyon ang sagot. Sana hindi naman ito napakahirap.
     
### Kumandante{#zarr} 
Bilang ng bersyon 2.25ERDDAP™ay marunong bumasa ng lokal Mga talaksang pangkalakal na ginagamit[Mapagkakatiwalaan Mula sa mga Latian](#eddtablefromncfiles)at[EDDGridMula sa mga Uso](#eddgridfromncfiles).

 (Noong Agosto 2019) Madali tayong magkamali, pero hindi pa tayo kumbinsido na[Kumandante](https://github.com/zarr-developers/zarr-python), o katulad na mga sistema na nahahati ang mga data file sa mas maliliit na tipak, ay malaking lunas sa problema ngERDDAP™nagbabasa ng impormasyong nakaimbak sa mga serbisyo ng ulap gaya ng Amazon AWS S3. Ang Zar ay isang malaking teknolohiya na nagpakita ng gamit nito sa iba't ibang kalagayan, hindi natin tiyak naERDDAP+S3 ang magiging isa sa mga sitwasyong iyon. Karaniwan nang sinasabi natin: bago tayo magmadaling gumawa ng pagsisikap na itago ang lahat ng ating impormasyon sa Zarr, gumawa tayo ng ilang pagsubok upang alamin kung ito nga ay mas mabuting solusyon.

Ang mga problema sa pagkuha ng impormasyon sa ulap ay hindi mabuti (ang lag upang makakuha muna ng datos) at akses ng talaksang-level (sa halip ng block-level access) . Nalulutas ni Zar ang problemang file-level access, ngunit walang ginagawa tungkol sa latency. Kumpara sa pag-download lamang ng file (upang ito ay mabasa bilang isang lokal na file na may block-level access) , maaari pa ngang palalain ni Zarr ang problema ng pagiging huli dahil, sa pagbasa ng isang file ngayon ay kasangkot ang serye ng ilang tawag upang basahin ang iba't ibang bahagi ng file (bawat isa na may sariling lag) . Ang problemang latency ay maaaring malutas sa pamamagitan ng pagpapantay-pantay ng mga kahilingan, ngunit iyan ay isang mas mataas na-level solution, hindi umaasa sa Zarr.

At kasama si Zar (na may kaugnay na mga database) , nawawala natin ang ginhawa ng pagkakaroon ng isang data file ay simple, nag-iisang file na madali mong matiyak ang integridad ng, o gumawa/download ng isang kopya.

ERDDAP™  (ng v2) ay may sistema para sa pagpapanatili ng isang lokal na imbakan ng mga file mula sa isang pinagmumulan ng URL (e.g., S3) ( Tingnan ang [&lt;Hache Mula sa Url&gt; at&lt;cacheMaxGB&gt;] (#cache simulaurl) ). At ang bago [&lt;[nThreads&gt;] (Mga #nthread) dapat na bawasan ang problema ng pagiging huli sa pamamagitan ng paghahambing sa impormasyong nakukuha sa mataas na antas.&lt;Ang cache FromUrl&gt; ay waring mabisa para sa maraming senaryo. (Hindi namin tiyak kung gaano kapaki - pakinabang&lt;Ang cThreads&gt; ay walang mga karagdagang pagsubok.) Inaamin namin na hindi kami nakagawa ng mga pagsubok sa panahon sa isang AWS na may mabuting koneksiyon sa network, subalit matagumpay naming nasubok ang iba't ibang liblib na pinagmumulan ng talaksan sa URL. AtERDDAP'&lt;Ang cache FromUrl&gt; ay gumagana sa anumang uri ng data file (e.g.,.nc,.hdf, .csv,.jsonlCSV) , kahit na kung panlabas na siksik (e.g.,.gz) , walang anumang pagbabago sa mga files (e.g., muling isulat ang mga ito bilang koleksiyon ni Zarr) .

Malamang na iba't ibang senaryo ang pabor sa iba't ibang solusyon, e.g., at minsan lamang ay kailangang basahin ang bahagi ng isang file (Magtatagumpay si Zar) , mga v. Kailangang basahin nang minsanan ang lahat ng isang file, vs. kailangan basahin nang paulit-ulit ang bahagi o lahat ng isang file (lahat ng isang file&lt;Ang cache FromUrl&gt; ay mananalo).

Karaniwan nang sinasabi natin: bago tayo magmadaling gumawa ng pagsisikap na itago ang lahat ng ating impormasyon sa Zarr, gumawa tayo ng ilang pagsubok upang alamin kung ito nga ay mas mabuting solusyon.

- - -
## Talaan ng mga Uri ng Data{#list-of-types-datasets} 
Kung kailangan mo ng tulong sa pagpili ng tamang uri ng dataset, tingnan ang[Pagpili ng Uri ng Dataset](#choosing-the-dataset-type).

Ang mga uri ng datasets ay nahahati sa dalawang kategorya. ([Bakit?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)Ang mga datasets ay humahawak ng mga naka-link na datos.
    * Sa loobEDDGriddatasets, data variables ang multi-dimensional na hanay ng datos.
    * MAY isang axis na iba - iba para sa bawat dimensiyon. Axis variables MUST ay itukoy ayon sa pagkakasunud-sunod na ang mga data variables ay gumagamit nito.
    * Sa loobEDDGriddatasets, lahat ng data variables MUST gamitin (makibahagi) lahat ng axis ay iba't iba.
         ([Bakit?](#why-just-two-basic-data-structures) [Paano kung hindi nila gawin iyon?](#dimensions)) 
    * Pinag - uriang Pamantayan - LahatEDDGridmga dataset, ang bawat dimensiyong MUST ay maaaring uriin (Pag - akyat o pagbaba) . Ang bawat isa ay maaaring maging iregular ang layo. Walang mga ugnayan. Ito ay isang kahilingan sa[Pamantayang CF metadata](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Kung ang mga halaga ng anumang dimensiyon ay hindi ayon sa pagkakasunud - sunod, ang dataset ay hindi ididiskarga at ang dataset ay hindi ididiskargaERDDAP™ay matutukoy ang unang di-nababababang halaga sa log file, *Malaking Direktoryo* /log/log.txt .
        
Ang ilang subclass ay may karagdagang mga pagbabawal (marahil,EDDGridAng AggregateExisting Dimension ay humihiling na ang panlabas (pinakakaliwa, una) na dimensiyon ay umakyat.
        
Ang mga hindi natukoy na dimensiyonal na halaga ay halos palaging nagpapahiwatig ng problema sa source dataset. Ito ay pinaka karaniwang nangyayari kapag ang isang mali ang pangalan o hindi angkop na talaksan ay kabilang sa agregasyon, na humahantong sa isang hindi natukoy na dimensiyon ng oras. Upang malutas ang problemang ito, tingnan ang maling mensahe saERDDAP™log.txt file upang mahanap ang hindi magandang halaga ng oras. Pagkatapos ay tingnan ang pinagkunang mga file upang hanapin ang katumbas na talaksan (o isa bago o isa pa) na hindi kabilang sa agregasyon.
        
    * Tingnan ang mas kumpletong paglalarawan sa[EDDGridmodelo ng datos](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * AngEDDGridAng mga uring datos ay:
        *   [EDDGridMula sa AudioFiles](#eddfromaudiofiles)Ang aggregates data mula sa isang grupo ng mga lokal na audio files.
        *   [EDDGridMula sa Dap](#eddgridfromdap)humahawak ng nakatiklop na impormasyon mula saDAPMga server.
        *   [EDDGridMapagkakatiwalaan](#eddgridfromeddtable)Hayaan mong gawing grided dataset ang isang tabular dataset.
        *   [EDDGridMula sa Erddap](#eddfromerddap)humahawak ng nakatiklop na impormasyon mula sa isang malayong lugarERDDAP.
        *   [EDDGridMula sa Estopo](#eddgridfrometopo)hawakan lamang ang naka-host na datos ng topograpiya.
        *   [EDDGridMula sa mga Labi](#eddgridfromfiles)ay superclass sa lahatEDDGridMula sa...Files classs.
        *   [EDDGridMula sa mga GamergeIRFile](#eddgridfrommergeirfiles)Ang aggregates data mula sa isang grupo ng lokal na MergeIR.gzmga file.
        *   [EDDGridMula sa mga Uso](#eddgridfromncfiles)Ang mga datos mula sa isang grupo ng mga tagaroonNetCDF  (v3 o v4)  .ncat kaugnay na mga file.
        *   [EDDGridMula sa mga Liwasang Hindi Nabuklat](#eddgridfromncfilesunpacked)naiiba kungEDDGridMula sa mga taga-NcFile na nagkokodigo rin ng mga datos mula sa isang grupo ng lokalNetCDF  (v3 o v4)  .ncat kaugnay na mga file, naERDDAP™ay nakabuklat sa mababang antas.
        *   [EDDGridLonPM180](#eddgridlonpm180)ang longhitud ng isang bataEDDGridupang sila ay nasa range-180 hanggang 180.
        *   [EDDGridLon0360](#eddgridlon0360)ang longhitud ng isang bataEDDGridupang ang mga ito ay nasa range 0 hanggang 360.
        *   [EDDGridSide Side Side](#eddgridsidebyside)Naghihiwalay ng dalawa o higit paEDDGridmagkatabing datos.
        *   [EDDGridPagdidisiplina](#eddgridaggregateexistingdimension)Naghihiwalay ng dalawa o higit paEDDGridang mga dataset, na ang bawat isa ay may iba't ibang mga halaga para sa unang dimensiyon, ngunit magkatulad na mga halaga para sa iba pang dimensiyon.
        *   [EDDGridKopya](#eddgridcopy)ay makagagawa ng isang lokal na kopya ng isa pang kopyaEDDGrid'Ang datos at nagsisilbi ng datos mula sa lokal na kopya.
             
    * LahatEDDGridSinusuporta ng mga dataset ang setting ng nThreads, na nagsasabiERDDAP™kung gaano karaming sinulid ang gagamitin kapag tumutugon sa isang kahilingan. Tingnan ang[Mga "nThread "](#nthreads)Mga dokumento para sa mga detalye.
         
### Mapagkakatiwalaan{#eddtable} 
*   [ **Mapagkakatiwalaan** ](#eddtable)Ang datasets ay humahawak ng tabular data.
    * Ang mga tabular data ay maaaring katawanin bilang isang database-tulad na mesa na may mga hanay at kolumna. Bawat kolum (iba't iba ang datos) ay may pangalan, kalipunan ng mga katangian, at nag - iimbak ng isa lamang uri ng impormasyon. Ang bawat hanay ay may obserbasyon (o grupo ng kaugnay na mga pamantayan) . Ang pinagkunan ng datos ay maaaring magkaroon ng datos sa ibang estruktura ng datos, mas komplikadong estruktura ng datos, at/o maramihang data files, ngunitERDDAP™Kailangang ma-secure ang source data sa isang database-tulad na mesa upang maiharap ang datos bilang tabular dataset sa mga gumagamit ng database-tulad ng tableERDDAP.
    * Tingnan ang mas kumpletong paglalarawan sa[EDDTable na modelong datos](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * Ang mga uri ng EDDTable dataset ay:
        *   [Mapagkakatiwalaan Buhat sa AllDatasets](#eddtablefromalldatasets)ay isang higher-level dataset na may impormasyon tungkol sa lahat ng iba pang datasets sa inyongERDDAP.
        *   [Mapagkakatiwalaan Buhat sa mga AsiciiFile](#eddtablefromasciifiles)Ang aggregates data mula sa mga comma-, tab-, semikolon-, o space-expressed tabular ASCII data files.
        *   [Mapagkakatiwalaan Mula sa AsiciiService](#eddtablefromasciiservice)ang superclass ng lahat ng EDDTable FromAsciiService... klase.
        *   [MAHIRAP SA MGA ASciiServiceNO](#eddtablefromasciiservicenos)humahawak ng datos mula sa ilanNOAAMga web service ng NOS.
        *   [Mga EDDTable Mula sa AudioFile](#eddfromaudiofiles)Ang aggregates data mula sa isang grupo ng mga lokal na audio files.
        *   [Maaasahan Mula sa Mga HawsXmlFile](#eddtablefromawsxmlfiles)Ang mga datos mula sa set ng Automatic Weather Station (MGA AW) XML files.
        *   [EDDTable Mula saCassandra](#eddtablefromcassandra)humawak ng tabular data mula sa isang mesa ng Cassandra.
        *   [Kawili - wili Mula sa mga Labi ngColumnarAscii](#eddtablefromcolumnarasciifiles)Ang aggregates data mula sa tabular ASCII data files na may nakapirmeng-width data column.
        *   [Mapagkakatiwalaan Mula sa Pagiging Mapagkakatiwalaan](#eddtablefromdapsequence)humahawak ng mga impormasyong taskular mula saDAPMga server ng pagkakasunud-sunod.
        *   [EDDTable Mula sa Didabasa](#eddtablefromdatabase)humahawak ng taskular na datos mula sa isang mesa ng database.
        *   [Maaasahan Mula saEDDGrid](#eddtablefromeddgrid)Pinalilikha mo ang isang EDDTable dataset mula sa isangEDDGriddatos.
        *   [Mapagkakatiwalaang Mula sarddap](#eddfromerddap)humahawak ng mga impormasyon mula sa isang malayong lugarERDDAP.
        *   [Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)Lumilikha ng dataset mula sa impormasyon tungkol sa isang grupo ng mga file sa sistemang server's file, ngunit hindi ito nagsisilbi ng datos mula sa loob ng mga file.
        *   [Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles)ang superclass ng lahat ng EDDTable From...Files classs.
        *   [NABAUTISAN NG EDDTTEGO](#eddtablefromhttpget)ayERDDAP'Ang tanging sistema para sa pag-angkat ng datos gayundin ang pagluwas ng datos.
        *   [Maaasahan Mula saHyraxMga Bunton](#eddtablefromhyraxfiles)  (PINAHAHALAGAHAN) Ang aggregates data mula sa mga files na may ilang variables na may kabahaging dimensiyon na pinaglilingkuran ng isang[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
        *   [Mapagkakatiwalaan Mula sa mga Di - pangkaraniwang CRAFile](#eddtablefrominvalidcrafiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .ncmga talaksan na gumagamit ng espesipiko, hindi tanggap, at iba't ibang uri ng CF DSG Contiguous Ragged Array (CRA) mga file. BagamanERDDAP™ay sumusuporta sa uring ito ng talaksan, ito ay isang hindi tanggap na uri ng talaksan na hindi dapat simulan ng sinuman na gamitin. Ang mga grupo na kasalukuyang gumagamit ng uring ito ng talaksan ay lubhang hinihimok na gamitinERDDAP™upang lumikha ng mga tanggap na talaksang CF DSG CRA at tumigil sa paggamit ng mga file na ito.
        *   [EDDTable Mula saJsonlCSVFiles](#eddtablefromjsonlcsvfiles)Inaalam ang mga impormasyon mula sa[JON Mga file ng Lines CSV](https://jsonlines.org/examples/).
        *   [Mga EDDTable Mula sa mga MultidimNcFile](#eddtablefrommultidimncfiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .ncang mga talaksan na may ilang mga variable na may kabahaging dimensiyon.
        *   [Mapagkakatiwalaan Mula sa mga Latian](#eddtablefromncfiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .ncang mga talaksan na may ilang mga variable na may kabahaging dimensiyon. Mainam na ipagpatuloy ang paggamit ng dataset type na ito para sa umiiral na datasets, ngunit para sa mga bagong datasets inirerekomenda namin gamit ang EDDTable FromMultimNcFiles sa halip.
        *   [Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .ncmga talaksan na gumagamit ng isa sa mga format ng talaksan na itinakda ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Mga kombensiyon. Subalit para sa mga file na gumagamit ng isa sa mga multidimensional na CF DSG variant, gamitin[Mga EDDTable Mula sa mga MultidimNcFile](#eddtablefrommultidimncfiles)sa halip.
        *   [Nakasusuyang mga Latian](#eddtablefromnccsvfiles)Inaalam ang mga impormasyon mula sa[NCSV](/docs/user/nccsv-1.00)ASCII .csv files.
        *   [MAHIRAP SA MGA DOTO](#eddtablefromnos)  (PINAHAHALAGAHAN) humawak ng tabular data mula sa NOS XML servers.
        *   [MAHABANG MGA ULOBIS](#eddtablefromobis)humawak ng tabular data mula sa OBIS servers.
        *   [Mapagkakatiwalaan Mula sa mga ParquetFile](#eddtablefromparquetfiles)humahawak ng datos mula sa[Parating](https://parquet.apache.org/).
        *   [Maaasahan Mula saSOS](#eddtablefromsos)humahawak ng mga impormasyong taskular mula saSOSMga server.
        *   [Mapagkakatiwalaang mga Talento](#eddtablefromthreddsfiles)  (PINAHAHALAGAHAN) Ang aggregates data mula sa mga files na may ilang variables na may kabahaging dimensiyon na pinaglilingkuran ng isang[MGA THEDDOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
        *   [Maaasahan Mula saWFSMga Bunton](#eddtablefromwfsfiles)  (PINAHAHALAGAHAN) ay gumagawa ng lokal na kopya ng lahat ng impormasyon mula sa isang kopyaArcGISMapserWFSserver upang ang data ay agad na mai-serveERDDAP™gumagamit.
        *   [EDDTableAggregateRows](#eddtableaggregaterows)ay maaaring gumawa ng isang EDDTable dataset mula sa isang grupo ng EDDTable datasets.
        *   [Mapagkakatiwalaang Komponiya](#eddtablecopy)ay maaaring gumawa ng isang lokal na kopya ng maraming mga uri ng EDDTable datasets at pagkatapos ay muling-serserve ang data agad mula sa lokal na kopya.

  
- - -

## Detalyadong Paglalarawan sa mga Uri ng Dataset{#detailed-descriptions-of-dataset-types} 

### EDDGridMula sa Dap{#eddgridfromdap} 
[ **EDDGridMula sa Dap** ](#eddgridfromdap)humahawak ng iba't ibang uri ng grid[DAP](https://www.opendap.org/)Mga server.

* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Puwede mong tipunin ang impormasyong kailangan mo para makagawa ng XML para sa isang XMLEDDGridMula sa datos ng Dap sa pamamagitan ng pagtingin sa mga file ng source dataset na DDS at DAS sa iyong browser (sa pagdaragdag ng .das at .dds sasourceUrl, halimbawa,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridMakakakuha ng datos ang FromDap mula sa anumang multi-dimensional variable mula sa isang multi-dimensional na variableDAPserver ng datos. (Dati,EDDGridAng FromDap ay limitado sa mga variable na itinalaga bilang "grid"'s, ngunit hindi na ito isang kahilingan.)   
     
* Pinag - uriang Pamantayan - Ang mga pamantayan para sa bawat dimensiyong MUST ay maaaring uriin ayon sa pagkakasunud - sunod (Pag - akyat o pagbaba) . Ang mga halaga ay maaaring maging iregular ang layo. Walang mga ugnayan. Ito ay isang kahilingan sa[Pamantayang CF metadata](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Kung ang mga halaga ng anumang dimensiyon ay hindi ayon sa pagkakasunud - sunod, ang dataset ay hindi ididiskarga at ang dataset ay hindi ididiskargaERDDAP™ay matutukoy ang unang di-nababababang halaga sa log file, *Malaking Direktoryo* /log/log.txt .
    
Ang mga hindi natukoy na dimensiyonal na halaga ay halos palaging nagpapahiwatig ng problema sa source dataset. Ito ay pinaka karaniwang nangyayari kapag ang isang mali ang pangalan o hindi angkop na talaksan ay kabilang sa agregasyon, na humahantong sa isang hindi natukoy na dimensiyon ng oras. Upang malutas ang problemang ito, tingnan ang maling mensahe saERDDAP™log.txt file upang mahanap ang hindi magandang halaga ng oras. Pagkatapos ay tingnan ang pinagkunang mga file upang hanapin ang katumbas na talaksan (o isa bago o isa pa) na hindi kabilang sa agregasyon.
    
#### EDDGridMula sa kalansay ng Dap XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridMapagkakatiwalaan{#eddgridfromeddtable} 
[ **EDDGridMapagkakatiwalaan** ](#eddgridfromeddtable)Pinahihintulutan mo ang isang EDDTable taskular dataset na maging isangEDDGridIdiin ang mga dataset. Tandaan naERDDAP™ang mga dataset bilang alinman[Nakatiklop na mga dataset (Mga subklase ngEDDGrid) o tabular datasets (Mga subklase ng EDDTable) ](#why-just-two-basic-data-structures).

* Karaniwan na, kung mayroon kang nakatiklop na impormasyon, basta gumagawa ka ng isang bagayEDDGridtuwirang datos. Halimbawa, kung minsan ay hindi ito posible kung ilalagay mo ang impormasyong nakaimbak sa isang kaugnay na databaseERDDAP™Makapapasok lamang sa pamamagitan ng EDDTable FromDatabase.EDDGridMula sa mapagkakatiwalaang klase ay hinahayaan kang lunasan ang kalagayang iyan.
     
* Maliwanag, ang impormasyon sa saligang EDDTable dataset ay dapat na (pangunahin nang) Idiin ang mga impormasyon, subalit sa anyong taskular. Halimbawa, ang EDDTable dataset ay maaaring may CTD data: mga sukat ng pasilangan at pahilagang agos, sa ilang kalaliman, nang ilang beses. Yamang pareho ang lalim sa bawat pagkakataon,EDDGridMula saEDDTable ay maaaring lumikha ng isang grided dataset na may isang panahon at isang lalim na dimensiyon na nag-access sa data sa pamamagitan ng saligang EDDTable dataset.
     
* Mga GenerateDataset Xml -- Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Maaari mong tipunin ang impormasyon na kailangan mo upang mapabuti ang mahirap na burador.
     
* Source Attributes -- Katulad ng lahat ng iba pang uri ng datos,EDDGridMula sa TNT ay may ideya na may pangglobong pinagmulang Attributes at[panggloboaddAttributes](#global-attributes)  (Itinakdadatasets.xml) , na pinagsama upang pagsamahin ang globo Attributes, na siyang nakikita ng mga gumagamit. Para sa mga pinagmumulan ng impormasyon,EDDGridMula sa mapagkakatiwalaang paggamit ang pinagsama - samang globo Attributes ng nakapailalim na EDDTable dataset. (Kung pag - iisipan mo ito nang sandali, makatuwiran ito.) 
    
Gayundin naman, para sa bawat isaaxisVariable' at 'dataVariable'[addAttributes](#addattributes),EDDGridMula saEDDTable ay ginagamit ang pinagsamang variable Attributes mula sa saligang EDDTable dataset bilang angEDDGridMula saEDDTable variable's source Attributes. (Kung pag - iisipan mo ito nang sandali, makatuwiran ito.) 
    
Bunga nito, kung ang EDDTable ay may mabuting metadata, ang EDDTableEDDGridKadalasan nang walang gaanong kailangan ang mga may - kabatiranaddAttributesmetadata - mangilan-ngilang tinggil lamang dito at doon.
    
*   dataVariables labanaxisVariable- Ang ilalim na EDDTable ay mayroon lamangdataVariables. IsaEDDGridMula saEDDTable dataset ay magkakaroon ng ilanaxisVariables (Nilikha mula sa ilan sa EDDTabledataVariables) at ang ilandataVariables (Nilikha mula sa natitirang EDDTabledataVariables) .[GenerateDatasetsXml](#generatedatasetsxml)ay gagawa ng paghula kung aling EDDTabledataVariabledapat maging sEDDGridMapagkakatiwalaanaxisVariable, ngunit ito ay isang hula lamang. Kailangan mong baguhin ang output ng GenerateDatasetsXml upang matiyak kung alin angdataVariablemagiging saxisVariables, at kung saan ang pagkakasunud - sunod.
     
* axisValues -- Walang masasabi tungkol sa nasa likod na EDDTableEDDGridAlamin ang posibleng mga pamantayan ngaxisVariablesa nakatiklop na bersiyon ng dataset, kaya ibinibigay ninyo ang impormasyong iyan sa bawat isaaxisVariablesa pamamagitan ng isa sa mga katangiang ito:
    
    * axisValues - kaya mong magtakda ng listahan ng mga pamantayan. Halimbawa,
        &lt;Pangalang= "axisValues"[type="DoubleList"](#attributetype)\\&gt;2, 2.5, 3, 3.5, 4&lt;/att&gt;
Pansinin ang paggamit ng isang[uri ng datos](#data-types)At ang salitang List. Gayundin, ang uri ng talaan (Halimbawa, doble) , TANGGAPin ang impormasyon Uri ng Pabagu - bago sa EDDTable atEDDGridMula saEDDETable datasets.
    * axisValuesStartStride - pinahihintulutan kang magtakda ng sunud - sunod na regular na mga pamantayan sa pamamagitan ng pagtatakda sa pasimula, hakbang, at paghinto sa mga pamantayan. Narito ang isang halimbawa na katumbas ng axisValues na halimbawa sa itaas:
        &lt;Pangalang= "axisValuesStartStride Stop"[type="DoubleList"](#attributetype)\\&gt;2, 0.5, 4&lt;/att&gt;
Muli, pansinin ang paggamit ng listahan ng mga uri ng datos. Gayundin, ang uri ng talaan (Halimbawa, doble) , TANGGAPin ang impormasyon Uri ng Pabagu - bago sa EDDTable atEDDGridMula saEDDETable datasets.
         
    
Mga Update -- Kung paanong walang daan para saEDDGridMula saEDDTable upang alamin ang axisValues mula sa EDDTable sa simula, wala ring maaasahang paraan para saEDDGridMula saEDDTable upang tiyakin mula sa EDDTable kapag ang axisValues ay nagbago (Lalo na, kapag may bagong mga pamantayan para sa panahon na iba - iba) . Sa kasalukuyan, ang tanging solusyon ay baguhin ang axisValues na nasadatasets.xmlat muling ikarga ang dataset. Halimbawa, maaari kang sumulat sa
    
    1. Paghahanapdatasets.xmlpara sa
        datasetID=" *ANGDatasetID* "
kaya ginagawa ninyo ang tamang dataset.
    2. Paghahanapdatasets.xmlsa susunod na pangyayari
        <sourceName> *AngVariablesSourceName* </sourceName>  
kaya ikaw ay gumagawa ng tamang variable.
    3. Paghahanapdatasets.xmlsa susunod na pangyayari
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
kaya alam mo ang simulang posisyon ng tag.
    4. Paghahanapdatasets.xmlsa susunod na pangyayari
```
        </att>  
```
Kaya alam mo ang posisyon ng axis.
    5. Palitan ang dating pasimula, hakbang, ihinto ang mga pagpapahalaga ng bagong mga pamantayan.
    6. Makipag - ugnayan[URL ng watawat](/docs/server-admin/additional-information#set-dataset-flag)para sa datos na sasabihinERDDAP™upang muling maikarga ang dataset.
    
Hindi ito huwaran, subalit mabisa ito.
     
* Oras -- KailanEDDGridMula sa naka-EDDTable na mga tugon sa kahilingan ng gumagamit para sa datos, ito ay naglilipat ng isang hanay ng datos mula sa EDDTable reaction table sa loob ng informationEDDGridsagot ng grid. Upang magawa ito, kailangan nitong malaman kung ang mga "axis" na halaga sa isang ibinigay na hanay sa mesa ay tumutugma sa ilang kombinasyon ng mga halaga ng axis sa grid. Para sa mga integer data type, madaling malaman kung ang dalawang halaga ay magkatumbas. Subalit para sa mga lumulutang at doble, ibinabangon nito ang nakatatakot na problema ng lumulutang na mga bilang ng puntos[hindi eksaktong katumbas](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (Halimbawa, 0.2 laban sa 0.1999999996) . Patungo sa (subukan) may kinalaman dito,EDDGridMula't - sapol ay maaari kang magtakda ng isang tiyak na katangian para sa alinman sa mga itoaxisVariables, na tumutukoy sa kabuuang bilang ng mga numerong yari sa numero ng numero na magkatulad.
    * Halimbawa,&lt;Hinango pangalan="precision" type="int"&gt;5&lt;/att&gt;
    * Para sa iba't ibang uri ng data variables, may iba't ibang default presensyang halaga. Ang mga default ay karaniwang angkop. Kung hindi, kailangan mong magtakda ng iba't ibang pamantayan.
    * SapagkataxisVariablemga katangian[panahon o panahon Iba't Ibang Uri ng Selyo](#timestamp-variables), ang default ay ganap ang prekwensiya (eksaktong posporo) .
    * SapagkataxisVariables na lumulutang, ang default presence ay 5.
    * SapagkataxisVariables na mga doble, ang default presence ay 9.
    * SapagkataxisVariablemga uri ng integer data,EDDGridMula saEDDTable ay ipagwalang - bahala ang prepekturang attribute at laging gumagamit ng buong prekwensiya (eksaktong posporo) .
         
    *    **BABALA&#33;** Kapag ginagawa ang isang piraso ng taskular data sa isang piraso ng nakatiklop na impormasyon, kung gayonEDDGridMula saEDDTable ay hindi makatugma ng isang EDDTable "axis" na halaga sa isa sa inaasahanEDDGridMahalagang axis,EDDGridMapagkakatiwalaan Nang Tahimik (walang error) Itapon ang datos mula sa hanay na iyon ng mesa. Halimbawa, maaaring may ibang datos (hindi sa grid) sa EDDTable dataset. (At kung Hakbang &gt; 1, hindi ito halataEDDGridMula sa TNT kung aling mga pagpapahalaga sa axis ang ninanais na mga pamantayan at alin ang dapat ihinto ng isa dahil sa hakbang.) Kaya, kung ang prekwensiyang mga halaga ay napakataas, makikita ng gumagamit ang nawawalang mga halaga sa pagtugon ng datos kapag ang mga tanggap na mga halaga ng datos ay aktuwal na umiiral.
        
Sa kabaligtaran, kung ang prekwensiyang mga halaga ay itinakda nang napakababa, EDDTable "axis" mga halaga na hindi dapat tumugmaEDDGridAng mga pamantayan ng axis na maaaring makuha ay makaaapekto sa (Maling Paggamit) makatugma.
        
Ang potensiyal na mga problemang ito ay kakila - kilabot, sapagkat nakukuha ng gumagamit ang maling impormasyon (o nawawalang mga pamantayan) kung kailan dapat nilang makuha ang tamang datos (o kaya'y maling mensahe) .
Hindi ito isang kapintasanEDDGridPosible.EDDGridHindi malutas ng MulaTable ang problemang ito. Ang problema ay likas sa pagbabago ng mga impormasyong tabular tungo sa nakatiklop na impormasyon (Kung hindi magagawa ang ibang palagay, ngunit hindi maaaring gawin dito) .
Nasa iyo, ang nasaERDDAP™administrador, sa **subukin ang iyongEDDGridLubusang Mapagkakatiwalaan** upang matiyak na ang eksaktong mga pamantayan ay itinakda upang maiwasan ang potensiyal na mga problemang ito.
        
#### Hawak ng mga gapThres{#gapthreshold} 
*   [Hawak ng mga gapThres](#gapthreshold)-- Ito ay isang napaka kakaibang uri ng dataset. Yamang ang mga uri ng queries na maaaring gawin (pinangangasiwaan ng) isang taonEDDGriddatos (kaugnay ng mga hanay at mga pagsulong ngaxisVariables) ay ibang - iba sa uri ng mgaquery na maaaring gawin (pinangangasiwaan ng) isang mapagkakatiwalaang dataset (may kaugnayan sa mga hanay ng iba't ibang bagay) , ang pagganap ngEDDGridMula saEDDTable datasets ay mag-iiba-iba depende sa eksaktong kahilingan na ginagawa at ang bilis ng saligang EDDTable dataset. Para sa mga kahilingan na may kaunting halaga &gt; 1,EDDGridMula saEDDTable ay maaaring magtanong sa saligang EDDTable para sa isang malaking bahagi ng impormasyon (na para bang ikaw ay may hakbang na=1) at pagkatapos ay salain ang mga resulta, pinananatili ang impormasyon mula sa ilang hanay at itinatapon ang impormasyon mula sa iba. Kung kailangan nitong salain ang maraming impormasyon upang makuha ang impormasyon na kailangan nito, ang kahilingan ay mas matagal na pupunan.
    
KungEDDGridMula saEDDTable ay makapagsasabi na magkakaroon ng malalaking puwang (na may mga hanay ng hindi naiibigang impormasyon) sa pagitan ng mga hanay na may ninanais na datos,EDDGridMula saEDDTable ay maaaring pumili na gumawa ng ilang mga subrequest tungo sa saligang EDDTable sa halip na isang malaking kahilingan, sa gayo'y nilalampasan ang hindi naiibigang hanay ng mga impormasyon sa malaking agwat. Ang sensitivity sa desisyong ito ay kinokontrol ng agwatThreshold na halaga gaya ng tinukoy sa&lt;Malawak na tag ng&gt; (default=1000 hanay ng source data) . Ang pagtatakda ng dipThreshold sa mas maliit na numero ay hahantong sa paggawa ng dataset (pangkalahatan) higit pang mga subrequest. Ang pagtatakda ng mga puwang na para sa isang mas malaking bilang ay hahantong sa paggawa ng dataset (pangkalahatan) Mas kaunting mga subrequest.
    
Kung ang gapThreshold ay masyadong maliit,EDDGridAng galing sa EDDTable ay tatakbo ng mas mabagal dahil ang ibabaw ng multiple requests ay magiging mas malaki kaysa sa oras na natipid sa pamamagitan ng pagkuha ng ilang sobrang datos. Kung masyadong malaki ang agwat ng sukat,EDDGridMula sa EDDTable ay tatakbo ng mas mabagal dahil ang napakaraming sobrang datos ay makukuha mula sa EDDTable, upang itapon lamang. (Gaya ng natuklasan ng Goldilocks, ang gitna ay "tama lamang".) Ang itaas para sa iba't ibang uri ng EDDTable datasets ay lubhang nagkakaiba - iba, kaya ang tanging paraan upang malaman ang aktuwal na pinakamabuting tagpo para sa iyong dataset ay sa pamamagitan ng pag - eeksperimento. Subalit hindi ka magkakamali sa pananatili sa default.
    
Ang isang simpleng halimbawa ay: Gunigunihin ang isang taoEDDGridMula sa isa lamangaxisVariable  (panahon, na may sukat na 100000) , isadataVariable  (temperatura) , at ang default gapThreshold ng 1000.
    
    * Kung ang gumagamit ay humihiling ng temperatura\\[0&#58;100&#58;5000\\], ang hakbang ay 100 kaya ang agwat na sukat ay 99, na mas mababa sa agwat na TThreshold. KayaEDDGridMula saTable ay gagawa ng isa lamang kahilingan sa EDDTable para sa lahat ng impormasyon na kinakailangan para sa kahilingan (katumbas ng temperatura\\[0:5000\\]) at itapon ang lahat ng hanay ng datos na hindi naman kailangan.
    * Kung ang gumagamit ay humihiling ng temperatura\\[0:2500:5000\\], ang hakbang na iyon ay 2500 kaya ang sukat ng puwang ay 2499, na mas malaki kaysa sa gapThreshold. KayaEDDGridMula sa TNT ay gagawa ng hiwalay na mga kahilingan sa EDDTable na katumbas ng temperatura\\[0\\], temperatura\\[2500\\], temperatura\\[5000\\].
    
Ang pagkalkula sa sukat ng puwang ay mas masalimuot kapag maraming palakol.
    
Sa bawat kahilingan ng gumagamit,EDDGridMula sa madaling - makuhang mga prints ay sinusuri ang mga mensahe na nauugnay rito sa[log.txt](/docs/server-admin/additional-information#log)talaksan.
    
    * Kung [&lt;logLevel&gt;] (#loglevel) sa loobdatasets.xmlay naglalagay ng info, inililimbag nito ang isang mensaheng gaya ng
\\* n=1 ng 4 nOuterRequests=22
Kung ang nOuterAxes=0, gapThreshold ay hindi nalampasan at isa lamang ang hihilingin sa EDDTable.
Kung ang mga nOuterAxes&gt;0, ang gapThreshold ay nalagpasan at ang mga nOuterRequest ay gagawin sa EDDTable, katumbas ng bawat hiniling na kombinasyon ng pinakakaliwang nOuterAxes. Halimbawa, kung ang dataset ay may 4axisVariablemga s atdataVariabletulad ng pasilangan\\[panahon\\]\\[latitud\\]\\[longhitud\\]\\[lalim\\], ang pinakakaliwa (una) Ang axis variable ay panahon.
    * Kung&lt;logLevel&gt; sa loobdatasets.xmlay nakatakda sa lahat, karagdagang impormasyon ang nakasulat sa log.txt file.
         
#### EDDGridMula sa mukhang - butong kalansay XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDD* Mula saERDDAP {#eddfromerddap} 
 **EDDGridMula sa Erddap** humahawak ng nakatiklop na impormasyon mula sa isang malayong lugarERDDAP™server.
 **Mapagkakatiwalaang Mula sarddap** humahawak ng mga impormasyon mula sa isang malayong lugarERDDAP™server.

*   EDDGridMula sa Erddap at EDDTable MulaErddap ay nag-aasal na magkaiba mula sa lahat ng iba pang mga uri ng datasets saERDDAP.
    * Tulad ng ibang uri ng datasets, ang mga dataset na ito ay kumukuha ng impormasyon tungkol sa dataset mula sa pinagmulan at iniingatan ito sa memorya.
    * Tulad ng ibang uri ng datos, kapagERDDAP™naghahanap ng mga dataset, nagtatanghal ng Data Access Form ( *datasetID* .html) , o pagtatanghal ng anyong Make A Graph ( *datasetID* .grap) ,ERDDAP™gamitin ang impormasyon tungkol sa dataset na nasa memorya.
    *   EDDGridMula sa Erddap at Mapagkakatiwalaan Mula sa Erddap ang saligan[Mga grid/clusters/federations](/docs/server-admin/scaling)ngERDDAPs, na mahusay na namamahagi ng paggamit ng CPU (karamihan ay para sa paggawa ng mga mapa) , paggamit ng memory, dataset storage, at bandwidth gamit ng isang malaking data center.
#### Pagreredirect{#redirect} 
* Hindi tulad ng ibang uri ng datos, kapagERDDAP™tatanggap ng kahilingan para sa datos o mga larawan mula sa mga dataset na ito,ERDDAP [Mga Direksiyon](https://en.wikipedia.org/wiki/URL_redirection)sa malayoERDDAP™server. Ang resulta ay:
    * Napakahusay nito (CPU, memorya, at bandwidth) , sapagkat kung hindi gayon
        1. Ang kabuuang elementoERDDAP™ay kailangang ipadala ang kahilingan sa isaERDDAP™  (na nangangailangan ng panahon) .
        2. Ang isa paERDDAP™kailangang kunin ang impormasyon, baguhin ito, at ihatid ang impormasyon sa elementoERDDAP.
        3. Ang kabuuang elementoERDDAP™kailangang tumanggap ng datos (gumagamit ng bandwidth) , repormahan ito (paggamit ng CPU at memorya) , at ihatid ang impormasyon sa gumagamit (gumagamit ng bandwidth) . Sa pamamagitan ng pagtutuwid sa kahilingan at pagpapahintulot sa isa paERDDAP™upang tuwirang ipadala ang tugon sa gumagamit, ang elementoERDDAP™ay gumugugol ng halos walang CPU panahon, memorya, o bandwidth sa kahilingan.
    * Ang paglilihis ay nakikita ng gumagamit anuman ang klienteng software (browser o iba pang software o command line tool) .
*   [Masasabi moERDDAP™](#redirect)huwag iwasto ang anumang kahilingan ng gumagamit sa pamamagitan ng pagtatakda&lt;Ituwid ang&gt; Mali&lt;/redirect&gt;, subalit inaalis nito ang karamihan ng mga bentaha ng ... FromErddap dataset type (Lalo na, ang pagkakalat ng pasan sa dulo sa unahanERDDAP™sa malayong/likodERDDAP) .
         
     
#### Mga Suskripsiyon{#subscriptions} 
Karaniwan na, kapag isangEDDGridMula sa Erddap at Mapagkakatiwalaan Mula sa Erddap ay (muli) Isakay ang iyong pasanERDDAP, sinisikap nilang magdagdag ng isang suskripsiyon sa remote dataset sa pamamagitan ng remoteERDDAP'ang email/URL subscription system. Sa gayong paraan, kailanma't nagbabago ang remote dataset, ang remoteERDDAP™makipag - ugnayan[set URL ng Bandila](/docs/server-admin/additional-information#set-dataset-flag)sa iyongERDDAP™Kung kaya't ang lokal na dataset ay muling ikarga sa ASAP at kaya ang lokal na dataset ay palaging perpektong up-to-date at ginagaya ang remote dataset. Kaya, sa unang pagkakataon na mangyari ito, dapat kang kumuha ng email na humihiling na patunayan mo ang suskrisyon. Gayunman, kung ang lokalERDDAP™hindi makapagpadala ng email o kung malayoERDDAP' s email/URL subscription system ay hindi aktibo, dapat i-mail mo ang remoteERDDAP™administrador at humiling na s/siya ay manu-manong magdagdag [&lt;onChange&gt;] (Pagpapalit ng #on) ...&lt;/onChange&gt; tag sa lahat ng kaugnay na datasets upang tawagin ang iyong dataset's[set Mga URL ng Bandila](/docs/server-admin/additional-information#set-dataset-flag). Tingnan moERDDAP™araw - araw na ulat para sa listahan ng setydaset Mga Flag URL, subalit basta ipadala ang mga itoEDDGridMula sa Erddap at EDDTable FromErddap datasets hanggang sa malayoERDDAP™Tagapangasiwa.
    
Hindi ba ito gumagana? Ang iyo bang lokal na mga dataset ay hindi nananatili na kasabay ng remote datasets?
Ilang mga bagay ang kailangang gumana nang maayos para gumana ang sistemang ito upang ang iyong mga datasets ay manatili up-to-date. Isa - isahin ang mga bagay na ito:
    
    1. Ang iyong sariliERDDAP™ay kailangang makapagpadala ng mga email. Tingnan ang email settings sa iyong setup.xml.
    2. Sa pangkalahatan (ngunit hindi laging) , ang iyongERDDAP'&lt;base Url&gt; at&lt;Walang port number ang baseHtpsUrl&gt; (e.g., :8080, :8443) . Kung gayon, gumamit ng isang[proxypas](/docs/server-admin/deploy-install#proxypass)upang alisin ang daungan mula sa Url.
    3. Sa iyong setup.xml,&lt;Ang kripto na TERemoteErddapDataset&gt; ay dapat na i-develop.
    4. Kapag ang inyong lokal na EDD... Mula sa Erddap dataset ay muling ikarga, ito ay dapat magpadala ng kahilingan sa remoteERDDAP™sa remote dataset. Tingnan sa log.txt upang makita kung ito ay nangyayari.
    5. Dapat kang kumuha ng email na humihiling sa iyo na patunayan ang kahilingan ng suskripsiyon.
    6. Dapat mong i - click ang link ng email na iyon para patunayan ang kahilingan ng suskripsiyon.
    7. Ang liblibERDDAP™dapat sabihin na ang bisa ay matagumpay. Anuman ang oras, maaari kang humiling ng email mula sa malayoERDDAP™na may listahan ng iyong mga suskripsiyon. Tingnan ang anyo sa *remoteErddapBase Url* /erddap/subscriptions/list.html .
    8. Kapag nagbago ang remote dataset (e.g., kumuha ng karagdagang datos) , ang liblibERDDAP™Dapat mong sikaping makipag - ugnayan sa flagURLERDDAP. Hindi mo ito matiyak, subalit maaari mong itanong sa administrador ng liblib na lugarERDDAP™upang suriin ito.
    9. Ang iyong sariliERDDAP™dapat tumanggap ng kahilingan na ilagay ang flagURL na iyon. Tingnan sa inyong log.txt para sa "setDatasetFlag.txt?" request (s) at tingnan kung may maling mensahe na nauugnay sa mga kahilingan.
    10. Ang iyong sariliERDDAP™Pagkatapos ay sikaping muling ikarga ang dataset (Marahil ay hindi kaagad, subalit ASAP) .
         
#### Up-to-date max (panahon) ?{#up-to-date-maxtime} 
EDDGrid/Table FromErddap datasets Ang kanilang nakaimbak na impormasyon tungkol sa bawat source dataset kapag ang source dataset["nakakarga"ed](#reloadeverynminutes)at ang ilang piraso ng pagbabago ng metadata (e.g., iba't ibang orasactual\\_range) , sa gayo'y lumilikha ng isang patalastas sa suskripsiyon. Kung ang source dataset ay may datos na madalas magbago (halimbawa, bagong datos sa bawat segundo) at gamitin ang["Supdate"](#updateeverynmillis)sistema upang mapansin ang madalas na mga pagbabago sa saligang impormasyon, angEDDGridAng /Table FromErddap ay hindi mapabatiran tungkol sa mga madalas na pagbabagong ito hanggang sa susunod na dataset na "reload", kaya't ang susunod na dataset "reload"EDDGridAng /Table FromErddap ay hindi ganap na up-to-date. Maaari mong bawasan ang problemang ito sa pamamagitan ng pagbabago ng source dataset's&lt;Muling ikarga ang EveryNMinutes&gt; sa mas maliit na halaga (60? 15?) upang magkaroon ng higit pang mga nota sa suskripsiyon upang sabihin saEDDGrid/Table FromErddap upang i-update ang impormasyon nito tungkol sa source dataset.

O, kung nalalaman ng iyong sistema ng pangangasiwa ng data kung kailan ang source dataset ay may bagong datos (e.g., sa pamamagitan ng isang iskrip na kumokopya sa isang talaksan ng datos na ilalagay) , at kung hindi naman masyadong madalas (e.g., tuwing 5 minuto, o mas madalang) , mayroong mas mabuting solusyon:

1. Huwag gamitin&lt;update EveryNMillis&gt; upang panatilihin ang source dataset up-to-date.
2. Itakda ang source dataset's&lt;Muling ikarga ang EveryNMinutes&gt; sa mas malaking bilang (1440?) .
3. Ipa - contact ang source dataset's[URL ng watawat](/docs/server-admin/additional-information#set-dataset-flag)Pagkatapos nito ay kinokopya ang isang bagong data file upang ilagay.
     

Iyan ay hahantong sa source dataset na ganap na up-to-date at ito ay magiging sanhi upang lumikha ng isang conscription notification, na ipadadala saEDDGrid/Table FromErddap dataset. Pangungunahan niyan angEDDGrid/Table FromErddap dataset upang maging ganap up-to-date (mabuti, sa loob ng 5 segundo ng bagong impormasyon na idinaragdag) . At lahat ng magagawa nang mahusay (walang kinakailangang dataset reload) .
     
#### HindiaddAttributes,axisVariable, odataVariable {#no-addattributes-axisvariable-or-datavariable} 
Hindi tulad ng ibang uri ng datossets, EDDTable FromErddap atEDDGridMula saErddap datasets ay hindi pinapayagan ang global&lt;addAttributes&gt;,&lt;axisVariable; o.&lt;dataVariablemga seksiyon sadatasets.xmlpara sa dataset na iyon. Ang problema ay na ang pagpapahintulot sa mga iyon ay hahantong sa mga pagkakasalungatan:
    
1. Sabihin natin na ito ay pinahintulutan at ikaw ay nagdagdag ng isang bagong pangglobong katangian.
2. Kapag tinanong ka ng isang gumagamitERDDAP™para sa pangglobong mga katangian, lilitaw ang bagong katangian.
3. Subalit kapag tinanong ka ng isang gumagamitERDDAP™para sa talaksang datos, ang inyongERDDAP™Itutungo ang kahilingan sa pinagmumulanERDDAP. IyanERDDAP™ay walang kaalam - alam sa bagong katangian. Kaya kung ito ay lumilikha ng data file na may metadata, e.g., a.ncfile, ang metadata ay hindi magkakaroon ng bagong attribute.

May dalawang work-round:

1. Kumbinsiya sa admin ng pinagmulanERDDAP™upang gawin ang mga pagbabago na nais mo sa metadata.
2. Sa halip ng EDDTable FromErddap, gamitin[Mapagkakatiwalaan Mula sa Pagiging Mapagkakatiwalaan](#eddtablefromdapsequence). O sa halip naEDDGridMula saErddap, gamitin[EDDGridMula sa Dap](#eddgridfromdap). Ang mga uring iyon ng EDD ay nagpapangyari sa iyo na mabisang maiugnay sa isang dataset sa isang malayong lugarERDDAP™  (ngunit hindi inireredirect ang mga kahilingan ng datos) at hinahayaan nila na isama mo ang pangglobo&lt;addAttributes&gt;,&lt;axisVariable; o.&lt;dataVariablemga seksiyon sadatasets.xml. Ang isa pang pagkakaiba: kakailanganin mong manu - manong isumite ang remote dataset, upang ang dataset sa iyong datasetERDDAP™ay ipagbibigay - alam (sa pamamagitan ng[URL ng watawat](/docs/server-admin/additional-information#set-dataset-flag)) kapag may mga pagbabago sa remote dataset. Kaya, lumilikha ka ng isang bagong dataset, sa halip na mag - ugnay sa isang malayong dataset.
         
#### Iba pang nota{#other-notes} 
* Sa mga kadahilanang panseguridad,EDDGridMula sa Erddap at Mapagkakatiwalaan Mula saErddap ay huwag suportahan ang [&lt;Makarating sa&gt;] (Ang #accessible) tag at hindi maaaring gamitin sa pamamagitan ng mga remote datasets na nangangailangan ng pagtotroso (dahil ginagamit nila [&lt;Makarating sa&gt;] (Ang #accessible) ). TingnanERDDAP'[sistemang panseguridad](/docs/server-admin/additional-information#security)dahil sa paghihigpit sa ilang datasets sa ilang gumagamit nito.
     
* Pasimula saERDDAP™v2.10,EDDGridSinusuportahan ng MulaErddap at EDDTable FromErddap ang [&lt;Madaling puntahan [[Talaksan] (Mgafile ng #accessiblevia) tag. Hindi tulad ng ibang uri ng datasets, ang default ay totoo, ngunit ang mga file ng dataset ay magiging madaling makuhangViaFiles lamang kung ang source dataset ay mayroon ding source dataset&lt;Ang availableViaFiles&gt; ay natupad.
     
* Magagamit mo ang[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gawin angdatasets.xmlPara sa ganitong uri ng dataset. Subalit madali mong magagawa ang mga uring ito ng dataset sa pamamagitan ng kamay.
     
#### EDDGridMula sa kalansay ngErddap XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridMula sa kalansay ngErddap Ang XML dataset ay napakasimple, sapagkat ang layon ay gayahin lamang ang malayong dataset na angkop na gamitinERDDAP:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### Malambot Mula sa Erddap na kalansay XML{#eddtablefromerddap-skeleton-xml} 
* Ang kalansay na XML para sa isang EDDTable FromErddap dataset ay napakasimple, sapagkat ang layon ay gayahin lamang ang malayong dataset, na angkop nang gamitinERDDAP:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridMula sa Estopo{#eddgridfrometopo} 
[ **EDDGridMula sa Estopo** ](#eddgridfrometopo)Isilbi lamang ang[ETOPO1 Global 1-Minute Gridded Delection Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, grid rehistrado, binaryo, 2byte int: etopo1\\_ice\\_g\\_i2.zip) na ipinamamahagiERDDAP.

* Dalawa lamangdatasetIDsuportado ang mga symbolic linkEDDGridMulaEtopo, upang makuha mo ang impormasyon na may longhitudng mga pamantayan -180 hanggang 180, o longhitúd na mga halaga 0 hanggang 360.
* Walang anumang sub tag, yamang ang impormasyon ay inilarawan na sa loobERDDAP.
* Kaya ang dalawang opsyonEDDGridMula sa Etopo datasets ay (literal) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridMula sa mga Labi{#eddgridfromfiles} 
[ **EDDGridMula sa mga Labi** ](#eddgridfromfiles)ay superclass sa lahatEDDGridMula sa...Files classs. Hindi mo magagamitEDDGridMula sa mgaFile ay direkta. Sa halip, gumamit ng subclass ofEDDGridMula sa mga tulay upang pangasiwaan ang espisipikong uri ng talaksan:

*   [EDDGridMula sa mga GamergeIRFile](#eddgridfrommergeirfiles)humahawak ng mga impormasyon mula sa mga grid[MALUNGKOT.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)mga file.
*   [EDDGridMula sa AudioFiles](#eddfromaudiofiles)Ang aggregates data mula sa isang grupo ng mga lokal na audio files.
*   [EDDGridMula sa mga Uso](#eddgridfromncfiles)humahawak ng mga impormasyon mula sa mga grid[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)mga talaksan,[HDF  (v4 o v5)  .hdf](https://www.hdfgroup.org/)mga talaksan,[.ncml](#ncml-files)mga talaksan, at[NetCDF  (v3 o v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)mga file. Maaaring gumana ito sa iba pang uri ng talaksan (Halimbawa, BUFR) , basta hindi namin sinubukan -- pakisuyong padalhan kami ng ilang sampol na file kung interesado kayo.
*   [EDDGridMula sa mga Liwasang Hindi Nabuklat](#eddgridfromncfilesunpacked)ay iba't ibaEDDGridMga Mula sa NNcFile na humahawak ng mga impormasyon mula sa pagkakawing - kawingNetCDF  (v3 o v4)  .ncat kaugnay na mga file, naERDDAP™ay nakabuklat sa mababang antas.

Sa kasalukuyan, walang ibang uri ng talaksan ang suportado. Subalit karaniwan nang madaling magdagdag ng suporta para sa ibang uri ng talaksan. Makipag - ugnayan sa amin kung mayroon kang kahilingan. O, kung ang iyong data ay nasa isang lumang file format na nais mong alisin, inirerekomenda namin na ikumberte ang mga fileNetCDFv3.ncmga file.NetCDFay isang malawak na suportado, binary format, nagpapahintulot ng mabilis na pag-akses sa datos, at suportado na ngERDDAP.

#### Mula sa mga Detalye{#from-files-details} 
Ang sumusunod na impormasyon ay kumakapit sa lahat ng mga subklase ngEDDGridMula sa mgaFile.

##### Ang Pagpapalaganap ng Umiiral na Dimensiyon{#aggregation-of-an-existing-dimension} 
Lahat ng pagkakaiba - ibaEDDGridMula saFiles ay maaaring i-gregate ang datos mula sa mga lokal na file, kung saan ang bawat file ay may 1 (o higit pa) iba't ibang pamantayan para sa kaliwa (una) sukat, karaniwan\\[panahon\\], na magiging agregado. Halimbawa, maaaring ang sukat ay\\[panahon\\]\\[altitud\\]\\[latitud\\]\\[longhitud\\], at ang mga file ay maaaring may datos para sa isa (o ilan) time value (s) bawat file. Ang resultang dataset ay lumilitaw na para bang ang lahat ng data ng file ay pinagsama. Ang malalaking bentaha ng aggregasyon ay:

* Ang laki ng aggregated data set ay maaaring mas malaki pa sa isang file ay maaaring maging maginhawa (~2GB) .
* Para sa halos-real-time data, madaling idagdag ang bagong file sa pinakabagong score ng datos. Hindi mo na kailangang isulat muli ang buong dataset.

Ang mga kahilingan para sa agregasyon ay:
* Ang lokal na mga file ay hindi kailangang magkaroon ng parehodataVariables (na itinakda sa dataset'sdatasets.xml) . Ang dataset ay magkakaroon ngdataVariablekahulugan sadatasets.xml. Kung ang ibinigay na talaksan ay walang ibinigaydataVariable,ERDDAP™ay magdaragdag ng nawawalang mga pamantayan kung kinakailangan.
* Lahat ng itodataVariableGumamit din ngaxisVariableMga s/dimension (na itinakda sa dataset'sdatasets.xml) . Ang mga file ay magiging aggregated batay sa una (kaliwa-karamihan) Ang dimensiyon, na inuuri ayon sa pagkakasunud - sunod.
* Ang bawat file ay maaaring may datos para sa isa o higit pang halaga ng unang dimensiyon, ngunit hindi maaaring magkaroon ng anumang pagsasanib sa pagitan ng mga file. Kung ang isang file ay may higit sa isang halaga para sa unang dimensiyon, ang mga halaga MUST ay ibukud-tangi ayon sa pagkakasunud-sunod, na walang mga ugnayan.
* Ang lahat ng mga files MUST ay may eksaktong parehong halaga para sa lahat ng iba pang dimensiyon. Ang prekwensiya ng pagsubok ay tinitiyak ng[mga palito sa posporo](#matchaxisndigits).
* Ang lahat ng talaksang MUST ay pare - pareho ang dami[mga yunit](#units)metadata para sa lahataxisVariablemga s atdataVariables. Kung ito ay isang problema, maaari mong gamitin[NcML](#ncml-files)o[NCO](#netcdf-operators-nco)upang lutasin ang problema.
         
##### Agregasyon sa Pamamagitan ng File Names o Pangglobong Metadata{#aggregation-via-file-names-or-global-metadata} 
Lahat ng pagkakaiba - ibaEDDGridMaaari ring i-gregate ng mga taga-File ang isang grupo ng mga file sa pamamagitan ng pagdaragdag ng bagong kaliwa (una) Ang dimensiyon, karaniwan na ang oras, batay sa halaga na nakukuha mula sa bawat file o sa halaga ng isang global attribute na nasa bawat file. Halimbawa, maaaring isama sa file ang time value para sa data sa file.ERDDAP™Pagkatapos ay lilikha ng isang bagong sukat ng panahon.

Hindi tulad ng katulad na katangian sa THEDDS,ERDDAP™laging lumilikha ng isangaxisVariablena may mga pamantayang numero (na hinihiling ng CF) , huwag kailanman mag - iwan ng mga pamantayan (na hindi pinahihintulutan ng CF) . Gayundin,ERDDAP™ang mga file sa aggregation batay sa numeroaxisVariableAng halaga na inilalagay sa bawat file, upang ang axis variable ay laging magbukud - bukod ng mga halaga gaya ng kinakailangan ng CF. Ang THEDDS na paraan ng paggawa ng isang uri ng lexicographic batay sa mga pangalan ng file ay humahantong sa mga agregasyon kung saan ang mga pagpapahalaga sa axis ay hindi inuuri (na hindi pinahihintulutan ng CF) kapag ang pangalan ng talaksan ay iba - iba ang pagkakasunud - sunod kaysa hinangoaxisVariablemga pamantayan.

Upang magtatag ng isa sa mga agregasyong itoERDDAP™, bibigyan mo ng kahulugan ang isang bagong kaliwa (una)  [axisVariable](#axisvariable)na may espesyal, huwad&lt;sourceName&gt;, na nagsasabiERDDAP™kung saan at paano hahanapin ang halaga para sa bagong dimensiyon mula sa bawat file.

* Ang format para sa huwadsourceNamena nakukuha ang halaga mula sa pangalan (pangalan lamang.) ay
    \\*\\*\\ *fileName,* [datos Uri](#data-types) *,* regex ng katas *,* bihag na GroupNumber*
* Ang format para sa huwadsourceNamena nakukuha ang halaga mula sa absolutong pangalan ng path ng talaksan
    \\*\\*\\ *PathName,* [datos Uri](#data-types) *,* regex ng katas *,* bihag na GroupNumber*
    \\[Para rito, ang pangalan ng landas ay laging ginagamit'/'bilang directory separator character, hindi kailanman '\'.\\]
* Ang format para sa huwadsourceNamena nakukuha ang halaga mula sa isang pangglobong katangian
    \\*\\*\\ *pangglobo:* attribute Pangalan *,* [datos Uri](#data-types) *,* regex ng katas *,* bihag na GroupNumber*
* Ito'y huwadsourceNameAng opsyon ay naiiba sa iba: sa halip na lumikha ng isang bagong kaliwa (una)  axisVariable, ito ang pumapalit sa halaga ng agosaxisVariablena may halagang hinango mula sa pangalan (pangalan lamang.) . Ang format ay
    \\*\\*\\ *Palitan Mula saFileName,* [datos Uri](#data-types) *,* regex ng katas *,* bihag na GroupNumber*
     

Ang paglalarawan sa mga bahaging kailangan mong ibigay ay:

*    *attribute Pangalan* - pangalan ng global attribute na nasa bawat file at naglalaman ng dimensiyong halaga.
*    *datos Uri* -- Binabanggit nito ang uri ng datos na gagamitin upang itago ang mga halaga. Tingnan ang listahan ng mga pamantayan[datos Mga Uri](#data-types)yaon pangERDDAP™mga suporta, maliban na lamang sa ang String ay hindi pinapayagan dito mula noong ang axis variables inERDDAP™ay hindi maaaring String variables.
    
May karagdagang pseudo dataType, timeFormat= *string Panahon ng Pagpapaliban - liban* , na nagsasabiERDDAP™na ang halaga ay isang String timestamp[mga pisi](#string-time-units). Kadalasan, ang stripTimFormat na kailangan mo ay ang iba't ibang format nito:
    
    *   yyyy-MM-dd'T'H:mm:s.SSSZ -- na ISO 8601:2004 (E) format ng oras ng petsa. Baka kailanganin mo ang pinaikling bersiyon nito, e.g.,yyyy-MM-dd'T'H:mm:ss oyyyy-MM-dd.
    * yyyyMddHHHmms.SS- na siyang siksik na bersyon ng ISO 8601 date time formation. Maaaring kailanganin mo ang pinaikling bersyon nito, e.g., yyyMdHHHms o yyyyMd.
    * M/d/yay H:mm:s.S -- na siyang pinaikling format ng petsa sa Estados Unidos. Maaaring kailanganin mo ang pinaikling bersyon nito, e.g., M/d/yyy .
    * yyyyDDHHmsS - na taon din bukod sa zero-padded na araw ng taon (e.g, 001 = Jan 1, 365 = Dis 31 sa isang non-leap year; ito kung minsan ay may kamaliang tinatawag na Julian date) . Maaaring kailanganin mo ang pinaikling bersyon nito, e.g., yyyDDDD .
    
Kung gagamitin mo ang pseudo dataType na ito, idagdag ito sa bagong variable's&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Kung nais mong baguhin ang lahat ng halaga ng panahon, baguhin ang halaga ng panahon sa mga yunit, e.g.,
1970-01-01T12:00:00Z.
*    *regex ng katas* -- Ito ang[Palagiang pagpapahayag](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([pagtuturo](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) na kinabibilangan ng grupong binibihag (sa mga panaklong) na naglalarawan kung paano kukunin ang halaga mula sa pangalan o pangglobong halaga ng attribute. Halimbawa, bigyan ng pangalan tulad ng S19980011998031.L3b\\_MO\\_CHL.nc, hulihin ang grupo #1, "\\dpagtuturo", sa regular na pananalitang S (\\dpagtuturo) \\dpagtuturo\\.L3b.\\* kukunin ang unang 7 digit pagkatapos ng 'S': 1998001.
*    *Binibihag na "GroupNumber "* -- Ito ang bilang ng grupong binibihag (sa loob ng isang pares ng panaklong) sa regular na pananalita na naglalaman ng impormasyon ng interes. Ito ay karaniwang 1, ang unang pangkat na nakahuli. Kung minsan ay kailangan mong gamitin ang mga grupong bumibihag para sa ibang gamit sa regex, kaya kung gayon ang mahalagang numero ng grupo na paghuli ay 2 (ikalawang grupo na nahuli) o 3 (ikatlo) , atbp.

Isang buong halimbawa ng isangaxisVariablena gumagawa ng aggregated dataset na may bagong axis na kumukuha ng mga halaga ng panahon mula sa talaksan ng bawat file
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Kapag ginagamit mo ang "time Format=" pseudo data Uri,ERDDAP™2 katangian saaxisVariableNa ano pa't sila'y nagsisilitaw na mula sa bukal:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Kaya sa kasong ito,ERDDAP™lilikha ng bagong axis na pinanganlang"time"may dobleng pamantayan (mga segundo simula 1970-01-01T00:00:00Z) Sa pamamagitan ng pagkuha ng 7 digits pagkatapos ng 'S' at bago ng ".L3m" sa distribution at pagpapakahulugan sa mga ito bilang time values form ay tinipi bilang yyyDDD.

Maaari mong daigin ang default base time (1970-01-01T00:00:00Z) sa pamamagitan ng pagdaragdag ng[idagdag ang Attribute](#addattributes)na nagsasabi ng iba't ibang yunit na may iba't ibang panahon. Ang karaniwang kalagayan ay: may mga grupo ng data file, na bawat isa'y may 1 araw na kalipunan ng satellite dataset, kung saan nais mong ang halaga ng panahon ay maging tanghali ng araw na binanggit sa talaan ng impormasyon (sentro ng bawat araw) at nais ng variablelong\\_nameupang maging "Centered Time". Ang isang halimbawa nito ay:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Note hours=12 in the base time, na nagdaragdag ng 12 oras na may kaugnayan sa orihinal na base time ng 1970-01-01T00:00:00Z.

Isang buong halimbawa ng isangaxisVariablena gumagawa sa isang aggregated dataset na may bagong "run" axis (ng mga pamantayan) na nakukuha ang run values mula sa "runID" na global attribute sa bawat file (na may mga pamantayang gaya ng "r17\\_global", kung saan 17 ang tumatakbong numero) ay
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Pansinin ang paggamit ng grupong bihag bilang 2 upang makuha ang mga digit na nangyayari pagkatapos ng 'r' o 's', at bago ang "\\_global". Ipinakikita rin ng halimbawang ito kung paano magdaragdag ng karagdagang mga katangian (e.g.,ioos\\_categoryat mga yunit) sa axis ay iba - iba.
     
#### Mga Bulaang Hindi Pa Nabubulok{#externally-compressed-files} 
* Mga datos na mga subset ngEDDGridMula sa mga Latian at Uso Mula saFiles ay maaaring magsilbi ng datos nang tuwiran mula sa panlabas na siksik na mga data file, pati na.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, at .Z files.
     
*    **Nakapagtataka na ito'y mabisa&#33;**   
Sa karamihan ng mga kaso, ang mabagal na pagbabaybay na may kaugnayan sa decompressing maliit at medium-sized data files ay menor de edad. Kung kailangan mong ingatan ang disk space, hinihimok namin ang paggamit ng bahaging ito, lalo na para sa mas lumang mga file na bihirang makita.
     
*    **Mag - ipon ng pera&#33;**   
Ito ang isa sa iilang bahagi saERDDAP™na nagbibigay sa iyo ng pagkakataon na makapag - ipon ng maraming pera (bagaman sa halaga ng bahagyang nabawasang paggawa) . Kung ang proporsiyon ng compression ay e.g., 6:1 (Kung minsan ay mas mataas pa ito) , pagkatapos ang dataset's data files ay mangangailangan lamang ng 1/6 ang disk space. Kung gayon marahil ay makadaraan ka na may 1 RAID (ng isang takdang laki) sa halip na 6 RAIDS (ng gayunding laki) . Napakalaking halaga nito. Sana, ang kakayahang i - compress ang ilang file sa koleksiyon (ang mga nakatatanda?) at hindi kompisuhin ang iba (ang mas bago?) , at baguhin iyan sa anumang oras, bawasan natin ang ilalim ng salansan sa pagsisiksik ng ilan sa mga files (mas mabagal na daanan) . At kung ang pagpipilian ay sa pagitan ng pag - iimbak ng mga file sa tape (at makukuha lamang kung hihilingin, pagkatapos ng pagkaantala) Ang mga v na nag - iimbak ng mga ito ay siksik sa RAID (at mararating sa pamamagitan ngERDDAP) , kung gayon ay may malaking bentaha sa paggamit ng compression upang ang mga gumagamit nito ay maging interactive at (relatibo) Madaling makuha ang datos. At kung maililigtas ka nito sa pagbili ng karagdagang RAID, ang bahaging ito ay makapagliligtas sa iyo ng halos $30,000.
     
* Para sa lahatEDDGridMula sa mga subclass ngFile, kung ang mga data file ay may extension na nagpapahiwatig na ang mga ito ay panlabas na siksik na mga file (kasalukuyang:.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, o .Z) ,ERDDAP™ang mga file sa cache directory ng dataset kapag binasa ito (kung wala pa sila sa cache) . Totoo rin ito sa talaksang binary (e.g.,.nc) Mga subklase ng EDDTable FromFiles.
     
* Para sa EDDTable FromFiles subclass para sa mga non-binary files (e.g., .csv) , data files na may extension na nagpapakitang ang mga ito ay panlabas na compressed files ay i-compressed sa-the-fly habang ang file ay binabasa.
     
* PAGTANGGAP: Kung ang uri ng panlabas na siksik na talaksan ay ginamit (e.g.,.tgzo.zip) ang higit sa 1 file sa loob ng compressed file, ang compressed file ay dapat maglaman lamang ng 1 file.
     
* REQUREMENT: Ipinapalagay ng bahaging ito na ang nilalaman ng panlabas na mga talaksang siniksik ay hindi nagbabago, upang magamit muli ang isang naka - cached decompressed file. Kung ang ilan o lahat ng dataset's data files ay binabago kung minsan, huwag i - compress ang mga file na iyon. Kasuwato ito ng karaniwang gamit, yamang ang mga tao ay hindi normal na naglalagay ng compress file na kung minsan ay kailangan nilang baguhin.
     
*   &lt;fileNameRegex&gt; Upang magawa ang gawaing ito, ang dataset's&lt;Ang fileNameRegex&gt; ay dapat na tumugma sa mga linked files' na pangalan. Maliwanag, ang mga regexes tulad ng .\\*ang lahat ng pangalan ng talaksan. Kung bibigyan mo ng espesipikong uri ng talaksan, e.g., .\\*\\.nc, kung gayon ay kailangan mong baguhin ang regex upang isama rin ang extension extension, e.g., .\\ *\\.nc\\.gz(kung lahat ng files ay magiging* bagay na*.nc.gzmga talaksan) .
     
* Mainam kung ang inyong dataset ay may halong siksik at hindi siksik na mga file. Maaaring kapaki - pakinabang ito kung naniniwala kang may ilang file (e.g., mas lumang talaksan) ay hindi gaanong gagamitin at samakatuwid ay magagamit upang makatipid ng disk space sa pamamagitan ng pagsisiksik sa mga ito. Upang magawa ito, ang&lt;Ang talaksang NanameRegex&gt; ay dapat tumugma sa siksik at hindi siksik na mga pangalan ng talaksan, e.g., .\\*o .\\*\\.nc (|\\.gz) ( Kung saan ang grupong bihag sa dulo ng panahong iyan ay nagsasabi na.gzay opsyonal.
     
* Mainam kung iipit mo o i - decompress ang espesipikong mga file sa koleksiyon anumang oras.
Kung ang dataset ay hindi gumagamit [&lt;update EveryNMillis&gt;] (Mga #update offenmilli) , itakda ang dataset's[bandila](/docs/server-admin/additional-information#flag)upang magsumbongERDDAP™upang muling maikarga ang dataset at sa gayo'y mapansin ang mga pagbabago. Kapansin - pansin, maaari kang gumamit ng iba't ibang algorithm sa compression at setting para sa iba't ibang file sa iisang dataset (e.g.,.bz2para sa mga talaksang bihirang gamitin,.gzsapagkat hindi madalas gamitin ang mga file, at walang compression para sa madalas gamiting files) , tiyakin lamang na ang regex ay sumusuporta sa lahat ng mga extension ng talaksan na ginagamit, e.g., .\\*\\=\\\.nc (|\\.gz|\\.bz2) .
     
* Mangyari pa, ang mga tumbasan at tulin ng iba't ibang algorithm sa compression ay iba - iba sa source file at setting (e.g., antas ng compression) . Kung nais mong gawin ang sistemang ito para sa iyong mga salansan, subukin ang iba't ibang paraan ng compression sa pamamagitan ng iyong mga file at ng iba't ibang compression setting. Kung nais mo ng tiyak na kabutihan (hindi laging ang pinakamabuti) setup, irirekomenda namin nang bahagyagzip  (.gz) .gziphindi ginagawa ang pinakamaliit na siksik na talaksan (Makatuwirang malapit) , ngunit napakabilis nitong i - compress ang file at (mas mahalaga para saERDDAP™gumagamit) ay napakabilis na iniangat ang salansan. Bukod dito,gzipAng software ay may pamantayan sa bawat pag-install ng Linux at Mac OS at madaling makukuha para sa Windows sa pamamagitan ng mga libreng kagamitan tulad ng 7Zip at Linux add-ons tulad ng Git Bash. Halimbawa, i - compress ang source file sa source file.gzbersyon ng talaksan (gayunding pangalan, subalit may.gzIniapela) , gamitin (sa Linux, Mac OS, at Git Bash)   
    gzip  *sourceName*   
Pagpapababa sa Isang?.gzilagay pabalik sa orihinal, gamitin
gunzip *sourceName.gz*   
Upang masiksik ang bawat talaksan ng pinagmulan sa directory at ang mga subdirectories nito, muling gamitin,
    gzip-r *direktor na Naname*   
Pagpapababa sa bawat isa sa.gzang mga files sa directory at ang subdirectories nito , revisively, gamitin
gunzip -r *direktor na Naname*   
     
* BABALA: Huwag kang mag - compress (gzip) mga talaksan na siksik na sa loob&#33;
Maraming files na ang nag-siksik ng datos sa loob. Kung ikawgzipAng mga file na ito, ang mga resultang files ay hindi magiging mas maliit (&lt;5%) atERDDAP™ay mag - aaksaya ng panahon sa pag - aaksaya sa kanila kapag kailangan nitong basahin ang mga ito. Halimbawa:
    
    * talaksang datos: e.g.,.nc4, at.hdf5 talaksan: Ang ilang file ay gumagamit ng internal compression; ang ilan ay hindi. Kung paano sasabihin: Ang mga siksik na variable ay may mga katangiang "\\_Chunks". Gayundin, kung isang grupo ng mga griddd.nco.hdfAng mga talaksan ay iba't iba ang laki, ang mga ito ay malamang na siksik sa loob. Kung ang mga ito ay pare - pareho ang laki, ang mga ito ay hindi panloob na siksik.
    * Mga talaksan ng larawan: e.g., .gif, .jpg, at .png
    * Mga audio file: e.g., .mp3, at .g.
    * Mga talaksang video: e.g., .mp4, .ogv, at .webm.
    
        
Isang kapus - palad na pambihirang kaso: .wav audio files ay napakalaki at hindi panloob na siksik. Magandang ipunin (gzip) ang mga ito, subalit karaniwan nang hindi mo dapat gawin ito sapagkat kung gagawin mo ito, hindi matutugtog ng mga gumagamit nito ang siksik na mga file sa kanilang browser.
     
* Kaso ng Pagsubok: Pagsiksik (kasamagzip) isang dataset na may 1523 grid.ncmga file.
    
    * Ang datos sa mga source file ay kakaunti (maraming nawawalang pamantayan) .
    * Kabuuang disk space ay mula 57 GB bago ang compression sa 7 GB pagkatapos.
    * Ang kahilingan para sa maraming impormasyon mula sa 1 time point ay&lt;1 s bago at pagkatapos ng compression.
    * Paghingi ng 1 puntos ng datos para sa 365 time points (pinakamalubhang kalagayan) ay mula 4 s hanggang 71 s.
         
    
Para sa akin iyan ay isang random na trade-off para sa anumang dataset, at tiyak para sa datos na bihirang gamitin.
     
* Internasyunal na Kompusyon --
Kung ihahambing sa panloob na file compression na iniaalok ng.nc4 at.hdf5 files,ERDDAPAng pamamaraan para sa panlabas na siksik na mga file ay may mga bentaha at disbentaha. Ang disbentaha ay: minsang mabasa ang maliit na bahagi ng isang file, ang panloob na compression ay mas mabuti sapagkatEDDGridAng mga FromFile ay nangangailangan lamang ng kaunting decompress (s) ng file, hindi ang buong file. SubalitERDDAPAng pamamaraan ay may ilang bentaha:
    
    *   ERDDAP™ay sumusuporta sa lahat ng uri ng data file (binaryo at di-binaryo, e.g.,.nc3 at .csv) hindi lamang.nc4 at.hdf4.
    * Kung ang kalakhang bahagi ng isang file ay kailangang basahin nang mahigit sa isang beses sa loob ng maikling panahon, kung gayon ay nakatitipid ito ng panahon upang i - decompress ang salansan nang minsan at basahin ito nang maraming ulit. Nangyayari itoERDDAP™kapag ang isang gumagamit ay gumagamit ng Make-A-Graph para sa dataset at gumagawa ng isang serye ng maliliit na pagbabago sa grap.
    * Ang kakayahan na magkaroon ng siksik na mga file at hindi siksik na mga file sa iisang koleksiyon, ay nagpapangyari sa iyo na magkaroon ng higit na kontrol kung aling mga file ang siksik at alin ang hindi. At ang karagdagang kontrol na ito ay hindi talaga binabago ang source file (yamang maaari mong i - compress ang isang file sa e.g.,.gzat pagkatapos ay i - decompress ito upang makuha ang orihinal na talaksan) .
    * Ang kakayahang magbago anumang oras kung ang ibinigay na file ay siksik at kung paano ito siksik (iba't ibang algorithm at setting) ay nagbibigay sa iyo ng higit na kontrol sa pagsasagawa ng sistema. At madali mong makukuhang muli ang orihinal na talaksang hindi nakokompressed anumang oras.
    
Bagaman ang alinman sa mga pamamaraan ay hindi isang tagumpay sa lahat ng kalagayan, maliwanag naERDDAPDahil sa kakayahan nitong i - serialize ang impormasyon mula sa panlabas na mga file, ang panlabas na compression ay nagiging makatuwirang alternatibo sa internal compression na iniaalok ng outer compression.nc4 at.hdf5. Kapansin - pansin iyan dahil ang internal compression ang isa sa pangunahing dahilan kung bakit pinipiling gamitin ng mga tao.nc4 at.hdf5.
     
##### Dumaranas ng Panlulumo{#decompressed-cache} 
ERDDAP™gumagawa ng decompressed na bersiyon ng anumang siksik na binary (e.g.,.nc) data file kapag kailangan basahin ang file. Ang mga decompressed file ay nakatago sa directory ng dataset sa loob *Malaking Direktoryo* /decompressed/ . Ang mga decompressed file na hindi pa nagamit kamakailan ay aalisin sa espasyo kapag ang bolyum ng talaksan ay &gt;10GB. Maaari mo itong baguhin sa pamamagitan ng pagtatakda&lt;decompressedCachemaxGB&gt; (default=10) sa mga datos Xml.xml, e.g.,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Gayundin, ang mga decompressed file na hindi ginamit sa huling 15 minuto ay aalisin sa simula ng bawat malaking dataset reload. Maaari mo itong baguhin sa pamamagitan ng pagtatakda&lt;decompressedCachumaxMinutes Lumang&gt; (default=15) sa mga datos Xml.xml, e.g.,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Mas maraming numero ang maganda, subalit ang pinagsama - samang laki ng mga decompressed file ay maaaring maging sanhi ng *Malaking Direktoryo* na maubusan ng disk space, na nagiging sanhi ng malulubhang problema.
     
* Sapagkat ang decompressing ng isang file ay maaaring kumuha ng malaking panahon (0.1 hanggang 10 segundo) , ang mga dataset na may mga talaksang siksik ay maaaring makinabang sa pagtatakda ng mga dataset's [&lt;[nThreads&gt;] (Mga #nthread) pagtatakda sa mas mataas na bilang (2? 3? 4?) . Ang mga disbentaha sa mas mataas na bilang (e.g., 5? 6? 7?) ang umuunting mga pakinabang at na ang kahilingan ng isang gumagamit ay maaaring gumamit ng mataas na porsiyento ng yaman ng sistema, sa gayo'y lubhang nagpapabagal sa pagpoproseso ng mga kahilingan ng ibang gumagamit. Kaya, walang huwarang setting ng nThreads, iba't ibang mga resulta lamang sa iba't ibang mga sitwasyon na may iba't ibang mga setting.
         
#### May Iba't Ibang Pamantayan{#sorted-dimension-values} 
Ang mga pamantayan para sa bawat dimensiyong MUST ay maaaring uriin ayon sa pagkakasunud - sunod (Pag - akyat o pagbaba, maliban sa una (kaliwa-karamihan) sukat na kailangang umakyat) . Ang mga halaga ay maaaring maging iregular ang layo. Walang anumang ugnayan. Ito ay isang kahilingan sa[Pamantayang CF metadata](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Kung ang mga halaga ng anumang dimensiyon ay hindi ayon sa pagkakasunud - sunod, ang dataset ay hindi ididiskarga at ang dataset ay hindi ididiskargaERDDAP™ay matutukoy ang unang di-nababababang halaga sa log file, *Malaking Direktoryo* /log/log.txt .
    
Ang mga hindi natukoy na dimensiyonal na halaga ay halos palaging nagpapahiwatig ng problema sa source dataset. Ito ay pinaka karaniwang nangyayari kapag ang isang mali ang pangalan o hindi angkop na talaksan ay kabilang sa agregasyon, na humahantong sa isang hindi natukoy na dimensiyon ng oras. Upang malutas ang problemang ito, tingnan ang maling mensahe saERDDAP™log.txt file upang mahanap ang hindi magandang halaga ng oras. Pagkatapos ay tingnan ang pinagkunang mga file upang hanapin ang katumbas na talaksan (o isa bago o isa pa) na hindi kabilang sa agregasyon.
    
#### Mga Direktor{#directories} 
Ang mga file ay maaaring nasa isang directory, o nasa directory at mga subdirectory nito (Paulit - ulit) . Kung maraming files (Halimbawa, &gt;1,000) , ang operating system (at sa gayonEDDGridMula sa mga Labi) mas mahusay na tatakbo kung iimbak mo ang mga file sa isang serye ng mga subdirectory (sa bawat taon, o isa sa bawat buwan para sa mga dataset na may napakadalas na mga file) , kung kaya't hindi nagkaroon ng napakaraming files sa isang ibinigay na directory.
     
#### &lt;Hache Mula sa Url&gt;{#cachefromurl} 
LahatEDDGridAng mga FromFile at lahat ng EDDTable FromFiles datasets ay sumusuporta sa isang set ng mga tag na nagsasabi ngERDDAP™upang makuha at mapanatili ang isang kopya ng lahat ng remote dataset's files, o isang cache ng ilang file (nadownload kung kinakailangan) . Ito'y totoong kapaki - pakinabang. Tingnan ang[cache Mga Dokumento Mula sa Urol](#cachefromurl).
    
#### Mga Direktoryo at HTTP Range Kahilingan{#remote-directories-and-http-range-requests} 
 (AKA Byte Service, Byte Range Requests, Accept-Rangeshttpheader)   
EDDGridMula sa NNcFiles, EDDTable FromMultidimNcFiles, EDDTable FromNcFiles, at EDDTable FromNcCFFililes, can *Kung minsan* server ang datos mula sa.ncmga file sa remote servers at access sa pamamagitan ng HTTP kung ang server ay sumusuporta[Paglilingkod Nang Byte](https://en.wikipedia.org/wiki/Byte_serving)sa pamamagitan ng HTTP range requests (ang mekanismo ng HTTP para sa byte na nagsisilbi) . Posible ito dahil netcdf-java (alinERDDAP™mga gamit upang basahin.ncmga talaksan) ay umaalalay sa pagbasa ng datos mula sa malayo.ncmga file sa pamamagitan ng HTTP range requests.

 **Huwag mong gawin ito&#33;** Ito'y lubhang di - mabisa at mabagal.
Sa halip, gamitin ang [&lt;Hache Mula sa sistemang&gt;] (#cache simulaurl) .

PagkakamitERDDAP™datos bilang files sa pamamagitan ng byte range requests --
Ibabad ito, kung maaari (sa teoriya) isipin ang isang dataset saERDDAP™bilang isang higante.ncng talaksan sa pamamagitan ng pag-apending ".nc" sa paanan ng OPenDAPURL para sa ibinigay na datos (e.g., https://myserver.org/erddap/griddap/datasetID.nc at gayundin sa pagdaragdag ng isang ?query pagkatapos niyan upang magtakda ng isang subset) , marahil makatuwirang itanong kung magagamit mo ang netcdf-java,Ferret, o iba paNetCDFsoftware ng kliyente para magbasa ng datos sa pamamagitan ng Mga Kahilingan ng HTTP RangeERDDAP. Ang sagot ay hindi, sapagkat wala naman talagang napakalaki ".nc" talaksan. Kung nais mong gawin ito, sa halip ay gawin ang isa sa mga mapagpipiliang ito:

* Gamitin(OPeN)DAPAng client software upang makipag-ugnayan sa mga serbisyo ng griddap na inaalok ngERDDAP. Iyan ang dahilanDAP  (at sa gayonERDDAP) ay dinisenyo para rito. Napakahusay nito.
* O, i-download ang source file (s) mula sa"files"sistema (o isang subset file sa pamamagitan ng isang.nc? tanong) sa iyong computer at gumamit ka ng netcdf-java,Ferret, o iba paNetCDFAng kliyenteng software upang basahin ang (ngayon) lokal na talaksan (s) .
         
#### Tinanggal na Impormasyon ng File{#cached-file-information} 
Kapag IsangEDDGridMula saFiles dataset ay nakakarga muna,EDDGridAng mga FromFile ay nagbabasa ng impormasyon mula sa lahat ng mga kaugnay na file at lumilikha ng mga talahanayan (isang hanay sa bawat file) na may impormasyon tungkol sa bawat tanggap na talaksan at bawat "masama" (iba o hindi tanggap) talaksan.
* Ang mga mesa ay iniimbak din sa disk, gaya ngNetCDFv3.ncipinasok sa talaksan *Malaking Direktoryo* /dataset/ *Huling2CharsofDatasetID* / *datasetID* / sa mga talaksang ipinangalan:
DirTable.nc  (na may listahan ng natatanging mga pangalan ng directory) ,
talaksan Talaan.nc  (na humahawak sa mesa ng bawat tanggap na impormasyon ng talaksan) ,
Masamang Uso.nc  (na humahawak sa mesa ng bawat masamang impormasyon ng talaksan) .
* Upang pabilisin ang pagpasok sa isangEDDGridMula sa Filipinas na dataset (ngunit sa kapinsalaan ng paggamit ng higit pang memorya) , magagamit mo
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
upang magsumbongERDDAP™upang tandaan ang isang kopya ng talaan ng impormasyon.
* Ang kopya ng file information tables sa disk ay kapaki-pakinabang din kapagERDDAP™ay sinasarhan at muling isiningit: ito'y nagliligtasEDDGridMula sa mgaFile mula sa kinakailangang muling basahin ang lahat ng data files.
* Kapag ini-reload muli ang dataset,ERDDAP™kailangan lamang basahin ang datos sa mga bagong file at file na nagbago na.
* Kung ang isang file ay may kakaibang istraktura mula sa iba pang files (halimbawa, ibang uri ng datos para sa isa sa mga variable, o ibang halaga para sa "[mga yunit](#units)" attribute) ,ERDDAPidagdag ang file sa listahan ng mga "masamang" files. Ang impormasyon tungkol sa problema sa talaksan ay isusulat sa *Malaking Direktoryo* /log/log.txt file.
* Hindi mo na kailangan pang mag - alis o gumawa sa mga file na ito. Ang isang eksepsiyon ay: kung gumagawa ka pa ng mga pagbabago sa dataset'sdatasets.xmlsetup, baka gusto mong alisin ang mga file na ito upang ma-pwersaERDDAP™upang muling basahin ang lahat ng mga files dahil ang mga files ay babasahin/binibigkas nang iba-iba. Kung kailangan mong alisin ang mga file na ito, magagawa mo ito kapagERDDAP™ay tumatakbo. (Pagkatapos ay magtakda ng[bandila](/docs/server-admin/additional-information#set-dataset-flag)upang muling maikarga ang dataset ASAP.) Gayunman,ERDDAP™karaniwang napapansin na angdatasets.xmlhindi tumutugma ang impormasyon sa talaksan Talaan ng impormasyon at i-delets ang mga talahanayan ng talaksan nang kusa.
* Kung nais mong magpatibay - loobERDDAP™upang i-update ang nakaimbak na dataset na impormasyon (Halimbawa, kung basta daragdagan, aalisin, o papalitan mo ang ilang file sa dataset's data directory) , gamitin ang[sistema ng bandila](/docs/server-admin/additional-information#flag)lakasERDDAP™upang i - update ang impormasyong nasa loob ng talaksan.
         
#### Pagharap sa mga Kahilingan{#handling-requests} 
Kapag pinoproseso ang kahilingan ng kliyente para sa impormasyon,EDDGridMula saFiles ay maaaring mabilis na tumingin sa mesa na may tanggap na impormasyon ng file upang makita kung aling files ang may hiniling na data.
     
#### Pag - alam sa Kapsiyon ng File Information{#updating-the-cached-file-information} 
Kailanma't ang dataset ay muling ididiskarga, ang impormasyong nasa loob ng talaksan ay ina - update.
    
* Ang dataset ay muling idinidiskarga sa pana - panahon gaya ng tinitiyak ng&lt;Muling ikarga ang EveryNMinutes&gt; sa dataset's information sadatasets.xml.
* Ang dataset ay muling idinidiskarga sa lalong madaling panahon hangga't maaariERDDAP™na iyong idinagdag, inalis,[Ang touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (upang palitan ang huli ng talaksan Binagong panahon) , o nagpalit ng datafile.
* Ang dataset ay muling ikarga sa lalong madaling panahon kung gagamitin mo ang dataset[sistema ng bandila](/docs/server-admin/additional-information#flag).

Kapag muling nadiskarga ang dataset,ERDDAP™ihambing ang kasalukuyang makukuhang mga files sa may cached file information tables. Ang mga bagong file ay binabasa at idinaragdag sa mga tanggap na file table. Ang mga talaksan na hindi na umiiral ay ibinababa mula sa tanggap na mga file table. Ang mga talaksan kung saan nagbago na ang file timestamp ay binabasa at ang kanilang impormasyon ay inaapruba. Ang mga bagong talahanayan ay pinapalitan ang mga lumang talahanayan sa memorya at sa disk.
     
#### Masasamang Bunton{#bad-files} 
Ang mesa ng mga sirang file at ang mga dahilan kung bakit ang mga file ay ipinahayag na masama (sirang talaksan, nawawalang variables, atbp.) ay ipinadadala sa email Lahat Sa adres ng email (malamang na ikaw) Sa tuwing muling ididiskarga ang dataset. Dapat mong palitan o kumpunihin agad ang mga file na ito.
     
#### Nawawalang mga Kasangkapan{#missing-variables} 
Kung ang ilan sa mga file ay walang ilan sadataVariablekatuturan sa dataset'sdatasets.xmlOkay lang. KailanEDDGridMula saFiles ay mababasa ang isa sa mga files na iyon, ito ay kikilos na parang ang file ay may variable, ngunit may lahat ng nawawalang mga halaga.
     
#### Kaguluhan ng FTP/Advice{#ftp-troubleadvice} 
Kung ikaw ay magbibigay ng bagong mga data file saERDDAP™server habangERDDAP™tumatakbo, may tsansa naERDDAP™ay muling magkarga ng dataset sa panahon ng proseso ng FTP. Mas madalas itong mangyari kaysa sa inaakala mo&#33; Kapag nangyari ito, lilitaw na tanggap ang talaksan (may tanggap na pangalan) , ngunit hindi pa mabisa ang talaksan. KungERDDAP™ay sumusubok na basahin ang datos mula sa hindi tanggap na talaksang iyon, ang resultang error ay magpapangyari sa talaksan na idagdag sa mesa ng hindi tanggap na mga file. Hindi ito mabuti. Upang maiwasan ang problemang ito, gumamit ng temporary file kapag ang FTP'ing the file, halimbawa, ABC2005.nc\\_TEMP . Pagkatapos, ang fileNameRegex test (Tingnan ang ibaba) ay magpapakita na ito ay hindi isang nauugnay na talaksan. Pagkatapos makumpleto ang proseso ng FTP, palitan ng pangalan ang talaksan sa tamang pangalan. Ang proseso ng pagpapalit ng pangalan ay magpapangyari sa talaksan na maging mahalaga sa isang iglap.
     
#### "0 files" Error sa pagbasa ng Mensahe{#0-files-error-message-1} 
Kung tumatakbo ka[GenerateDatasetsXml](#generatedatasetsxml)o[Mga Dasd](#dasdds), o kung papasanin moEDDGridMula sa...Files dataset saERDDAP™, at nakakuha ka ng "0 files" error message na nagpapahiwatig naERDDAP™nakakita ng 0 katugmang files sa directory (kung inaakala mong may katugmang mga file sa directory na iyon) :
    * Tingnan kung talagang nasa directoryng iyon ang mga file.
    * Tingnan ang baybay ng pangalang directory.
    * Tingnan ang fileNameRegex. Sa totoo lang, talagang madaling magkamali gamit ang regexes. Para sa mga layuning pangsubok, subukan ang regex .\\* na dapat tumugma sa lahat ng mga pangalan. (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Tiyakin na ang gumagamit na nagpapatakbo ng programa (e.g., gumagamit ng=tomcat (?) para sa Tomcat/ERDDAP) ay may pahintulot ng 'read' para sa mga file na iyon.
    * Sa ilang operating system (Halimbawa, ang SCORINux) at depende sa system settings, ang gumagamit na nagpapatakbo ng programa ay dapat na may 'read' na pahintulot para sa buong kadena ng mga directories na humahantong sa directory na may mga files.
         
#### EDDGridMula sa kalansay ng mgaFile XML{#eddgridfromfiles-skeleton-xml} 
*    **Ang kalansay na XML** lahatEDDGridMula sa mga subclass ngFiles ay:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD* Mula sa AudioFiles{#eddfromaudiofiles} 
 **EDDGridMula sa AudioFiles** at **Mga EDDTable Mula sa AudioFile** Aggregate data mula sa koleksiyon ng lokal na mga audio file. (Ang mga ito ay unang lumitawERDDAP™v1.82.) Ang pagkakaiba ay naEDDGridMula sa AudioFiles ang impormasyon ay itinuturing na isang multidimensional na dataset (karaniwang may 2 dimensiyon:\\[umpisa ng talaksan Panahon\\]at\\[Lumipas Oras sa loob ng talaksan\\]) , samantalang itinuturing ng EDDTable FromAudioFiles ang impormasyon bilang tabular data (karaniwang may mga tudling para sa file startTime, ang passes na orasime na may file, at ang impormasyon mula sa audio channels) .EDDGridMula saAudioFiles ay nangangailangan na ang lahat ng file ay may parehong bilang ng sampol, kaya kung hindi totoo iyan, dapat mong gamitin ang EDDTable FromAudioFiles. Kung hindi, ang pagpili kung aling EDD na uri ang gagamitin ang iyong pipiliin. Isang bentaha ng EDDTable FromAudioFiles: maaari mong idagdag ang iba pang mga variable na may ibang impormasyon, e.g.,.stationID, stationType. Sa parehong mga kaso, ang kawalan ng nagkakaisang oras variable ay gumagawa ritong mas mahirap na gumana sa mga data mula sa mga tipong ito ng EDD, ngunit walang mabuting paraan upang magtatag ng isang nagkakaisang oras variable.

Tingnan ang mga superklase ng klaseng ito,[EDDGridMula sa mga Labi](#eddgridfromfiles)at[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa pangkalahatang impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Yamang ang mga audio file ay walang metadata maliban sa impormasyong nauugnay sa pag - uugnay ng sound data, kailangan mong baguhin ang output mula sa GenerateDatasets Xml upang maglaan ng mahalagang impormasyon (e.g., pamagat, buod,creator\\_name, institusyon, kasaysayan) .

Mga Detalye:

* Maraming audio file format. Sa kasalukuyan,ERDDAP™ay maaaring magbasa ng datos mula sa karamihan ng mga talaksang .wav at .au. Sa kasalukuyan ay hindi ito makabasa ng ibang uri ng mga files na audio, e.g., .aiff o .mp3. Kung kailangan mo ng suporta para sa iba pang audio file formats o iba pang variant ng .wav at .au, pakisuyong i-mail ang iyong kahilingan kay Chris. Juan sa noaa.gov . O, bilang trabahong magagamit mo ngayon, maaari mong gawing PCM\\_ ang iyong mga audio file NANGANGANIB (para sa di - tiyak na datos) o PCM\\_FLOAT (para sa lumulutang na impormasyon tungkol sa puntos) .wav files upangERDDAP™ay maaaring gumawang kasama nila.
* Sa kasalukuyan,ERDDAP™ay makababasa ng audio files na may anoJava'Ang AudioFormat class ay tumatawag sa PCM\\_FLOAT, PCM\\_SGNED, PCM\\_UNSGNED, ALAW, at ULAW Aspeto.ERDDAP™mga kumberte PCM\\_UNSIGNONG pamantayan (e.g., 0 hanggang 255) ng pirmadong mga pamantayan (e.g., -128 hanggang 128) sa pamamagitan ng pagpapatibay sa mga piraso sa mga halaga ng impormasyon.ERDDAP™mga kumberteng ALAW at ULAW mula sa kanilang katutubong kodigong byte format sa maikli (int16) mga pamantayan. Mula NoonJavanais ng bigEndian=tunay na datos,ERDDAP™Muling binabago ang mga byte ng datos na nakaimbak ng bigEndian= false (maliit na "endian ") upang mabasa nang wasto ang mga pamantayan. Para sa lahat ng iba pang mga pagsubok (PCM) ,ERDDAP™basahin ang impormasyon.
* KailanERDDAP™ay kababasahan ng impormasyon mula sa mga audio file, ginagawa nitong pangglobong mga katangian ang makukuhang audio metadata. Laging kasama rito ang (na may mga pamantayang halimbawa na ipinakita) 
    
Haging audioBigEndian "bulaan"; //tunay o hindi totoo
int audio Mga channel 1;
String audioEncoding "PCM\\_IGNED";
Ilutang ang audioFrameRate 9600.0; //per second
int audioFrameSize 2; //# of data byte kada frame
Ilutang ang audioSampleRate 9600.0; //per second
int audioSampleSize InBits 16; //# of bits per channel sa bawat sampol
    
SapagkatERDDAP'mga layunin, ang isang frame ay kasingkahulugan ng isang sampol, na ang datos para sa isang punto sa isang panahon.
Ang mga katangian saERDDAP™ay magkakaroon ng impormasyon na naglalarawan sa impormasyon na gaya ng nasa pinagkunang mga file.ERDDAP™ay madalas na nagbago ito habang ang pagbasa ng datos, e.g., PCM\\_UNSGNED, ALAW, at ULAW regulatory data ay ginagawang PCM\\_SGNED, at ang bigEndian= fract data ay ginagawang bigEndian=tunay na datos (kung paanoJavanais basahin ito) . Sa huli, data values saERDDAP™ang laging magiging[PCM-encode](https://en.wikipedia.org/wiki/Pulse-code_modulation)kailangan ng datos (I.e., simpleng mga sampol ng tunog) .
* KailanERDDAP™ay kababasahan ng impormasyon mula sa mga audio file, binabasa nito ang buong file.ERDDAP™ay nakababasa ng kasindami ng mga 2 bilyong sampol sa bawat channel. Halimbawa, kung ang sampol ay 44,100 sampol sa bawat segundo, 2 bilyong sampol ang nagsasalin sa halos 756 na minuto ng impormasyon sa tunog sa bawat file. Kung mayroon kang mga audio file na may higit pa sa dami ng impormasyong ito, kailangan mong hatiin ang mga file sa mas maliliit na tipak upang maging maliliit na tipakERDDAP™ang mga ito.
* SapagkatERDDAP™basahin ang buong audio files,ERDDAP™ay kailangang magkaroon ng maraming memorya upang gumana na may malalaking audio file. Tingnan[ERDDAP'mga memory setting](/docs/server-admin/deploy-install#memory). Minsan pa, kung ito ay isang problema, ang isang gawain na magagamit mo ngayon ay hatiin ang mga file sa mas maliliit na tipak upang maging maliliit na tipakERDDAP™ay maaaring basahin ang mga ito nang walang gaanong memorya.
* Ang ilang audio file ay maling isinulat.ERDDAP™ay gumagawa ng kaunting pagsisikap upang pakitunguhan ang gayong mga kaso. Ngunit sa pangkalahatan, kapag may pagkakamali,ERDDAP™ang isang eksepsiyon (at tanggihan ang talaksang iyon) o (kung ang pagkakamali ay hindi mabasa) basahin ang datos (ngunit ang datos ay mali) .
*   ERDDAP™ang lakas ng tunog. Tamang - tama, ang integer audio data ay sinusukat upang gamitin ang buong saklaw ng uri ng datos.
* Ang mga file ng audio at mga audio player ay walang sistema para sa mga nawawalang halaga (e.g., -999 o Florat.NaN) . Kaya ang audio data ay hindi dapat may anumang nawawalang halaga. Kung may nawawalang mga pamantayan (e.g., kung kailangan mong pahabain ang isang audio file) , gumamit ng serye ng 0's na bibigyang kahulugan bilang perpektong katahimikan.
* KailanERDDAP™ay kababasahan ng datos mula sa mga audio file, lagi itong lumilikha ng isang kolum na tinatawag na pass Orasan ang bawat sampol, sa loob lamang ng ilang segundo (naka-imbak bilang doubles) , relatibo sa unang sampol (na iniatas Oras=0.0 s) . KasamaEDDGridMula saAudioFiles, ito ang nagiging pabagu - bagong takbo ng paspas na axis.
*   EDDGridMula saAudioFiles ay nangangailangan na ang lahat ng mga file ay may parehong bilang ng mga sampol. Kaya kung hindi totoo iyan, dapat mong gamitin ang EDDTable FromAudioFiles.
* SapagkatEDDGridMula sa AudioFiles, inirerekomenda namin na magtakda kayo [kayo]&lt;Mga Katangian sa Memory&gt;] (#dimension deficingsinmemory) ng kabulaanan (gaya ng iminumungkahi ng GenerateDatasets Xml) , dahil ang sukat ng oras ay kadalasang may napakaraming halaga.
* SapagkatEDDGridMula sa AudioFiles, dapat na halos laging gamitin mo angEDDGridMula sa sistemangFiles para sa[Pag - aalsa Mga Pangalan ng File](#aggregation-via-file-names-or-global-metadata), halos sa tuwina'y sa pamamagitan ng pagkuha sa panimulang petsa ng rekording Oras mula sa mga file. Halimbawa,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Mga GenerateDataset Hinihimok ka ni Xml na gawin ito at tutulungan ka sa bagay na ito.
* Para sa EDDTable FromAudioFiles, halos dapat mong gamitin ang EDDTable FromFiles system para sa[\\*\\*\\*fileName pseudosourceNames](#filename-sourcenames)upang makakuha ng impormasyon mula sa pangalan ng talaksan (halos laging petsa ng pasimula Panahon para sa rekording) at itinataguyod ito upang maging isang hanay ng mga impormasyon. Halimbawa,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Ang time format ay dapat na tiyakin bilang ang mga yunit na attribute:&lt;Pangalang= "units"&gt;yyMd'\\_'Hms&lt;/att&gt;
     
### EDDGridMula sa mga GamergeIRFile{#eddgridfrommergeirfiles} 
[ **EDDGridMula sa mga GamergeIRFile** ](#eddgridfrommergeirfiles)Nag-iipon ng datos mula sa lokal,[MALUNGKOT](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)mga talaksan, na mula sa[Nasusukat ng Tropikal na Pag - ulan ang Misyon (TRMM) ](https://trmm.gsfc.nasa.gov), na isang magkasamang misyon sa pagitan ng NASA at ng Japan Aerospace Exploration Agency (JAXA) . Maganda Ang mga file ng IR ay maaring i-download mula sa[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridMula saMergeIRFiles.java ay isinulat at nakatulong sa ambag saERDDAP™proyekto nina Jonathan Lafite at Philippe Makowski ng R.Tech Engineering (lisensiya: may copyright na open source) .

EDDGridAng mga FromMergeIRFile ay medyo kakaiba:

*   EDDGridAng mga taga-MergeIRFile ay sumusuporta sa mga siksik o hindi nai-compressed na source data files, sa anumang kombinasyon, sa parehong dataset. Ito'y nagpapangyari sa iyo, halimbawa, na i - compress ang mas lumang mga file na bihirang ma - access, subalit hindi nai - compress ang bagong mga file na kadalasang naka - access. O, maaari mong baguhin ang uri ng compression mula sa orihinal . Z para sa halimbawa,.gz.
* Kung ikaw ay may siksik at di - nai - compress na mga bersiyon ng parehong data files sa iisang directory, pakisuyong tiyakin ang mga ito&lt;ang fileNameRegex&gt; para sa inyong dataset ay tumutugma sa mga file na nais mong itugma nito at hindi itugma ang mga files na ayaw mong pagtugmain nito.
* Hindi suportado ang mga pinagmulang data files ay dapat walang extension ng talaksan (I.e., hindi "." sa filename) .
* Ang mga talaksang source data ay dapat na may extension ng talaksan, ngunitERDDAP™Alamin ang uri ng compression sa pamamagitan ng pagsusuri sa nilalaman ng file, hindi sa pamamagitan ng pagtingin sa extension ng file (Halimbawa, ".Z") . Kabilang sa mga suportadong uri ng compression ang "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", at "z". KailanERDDAP™basahin ang mga compressed file, ito ay decompresses sa-the-fly, nang hindi sumusulat sa isang temporary file.
* Kailangang gamitin ng lahat ng source data files ang orihinal na sistema ng pagpapangalan: i.e., merg\\_ *YYYYMDH* \\_4km-pixel (kung saan *YYYYMDH* nagpapakita ng oras na kaugnay ng datos sa talaksan) , at isang extension ng talaksan kung ang file ay siksik.

Tingnan ang superclass ng klaseng ito,[EDDGridMula sa mga Labi](#eddgridfromfiles), para sa pangkalahatang impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
 
### EDDGridMula sa mga Uso{#eddgridfromncfiles} 
[ **EDDGridMula sa mga Uso** ](#eddgridfromncfiles)Hinahati ang mga impormasyon mula sa lokal, grided,[GRIB .grb at .grb2](https://en.wikipedia.org/wiki/GRIB)mga talaksan,[HDF  (v4 o v5)  .hdf](https://www.hdfgroup.org/)mga talaksan,[.ncml](#ncml-files)mga talaksan,[NetCDF  (v3 o v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)mga talaksan, at[Kumandante](https://github.com/zarr-developers/zarr-python)mga talaksan (ng bersyon 2.25) . Ang mga talaksang Zar ay may bahagyang kakaibang pag-uugali at nangangailangan ng alin sa fileNameRegex o ang pathRegex upang isama ang "zarr".

Maaaring gumana ito sa iba pang uri ng talaksan (Halimbawa, BUFR) , basta hindi namin sinubukan -- pakisuyong padalhan kami ng ilang sampol na files.

* Para sa mga talaksang GRIB,ERDDAP™ay gagawa ng .gbx index file sa unang pagbasa nito sa bawat file ng GRIB. Kaya ang mga files ng GRIB ay dapat nasa isang directory kung saan ang "user" na tumakbo Tomcat ay nakabasa ng+write permit.
* Tingnan ang superclass ng klaseng ito,[EDDGridMula sa mga Labi](#eddgridfromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.
* Pasimula saERDDAP™v2.12,EDDGridMula sa mga Latian at mga LatianEDDGridMula sa mga Uso Nakabuklat ng datos mula sa "istruktura" sa.nc4 at.hdf4 files. Upang makilala ang isang pagkakaiba - iba na mula sa isang kayarian, ang&lt;sourceName&gt; kailangang gamitin ang format: *Buong StructureName* | *miyembrong Naname* , halimbawa group1/myStruct|ang akingMember .
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
    
#### Mga Grupo sa Gridded Nc Files{#groups-in-gridded-nc-files} 
    [Ang mga talaksang netcdf4 ay maaaring maglaman ng mga grupo.](#groups-in-gridded-nc-files) ERDDAP™ay gumagawa lamang ng isang dataset mula sa mga variables sa isang grupo at lahat ng mga magulang nito. Matutukoy mo ang espesipikong pangalan ng grupo sa GenerateDatasets Xml (Alisin ang bakas) , o gumamit ng "" upang magkaroon ng GenerateDatasets Xml hanapin ang lahat ng grupo para sa mga variable na gumagamit ng pinakamaraming dimensiyon, o gamit "\\[root\\]" Upang magkaroon lamang ng mga GenerateDatasetts humanap ng mga variables sa root group.
    
Ang unang bagay na ginagawa ng GenerateDatasetsXml para sa ganitong uri ng dataset matapos mong sagutin ang mga tanong ay ilimbag ang ncdump-tulad na istraktura ng sampol na talaksan. Kaya kung papasok ka sa ilang kasagutan ng goofy para sa unang silo sa pamamagitan ng GenerateDatasets Xml, sa paano man ay makikita mo kungERDDAP™ay maaaring magbasa ng file at tingnan kung anong dimensiyon at variables ang nasa file. Pagkatapos ay makapagbibigay ka ng mas mabuting mga sagot para sa ikalawang silo sa pamamagitan ng GenerateDatasetsXml.
    

### EDDGridMula sa mga Liwasang Hindi Nabuklat{#eddgridfromncfilesunpacked} 
[ **EDDGridMula sa mga Liwasang Hindi Nabuklat** ](#eddgridfromncfilesunpacked)ay iba't iba[EDDGridMula sa mga Uso](#eddgridfromncfiles)na nag - aalis ng impormasyon mula sa lokal, griddNetCDF  (v3 o v4)  .ncat kaugnay na mga file. Ang pagkakaiba ay na binubuksan ng klaseng ito ang bawat talaksang datos bago pa manEDDGridMula saFiles tingnan ang mga files:

* Ito'y nakabuklat ng mga variable na punô ng laman[scale\\_factorat/oadd\\_offset](#scale_factor).
* Nakukumberte nito ang \\_FillValue atmissing\\_valueMga pamantayan na dapat sa NaN (o MAX\\_VALUE para sa mga uri ng integer data) .
* Binabago nito ang panahon at mga pamantayan"seconds since 1970-01-01T00:00:00Z".

Ang malaking bentaha ng klaseng ito ay na naglalaan ito ng paraan upang pakitunguhan ang iba't ibang pamantayan ng klasescale\\_factor,add\\_offset\\_FillValue,missing\\_value, o time units sa iba't ibang source files sa isang koleksiyon. Kung hindi, kailangan mong gumamit ng isang kagamitang gaya ng[NcML](#ncml-files)o[NCO](#netcdf-operators-nco)upang baguhin ang bawat file upang alisin ang mga pagkakaiba upang ang mga file ay maaaring hawakan ngEDDGridMula sa NNcFiles. Upang gumana nang maayos ang klaseng ito, dapat sundin ng mga file ang pamantayan ng CF para sa mga kaugnay na katangian.

* Kung susubuking gumawa ng isang bagayEDDGridMula sa mga Uso Nabuklat mula sa isang grupo ng mga file na dati mong sinubukan at hindi mo nagamitEDDGridMga FromNcFile, cd hanggang
     *Malaking Direktoryo* /dataset/ *Mga huling2Letter* / *datasetID* /
kung saan *Mga huling2Letter* ang huling 2 titik ngdatasetID,
at alisin ang lahat ng files sa directory na iyon.
* Pasimula saERDDAP™v2.12,EDDGridMula sa mga Latian at mga LatianEDDGridMula sa mga Uso Nakabuklat ng datos mula sa "istruktura" sa.nc4 at.hdf4 files. Upang makilala ang isang pagkakaiba - iba na mula sa isang kayarian, ang&lt;sourceName&gt; kailangang gamitin ang format: *Buong StructureName* | *miyembrong Naname* , halimbawa group1/myStruct|ang akingMember .
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
    
Ang mga talaksang netcdf4 ay maaaring maglaman ng mga grupo. Tingnan[ang dokumentong ito](#groups-in-gridded-nc-files).
    
Ang unang bagay na ginagawa ng GenerateDatasetsXml para sa ganitong uri ng dataset matapos mong sagutin ang mga tanong ay ilimbag ang ncdump-tulad na istraktura ng sampol na talaksan **bago** ito ay nakabuklat. Kaya kung papasok ka sa ilang kasagutan ng goofy para sa unang silo sa pamamagitan ng GenerateDatasets Xml, sa paano man ay makikita mo kungERDDAP™ay maaaring magbasa ng file at tingnan kung anong dimensiyon at variables ang nasa file. Pagkatapos ay makapagbibigay ka ng mas mabuting mga sagot para sa ikalawang silo sa pamamagitan ng GenerateDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)ang longhitud ng isang bata (nakapaloob)  EDDGriddataset na may ilang halaga ng longhitud na higit pa sa 180 (halimbawa, 0 hanggang 360) upang ang mga ito ay nasa range -180 hanggang 180 (Longitude Plus o Minus 180, kaya ang pangalan) .

* Ito ay nagbibigay ng paraan upang makagawa ng mga dataset na may mga halagang longhitúd na mas malaki sa 180 compliant sa/na may longhitúd na halaga na mas malaki sa 180 compliantOGCserbisyo (halimbawaWMSPumasok sa serverERDDAP) , dahil lahatOGCang mga serbisyong nangangailangan ng mga halagang longhitud sa loob ng -180 hanggang 180.
* Ang pagtatrabaho nang malapit sa di - pagkakasundo ay nagdudulot ng mga problema, ito man ay sa longhitud 0 o sa longhitud 180. Ang uring ito ng dataset ay nagpapangyari sa iyo na maiwasan ang mga problemang iyon para sa lahat, sa pamamagitan ng pag - aalok ng dalawang bersiyon ng iisang dataset:
na may halaga ng longhitúd sa range na 0 hanggang 360 ("Pacificenttric"?) ,
na may halaga ng longhitúd noong range -180 hanggang 180 ("Atlantric"?) .
* Para sa mga dataset ng bata na may lahat ng halaga ng longhitúd na higit sa 180, ang lahat ng bagong halaga ng longhitud ay mas mababa lamang ng 360 digri. Halimbawa, ang isang dataset na may mga halagang longhitúd na 180 hanggang 240 ay magiging dataset na may mga halagang longhitud na -180 hanggang -120.
* Para sa mga dataset ng bata na may longhitud para sa buong globo (Mga 0 hanggang 360) , ang bagong halaga ng longhitud ay babaguhin (Halos) -180 hanggang 180:
Ang orihinal na 0 hanggang halos 180 halaga ay hindi nagbabago.
Ang orihinal na 180 hanggang 360 halaga ay ginawang -180 sa 0 at inilipat sa pasimula ng guhit na longhitúd.
* Para sa mga child datasets na sumasaklaw sa 180 ngunit hindi sumasaklaw sa globo,ERDDAP™ang nawawalang mga halaga kung kinakailangan upang gumawa ng isang dataset na sumasaklaw sa globo. Halimbawa, ang isang child dataset na may longhitúd na halaga na 140 hanggang 200 ay magiging dataset na may longhitúd na halaga na -180 hanggang 180.
Ang mga pamantayang pambata ng 180 hanggang 200 ay magiging -180 hanggang -160.
Ilalagay ang mga bagong halaga ng longhitud mula -160 hanggang 140. Ang katumbas na halaga ng datos ay \\_FillValues.
Ang halaga ng bata na 140 hanggang halos 180 ay hindi magbabago.
Ang pagpapasok ng nawawalang mga pamantayan ay maaaring magtinging kakatwa, subalit iniiwasan nito ang ilang problema na bunga ng pagkakaroon ng mga pagpapahalaga sa longhitud na biglang tumatalon (e.g, mula -160 hanggang 140) .
* Sa loob[GenerateDatasetsXml](#generatedatasetsxml), may natatanging "dataset type",EDDGridLonPM180 MulaErddapCatalog, na nagpapangyari sa iyo na lumikha ngdatasets.xmlpara saEDDGridLonPM180 datasets mula sa bawat isaEDDGridmga datos sa loob ng isangERDDAPna may anumang halaga ng longhitud na higit pa sa 180. Pinadadali nito ang pag-aalok ng dalawang bersyon ng mga datos na ito:
ang orihinal, na may halaga ng longhitud sa range 0 hanggang 360,
at ang bagong dataset, na may mga halagang longhitud noong range -180 hanggang 180.
    
Ang dataset ng bata sa loob ng bawat isaEDDGridAng LonPM180 dataset ay magiging isangEDDGridMulaErddap dataset na tumuturo sa orihinal na dataset.
Ang bagong dataset'sdatasetIDang magiging pangalan ng orihinal na dataset plat na "\\_LonPM180".
Halimbawa,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Ilagay angEDDGridLonPM180 dataset **sa ibaba** ang orihinal na dataset sadatasets.xml. Iniiwasan niyan ang ilang posibleng problema.
    
Sa ibang paraan, maaari mong palitan angEDDGridMula saErddap child dataset na may orihinal na dataset'sdatasets.xml. Pagkatapos, magkakaroon lamang ng isang bersyon ng dataset: ang isa na may mga halagang longhitud sa loob ng -180 hanggang 180. Hindi namin ito pinapansin sapagkat may mga panahon na ang bawat bersiyon ng dataset ay mas kombinyente.
    
* Halimbawa, kung mag - aalok ka ng dalawang bersiyon ng dataset, isa na may longhitud 0 hanggang 360 at isa na may longhitud -180 hanggang 180:
    * Maaari mong gamitin ang opsyonal [&lt;Makukuha ViaWMS&gt; Mali&lt;/accessible ViaWMS&gt;] (Mga #accessibleviawm) na may 0-360 dataset upang sapilitang sirain angWMSserbisyo para sa dataset na iyon. Pagkatapos, tanging ang LonPM180 na bersiyon lamang ng dataset ang mararating sa pamamagitan ngWMS.
    * May dalawang paraan upang panatilihin ang LonPM180 dataset up-to-date na may mga pagbabago sa saligang dataset:
        * Kung ang child dataset ay isangEDDGridMula sa Erddap dataset na bumabanggit ng isangset ng datos sa parehong datosERDDAP™, ang LonPM180 dataset ay magsisikap na direktang mag-skripto sa saligang dataset upang ito ay laging up-to-date. Ang tuwirang mga suskripsiyon ay hindi lumilikha ng mga email na humihiling sa iyo na patunayan ang bisa ng suskripsiyon ay dapat na gawin nang kusa.
        * Kung hindi dataset ng bataEDDGridMula sa Erddap dataset na parehoERDDAP™, ang LonPM180 dataset ay magsisikap na gamitin ang regular na sistema ng subscription upang magsuskribe sa saligang dataset. Kung mayroon kang sistema ng suskripsiyon sa iyong pusoERDDAP™ang sabi pa, dapat kang kumuha ng mga email na humihiling sa iyo na patunayan ang suskrisyon. Mangyari pa.
        * Kung mayroon kang sistema ng suskripsiyon sa iyong pusoERDDAP™patayin, ang LonPM180 dataset ay maaaring kung minsan ay may luma nang metadata hanggang sa muling maikarga ang LonPM180 dataset. Kaya kung ang sistema ng suskripsiyon ay patayin, dapat mong itakda ang [&lt;Muling pagkarga [[Talaksan] (Mga #reload offenminute) Pagtatakda ng LonPM180 dataset sa isang mas maliit na numero, kung kaya mas malamang na mahuli ang mga pagbabago sa dataset ng bata sa lalong madaling panahon.

#### EDDGridLonPM180 kalansay XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)ang longhitud ng isang bata (nakapaloob)  EDDGriddataset na may ilang halaga ng longhitud na wala pang 0 (Halimbawa, -180 hanggang 180) upang ang mga ito ay nasa range 0 hanggang 360 (Kaya ang pangalan) .

* Ang pagtatrabaho nang malapit sa di - pagkakasundo ay nagdudulot ng mga problema, ito man ay sa longhitud 0 o sa longhitud 180. Ang uring ito ng dataset ay nagpapangyari sa iyo na maiwasan ang mga problemang iyon para sa lahat, sa pamamagitan ng pag - aalok ng dalawang bersiyon ng iisang dataset:
na may halaga ng longhitúd noong range -180 hanggang 180 ("Atlantric"?) .
na may halaga ng longhitúd sa range na 0 hanggang 360 ("Pacificenttric"?) ,
* Para sa mga dataset ng bata na may lahat ng halaga ng longhitud na wala pang 0, lahat ng bagong halaga ng longhitud ay 360 digri lamang ang taas. Halimbawa, ang isang dataset na may mga halagang longhitúd na -180 hanggang -120 ay magiging isang dataset na may halagang longhitúd na 180 hanggang 240.
* Para sa mga dataset ng bata na may longhitud para sa buong globo (Halos -180 hanggang 180) , ang bagong halaga ng longhitud ay babaguhin (Halos) 0 hanggang 360:
Ang orihinal na -180 sa 0 pamantayan ay ginawang 180 sa 360 at inilipat sa dulo ng hanay ng longhitud.
Ang orihinal na 0 hanggang halos 180 halaga ay hindi nagbabago.
* Para sa mga child datasets na sumasakop sa un=0 ngunit hindi sumasaklaw sa mundo,ERDDAP™ang nawawalang mga halaga kung kinakailangan upang gumawa ng isang dataset na sumasaklaw sa globo. Halimbawa, ang isang dataset ng bata na may mga halagang longhitúd na -40 hanggang 20 ay magiging isang dataset na may mga halagang longhitud na 0 hanggang 360.
Ang halaga ng bata na 0 hanggang 20 ay hindi magbabago.
Ilalagay ang bagong mga pamantayan sa longhitud mula 20 hanggang 320. Ang katumbas na halaga ng datos ay \\_FillValues.
Ang halaga ng bata na -40 hanggang 0 ay magiging 320 hanggang 360.
Ang pagpapasok ng nawawalang mga pamantayan ay maaaring magtinging kakatwa, subalit iniiwasan nito ang ilang problema na bunga ng pagkakaroon ng mga pagpapahalaga sa longhitud na biglang tumatalon (e.g, mula 20 hanggang 320) .
* Sa loob[GenerateDatasetsXml](#generatedatasetsxml), may natatanging "dataset type",EDDGridLon0360 Mula sa ErddapCatalog, na nagpapangyari sa iyo na lumikha ngdatasets.xmlpara saEDDGridLon0360 datos mula sa bawat isaEDDGridmga datos sa loob ng isangERDDAPna may anumang halaga ng longhitud na higit pa sa 180. Pinadadali nito ang pag-aalok ng dalawang bersyon ng mga datos na ito:
ang orihinal, na may halaga ng longhitud sa range 0 hanggang 360,
at ang bagong dataset, na may mga halagang longhitud noong range -180 hanggang 180.
    
Ang dataset ng bata sa loob ng bawat isaEDDGridAng Lon0360 dataset ay magiging isangEDDGridMulaErddap dataset na tumuturo sa orihinal na dataset.
Ang bagong dataset'sdatasetIDang magiging pangalan ng orihinal na dataset kasama ang "\\_Lon0360".
Halimbawa,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Ilagay angEDDGridLon0360 dataset **sa ibaba** ang orihinal na dataset sadatasets.xml. Iniiwasan niyan ang ilang posibleng problema.
    
Sa ibang paraan, maaari mong palitan angEDDGridMula saErddap child dataset na may orihinal na dataset'sdatasets.xml. Pagkatapos, magkakaroon lamang ng isang bersiyon ng dataset: ang isa na may halaga ng longhitud sa loob ng 0 hanggang 360. Hindi namin ito pinapansin sapagkat may mga panahon na ang bawat bersiyon ng dataset ay mas kombinyente.
    
* Halimbawa, kung mag - aalok ka ng dalawang bersiyon ng dataset, isa na may longhitud 0 hanggang 360 at isa na may longhitud -180 hanggang 180:
    * Maaari mong gamitin ang opsyonal [&lt;Makukuha ViaWMS&gt; Mali&lt;/accessible ViaWMS&gt;] (Mga #accessibleviawm) na may 0 hanggang 360 dataset upang sapilitang sirain angWMSserbisyo para sa dataset na iyon. Pagkatapos, tanging ang -180 hanggang 180 bersiyon lamang ng dataset ang mararating sa pamamagitan ngWMS.
    * May dalawang paraan upang panatilihin ang Lon0360 dataset up-to-date na may mga pagbabago sa saligang dataset:
        * Kung ang child dataset ay isangEDDGridMula sa Erddap dataset na bumabanggit ng isangset ng datos sa parehong datosERDDAP™, ang Lon0360 dataset ay magsisikap na direktang magsuskripsiyon sa saligang dataset upang ito ay laging up-to-date. Ang tuwirang mga suskripsiyon ay hindi lumilikha ng mga email na humihiling sa iyo na patunayan ang bisa ng suskripsiyon ay dapat na gawin nang kusa.
        * Kung hindi dataset ng bataEDDGridMula sa Erddap dataset na parehoERDDAP™, ang Lon0360 dataset ay magsisikap na gamitin ang regular na sistema ng suskripsiyon upang magsuskribe sa saligang dataset. Kung mayroon kang sistema ng suskripsiyon sa iyong pusoERDDAP™ang sabi pa, dapat kang kumuha ng mga email na humihiling sa iyo na patunayan ang suskrisyon. Mangyari pa.
        * Kung mayroon kang sistema ng suskripsiyon sa iyong pusoERDDAP™off, ang Lon0360 dataset ay maaaring kung minsan ay may luma nang metadata hanggang sa muling maikarga ang Lon0360 dataset. Kaya kung ang sistema ng suskripsiyon ay patayin, dapat mong itakda ang [&lt;Muling pagkarga [[Talaksan] (Mga #reload offenminute) Pagtatakda ng Lon0360 dataset sa mas maliit na bilang, kung kaya mas malamang na masalo nito ang mga pagbabago sa dataset ng bata sa mas madaling panahon.
#### EDDGridLon0360 kalansay XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridSide Side Side{#eddgridsidebyside} 
[ **EDDGridSide Side Side** ](#eddgridsidebyside)Naghihiwalay ng dalawa o higit paEDDGriddatos (ang mga bata) Isa - isa.

* Ang resultang dataset ay may lahat ng mga variables mula sa lahat ng mga child datasets.
* Ang magulang dataset at ang lahat ng mga child datasets MUST ay may pagkakaibadatasetIDs. Kung ang anumang pangalan sa isang pamilya ay parehong - pareho, ang dataset ay hindi magkakarga (sa maling mensahe na ang mga pamantayan ng aggregadong axis ay hindi inuuri) .
* Lahat ng bata ay may iisang pinagmumulan ng mga pamantayan para saaxisVariables\\[1+\\]  (Halimbawa, latitud, longhitud) . Ang prekwensiya ng pagsubok ay tinitiyak ng[mga palito sa posporo](#matchaxisndigits).
* Ang mga bata ay maaaring may iba't ibang pinagmumulang mga pamantayan para saaxisVariables\\[0\\]  (halimbawa, panahon) , ngunit karaniwan nang pareho sila.
* Ang magulang na dataset ay lalabas na mayroon ng lahat ng impormasyonaxisVariables\\[0\\]ang pinagmumulan ng mga pamantayan mula sa lahat ng mga bata.
* Halimbawa, ito ay nagpapahintulot sa iyo na pagsamahin ang isang source dataset sa isang u-component ng vector at isa pang source dataset sa vector's v-component, kaya ang pinagsamang datos ay maaaring ihain.
* Ang mga batang nilalang sa ganitong paraan ay ginaganap nang sarilinan. Ang mga ito ay hindi hiwalay na makukuhang datos (Halimbawa, sa pamamagitan ng mga kahilingan sa data o ng kliyente[mga talaksan ng bandila](/docs/server-admin/additional-information#flag)) .
* Ang global metadata at settings para sa magulang ay nagmula sa global metadata at settings para sa unang anak.
* Kung may eksepsiyon habang nililikha ang panganay na anak, hindi lilikhain ang magulang.
* Kung may eksepsiyon samantalang lumilikha ng ibang mga bata, ito'y nagpapadala ng email upang mag - email ng mga bagay - bagay (na itinakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) at nagpapatuloy sa iba pang mga bata.
#### EDDGridSide Byside kalansay XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridPagdidisiplina{#eddgridaggregateexistingdimension} 
[ **EDDGridPagdidisiplina** ](#eddgridaggregateexistingdimension)Naghihiwalay ng dalawa o higit paEDDGridang bawat isa na may iba't ibang halaga para sa unang dimensiyon, subalit magkatulad na mga halaga para sa iba pang dimensiyon.

* Halimbawa, ang isang dataset ng bata ay maaaring may 366 na halaga (para sa 2004) para sa sukat ng panahon at ang isa pang bata ay maaaring magkaroon ng 365 pamantayan (para sa 2005) para sa sukat ng panahon.
* Lahat ng mga pamantayan para sa lahat ng iba pang dimensiyon (Halimbawa, latitud, longhitud) TIYAK na magkatulad para sa lahat ng bata. Ang prekwensiya ng pagsubok ay tinitiyak ng[mga palito sa posporo](#matchaxisndigits).
* Pinag - uriang Pamantayan - Ang mga pamantayan para sa bawat dimensiyong MUST ay maaaring uriin ayon sa pagkakasunud - sunod (Pag - akyat o pagbaba) . Ang mga halaga ay maaaring maging iregular ang layo. Walang mga ugnayan. Ito ay isang kahilingan sa[Pamantayang CF metadata](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Kung ang mga halaga ng anumang dimensiyon ay hindi ayon sa pagkakasunud - sunod, ang dataset ay hindi ididiskarga at ang dataset ay hindi ididiskargaERDDAP™ay matutukoy ang unang di-nababababang halaga sa log file, *Malaking Direktoryo* /log/log.txt .
    
Ang mga hindi natukoy na dimensiyonal na halaga ay halos palaging nagpapahiwatig ng problema sa source dataset. Ito ay pinaka karaniwang nangyayari kapag ang isang mali ang pangalan o hindi angkop na talaksan ay kabilang sa agregasyon, na humahantong sa isang hindi natukoy na dimensiyon ng oras. Upang malutas ang problemang ito, tingnan ang maling mensahe saERDDAP™log.txt file upang mahanap ang hindi magandang halaga ng oras. Pagkatapos ay tingnan ang pinagkunang mga file upang hanapin ang katumbas na talaksan (o isa bago o isa pa) na hindi kabilang sa agregasyon.
    
* Ang magulang na dataset at ang child dataset na MUST ay magkaibadatasetIDs. Kung ang anumang pangalan sa isang pamilya ay parehong - pareho, ang dataset ay hindi magkakarga (sa maling mensahe na ang mga pamantayan ng aggregadong axis ay hindi inuuri) .
* Sa kasalukuyan, ang child dataset MUST ay magiging isangEDDGridMula sa Dap dataset at MUST ay may pinakamababang halaga ng aggregated dimensiyon (karaniwang ang pinakamatandang pamantayan sa panahon) . Ang lahat ng iba pang mga bata na MUST ay halos magkaparehong datasets (Magkaiba lamang sa mga halaga para sa unang dimensiyon) at tinitiyak ng kanila lamangsourceUrl.
* Nakuha ng aggregate dataset ang metadata nito mula sa unang anak.
* Ang[Mga GenerateDataset Xml programa](#generatedatasetsxml)ay maaaring gumawa ng isang magaspang na pagkalap ngdatasets.xmlpara sa isangEDDGridAggregateExing Dimension batay sa isang set ng mga files na pinaglilingkuran ng isangHyraxo THEDDS server. Halimbawa, gamitin ang input na ito para sa programa (ang "/1988" sa URL ay gumagawa sa halimbawa na mas mabilis tumakbo) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Magagamit mo ang resulta&lt;sourceUrl&gt; Mga tag o i-delete ang mga ito at i-uncommit ang mga&lt;sourceUrl&gt; tag (upang ang mga bagong file ay mapansin sa tuwing ang dataset ay muling ikarga.
#### EDDGridAggregateExisting Dimension kalansay XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridKopya{#eddgridcopy} 
[ **EDDGridKopya** ](#eddgridcopy)gumagawa at nag - iingat ng isang lokal na kopya ng isa pang kopyaEDDGrid'Ang datos at nagsisilbi ng datos mula sa lokal na kopya.

*   EDDGridKopya (at para sa impormasyong taskular,[Mapagkakatiwalaang Komponiya](#eddtablecopy)) ay napakadaling gamitin at napakabisa
     **ang ilan sa pinakamalaking problema sa pagbibigay ng impormasyon mula sa isang malayong pinagkukunan ng impormasyon:** 
    * Maaaring maging mabagal ang pagkuha ng datos mula sa isang malayong pinagkukunan ng datos.
        * Maaaring mabagal ito sapagkat ito ay likas na mabagal (Halimbawa, isang di - mabisang uri ng server) ,
        * Sapagka't ito'y nadaraig ng maraming kahilingan,
        * o dahil limitado ang iyong server o ang remote server.
    * Ang remote dataset kung minsan ay hindi makukuha (muli, sa iba't ibang kadahilanan) .
    * Ang pagtitiwala sa isang pinagmumulan ng impormasyon ay hindi sapat (Halimbawa, kapag maraming gumagamit at marami ang gumagamitERDDAPginagamit ito ng mga s) .
         
* Kung Paano Ito Gumagana --EDDGridNilulutas ng kopya ang mga problemang ito sa pamamagitan ng kusang paggawa at pagpapanatili ng isang lokal na kopya ng impormasyon at pagsisilbi ng mga datos mula sa lokal na kopya.ERDDAP™ay magsisilbi ng impormasyon mula sa lokal na kopya nang napakabilis. At ang paggawa ng isang lokal na kopya ay nakababawas sa pasanin sa remote server. At ang lokal na kopya ay backup ng orihinal, na kapaki - pakinabang sakaling may mangyari sa orihinal.
    
Walang bago sa paggawa ng lokal na kopya ng isang dataset. Ang bago rito ay na ginagawa ito ng klaseng ito\\*Madali\\*upang lumikha at\\*tagapangalaga\\*isang lokal na kopya ng impormasyon mula sa isang\\*pagkakasari - sari\\*ng mga uri ng remote data source at\\*idagdag ang metadata\\*habang kinokopya ang impormasyon.
    
* Mga Patak ng Data --EDDGridGinagawa ng kopya ang lokal na kopya ng impormasyon sa pamamagitan ng paghiling ng mga tipak ng impormasyon mula sa malayo&lt;dataset&gt; . Magkakaroon ng tipak sa bawat halaga ng pinakakaliwa (una) Iba - iba ang axis.EDDGridAng kopya ay hindi umaasa sa remote dataset's index number para sa axis - maaaring magbago ang mga ito.
    
BABALA: Kung ang dami ng datos ay napakalaki (&gt; 2GB) na ito'y nagdudulot ng mga problema,EDDGridHindi maaaring gamitin ang kopya. (Ikinalulungkot namin, kami'y umaasang magkakaroon ng lunas sa problemang ito sa hinaharap.) 
    
*   \\[Isang mapagpipilianEDDGridKopya -
Kung ang remote data ay available sa pamamagitan ng downloadable files, hindi web service, gamitin[cache Mula sa opsyon para saEDDGridMula sa mga Labi](#cachefromurl), na gumagawa sa isang lokal na kopya ng mga remote files at nagsisilbi sa data mula sa lokal na mga files.\\]
* Local Files -- Ang bawat bahagi ng datos ay nakatago sa isang hiwalayNetCDFtalaksan sa isang subdirectory ng *Malaking Direktoryo* /copy/ *datasetID* / (na itinakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Ang mga talaksan na nilikha mula sa mga halaga ng axis ay binabago upang gawin itong file-name-ligtas (Halimbawa, ang mga hyphen ay pinapalitan ng "x2D".) - ito ay hindi nakakaapekto sa aktuwal na datos.
     
* Bagong Data -- Sa bawat pagkakataonEDDGridMuling kinakarga ang kopya, sinusuri nito ang liblib&lt;dataset&gt; upang makita kung anong mga tipak ang makukuha. Kung hindi pa umiiral ang talaksan para sa isang bahagi ng datos, isang kahilingan upang makuha ang daglat ay idinaragdag sa isang queue.ERDDAP'Thread processs lahat ng mgaqueued requests para sa mga tipak ng datos, one-by-one. Makikita mo ang mga estadistika para sa gawain ng taskThread[Katayuan Pahina](/docs/server-admin/additional-information#status-page)at sa[Pang - araw - araw na Report](/docs/server-admin/additional-information#daily-report). (Oo,ERDDAP™ay maaaring mag-atas ng maramihang gawain sa prosesong ito, ngunit ito ay gagamit ng maraming mga remote data source's bandwidth, memory, at CPU panahon, at maraming lokalERDDAP''s bandwidth, memory, at CPU time, alinman dito ay hindi magandang ideya.) 
    
WALA: Sa unang pagkakataonEDDGridNakakarga ang kopya, (kung mabuti ang takbo ng lahat) maraming mga kahilingan para sa mga tipak ng datos ay idadagdag sa queue ng taskThread, ngunit walang mga lokal na data file ang malilikha. Kaya ang tagapagtayo ay mabibigo ngunit ang taskThread ay patuloy na magtatrabaho at lilikha ng mga lokal na file. Kung ang lahat ay magiging maayos, ang taskThread ay gagawa ng ilang lokal na data file at ang susunod na pagtatangka na muling ikarga ang dataset (sa ~15 minuto) ay magtatagumpay, subalit sa simula ay limitado lamang ang impormasyon.
    
TANE: Pagkatapos ng lokal na dataset ay may ilang datos at makikita sa inyong lugarERDDAP, kung ang remote dataset ay pansamantala o permanenteng hindi makukuha, ang lokal na dataset ay gagana pa rin.
    
BABALA: Kung malaki ang remote dataset at/o mabagal ang remote server (iyan ang problema, hindi ba?) , matagal bago makagawa ng isang kumpletong lokal na kopya. Sa ilang kaso, hindi magiging katanggap - tanggap ang panahong kailangan. Halimbawa, naghahatid ng 1 TB ng datos sa isang linya ng T1 (0.15 GB/s) ay gumugugol ng di - kukulangin sa 60 araw, sa ilalim ng pinakamabuting mga kalagayan. Bukod pa riyan, gumagamit ito ng maraming bandwidth, memory, at CPU na panahon sa liblib at lokal na mga computer. Ang solusyon ay magpadala ng hard drive sa administrador ng remote data set upang ang s/siya ay makagawa ng isang kopya ng dataset at ihulog ang hard drive pabalik sa iyo. Gamitin ang impormasyong iyon bilang pasimula at pasimulaEDDGridAng kopya ay magdadagdag ng datos dito. (Iyan ang isang paraan na[Paglilingkod ng EC2 Cloud ng Amazon](https://aws.amazon.com/importexport/)Harapin ang problema, kahit na ang kanilang sistema ay maraming bandwidth.) 
    
BABALA: Kung bibigyan ng halaga ang kaliwa (una) Ang axis ay natatanggal sa remote dataset,EDDGridHINDI inaalis ng kopya ang lokal na talaksang kinopya. Kung nais mo, maaari mo itong alisin sa iyong sarili.
    
#### Grid Copy checkSource Data{#grid-copy-checksourcedata} 
Angdatasets.xmlpara sa dataset na ito ay maaaring magkaroon ng opsyonal na tag
```
    <checkSourceData>true</checkSourceData>  
```
Totoo ang default na halaga. Kung/kapag ito ay mali, ang dataset ay hindi kailanman titingnan ang source dataset upang malaman kung may karagdagang datos na makukuha.

#### Mula lamang noon{#onlysince} 
Masasabi moEDDGridKopya upang gumawa ng isang kopya ng isang subset ng source dataset, sa halip ng buong source dataset, sa pamamagitan ng pagdagdag ng isang tag sa anyo&lt;Mula lamang noong&gt; *ilan Halaga* &lt;/ Tanging mula&gt; hanggang sa dataset'sdatasets.xmlLarawan.EDDGridAng pagkopya ay mag-download lamang ng mga halagang datos na may kaugnayan sa mga halaga ng unang dimensiyon (karaniwang sukat ng panahon) Na lalong dakila kay sa *ilan Halaga* . *ilan Halaga* ay maaaring:
    * Isang relatibong panahon ang itinakda sa pamamagitan ngnow- *Mga Pag - aari* .
Halimbawa,&lt;Mula lamang noong&gt;now-2 Taon&lt;/ Tanging mula noong&gt; ay nagsasabi sa dataset na gumawa lamang ng lokal na mga kopya ng impormasyon para sa impormasyon kung saan ang panlabas na mga halaga ng dimensiyon (karaniwang mga pamantayan sa panahon) sa loob ng 2 taon (na muli-evaluated sa tuwing ang dataset ay muling i-load, na kapag ito ay naghahanap ng bagong datos upang kopyahin) . Tingnan ang[now- *Mga Pag - aari* Iba't ibang paglalarawan](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Ito ay kapaki-pakinabang kung ang unang dimensiyon ay may time data, na karaniwang ginagawa nito.
        
        EDDGridHindi inaalis ng kopya ang lokal na mga data file na may datos na, sa paglipas ng panahon, ay nagiging mas matanda kaysa sa paglipas ng panahonnow- *Mga Pag - aari* . Maaari mong alisin ang mga file na iyon anumang oras kung gugustuhin mo. Kung oo, mahigpit naming inirerekomenda na mag - set ka ng isang[bandila](/docs/server-admin/additional-information#flag)pagkatapos mong alisin ang mga files upang sabihinEDDGridKopyahin upang i-update ang listahan ng mga talaksang may cached.
        
    * Isang takdang punto sa panahon ang tinukoy na string ng ISO 8601yyyy-MM-ddTHH:mm:ssZ.
Halimbawa,&lt;Mula lamang noong&gt;2000-01-01T00:00:00Z&lt;/ Tanging mula noong&gt; ay nagsasabi sa dataset na gumawa lamang ng mga lokal na kopya ng datos kung saan ang halaga ng unang dimensiyon ay \\&gt;=2000-01-01T00:00:00Z . Ito ay kapaki-pakinabang kung ang unang dimensiyon ay may time data, na karaniwang ginagawa nito.
         
    * Isang lumulutang na bilang.
Halimbawa,&lt;Tanging mula noong&gt;946684800.0&lt;/ Tanging mula&gt; . Ang mga yunit ang magiging patutunguhang yunit ng unang dimensiyon. Halimbawa, para sa sukat ng panahon, ang mga yunit saERDDAP™laging"seconds since 1970-01-01T00:00:00Z". Kaya 946684800.0"seconds since 1970-01-01T00:00:00Z"ay katumbas ng 2000-01-01T00:00:00Z. Ito ay laging kapaki-pakinabang na opsyon, ngunit lalo nang kapakipakinabang kapag ang unang dimensiyon ay walang time data.

#### EDDGridMuling Ginamit ang Kopya{#eddgridcopy-recomended-use} 
1. Gumawa ng&lt;Kakaibang datos&gt; ipinasok (katutubong uri, hindiEDDGridKopya) para sa malayong pinagkukunan ng datos.
     **Kunin itong gumagana nang tama, pati na ang lahat ng ninanais na metadata.** 
2. Kung ito ay masyadong mabagal, idagdag ang XML code upang balutin itoEDDGridKopyahin ang dataset.
    * Gumamit ng ibang paraandatasetID  (marahil sa pamamagitan ng pagbabago ngdatasetIDng matatandadatasetIDbahagya) .
    * Tularan ang&lt;Makukuha Sa&gt;,&lt;Muling magkarga sa Bawat NMinutes&gt; at&lt;onChange&gt; mula sa malayoEDDGrid' XML to theEDDGridKopya ng XML. (Ang kanilang mga pamantayanEDDGridKopyahin ang materya; ang kanilang mga pagpapahalaga sa panloob na dataset ay nagiging walang kaugnayan.) 
3.  ERDDAP™ang lokal na kopya ng impormasyon.
         
* BABALA:EDDGridIpinalalagay ng kopya na ang mga halaga ng data para sa bawat tipak ay hindi kailanman nagbabago. Kung/kapag ginawa nila ito, kailangan mong manu-manong i-display ang mga score files sa *Malaking Direktoryo* /copy/ *datasetID* / na nagbago at[bandila](/docs/server-admin/additional-information#flag)ang dataset na muling ikarga upang mapalitan ang inalis na mga tipak. Kung mayroon kang subscription ng email sa dataset, makakakuha ka ng dalawang email: isa kapag ang dataset ay unang nag - reload at sinimulang kopyahin ang impormasyon, at ang isa naman kapag ang dataset ay muling nagkakarga (kusa) at nakikita ang bagong lokal na data files.
     
* Ang lahat ng pagpapahalaga sa axis ay dapat na pantay - pantay.
Sa bawat palakol maliban sa pinakakaliwa (una) , lahat ng mga pamantayan ay dapat na pantay - pantay para sa lahat ng mga bata. Ang prekwensiya ng pagsubok ay tinitiyak ng[mga palito sa posporo](#matchaxisndigits).
     
* Mga Pagtatakda, Metadata, Variables --EDDGridAng kopya ay gumagamit ng settings, metadata, at variables mula sa kulong source dataset.
     
* Palitan ang Metadata -- Kung kailangan mong magpalitaddAttributeso baguhin ang pagkakasunud-sunod ng mga variable na nauugnay sa source dataset:
    1. Palitan angaddAttributespara sa source datasetdatasets.xml, kung kinakailangan.
    2. Isalin ang isa sa mga kinopyang files.
    3. Magtakda ng[bandila](/docs/server-admin/additional-information#flag)upang muling maikarga kaagad ang dataset. Kung gagamitin mo ang isang bandila at mayroon kang isang email subscription sa dataset, kukuha ka ng dalawang email: isa kapag ang dataset ay unang nagkarga at sinimulang kopyahin ang impormasyon, at isa pa kapag ang dataset ay muling nakunan (kusa) at nakikita ang bagong lokal na data files.
    4. Ang tinanggal na talaksan ay muling pakikita ng bagong metadata. Kung ang source dataset ay hindi makuha, angEDDGridAng childpy dataset ay makakakuha ng metadata mula sa retailed file, dahil ito ang pinakabatang file.
#### EDDGridKopyang kalansay XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable Mula saCassandra{#eddtablefromcassandra} 
[ **EDDTable Mula saCassandra** ](#eddtablefromcassandra)hawakan ang datos mula sa isa[Cassandra](https://cassandra.apache.org/)mesa. Ang Cassandra ay isang database ng NoSQL.

*   ERDDAP™ay maaaring magtrabaho sa Cassandra v2 at v3 na walang pagbabago o pagkakaiba sa setup. Sinubok na natin[Cassandra v2 at v3 mula sa Apache](https://cassandra.apache.org/download/). Malamang na gayon ngaERDDAP™ay maaari ring gumana sa Cassandra na download mula sa DataStax.
     
* Para kay Aug 2019 - Mayo 2021, nahirapan kaming dalhin si Cassandra upang magtrabaho kasama ni AppopenJdkJavav8. Ito ay naghagis ng EXCEPSION\\_ACCESS\\_VIOLATION). Subalit ngayon (Mayo 2021) , wala na ang problemang iyan: maaari nating matagumpay na gamitin ang Cassandra v2.1.22 at ang AmponJdk jdk8u292-b10.
     
#### Isang Talaan{#one-table} 
Hindi sinusuportahan ni Cassandra ang mga "join" sa paraan ng pag-uugnay ng mga database. IsaERDDAP™EDDTable FromCassandra dataset mapas sa isa (Marahil isang subset ng isa) dulang Cassandra.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™kasama ang CassandraJavadriver, kaya hindi mo na kailangang i-install ng hiwalay.
* Maingat na basahin ang lahat ng impormasyon ng dokumentong ito tungkol sa EDDTable FromCassandra. Ang ilan sa mga detalye ay napakahalaga.
* Ang CassandraJavaAng tsuper ay nilayon na magtrabaho sa Apache Cassandra (1.2+) at ang DataStax Enterprise (3.1+) . Kung ikaw ay gumagamit ng Apache Cassandra 1.2.x, dapat mong baguhin ang talaksang cassandra.yaml para sa bawat node na mag-set ng start\\_native\\_transport: totoo, pagkatapos ay mag-restart bawat node.
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti (lalo na [&lt;partisyon KeySourceNames&gt;] (#partitionkeysourcenames) ). Maaari mong tipunin ang karamihan sa impormasyong kailangan mo upang likhain ang XML para sa isang EDDTable FromCassandra dataset sa pamamagitan ng pakikipag-ugnayan sa administrador ng Cassandra at sa pamamagitan ng paghahanap sa web.
    
Mga GenerateDataset Ang Xml ay may dalawang espesyal na opsyon para sa EDDTable FromCassandra:
    
    1. Kung ikaw ay papasok "&#33;&#33;&#33;". (nang walang mga sinipi) para sa keyspace, ang programa ay magpapakita ng listahan ng mga keyspace
    2. Kung papasok ka sa isang espesipikong keyspace at pagkatapos ay pumasok "&#33;&#33;&#33;&#33;&#33;"&#33; (nang walang mga sinipi) para sa tablename, ang programa ay magpapakita ng isang talaan ng mga tala sa keyspace na iyon at sa kanilang mga haligi.
##### Pagiging sensitibo sa Kaso{#case-sensitivity} 
* Case-insensitive Keyspace at Table Names -
Pinakikitunguhan ni Cassandra ang keyspace at mga pangalan ng mesa sa paraang case-insensitive. Dahil dito, hindi kayo kailanman gumamit ng panreserbang salita (ngunit sa ibang kaso) bilang isang Cassandra keyspace o pangalan ng mesa.
* Mga Pangalang Case-insensitive Column --
Sa pamamagitan ng default, pinakikitunguhan ni Cassandra ang mga pangalan ng kolum sa paraang case-insensitive. Kung gagamitin mo ang isa sa mga panreserbang salita ni Cassandra bilang pangalan ng kolum (pakisuyong huwag&#33;) , ikaw UST gamitin
```
        <columnNameQuotes>"<columnNameQuotes>  
```
sa loobdatasets.xmlpara sa dataset na ito kaya't sina Cassandra at CassandraERDDAP™ang mga pangalan ng kolum sa paraang case-sensitive. Malamang na ito ay magiging isang malaking sakit ng ulo para sa iyo, dahil mahirap malaman ang mga case-sensitive na bersyon ng mga pangalan ng kolum-Si Cassandra ay halos palaging nagtatanghal ng mga pangalan ng kolum bilang lahat ng mga mas mababang-case, anuman ang tunay na kaso.
* Makipagtulungan sa administrador ng Cassandra, na maaaring may mahalagang karanasan. Kung hindi maikarga ang dataset, basahin ang[error sa mensahe](#troubleshooting-tips)upang malaman kung bakit.
         
#### Cassandra&lt;koneksyon Pag - aari{#cassandra-connectionproperty} 
Ang Cassandra ay may mga katangiang koneksyon na maaaring tiyakin sadatasets.xml. Marami sa mga ito ay makaaapekto sa pagganap ng Cassandra-ERDDAP™koneksiyon. Sa kasamaang palad, ang mga katangian ni Cassandra ay dapat na ilagay sa programaJava, kayaERDDAP™ay kailangang may kodigo para sa bawat ari - arianERDDAP™ay umaalalay. Sa kasalukuyan,ERDDAP™ay umaalalay sa mga katangiang ito:
 (Ipinakikita ng mga default ang nakikita natin. Maaaring iba ang mga default ng iyong sistema.) 

*    **Pangkalahatang Options**   
    &lt;koneksyon Pangalan=" **Pag - aayos** "&gt; *wala ni isa|LZ4|Pagkabigla* &lt;/ Pag - uugnay Mga ari - arian&gt; (case-insensitive, default=ne)   
     (Pangkalahatang payong compression: gamitin ang 'none' kung ang koneksyon sa pagitan ng Cassandra at ngERDDAP™ay lokal/fast at gamitin 'LZ4' kung ang koneksyon ay malayong/mabagal.)   
    &lt;koneksyon Pangalan=" **kredensiyal** "&gt; *username/pasword* &lt;/ Pag - uugnay Mga ari - arian&gt; (literal'/')   
    &lt;koneksyon Pangalan=" **metriko** "&gt; *totoo|bulaan* &lt;/ Pag - uugnay Mga ari - arian&gt; (2021-01-25 ay default=tunay, ngayon ay hindi pinapansin at laging mali)   
    &lt;koneksyon Pangalan=" **daungan** "&gt; *Tagapag - alaga* &lt;/ Pag - uugnay Mga ari - arian&gt; (default para sa katutubong binary protocol=9042)   
    &lt;koneksyon Pangalan=" **ssl** "&gt; *totoo|bulaan* &lt;/ Pag - uugnay Mga ari - arian&gt; (default=bulaan)   
     (Nabigo ang aking mabilis na pagsisikap na gumamit ng ssl. Kung magtagumpay ka, pakisuyong sabihin mo sa akin kung paano mo ginawa ito.) 
*    **Mga Mapagpipilian sa Pagtatanong**   
    &lt;koneksyon Pangalan=" **Hindi nagbabago Kataasan** "&gt; *lahat|kahit sino|bawat\\_quorum|lokal na\\_isa|lokal na\\_quorum|lokal na\\_serial|isa|quorum|serye|tatlo|dalawa* &lt;/ Pag - uugnay Mga ari - arian&gt; (case-insensitive, default=ON)   
    &lt;koneksyon Pangalan=" **Halaga** "&gt; *Tagapag - alaga* &lt;/ Pag - uugnay Mga ari - arian&gt; (default=5000)   
     (Huwag magtakda ng bolyum sa mas maliit na halaga.)   
    &lt;koneksyon Pangalan=" **serialConsistencyLevel** "&gt; *lahat|kahit sino|bawat\\_quorum|lokal na\\_isa|lokal na\\_quorum|lokal na\\_serial|isa|quorum|serye|tatlo|dalawa* &lt;/ Pag - uugnay Mga ari - arian&gt; (case-insensitive, default=SERIAL) 
*    **Mga Mapagpipiliangbili**   
    &lt;koneksyon Pangalan=" **Pag - uugnay ng PanahonoutMillis** "&gt; *Tagapag - alaga* &lt;/ Pag - uugnay Mga ari - arian&gt; (default=5000)   
     (Huwag magtakda ng koneksyon TimeoutMillis sa mas maliit na halaga.)   
    &lt;koneksyon Pangalan=" **Pag - iingat** "&gt; *totoo|bulaan* &lt;/ Pag - uugnay Mga ari - arian&gt;
    &lt;koneksyon Pangalan=" **magbasa ngTimoutMillis** "&gt; *Tagapag - alaga* &lt;/ Pag - uugnay Mga ari - arian&gt;
     (Ang default na pagbasa ni Cassandra na ThismeoutMillis ay 12000, ngunitERDDAP™palitan ang default sa 120000. Kung si Cassandra ay naghahagis ng mga readingTimeouts, ang pagdaragdag nito ay maaaring hindi makatulong, dahil minsan ay inihahagis sila ni Cassandra bago ang panahong ito. Ang problema ay malamang na ikaw ay nag - iimbak ng napakaraming impormasyon sa bawat partisyon Pangunahing kombinasyon.)   
    &lt;koneksyon Pangalan=" **tumatanggap ng "BufferSize "** "&gt; *Tagapag - alaga* &lt;/ Pag - uugnay Mga ari - arian&gt;
     (Hindi malinaw kung ano ang default na requiberSize. Huwag itong gawing maliit na halaga.)   
    &lt;koneksyon Pangalan=" **soLinger** "&gt; *Tagapag - alaga* &lt;/ Pag - uugnay Mga ari - arian&gt;
    &lt;koneksyon Pangalan=" **Pag - aalis ng TecpNo** "&gt; *totoo|bulaan* &lt;/ Pag - uugnay Mga ari - arian&gt; (default=null) 

Kung kailangan mong magtakda ng iba pang mga katangiang nauugnay rito, tingnan ang ating mga katangian[sa pagkuha ng karagdagang suporta](/docs/intro#support).

Para sa isang ibinigay na simulap ng Tomcat, ang koneksyong Properties ay ginagamit lamang sa unang pagkakataon na ang isang dataset ay nilikha para sa isang ibinigay na Cassandra URL. Ang lahat ng mga reload ng dataset na iyon at lahat ng kasunod na datasets na nagbabahagi ng parehong URL ay gagamit ng orihinal na mga connectionProperties.
    
#### CQL{#cql} 
Ang Wikang Cassandra Query (CQL) ay mababaw na katulad ng SQL, ang wikang query na ginagamit ng mga tradisyonal na database. SapagkatOPeNDAPAng mga kahilingan ng taskular data ay dinisenyo upang gayahin ang mga kahilingan ng SQL tabular data, ito ay posible para saERDDAP™upang gawing CQL Round/PreparatedStatements ang mga tipular data requests.ERDDAP™nasa loob ng pangungusap[log.txt](/docs/server-admin/additional-information#log)gaya ng
bilang teksto: *Ang "Statement ASText "*   
Ang bersiyon ng pangungusap na nakikita mo ay magiging isang representasyon ng teksto ng pangungusap at magkakaroon lamang ng "?" kung saan ilalagay ang mga ipinagbabawal na halaga.
       
Hindi gaanong simple -- Sa kasamaang palad, ang CQL ay maraming pagbabawal kung saan ang mga haligi ay maaaring tanungin kung aling uri ng mga pagbabawal, halimbawa, ang partikulong mga pangunahing haligi ay maaaring ipagbawal ng = at IN, sa gayon,ERDDAP™ay nagpapadala ng ilang mga restriksiyon kay Cassandra at ilalapat ang lahat ng mga limitasyon matapos matanggap ang datos mula kay Cassandra. Upang makatulongERDDAP™tungkol kay Cassandra, kailangan mong magtakda [&lt;partisyon KeySourceNames&gt;] (#partitionkeysourcenames) , [&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) , at [&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames) sa loobdatasets.xmlpara sa dataset na ito. Ito ang pinakamahalagang mga paraan upang makatulongERDDAP™Magaling sa paggawa kasama ni Cassandra. Kung hindi mo sasabihinERDDAP™ang impormasyong ito, ang dataset ay lubhang babagalERDDAP™at gumamit ng tone - toneladang yamang Cassandra.
     
#### &lt;partisyon KeySourceNames gt;{#partitionkeysourcenames} 
Dahil ang partikulong key ay gumaganap ng sentral na papel sa mga mesa ni Cassandra,ERDDAP™kailangang malaman ang kanilangsourceNames at, kung may kaugnayan dito, iba pang impormasyon tungkol sa kung paano gagawang kasama nila.
* Itinakda mo sa MUST ang isang comma-weadd na listahan ng partition key source column na mga pangalan sadatasets.xmlgagamitin&lt;partisyon KeySourceNames&gt;.
Simpleng halimbawa,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Mas masalimuot na halimbawa,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* Mga Susi sa Pagpupulong -- Kung ang isa sa partisyonal na pangunahing haligi ay isang tudling sa timestamp na may mas magaspang na bersiyon ng isa pang tudling sa timestamp, tiyakin ito sa pamamagitan ng
     *partisyonKeySourcName/ibangColumnSourceName/time\\_precision*   
kung saantime\\_precisionay isa sa[time\\_precision](#time_precision)mga kuwerdas na ginagamit sa ibang lugarERDDAP.
Ang landas na Z satime\\_precisionAng string ay ang default, kaya hindi mahalaga kung angtime\\_precisionAng string ay nagtatapos sa Z o hindi.
Halimbawa,ERDDAP™ay magbibigay ng kahulugan sa petsa/sampletime/1970-01-01 bilang " Ang mga pag - aayos para sa petsa ay maaaring gawin mula sa mga pagbabawal sa panahon ng sampol sa pamamagitan ng paggamit nitotime\\_precision." Ang aktuwal na pagbabago ng mga pagbabawal ay mas masalimuot, subalit iyan ang sumaryo.
     **Gamitin ito kailanma't ito ay may kaugnayan.** Ito ang nagpapangyariERDDAP™sa mahusay na paggawa kasama ni Cassandra. Kung ang relasyong ito sa pagitan ng mga haligi ay umiiral sa isang dulang Cassandra at hindi mo sinasabiERDDAP™, ang dataset ay lubhang babagalERDDAP™at gumamit ng tone - toneladang yamang Cassandra.
* Walang Asawa Mahalagang mga Susi -- Kung nais mo ng isangERDDAP™datos na gagamitin sa trabaho na may isang halaga lamang ng isang partikulong susi, espisipiko *partisyonKeySourceName=halaga* .
Huwag gumamit ng mga sinipi para sa isang hanay ng numero, halimbawa, deviceid=1007
Gumamit ng mga sinipi para sa isang String column, halimbawa, stationid= "Point Pinos".
* Talaan ng mga Nilalaman Ang pagkakasunud - sunod ng partisyon&lt;dataVariable&gt; nasadatasets.xmlAlamin ang default na order ng mga resulta mula kay Cassandra. Mangyari pa, ang mga gumagamit ay maaaring humiling ng ibang uri ng order para sa isang ibinigay na set ng mga resulta sa pamamagitan ng pag - aapending &orderBy (" *Kasama-hating listahan ng mga variables* ") hanggang sa dulo ng kanilang tanong.
* Sa pamamagitan ng default, Cassandra atERDDAP™ang mga pangalan ng kolum sa paraang case-insensitive. Subalit kung ikaw ay magtatakda[haliging NanameQuotes](#case-sensitivity)",ERDDAP™ay gagamutin ang Cassandra column ng mga pangalan ng isang sa kaso-sensitive na paraan.
         
#### &lt;partisyon Susi;{#partitionkeycsv} 
Kung ito ay espesipikong,ERDDAP™gagamitin ito sa halip na hilingin kay Cassandra ang partisyon Pangunahing impormasyon sa tuwing muling ididiskarga ang dataset. Ito ay nagbibigay ng talaan ng magkakaibang partikulong mga pangunahing halaga, ayon sa pagkakasunud-sunod na gagamitin ang mga ito. Ang mga panahon ay dapat espesipikong bilang segundo simula 1970-01-01T00:00:00Z. Subalit mayroon ding dalawang pantanging mapagpipiliang paraan upang tiyakin ang mga panahon (ang bawat nakaposisyon bilang isang string) :

1) panahon (ISO8601 Panahon)   (Maaaring i-install bilang string)   
2) "Mga panahon (Ang ANISO8601StartTime, stepsconds, topTime) " (TANGGAPIN bilang tali)   
hihinto Ang panahon ay maaaring maging isang ISO8601 Panahon o Isang "now-"Units" na panahon (e.g., "now-3minutos") .
hihinto Ang panahon ay hindi kailangang maging eksaktong tugma ng simula Oras + x quickSconds.
Isang hanay na may mga panahon () Ang halaga ay lumalawak sa maraming hanay bago ang bawat query, kaya ang talaan ng partisyon Ang mga susi ay maaaring palaging perpektong up-to-date.
Halimbawa,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
ay lumalawak sa mesang ito ng partisyong mga pangunahing kombinasyon:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourNames gt;{#clustercolumnsourcenames} 
Tinatanggap ng Cassandra ang mga SQL-tulad ng mga strip sa mga kumpol na haligi, na siyang mga haligi na bumubuo sa ikalawang bahagi ng primary key (pagkatapos ng partisyon (s) ) . Kaya, mahalaga na makilala mo ang mga haliging ito sa pamamagitan ng&lt;clusterColumnSourceNames&gt;. Ito ang nagpapangyariERDDAP™sa mahusay na paggawa kasama ni Cassandra. Kung may kumpol na mga haligi at hindi mo sinasabiERDDAP, ang dataset ay lubhang babagalERDDAP™at gumamit ng tone - toneladang yamang Cassandra.
    * Halimbawa,&lt;ClusterColumnSourceNames&gt; *Ang akingClusterColumn1, ang akingClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Kung ang isang mesa ng Cassandra ay walang kumpol na mga haligi, alinman sa hindi espisipiko&lt;clusterColumnSourceNames&gt;, o magtakda nito nang walang halaga.
    * Sa pamamagitan ng default, Cassandra atERDDAP™ang mga pangalan ng kolum sa paraang case-insensitive. Subalit kung ikaw ay magtatakda[haliging NanameQuotes](#case-sensitivity)",ERDDAP™ang mga pangalan ng Cassandra column sa paraang case-sensitive.
         
#### &lt;indexColumnSourNames gt;{#indexcolumnsourcenames} 
Tinatanggap ni Cassandra'='Ang mga limitasyon sa mga tudling ng second index, na siyang mga tudling na malinaw na ginawa mo para sa mga indise
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Oo, kailangan ang mga panaklong.)   
Kaya, lubhang kapaki - pakinabang kung makikilala mo ang mga haliging ito sa pamamagitan ng&lt;indexColumnSourceNames&gt;. Ito ang nagpapangyariERDDAP™sa mahusay na paggawa kasama ni Cassandra. Kung may mga index column at hindi mo sinasabiERDDAP, ang ilang mga katanungan ay magiging hindi kinakailangan, lubhang mabagalERDDAP™at gumamit ng tone - toneladang yamang Cassandra.
* Halimbawa,&lt;indexColumnSourceNames&gt; *ang aking IndexColumn1, ang aking IndexColumn2* &lt;/indexColumnSourceNames&gt;
* Kung ang isang mesa ng Cassandra ay walang mga hanay ng indise, alinman sa hindi espisipiko&lt;indexColumnSourceNames&gt;, o magtakda nito nang walang halaga.
* BABALA: Ang mga indise ng Cassandra ay hindi tulad ng mga index ng database. Nakatutulong lamang ang mga indise ng Cassandra'='Mga pagbabawal. At sila'y tanging[mungkahi](https://cassandra.apache.org/doc/latest/cql/indexes.html)para sa mga tudling na may mas kaunting natatanging mga halaga kaysa kabuuang mga halaga.
* Sa pamamagitan ng default, Cassandra atERDDAP™ang mga pangalan ng kolum sa paraang case-insensitive. Subalit kung ikaw ay magtatakda[haliging NanameQuotes](#case-sensitivity)",ERDDAP™ang mga pangalan ng Cassandra column sa paraang case-sensitive.
         
#### &lt;maxRequestFractiongt;{#maxrequestfraction} 
KailanERDDAP™  (muli) ng isang dataset,ERDDAP™mula sa Cassandra ang talaan ng iba't ibang kombinasyon ng partisyong mga susi. Para sa malaking dataset, ang bilang ng mga kombinasyon ay magiging napakalaki. Kung nais mong hadlangan ang mga gumagamit na humiling ng karamihan o lahat ng dataset (o kahit na ang isang kahilingan na humihilingERDDAP™upang makuha ang karamihan o lahat ng impormasyon upang higit pang masala ito) , masasabi moERDDAP™upang pahintulutan lamang ang mga kahilingan na bawasan ang bilang ng mga kombinasyon sa pamamagitan ng ilang dami&lt;maxRequestFraction&gt;, na isang lumulutang na point number sa pagitan ng 1e-10 (na nangangahulugang hindi kakailanganin ng kahilingan ang mahigit sa 1 kombinasyon sa isang bilyon) at 1 (ang default, na nangangahulugang ang kahilingan ay maaaring para sa buong dataset) .
Halimbawa, kung ang isang dataset ay may 10000 magkakaibang kombinasyon ng partikulong mga susi at ang maxRequestFraction ay itinakda sa 0.1,
kung gayon ang mga kahilingan na nangangailangan ng impormasyon mula sa 1001 o higit pang kombinasyon ay lilikha ng maling mensahe,
ngunit ang mga kahilingan na nangangailangan ng datos mula 1000 o mas kaunting mga kombinasyon ay pahihintulutan.
    
Sa pangkalahatan, mientras mas malaki ang dataset, mas mababa ang dapat mong itakda&lt;maxRequestFraction&gt;. Kaya maaari mo itong ilagay sa 1 para sa isang maliit na dataset, 0.1 para sa isang medium-sized dataset, 0.01 para sa isang malaking dataset, at 0.0001 para sa isang malaking dataset.
    
Ang pamamaraang ito ay hindi sakdal. Ito ay hahantong sa ilang mga makatuwirang kahilingan na tanggihan at ang ilang mga masyadong-big na kahilingan ay pinapayagan. Subalit ito ay isang mahirap na problema at ang lunas na ito ay mas mabuti kaysa wala.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Tulad ng iba pang EDDTable datasets, maaari mong tiyakin ang isang comma-weaded na listahan ng mga datos&lt;dataVariable&gt;destinationNamesa isang pangglobong katangian na tinatawag na "[subsetVariables](#subsetvariables)" upang makilala ang mga pagkakaiba - iba na may limitadong bilang ng mga pamantayan. Ang dataset pagkatapos ay magkakaroon ng .subset web page at ipakita ang mga listahan ng mga natatanging halaga para sa mga variable na iyon sa mga drop-down list sa maraming web page.
    
Kasama ang mga partikulong key variable at static column sa listahan ay SSTROGLYNCOMAHIRAP. Ang Cassandra ay makakalikha ng talaan ng mga magkakaibang kombinasyon na napakabilis at madali sa bawat pagkakataon na muling maikarga ang dataset. Ang isang eksepsiyon ay ang timestamp partition keys na magaspang na bersyon ng ilang iba pang selum ng timestamp -- malamang na pinakamabuting iwan ang mga ito sa listahan ng mgasubsetVariablesyamang maraming pamantayan at ang mga ito ay hindi gaanong kapaki - pakinabang sa mga gumagamit.
    
Kung isasama mo ang non-partition key, non-static variables sa talaan, ito ay malamang na maging **ang mismong** Tinatayang mahal para kay Cassandra sa bawat pagkakataon na ang dataset ay muling maikarga, sapagkat ang dataset ay muling ikarga,ERDDAP™ay kailangang tumingin sa bawat hanay ng dataset upang lumikha ng impormasyon. Sa katunayan, malamang na mabigo ang pagtatanong. Kaya, maliban sa napakaliit na datasets, ito ay SSTROGLY DISCOURAGED.
    
#### Cassandra DataTypes{#cassandra-datatypes} 
Sapagkat may ilang malabong bagay tungkol dito[Mga uri ng datos na Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html)mapa kung saanERDDAP™mga uri ng datos, kailangan mong magtakda ng isang [&lt;dataType&gt;] (#datatype) tag para sa bawat [&lt;dataVariable&gt;] (Nakatatawa) upang magsumbongERDDAP™na gagamitin ng dataType. Ang pamantayanERDDAP™datos Mga Uri (at ang pinakakaraniwang katumbas na uri ng datos na Cassandra) ay:
    
*   [Ekstasi](#boolean-data)  (Ekstasi) , naERDDAP™pagkatapos ay mag - imbak bilang mga byte
* byte (int, kung ang range ay -128 hanggang 127) 
* maikli (int, kung ang range ay -32768 hanggang 32767) 
* int (int, counter?, varint?, kung ang range ay -21474833648 hanggang 2147483647) 
* mahaba (Bigint, counter?, varint?, kung ang range ay -9223372036854775808 hanggang 92233720368547807) 
* Palutang (Palutang) 
* doble (Dalawang beses, titik (may posibleng pagkawala ng prekwensiya) , periodstamp) 
* char (accii o teksto, kung wala silang higit sa 1 karakter) 
* Pagpiga (ascii, teksto, varchar, inet, uuid, timeuid, blob, mapa, set, listahan?) 

Ang kay Cassandra[paatras](#cassandra-timestamp-data)ay isang pantanging kaso: paggamitERDDAP'dobleng datos Uri.

Kung itatakda mo ang isang String dataTypeERDDAP™para sa isang mapa ng Cassandra, set o talaan, ang mapa, set o talaan sa bawat hanay ng Cassandra ay babaguhin sa isang solong string sa isang solong hanay sa loob ng hanayERDDAP™mesa.ERDDAP™ay may alternatibong sistema para sa mga talaan; tingnan ang ibaba.

 *uri* Talaan --ERDDAP[ Mga]&lt;dataType&gt;] (#datatype) tag para sa CassandradataVariablemaaaring isama ang regularERDDAP™datos Mga Uri (Tingnan ang nasa itaas) Pati na rin ang ilang mga espesyal na dataType na maaaring gamitin para sa Cassandra list column: booleanList, byteList, ubyteList, shortList, umiklingList, intList, uintList, longList, ulongList, boatList, doubleList, charList, StringList. Kapag ang isa sa mga hanay ng talaang ito ay nasa mga resultang ipinapasaERDDAP™, ang bawat hanay ng source data ay lalawak upang itala. laki () mga hanay ng datos saERDDAP; simpleng datos Mga Uri (Halimbawa, int) sa source data row na iyon ay tutularan. laki () kung minsan. Kung ang mga resulta ay naglalaman ng higit sa isang talaan na variable, ang lahat ng mga talaan sa isang ibinigay na hanay ng datos na MUST ay may parehong sukat at ang MUST ay "parallel" na talaan, oERDDAP™ay lilikha ng maling mensahe. Halimbawa, para sa kasalukuyang sukat mula sa ADCP,
lalim\\[0\\], uCurrent\\[0\\], vCurrent\\[0\\], at zCurrent\\[0\\]lahat ay magkakaugnay, at
lalim\\[1\\], uCurrent\\[1\\], vCurrent\\[1\\], at zCurrent\\[1\\]ay pawang magkaugnay, ...
Pero kung ayaw moERDDAP™upang palawakin ang listahan sa maramihang hanay saERDDAP™mesa, Espesipikong Pagpiga Bilang angdataVariable' Type kaya ang buong talaan ay ikatawan bilang isang String sa isang hanay saERDDAP.
    
#### Cassandra Timestamp Data{#cassandra-timestamp-data} 
Ang time zones ay laging may kamalayan sa time zones. Kung papasok ka sa timestamp data nang hindi tinitiyak ang timezone, ipinapalagay ni Cassandra na ang timestamp ay gumagamit ng lokal na sona ng oras.
    
ERDDAP™ay umaalalay sa impormasyon at laging inihaharap ang impormasyon saZulu/GMT sona ng oras. Kaya kapag pumasok ka sa timestamp data sa Cassandra gamit ang time zone maliban sa time zoneZulu/GMT, tandaan na kailangan mong gawin ang lahat ng mga queries para sa timestamp data saERDDAP™paggamit ngZulu/GMT sona ng oras. Kaya huwag kang magtaka kung ang mga pamantayan na nagbabago ay lumabas sa mga pamantayanERDDAPay inililipat ng ilang oras dahil sa paglipat ng sona ng oras mula sa isang lugar tungo saZulu/GMT na panahon.

* Sa loobERDDAP'datasets.xml, sa loob&lt;dataVariable&gt; tag para sa timestamp variable, set
```
          <dataType>double</dataType>  
```
at saka&lt;addAttributes&gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Mungkahi: Kung ang data ay isang time range, kapaki-pakinabang na ang mga timestamp na halaga ay tumutukoy sa sentro ng ipinahiwatig na time range (Halimbawa, tanghali) . Halimbawa, kung ang isang gumagamit ay may datos para sa 2010-03-26T13:00Z mula sa ibang dataset at nais nila ang pinakamalapit na datos mula sa Cassandra dataset na ito na may datos para sa bawat araw, pagkatapos ay ang datos para sa 2010-03-26T12:00Z (Kinakatawan ang datos ng Cassandra para sa petsang iyon) ay maliwanag na siyang pinakamabuti (kabaligtaran ng hatinggabi bago o pagkatapos nito, kung saan hindi gaanong halata kung alin ang pinakamabuti) .
*   ERDDAP™may gamit sa[Pagkumberte sa Isang Numerikano Panahon na Upang/mula sa Pabagu - bagong Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Tingnan[PaanoERDDAP™Pakikitungo sa Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Mga Bulwagang Integer{#integer-nulls} 
Sinusuportahan ni Cassandra ang mga null sa Cassandra int (ERDDAP™int) at malaking bituka (ERDDAP™mahaba) mga haligi, ngunitERDDAP™ay hindi sumusuporta sa tunay na mga null para sa anumang uring integer data.
Sa pamamagitan ng default, ang Cassandra integer nulls ay babaguhinERDDAP™tungo sa 2147483647 para sa int alum, o 9223372036854775807 para sa mahahabang haligi. Ang mga ito ay lilitaw bilang "NaN" sa ilang mga uri ng mga talaksang output ng teksto (Halimbawa, .csv) , "" sa ibang uri ng mga talaksang output ng teksto (Halimbawa,.htmlTable) , at ang espesipikong numero (21474833647 para sa nawawalang institusyon) sa ibang uri ng files (halimbawa, mga talaksang binary tulad ng.ncat banig) . Ang isang user ay maaaring maghanap ng mga hanay ng datos na may ganitong uri ng nawawalang halaga sa pamamagitan ng pagtukoy sa "NaN", e.g, "BicwinSpeed=NaN".
    
Kung gumagamit ka ng iba pang integer na halaga upang ipahiwatig ang nawawalang mga halaga sa iyong mesa sa Cassandra, pakisuyong kilalanin ang halaga nitodatasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Para kay Cassandra lumulutang na mga haliging point, ang mga null ay nakukumberte sa mga NaN saERDDAP. Para sa mga uri ng datos na Cassandra na ginagawang mga String saERDDAP™, ang mga null ay nakukumberte sa walang laman na Strings. Hindi iyan dapat maging problema.
    
#### "Warning: Re-preparang naihanda nang query".{#warning-re-preparing-already-prepared-query} 
* "WARNING: Muling-handa na ang query" sa *tomcat* /logs/catalina.out (o iba pang talaksang log na Tomcat)   
Ang dokumentasyon ng Cassandra ay nagsasabi na may problema kung ang parehong query ay ginagawang isang RehandaStatement nang dalawang beses (o higit pa) . (Tingnan ito[ulat ng bug](https://datastax-oss.atlassian.net/browse/JAVA-236).) Upang maiwasang magalit si Cassandra,ERDDAP™Lahat ng mga cache ay nakahandang mga estatement upang magamit muli ito. Ang cache na iyon ay nawawala kung/kapag Tomcat/ERDDAP™ay muling naka-arte, ngunit sa tingin ko ay okay dahil sa ang mga Handang Sestatement ay nauugnay sa isang ibinigay na sesyon (sa pagitanJavaat si Cassandra) , na nawala rin. Kaya, maaaring makita mo ang mga mensaheng ito. Wala na akong alam na ibang solusyon. Mabuti na lamang, ito ay isang babala, hindi isang pagkakamali (Bagaman nagbabanta si Cassandra na maaari itong humantong sa mga problema sa pagsasagawa) .
    
Sinasabi ni Cassandra na ang mga Separatement ay mabuti magpakailanman, kayaERDDAP'Hindi dapat maging out-of-date/invalid ang mga cached Resetment. Kung hindi totoo iyan, at nagkakamali ka tungkol sa ilang inihandang mga estatement ay out-of-date/invalid, kung gayon kailangan mong mag-restartERDDAP™hanggang sa malinawERDDAP'Ang cache of RehandaStatements.
    
#### Seguridad ng Cassandra{#cassandra-security} 
Tingnan[Pag - aayos ng Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

Kapag gumagawang kasama ni Cassandra, kailangan mong gawin ang mga bagay nang ligtas at matatag hangga't maaari upang maiwasan ang pagpapahintulot sa isang may malisyang tagagamit na sirain ang iyong Cassandra o makakuha ng access sa datos na hindi nila dapat makuha.ERDDAP™sikaping gawin ang mga bagay - bagay sa isang tiwasay na paraan.

* Hinihimok ka namin na magtatagERDDAP™upang makipag-ugnayan sa Cassandra bilang isang tagagamit ng Cassandra na tanging may access lamang sa **Mahalaga** mesa (s) at tanging ang may mga pribilehiyo lamang sa pagbasa.
* Hinihimok ka namin na gumawa ng koneksiyon mula saERDDAP™papuntang Cassandra kung kaya't ito'y naging
    * Laging gumamit ng SSL,
    * ay nagpapahintulot lamang ng mga koneksiyon mula sa isang direksiyon ng IP (o isang bloke ng mga direksiyon) at mula sa isaERDDAP™gumamit, at gumamit
    * lamang ang paglilipat ng mga password sa kanilang anyong MD5 hashed.
*   \\[KILALANG PROBLEMA\\]Ang mga Hula Tungkol sa Kaugnayan (kasama ang password&#33;) ay iniimbak bilang simpleng tekstodatasets.xml. Wala pa kaming makitang paraan para makapasok ang administrador sa password ng CassandraERDDAP'Umula sa Tomcat (na nangyayari nang walang gumagamit na input) , kaya ang password ay dapat na makuha sa isang file. Upang gawin itong mas ligtas:
    * Ikaw (angERDDAP™Tagapangasiwa) dapat na may - aridatasets.xmlat nakapagbasa at nakapagsaayos ng access.
    * Gumawa ng isang grupo na kinabibilangan lamang ng user=tomcat. Gumamit ng chgrp upang gawin ang grupo para sadatasets.xml, na may mga pribilehiyo lamang sa pagbasa.
    * Gumamit ng chmod upang mag-atas ng mga pribilehiyong o-rwx (walang basa o advance para sa "ibang" tagagamit) para sadatasets.xml.
* Kapag nasaERDDAP™, ang password at iba pang mga katangian ng koneksyon ay iniimbak sa "private"JavaIba't iba.
* Ang mga kahilingan mula sa mga kliyente ay inilalagay at sinusuri kung totoo ito bago gawin ang mga kahilingan ng CQL para kay Cassandra.
* Ang mga kahilingan kay Cassandra ay ginagawa gamit ang CQL Retard/PreparatedStatements, upang maiwasan ang pag-iniksiyon ng CQL. Sa anumang kaso, ang Cassandra ay likas na hindi gaanong madaling mabakunahan ng CQL kung ihahambing sa tradisyonal na mga database[Pag - iiniksiyon ng SQL](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Bilis ng Cassandra{#cassandra-speed} 
Ang Cassandra ay maaaring maging mabilis o mabagal. May ilang bagay na magagawa ka upang mapabilis ito:
* Sa Heneral -
Ang katangian ng CQL ay na ang mga queries ay[declarative](https://en.wikipedia.org/wiki/Declarative_programming). Itinakda lamang nila kung ano ang gusto ng gumagamit. Hindi kasama sa mga ito ang isang detalye o mga pahiwatig kung paano dapat pangasiwaan o gawin ang query. Kaya walang lunasERDDAP™upang malikha ang query sa paraan na ito'y tumutulong kay Cassandra na gawing optimente ang query (o sa anumang paraan ay sabihin kung paano dapat hawakan ang pila) . Sa pangkalahatan, nasa administrador ng Cassandra ang pagtatatag ng mga bagay - bagay (Halimbawa, mga indise) upang maging kapaki - pakinabang para sa ilang uri ng mga tanong.
     
* Paglalarawan sa mga timestamp column na nauugnay sa mas magaspang na-precision timestamp partition keys sa pamamagitan [&lt;partisyon KeySourceNames&gt;] (#partitionkeysourcenames) ang pinakamahalagang paraan upang makatulongERDDAP™Magaling sa paggawa kasama ni Cassandra. Kung ang relasyong ito ay umiiral sa isang dulang Cassandra at hindi mo sinasabiERDDAP™, ang dataset ay lubhang babagalERDDAP™at gumamit ng tone - toneladang yamang Cassandra.
     
* Paglalarawan sa kumpol ng mga haligi sa pamamagitan [&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) ang ikalawang pinakamahalagang paraan upang makatulongERDDAP™Magaling sa paggawa kasama ni Cassandra. Kung may kumpol na mga haligi at hindi mo sinasabiERDDAP, ang isang malaking subset ng posibleng mga queries para sa impormasyon ay hindi kinakailangan, lubhang babagalERDDAP™at gumamit ng tone - toneladang yamang Cassandra.
     
* Gumawa[Mga Indise](https://cassandra.apache.org/doc/latest/cql/indexes.html)para sa mga Karaniwang Kontroled Variable --
Maaari mong pabilisin ang ilang queries sa pamamagitan ng paglikha ng mga indise para sa mga kolumna ng Cassandra na kadalasang nalilimitahan ng "=" na mga demand.
    
Hindi makagawa si Cassandra ng mga indise para sa talaan, set, o mga hanay ng mapa.
    
* Paglalarawan sa mga hanay ng indise sa pamamagitan [&lt;indexColumnSourceNames&gt;] (#indexcolumnsourcenames) ay isang mahalagang paraan ng pagtulongERDDAP™Magaling sa paggawa kasama ni Cassandra. Kung may mga index column at hindi mo sinasabiERDDAP, ang ilang katanungan para sa impormasyon ay hindi kinakailangan, lubhang babagalERDDAP™at gumamit ng tone - toneladang yamang Cassandra.
     
#### Mga Stat ng Cassandra{#cassandra-stats} 
*   ["Cassandra stats" Diagnostic Messages](#cassandra-stats)-- Sa bawat isaERDDAP™tagagamit ng query sa isang Cassandra dataset,ERDDAP™ay maglilimbag ng linya sa log file, *Malaking Direktoryo* /log/log.txt, na may ilang mga estadistikang may kaugnayan sa query, halimbawa,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Sa paggamit ng mga numero sa halimbawa sa itaas, ito'y nangangahulugan:

* KailanERDDAP™huli (muli) ang dataset na ito, sabi ni CassandraERDDAP™na may 10000 iba't ibang kombinasyon ng partisyong mga susi.ERDDAP™Nakalagay ang lahat ng iba't ibang kombinasyon sa isang file.
* Dahil sa mga limitasyon ng gumagamit,ERDDAP™Itukoy ang 2 mga kombinasyon sa 10000 na maaaring magkaroon ng nais na datos. Kaya,ERDDAP™ay gagawa ng 2 tawag kay Cassandra, isa para sa bawat kombinasyon ng partikulong mga susi. (Iyan ang kailangan ni Cassandra.) Maliwanag, mahirap kung ang isang malaking dataset ay may maraming kombinasyon ng partisyong mga susi at ang isang ibinigay na kahilingan ay hindi lubhang nakababawas niyan. Maaari mong hilingin na bawasan ng bawat kahilingan ang pangunahing espasyo sa pamamagitan ng pagtatakda [ng]&lt;maxRequestFraction&gt;] (#maxrequestfraction) . Dito, 2/10000=2e-4, na mas mababa sa maxRequestFraction (0.1) , kaya pinayagan ang kahilingan.
* Pagkatapos ikapit ang mga pagbabawal sa partisyong mga susi,[kumpol ng mga haligi](#clustercolumnsourcenames), at[Mga hanay ng indise](#indexcolumnsourcenames)na ipinadalaERDDAP™, ibinalik ni Cassandra ang 1200 hanay ng datos saERDDAP™sa passerSet.
* Ang Resulta Tiyak na ikaw ay inilagay roon[datos Type= *pagkain* Talaan](#cassandra-datatypes)mga haligi (na may katamtamang 10 bagay sa bawat listahan) , dahilERDDAP™pinalawak ang 1200 hanay mula sa Cassandra tungo sa 12000 hanay saERDDAP.
*   ERDDAP™ay laging kumakapit sa mga datos mula sa Cassandra. Sa kasong ito, ang mga limitasyon na hindi hinawakan ni Cassandra ay nakabawas sa bilang ng mga hanay hanggang sa 7405. Iyan ang bilang ng mga hanay na ipinadala sa gumagamit.

Ang pinakamahalagang gamit ng mga mensaheng ito sa pagsusuri ay tiyakin naERDDAP™ay ginagawa ang inaakala mong ginagawa nito. Kung hindi gayon (Halimbawa, hindi ba't nababawasan nito ang bilang ng iba't ibang kombinasyon gaya ng inaasahan?) , kung gayon ay magagamit mo ang impormasyon upang alamin kung ano ang nangyayari.
 
* Pananaliksik at eksperimento upang mahanap at maging mas mabuti [&lt;[Property&gt;] (#cassandra-connectity) ' s.
 
* Tingnan ang bilis ng koneksiyon ng network sa pagitan ng Cassandra at ngERDDAP. Kung mabagal ang koneksiyon, tingnan kung mapasusulong mo pa ito. Ang pinakamabuting kalagayan ay kapagERDDAP™ay tumatakbo sa isang server na nakakabit sa iisang server (mabilis) Palitan habang ang server na nagpapatakbo sa Cassandra node kung saan ka nag-uugnay.
 
* Pakisuyong maging matiyaga. Basahing mabuti ang impormasyon dito at sa dokumento ni Cassandra. Eksperimento. Suriin ang inyong akda. Kung ang Cassandra-ERDDAP™Mas mabagal pa ang koneksyon kaysa sa inaasahan mo, pakisuyong isama ang schema at ang iyong Cassandra tableERDDAP™Larawan ngdatasets.xmlat tingnan ang ating[sa pagkuha ng karagdagang suporta](/docs/intro#support).
 
* Kung ang lahat ay mabigo,
ang pag - iimbak ng impormasyon sa koleksiyon ngNetCDFv3.ncmga talaksan (lalo na.ncmga talaksan na gumagamit ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array data istruktura kaya't maaaring hawakan gamit angERDDAP'[Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)) . Kung sila ay makatuwirang organisado (bawat isa ay may datos para sa isang tipak ng espasyo at panahon) ,ERDDAP™ay madaling makakuha ng impormasyon mula sa mga ito.
         
#### EDDTable Mula sa kalansay ngCassandra XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Mapagkakatiwalaan Mula sa Pagiging Mapagkakatiwalaan{#eddtablefromdapsequence} 
[ **Mapagkakatiwalaan Mula sa Pagiging Mapagkakatiwalaan** ](#eddtablefromdapsequence)humahawak ng mga variable sa loob ng 1- at 2-level sequences mula sa[DAP](https://www.opendap.org/)mga server gaya ngDAPPER (noon https://www.pmel.noaa.gov/epic/software/dapper/ , ngayo'y huminto) .

* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti. Maaari mong tipunin ang impormasyon na kailangan mo sa pamamagitan ng pagtingin sa mga file ng source dataset at DAS sa iyong browser (sa pamamagitan ng pagdaragdag ng .das at .dds sa source datasetsourceUrl( Isang halimbawa ang nasa https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* Iba - iba ang kalagayanDAPAng pagkakasunud-sunod kung ang tugon ng .dds ay nagpapakita na ang estruktura ng data na humahawak ng variable ay isang "sequence". (kasong walang pakiramdam) .
* Sa ilang mga kaso, makikita mo ang isang pagkakasunud-sunod sa loob ng isang pagkakasunud-sunod, isang 2-level sequence -- EDDTable FromDapSequence ang humahawak din dito.
#### Kapani - paniwalang kalansay Mula sa Pang - akit XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTable Mula sa Didabasa{#eddtablefromdatabase} 
[ **EDDTable Mula sa Didabasa** ](#eddtablefromdatabase)humahawak ng datos mula sa isang kaugnay na talaan ng database o[pananaw](https://en.wikipedia.org/wiki/View_(database)).

#### Isang Table o Pangmalas{#one-table-or-view} 
Kung ang impormasyon na nais mong isilbi ay nasa dalawa o higit pang talaan (at sa gayo'y nangangailangan ng isang JOIN upang makuha ang impormasyon mula sa dalawang talaan nang sabay - sabay) , kailangan mong gumawa ng isa[ginawang normal](https://en.wikipedia.org/wiki/Denormalization)  (sumali na) mesa o[pananaw](https://en.wikipedia.org/wiki/View_(SQL)) taglay ang lahat ng impormasyon na nais mong makuha bilang isang datasetERDDAP.

Para sa malalaki at masalimuot na mga database, maaaring makatuwiran na ihiwalay ang ilang tipak bilang mga denormalized table, na ang bawat isa ay may iba't ibang uri ng impormasyon, na magiging hiwalay na mga datasetsERDDAP.

Paggawa ng isang denormalisadong mesa para gamitinERDDAP™ay maaaring magtinging isang baliw na ideya sa iyo. Pakisuyong magtiwala sa amin. May ilang dahilanERDDAP™ay gumagana na may denormalisadong mga mesa:

* Mas madali ito para sa mga gumagamit.
KailanERDDAP™ang dataset bilang isa, simple, denormalized, isang mesa, napakadali para sa sinuman na maunawaan ang impormasyon. Karamihan sa mga gumagamit ay hindi pa kailanman nakarinig ng tungkol sa normalisadong mga mesa, at kakaunti lamang ang nakauunawa sa mga susi, banyagang mga susi, o mesa ang sumasama, at halos tiyak na hindi nila alam ang mga detalye ng iba't ibang uri ng mga sumali, o kung paano bibigyang - katiyakan ang SQL upang gawin ang isang pagsama (o Maraming sumali) tama. Ang paggamit ng isang denormalisadong mesa ay umiiwas sa lahat ng mga problemang iyon. Ang dahilan lamang na ito ay nagbibigay - matuwid sa paggamit ng isang denormalisadong iisang mesa para sa paghaharap ng isang datasetERDDAP™gumagamit.
     
* Normal na mga mesa (Maraming talahanayan na inilahad ng mga pangunahing haligi) ay mahusay sa pag - iimbak ng impormasyon sa isang database.
Subalit kahit na sa SQL, ang resulta na ibinabalik sa gumagamit ay hindi normal (sumali) Iisang mesa. Kaya waring makatuwiran na iharap ang dataset sa mga gumagamit bilang isang pagkalaki - laki, hindi normal, nag - iisang mesa kung saan maaari silang humiling ng mga subset (e.g., ipakita mo sa akin ang mga hanay ng mesa kung saan ang temperatura&gt; 30) .
     
* Maaari kang magbagoERDDAP™nang hindi binabago ang iyong mga mesa.
    ERDDAP™ay may ilang kahilingan na maaaring naiiba sa kung paano mo itinayo ang iyong database.
Halimbawa,ERDDAP™Kailangang ilagay ang timestamp data sa 'timestamp na may mga timezone' field.
Sa pamamagitan ng paggawa ng hiwalay na mesa/view para saERDDAP™, magagawa mo ang mga pagbabagong ito kapag ginawa mo ang denormalisadong mesa para saERDDAP. Kaya, hindi mo kailangang gumawa ng anumang pagbabago sa iyong mga mesa.
     
*   ERDDAP™ang ilan sa mga kayarian ng normal na mga mesa.
Maaari mong tiyakin kung aling hanay ng impormasyon ang nagmumula sa 'outer' na mga tala at samakatuwid ay may limitadong bilang ng natatanging mga halaga.ERDDAP™ang lahat ng iba't ibang kombinasyon ng mga halaga sa mga hanay na ito at ihaharap ang mga ito sa mga gumagamit sa isang pantanging . subset web page na tumutulong sa mga gumagamit na mabilis na pumili ng mga subset ng dataset. Ang mga natatanging halaga para sa bawat kolum ay ipinapakita rin sa mga listahan ng drop-down sa iba pang mga web page ng dataset.
     
* Isang denormalisadong mesa ang gumagawa sa data hand-off mula sa iyo tungo saERDDAPMadaling gawin ito ng administrador.
Ikaw ang dalubhasa sa dataset na ito, kaya makatuwiran na ikaw ang magpasiya kung aling mga tala at kung aling mga tudling ang sasali at kung paano sasali sa mga ito. Kaya hindi mo kailangang ibigay sa amin (o mas malala pa, ang mga gumagamit ng dulo) Ilang mesa at detalyadong mga tagubilin kung paano sasali sa mga ito, kailangan mo lamang bigyan kami ng makukuhang denormalisadong mesa.
     
* Ang isang denormalisadong mesa ay nagpapahintulot ng mahusay na pagkuha ng impormasyon.
Ang denormalisadong anyo ay karaniwang mas mabilis na makuha kaysa normal na anyo. Maaaring maging mabagal ang mga sasali. Maaaring napakabagal ng maraming sasali.
     

Upang makuha ang impormasyon mula sa dalawa o higit pang talaan sa databaseERDDAP™, may tatlong mapagpipilian:
 

* Mungkahi:
Maaari kang lumikha ng isang comma- o tab-dead-halagang talaksan na may datos mula sa mesang denormalisado.
Kung napakalaki ng dataset, kung gayon makatuwiran na lumikha ng ilang file, bawat isa'y may cohesive subset ng denormalized table (halimbawa, datos mula sa mas maliit na time range) .
    
Ang malaking bentaha rito ay naERDDAP™ay magagamit ng gumagamit ang mga kahilingan para sa impormasyon nang walang anumang pagsisikap ng inyong database. KayaERDDAP™Hindi magiging pabigat sa iyong database o panganib sa seguridad. Ito ang pinakamabuting mapagpipilian sa halos lahat ng kalagayan sapagkatERDDAP™ay karaniwang makakakuha ng impormasyon mula sa mga file na mas mabilis kaysa sa database (kung babaguhin natin ang .csv files sa.ncMga file ng CF) . (Ang isang dahilan ay sapagkatERDDAPAng +file ay isang read-lamang na sistema at hindi kailangang harapin ang paggawa ng mga pagbabago habang nagbibigay ng[AKID](https://en.wikipedia.org/wiki/ACID)  (Atomicity, Kumperensiya, Pagbubukod, Haba ng Buhay) .) Gayundin, marahil ay hindi mo kakailanganin ang isang hiwalay na server yamang maaari nating itago ang impormasyon sa isa sa ating mga RAID at i - access ito sa isang umiiralERDDAP™sa isang umiiral na server.
    
* Option ng Okay:
Naglagay ka ng isang bagong database sa ibang computer na ang mesa ay hindi normal.
Yamang ang database na iyon ay maaaring maging isang malaya at bukas na source database tulad ng MariaDB, MySQL, at PostgresQL, ang opsiyon na ito ay hindi kinakailangang mahal.
    
Ang malaking bentaha rito ay naERDDAP™ay magagamit ng gumagamit ang mga kahilingan para sa impormasyon nang walang anumang pagsisikap sa pamamagitan ng inyong kasalukuyang database. KayaERDDAP™Hindi magiging pabigat sa iyong kasalukuyang database. Inaalis din nito ang maraming pagkabahala sa seguridad mula noonERDDAP™ang iyong database.
    
* Bigong Mapagpipilian:
Maaari tayong makipag - ugnayanERDDAP™sa iyong kasalukuyang database.
Upang magawa ito, kailangan mong:
    
    * Gumawa ng hiwalay na mesa o tanawin na may denormalisadong talaan ng mga datos.
    * Gumawa ng "erddap" na gumagamit na nakapagbasa-lamang ng mesang denormalisado lamang (s) .
         
    
Ito ang opsyon kung ang data ay madalas magbago at nais mong magbigayERDDAP™madaling makuha ng mga gumagamit ang mga pagbabagong iyon; gayunman, kahit na gayon, makabubuting gamitin ang option ng file sa itaas at sa pana - panahon (tuwing 30 minuto?) Palitan ang talaksan na may datos ngayon.
Ang pagkalaki - laking disbentaha ng pamamaraang ito ay naERDDAP™Ang mga kahilingan ng gumagamit ay malamang na maglalagay ng di - makayanang malaking pasanin sa iyong database at na ang mga ito ay maglalagay ng isang di - makayanang malaking pasaninERDDAP™Ang koneksyon ay isang panganib sa seguridad (Bagaman maaari nating bawasan/malaman ang panganib) .

Ginagawang hindi normal ang mesa o tanawinERDDAP™isang mabuting pagkakataon na gumawa ng ilang pagbabago naERDDAP™Kailangan, sa paraang hindi nakakaapekto sa iyong orihinal na mga tala:

* Palitan ang petsa at timestamp fields/columns upang gamitin ang dataType na tinatawag ng Postgres[Paglipas ng panahon](#database-date-time-data)  (o katumbas sa iyong database) .
Ang mga timestamp na walang impormasyon sa sona ng panahon ay hindi gumagana nang wastoERDDAP.
* Gumawa ng mga indise para sa mga tudling na kadalasang hinahanap ng mga gumagamit.
* Maging alisto sa[kaso ng mga pangalan ng field/column](#quotes-for-names-and-case-sensitivity)  (Halimbawa, gamitin ang lahat ng downcase) kapag minamakinilya mo ang mga ito.
* Huwag gumamit ng nakalaang mga salita para sa mesa at para sa mga pangalan ng field/column.

Kung kailangan mo ng tulong upang gawing normal ang mesa o tanawin, pakisuyong makipag - ugnayan sa administrador ng iyong database.
Kung gusto mong pag - usapan ang buong pamamaraang ito o i - strategy kung paano ito gagawin, pakisuyong email Chris. Juan sa noaa.gov .
    
#### database sadatasets.xml {#database-in-datasetsxml} 
Mahirap lumikha ng tamadatasets.xmlkailangan para saERDDAP™upang magtatag ng koneksyon sa database. Maging matiyaga. Maging sistematiko.
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
        
Mga GenerateDataset Ang Xml ay may tatlong espesyal na opsyon para sa EDDTable FromDatabase:
1. Kung ikaw ay papasok "&#33;&#33;&#33;". (nang walang mga sinipi) para sa katalogong pangalan, ipakikita ng programa ang listahan ng mga pangalan ng katalogo.
2. Kung ikaw ay papasok "&#33;&#33;&#33;". (nang walang mga sinipi) Para sa pangalan ng schema, ang programa ay magpapakita ng isang talaan ng mga pangalan ng schema.
3. Kung ikaw ay papasok "&#33;&#33;&#33;". (nang walang mga sinipi) para sa tablename, ang programa ay magpapakita ng isang talaan ng mga tala at ang kanilang mga haligi. Ang una ay ang gagamitin.
* Maingat na basahin ang lahat ng impormasyon ng dokumentong ito tungkol sa EDDTable FromDatabase.
* Maaari mong tipunin ang karamihan ng impormasyon na kailangan mo upang likhain ang XML para sa isang EDDTable FromDatabase dataset sa pamamagitan ng pakikipag-ugnayan sa administrador ng database at sa pamamagitan ng paghahanap sa web.
* Bagaman kadalasang tinatrato ng mga database ang mga pangalan ng hanay at mga pangalan ng mesa sa paraang case-insensitive, ang mga ito ay case-sensitive saERDDAP. Kaya kung may maling mensahe mula sa database na nagsasabing hindi alam ang pangalan ng hanay (halimbawa, "Unang kilalang identifier= ' *kolum na\\_name* '") Bagaman alam mong umiiral ito, subukin mong gamitin ang lahat ng kapital, halimbawa, *COLUMN\\_NAME* , na kadalasang ang totoo, case-sensitive na bersyon ng kolum na pangalan.
* Makipag - usap sa administrador ng database, na may mahalagang karanasan. Kung hindi maikarga ang dataset, basahin ang[error sa mensahe](#troubleshooting-tips)upang malaman kung bakit.
         
#### Tsuper ng JDBC{#jdbc-driver} 
* [JDBC Driver at&lt;DrerName&gt;] (#jdbc-driver) -- Kailangan mong makuha ang angkop na JDBC 3 o JDBC 4 driver .jar file para sa iyong database at JDBC 4 driver file
ilagay sa *tomcat* /webapps/erddap/WEB-INF/lib matapos mong i-installERDDAP. Pagkatapos, sa iyong siliddatasets.xmlpara sa dataset na ito, dapat mong tiyakin ang&lt;DrerName&gt; para sa drayber na ito, na ito (Sa kasamaang palad) na iba sa pangalan. Hanapin sa web para sa drayber ng JDBC para sa iyong database at sa driverName naJavakailangang gamitin ito.
    
    * Para sa MariaDB, subukan[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
Ang&lt;" DrerName&gt; " upang gamitindatasets.xml  (Tingnan ang ibaba) ay malamang na org.mariadb.jdbc. Driver .
    * Para sa MySQL at Amazon RDS, subukan[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
Ang&lt;" DrerName&gt; " upang gamitindatasets.xml  (Tingnan ang ibaba) ay malamang na com.mysql.jdbc. Driver .
    * SapagkatOracle, subukan[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
Ang&lt;" DrerName&gt; " upang gamitindatasets.xml  (Tingnan ang ibaba) marahil ay orakulo.jdbc.d ilog.OracleDriver .
    * Para sa Postgresql, nakuha namin ang drayber ng JDBC 4[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
Ang&lt;" DrerName&gt; " upang gamitindatasets.xml  (Tingnan ang ibaba) ong.postgresql. Driver .
    * Para sa SQL Server, makukuha mo ang drayber ng JTDS JDBC mula sa[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
Ang&lt;" DrerName&gt; " upang gamitindatasets.xml  (Tingnan ang ibaba) ay malamang net.sourceforge.jtds.jdbc. Driver .
    
Pagkatapos mong ilagay ang drayber ng JDBC .jarERDDAP™Lib directory, kailangan magdagdag ng reperensiya sa .jar file na iyon sa .bat at/o .sh script files para sa GenerateDatasets Xml, DasDds, at ArchiveADataset na nasa loob ng *tomcat* /webapps/erddap/WEB-INF/ directory; kung hindi, makakakuha ka ng Class NotFoundException kapag pinapatakbo mo ang mga script na iyon.
    
Sa kasamaang palad, ang JDBC kung minsan ang pinagmumulan ng problema. Sa papel nito bilang tagapamagitan sa pagitan ngERDDAP™at ang database, minsan ay gumagawa ito ng mga bahagyang pagbabago sa pamantayan/generikong database SQL na humihiling naERDDAP™Lumilikha, sa gayo'y lumilikha ng mga problema (Halimbawa, may kaugnayan sa[Itaas/lowercase identifiers](#quotes-for-names-and-case-sensitivity)at may kaugnayan[date/time timezones](#database-date-time-data)) . Pakisuyong maging matiyaga, basahing mabuti ang impormasyon dito, tingnan ang inyong trabaho, at tingnan ang aming akda[sa pagkuha ng karagdagang suporta](/docs/intro#support).
    
#### Pagtataya&lt;koneksyon Pag - aari{#database-connectionproperty} 
* [&lt;[Property&gt;] (#database-connectity) -- Nasadatasets.xmlpara sa iyong dataset, dapat mong bigyang - kahulugan ang ilang koneksyon Mga tag ng ari - arian na sasabihinERDDAP™kung paano magdurugtong sa iyong database (Halimbawa, upang tukuyin ang pangalan, password, ssl connection, at[laki](#set-the-fetch-size)) . Ang mga ito ay naiiba sa bawat kalagayan at medyo mahirap unawain. Hanapin ang web para sa mga halimbawa ng paggamit ng isang drayber ng JDBC na kumokonekta sa iyong database. Ang&lt;mga pangalan ng entity (Halimbawa, "user", "pastword", at "sl") , at ilan sa mga connectiveProperty values ay matatagpuan sa pamamagitan ng paghahanap sa web para sa "JDBC connection entries" *database Uri* " (Halimbawa,Oracle, MySQL, Amazon RDS, MariaDB, PostgresQL) .
     
#### Mga Sinipi Para sa mga Pangalan at Kasong Pagiging Madamayin{#quotes-for-names-and-case-sensitivity} 
*   [Mga Sinipi Para sa mga Pangalan sa Larangan/Column; Kasong Pagiging Madamayin](#quotes-for-names-and-case-sensitivity)- Sa pamamagitan ng default, ang EDDTable FromDatabase ay naglalagay ng ANSI-SQL-stand double quotes sa paligid ng field/column na mga pangalan sa mga statement ng SELECT sakaling gumamit ka ng isang nakalaang salita bilang isang field/column na pangalan, o isang espesyal na karakter sa isang field/column na pangalan. Ang dobleng mga sinipi ay humahadlang din sa ilang uri ng pag - atake ng SQL. Masasabi moERDDAP™upang gamitin ", ', o walang mga sinipi sa pamamagitan ng&lt;kolumna na NanameQuotes&gt; sa loobdatasets.xmlpara sa dataset na ito.
    
Para sa maraming database, ang paggamit ng anumang uri ng mga quote ay nagiging sanhi upang gumana ang database sa mga pangalan ng field/column sa isang kasong sensitibo (sa halip ng default database case na walang pakiramdam) . Kadalasang ipinapakita ng mga Databas ang talaksan/column na mga pangalan bilang lahat ng upper-case, kapag sa katunayan ang kasong sensitibong anyo ay iba. Sa loobERDDAP™, pakisuyong laging ituring ang mga pangalan ng talaan ng database na sensitibo sa kaso.
    
    * Para kay Maria DB, kailangan mong patakbuhin ang database[\\-sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * Para sa MySQL at Amazon RDS, kailangan mong patakbuhin ang database[\\-sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oraclesumusuporta sa ANSI-SQL-stand double quotes[sa pamamagitan ng default](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * Ang PostgresQL ay sumusuporta sa ANSI-SQL-stand double quotes sa pamamagitan ng default.
    
      
Huwag gumamit ng nakalaang salita para sa isang database, katalogo, schema o pangalan ng mesa.ERDDAP™ay hindi naglalagay ng mga sinipi sa kanilang paligid.
    
Kung maaari, gamitin ang lahat ng mas mababang-case para sa database, katalogo, schema, mga pangalan ng mesa at mga pangalan ng field kapag lumilikha ng database table (o pananaw) at kapag tinutukoy ang field/column na mga pangalan sadatasets.xmlsa loobERDDAP. Kung hindi, makakakuha ka ng maling mensahe na nagsasabi ng database, katalogo, schema, mesa, at/o larangan ay hindi natagpuan. Kung makuha mo ang maling mensaheng iyon, subukang gamitin ang case-sensitive na bersyon, ang lahat ng upper-case na bersyon, at ang lahat ng mas mababang-case na bersyon ng pangalan saERDDAP. Ang isa sa kanila ay maaaring magtrabaho. Kung hindi, kailangan mong palitan ang pangalan ng database, katalogo, schema, at/o mesa sa lahat ng mas mababang-case.
    
#### Pagtataya&lt;datos Uring;{#database-datatype} 
*   [Pagtataya](#database-datatype)[&lt;dataType&gt;] (#datatype) Mga Tag-init - Sapagkat may ilang malabong bagay tungkol dito[mga uri ng datos](https://www.w3schools.com/sql/sql_datatypes_general.asp)mapa kung saanERDDAP™mga uri ng datos, kailangan mong magtakda ng isang [&lt;dataType&gt;] (#datatype) tag para sa bawat [&lt;dataVariable&gt;] (Nakatatawa) upang magsumbongERDDAP™na gagamitin ng dataType. Bahagi ng problema ay na ang iba't ibang datasets ay gumagamit ng iba't ibang termino para sa iba't ibang uri ng datos - kaya laging sikaping itugma ang mga depinisyon, hindi lamang ang mga pangalan. Tingnan ang paglalarawan[PamantayanERDDAP™datos Mga Uri](#data-types), na kinabibilangan ng mga reperensiya sa mga katumbas na uri ng datos ng SQL.[Petsa at Pamayag](#database-date-time-data)ay pantanging mga kaso: gamitinERDDAP'dobleng datos Uri.
     
#### Tala ng Date Talaan ng mga Nilalaman{#database-date-time-data} 
Ang ilang database time column ay walang malinaw na time zone. Ang gayong mga haligi ay problema saERDDAP. Sinusuportahan ng mga Databas ang konsepto ng isang petsa (may o walang panahon) nang walang sona ng oras, bilang tinatayang haba ng panahon. SubalitJava  (at sa gayonERDDAP) ay tumatalakay lamang sa kagyat na petsa+ panahon sa isang timezone. Kaya maaaring alam mo na ang date time data ay batay sa lokal na sona ng oras (Mayroon man o walang daylight saving time) o ang GMT/Zulusona ng oras, subalitJava  (atERDDAP) Huwag. Inaakala namin noong una na maaari naming lutasin ang problemang ito (e.g, sa pamamagitan ng pagtatakda ng sona ng oras para sa tudling) , ngunit ang database+JDBC+JavaDahil sa mga interaksiyon, hindi ito maaasahan.
* Kaya,ERDDAP™Kailangang mag-imbak ka ng lahat ng petsa at date time data sa database table na may database data type na katumbas ng JDBC type "timestamp na may time zone". (Tamang - tama, na gumagamit ng GMT/Zulusona ng oras) .
* Sa loobERDDAP'datasets.xml, sa loob&lt;dataVariable&gt; tag para sa timestamp variable, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

at saka&lt;addAttributes&gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Mungkahi: Kung ang data ay isang time range, kapaki-pakinabang na ang mga timestamp na halaga ay tumutukoy sa sentro ng ipinahiwatig na time range (Halimbawa, tanghali) . Halimbawa, kung ang isang gumagamit ay may datos para sa 2010-03-26T13:00Z mula sa ibang dataset at nais nila ang pinakamalapit na datos mula sa isang database dataset na may datos para sa bawat araw, kung gayon ang database data para sa 2010-03-26T12:00Z (kumakatawan sa datos para sa petsang iyon) ay maliwanag na siyang pinakamabuti (kabaligtaran ng hatinggabi bago o pagkatapos nito, kung saan hindi gaanong halata kung alin ang pinakamabuti) .
*   ERDDAP™may gamit sa[Pagkumberte sa Isang Numerikano Panahon na Upang/mula sa Pabagu - bagong Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Tingnan[PaanoERDDAPPakikitungo sa Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Mga Bulwagang Integer{#integer-nulls-1} 
Sinusuportahan ng mga Databas ang mga null sa integer (int, maliit at maliit na butil) mga haligi, ngunitERDDAP™ay hindi sumusuporta sa tunay na mga null.
Ang mga null ng Database ay babaguhinERDDAP™127 para sa mga byte column, 255 para sa mga ubyte column, 32767 para sa mga maiikling kolumna, 65535 para sa mga umikling kolumna, 2147°483364747 para sa mga int column, 429967295 para sa mga uint column, 9,223,372,036,854,775,807 para sa mga mahahabang haligi, o 184467473709551615 para sa mga ulong haligi. Kung gagamitin mo ang mga default na iyon, pakisuyong kilalanin ang mga itomissing\\_values para sa mga gumagamit ng dataset saERDDAP™kasama

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

o

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Maaari mong gamitin ang "missing\\_value"Awitin sa halip ng "\\_FillValue".
Mga GenerateDataset Ang Xml ay awtomatikong nagdaragdag ng mga katangiang ito na \\_FillValue kapag ginawa nito ang iminungkahidatasets.xmlpara sa database datasets.

Para sa mga boating point column ng database, ang mga null ay ginagawang mga NaN inERDDAP.
Para sa mga uri ng data sa database na ginagawang StringsERDDAP™, ang mga null ay nakukumberte sa walang laman na Strings.
    
#### Seguridad ng Database{#database-security} 
* Kapag gumagawa sa pamamagitan ng mga database, kailangan mong gawin ang mga bagay - bagay nang ligtas at ligtas hangga't maaari para hindi masira ang database o makuha ang data na hindi nila dapat makuha.ERDDAP™sikaping gawin ang mga bagay - bagay sa isang tiwasay na paraan.
    * Isaalang - alang ang pagkopya, sa ibang computer, ng database at database tables na may datos na gusto moERDDAP™upang maglingkod. (Oo, para sa komersiyal na mga database na gaya ngOracle, ito ay nagsasangkot ng karagdagang bayad sa lisensiya. Ngunit para sa mga bukas na source database, tulad ng PostgresQL, MySQL, Amazon RDS, at MariaDB, ito ay walang bayad.) Ito'y nagbibigay sa iyo ng mataas na antas ng katiwasayan at humahadlang din sa iyoERDDAP™mga kahilingan mula sa pagpapabagal sa orihinal na database.
    * Hinihimok ka namin na magtatagERDDAP™upang ma-konekta ang database bilang isang gumagamit ng database na mayroon lamang access sa **Mahalaga** database (s) at tanging ang may mga pribilehiyo lamang sa pagbasa.
    * Hinihimok ka namin na gumawa ng koneksiyon mula saERDDAP™sa database para
        * Laging gumamit ng SSL,
        * ay nagpapahintulot lamang ng mga koneksiyon mula sa isang direksiyon ng IP (o isang bloke ng mga direksiyon) at mula sa isaERDDAP™gumamit, at gumamit
        * lamang ang paglilipat ng mga password sa kanilang anyong MD5 hashed.
    *   \\[KILALANG PROBLEMA\\]Ang mga Hula Tungkol sa Kaugnayan (kasama ang password&#33;) ay iniimbak bilang simpleng tekstodatasets.xml. Wala kaming makitang paraan para makapasok ang administrador sa password ng databaseERDDAP'Umula sa Tomcat (na nangyayari nang walang gumagamit na input) , kaya ang password ay dapat na makuha sa isang file. Upang gawin itong mas ligtas:
        * Ikaw (angERDDAP™Tagapangasiwa) dapat na may - aridatasets.xmlat nakapagbasa at nakapagsaayos ng access.
        * Gumawa ng isang grupo na kinabibilangan lamang ng user=tomcat. Gumamit ng chgrp upang gawin ang grupo para sadatasets.xml, na may mga pribilehiyo lamang sa pagbasa.
        * Gumamit ng chmod upang mag-atas ng mga pribilehiyong o-rwx (walang basa o advance para sa "ibang" tagagamit) para sadatasets.xml.
    * Kapag nasaERDDAP™, ang password at iba pang mga katangian ng koneksyon ay iniimbak sa "private"JavaIba't iba.
    * Ang mga kahilingan mula sa mga kliyente ay inilalagay at sinusuri para sa katotohanan bago gawin ang mga kahilingan ng SQL para sa database.
    * Ang mga kahilingan sa database ay ginawa gamit ang SQL Preparatements, para maiwasan[Pag - iiniksiyon ng SQL](https://en.wikipedia.org/wiki/SQL_injection).
    * Ang mga kahilingan sa database ay isinusumite gamit ang extinct Tanong (hindi pa tapos) upang limitahan ang mga kahilingan na basahin-lamang (Kaya ang tangkang iniksiyon ng SQL upang baguhin ang database ay mabibigo rin sa kadahilanang ito) .
         
#### SQL{#sql} 
* SapagkatOPeNDAPAng mga kahilingan ng taskular data ay dinisenyo upang gayahin ang mga kahilingan ng SQL tabular data, ito ay madali para saERDDAP™upang gawing simpleng SQL Preparatements ang mga kahilingan ng tabular data. Halimbawa, angERDDAP™humiling
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
ay gagawing SQL Preparatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™mga kahilingan na may & Diwa () at/o &orderBy ( *Iba - iba* ) ay magdadagdag ng DISTINCT at/o ORDEY *Iba - iba* sa inihandang pangungusap ng SQL. Sa pangkalahatan, ito ay lubhang magpapabagal sa pagtugon mula sa database.
ERDDAP™mga trosong inihanda[log.txt](/docs/server-admin/additional-information#log)gaya ng
```
    statement=*thePreparedStatement*  
```
Ito ay magiging isang representasyon ng teksto ng Handang Statement, na maaaring bahagyang naiiba sa aktuwal na SederStatement. Halimbawa, sa SeparaStatement, ang panahon ay naka - rehistro sa isang pantanging paraan. Subalit sa representasyon ng teksto, lumilitaw ang mga ito bilang ISO 8601 petsang panahon.
     
#### Bilis ng Database{#database-speed} 
* Maaaring maging mabagal ang Databases. May ilang bagay na maaari mong gawin:
    * Sa Heneral -
Ang katangian ng SQL ay na ang mga queries ay[declarative](https://en.wikipedia.org/wiki/Declarative_programming). Itinakda lamang nila kung ano ang gusto ng gumagamit. Hindi kasama sa mga ito ang isang detalye o mga pahiwatig kung paano dapat pangasiwaan o gawin ang query. Kaya walang lunasERDDAP™upang makabuo ng query sa paraang tumutulong ito sa database na maging tamang - tama saquery (o sa anumang paraan ay sabihin kung paano dapat hawakan ang pila) . Sa pangkalahatan, nasa administrador ng database ang pagtatatag ng mga bagay - bagay (Halimbawa, mga indise) upang maging kapaki - pakinabang para sa ilang uri ng mga tanong.
##### Ilagay ang Fetch Size{#set-the-fetch-size} 
Ibinalik ng mga Databas ang impormasyon saERDDAP™sa mga tipak. Sa pamamagitan ng default, ang iba't ibang database ay nagbabalik ng ibang bilang ng hanay sa mga tipak. Kadalasan ang bilang na ito ay napakaliit at lubhang walang kakayahan. Halimbawa, ang default para saOracleay 10&#33; Basahin ang dokumentasyon ng JDBC para sa drayber ng iyong database na JDBC na hanapin ang connection property upang maparami ito, at idagdag ito sa paglalarawan ng datasetdatasets.xml. Halimbawa,
Para sa MySQL at Amazon RDS, gamitin
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Para sa MariaDB, sa kasalukuyan ay walang paraan upang baguhin ang laki ng bolyum. Subalit ito ay isang hiniling na bahagi, kaya saliksikin ang sapot upang alamin kung ito ay ipinatupad.
SapagkatOracle, gamitin
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Para sa PostgresQL, gamitin
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
ngunit malayang baguhin ang bilang. Ang paglalagay ng napakalaking bilang ang magiging sanhiERDDAP™upang gamitin ang maraming alaala at mas malamang na mawala sa alaala.
#### Mga Propesiya ng koneksyon{#connectionproperties} 
Ang bawat database ay may iba pang mga katangiang koneksyon na maaaring itukoy sadatasets.xml. Marami sa mga ito ang makaaapekto sa paggawa ng databaseERDDAP™koneksiyon. Pakisuyong basahin ang dokumentasyon para makita ng drayber ng JDBC ng inyong database ang mga pagpipilian. Kung masumpungan mong kapaki - pakinabang ang mga katangiang nauugnay, pakisuyong ipadala ang email na may mga detalyeerd dot data at noaa dot gov.
* Gumawa ng Table --
Malamang na mas mabilis ang magiging pagtugon sa iyo kung paminsan - minsan (araw - araw? kailanma't may bagong impormasyon?) lumilikha ng aktuwal na mesa (Gayundin sa kung paano mo nilikha ang palagay) at magsusumbongERDDAP™upang makakuha ng impormasyon mula sa mesa sa halip na sa paningin. Yamang ang anumang kahilingan sa mesa ay maaaring matupad sa panahong iyon nang hindi nagsasalu - salo ng ibang mesa, ang pagtugon ay magiging mas mabilis.
* Vacuum ang Table -
Ang mySQL at Amazon RDS ay mas mabilis na tutugon kung gagamitin mo[OPTIMZE DIPRE](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria Mas mabilis na tutugon ang DB kung gagamitin mo[OPTIMZE DIPRE](https://mariadb.com/kb/en/optimize-table/).
Ang postgresQL ay mas mabilis na tutugon kung ikaw ay[PAG - ASA](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)ang mesa.
    Oracleay hindi nagtataglay o nangangailangan ng analogous command.
* Gumawa[Mga Indise](https://en.wikipedia.org/wiki/Database_index)para sa mga Karaniwang Kontroled Variable --
Maaari mong pabilisin ang maraming/most queries sa pamamagitan ng paggawa ng mga indise sa database para sa mga variables (na tinatawag ng mga database na "mga kolumn") na kadalasang nalilimitahan sa tanong ng gumagamit. Sa pangkalahatan, ang mga ito ay parehong mga variable na tinukoy ng [&lt;subsetVariables&gt;] (Mga #subsetvariable) at/o ang latitud, longhitud, at oras ay nagbabagu-bago.
##### Gumamit ng Connection Pooling{#use-connection-pooling} 
Karaniwan na,ERDDAP™gumawa ng hiwalay na koneksyon sa database para sa bawat hiling. Ito ang pinakamapagkakatiwalaang paraan. Ang mas mabilis na alternatibo ay ang paggamit ng DataSource na sumusuporta sa pag-uugnayan. Upang ayusin ito, magtakda (halimbawa)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
katabi&lt;sourceUrl&gt;,&lt;DrerName&gt;, at&lt;koneksyon Mga ari - arian&gt;.
At sa loob *tomcat* /conf/context.xml, bigyang kahulugan ang isang yaman na may parehong impormasyon, halimbawa,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Pangkalahatang impormasyon tungkol sa paggamit ng isang DateSource[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Tingnan[Tomcat Databource information](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)at[Mga halimbawa ng Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)o hanapin ang web para sa mga halimbawa ng paggamit ng DataSources sa iba pang application servers.
* Kung ang lahat ay mabigo,
ang pag - iimbak ng impormasyon sa koleksiyon ngNetCDFv3.ncmga talaksan (lalo na.ncmga talaksan na gumagamit ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Ragged Array data istruktura kaya't maaaring hawakan gamit angERDDAP'[Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)) . Kung sila ay makatuwirang organisado (bawat isa ay may datos para sa isang tipak ng espasyo at panahon) ,ERDDAP™ay madaling makakuha ng impormasyon mula sa mga ito.
         
#### Ang kalansay ng EDDTable FromDatabase XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Maaasahan Mula saEDDGrid {#eddtablefromeddgrid} 
[ **Maaasahan Mula saEDDGrid** ](#eddtablefromeddgrid)Pinalilikha mo ang isang EDDTable dataset mula sa anumang bagayEDDGriddatos.

* Ang ilang karaniwang dahilan sa paggawa nito ay:
    * Ito ay pumapayag sa dataset na i-queried saOPeNDAPMga limitasyon sa pagpili, na isang uri ng "katanungan ayon sa halaga". (na maaaring hiniling ng gumagamit) .
    * Ang dataset ay likas na isang tabular dataset.
* Ang halaga ng global attribute na "maxAxis0" (Karaniwang uri="int") , (ang default ay 10) ay gagamitin upang limitahan ang bilang ng axis\\[0\\]  (karaniwang ang"time"axis) Mga pamantayan ng kulongEDDGriddataset na maaaring ma-access kada request ng datos. Kung ayaw mong magkaroon ng limitasyon, magtakda ng halagang 0. Ang tagpong ito ay mahalaga sapagkat, kung hindi, magiging napakadali para sa gumagamit na magtanong ng EDDTable FromEDDGridupang tingnan ang lahat ng mga dataset ng grided. Iyan ay mangangailangan ng mahabang panahon at halos tiyak na mabibigo sa isang pagkakamali sa paglipas ng panahon. Ito ang tagpo na gumagawang ligtas na magkaroon ng EDDTable FromEDDGridng datos sa loob moERDDAPnang hindi nangangambang hahantong ito sa di - makatuwirang paggamit ng mga yaman.
* Kung ang kulongEDDGriday isang[EDDGridMula sa Erddap](#eddfromerddap)at angERDDAP™ay parehoERDDAP, kung gayon ay Mapagkakatiwalaan Mula saEDDGriday laging gagamit ng kasalukuyang makukuhang bersyon ng reperensiyang datosset nang direkta. Ito ay isang napakabisang paraan para sa EDDTable FromEDDGridupang makuha ang nakatiklop na impormasyon.
* [ Ang klaseng ito]&lt;Muling pagkarga [[Talaksan] (Mga #reload offenminute) ang mahalaga. Ang kulongEDDGrid'&lt;Hindi pinapansin ang muling pagkarga ng EveryNMinutes&gt;.
* Kung mahalaga [&lt;update EveryNMillis&gt;] (Mga #update offenmilli) ay inilalaan para sa dataset na ito, ito ay ipinagwawalang - bahala. Ang kulongEDDGrid'&lt;Ang mahalaga ay ang update EveryNMillis&gt;.
*   [GenerateDatasetsXml](#generatedatasetsxml)ay may opsyon para sa dataset type=EDDTable Mula saEDDGridna humihiling ng isang URLERDDAP  (Karaniwan nang parehoERDDAP)   (Na nagtatapos sa "/erddap/") at isang palagiang pagpapahayag. Mga GenerateDataset Pagkatapos ay lilikhain ng Xml ang XML para sa EDDTable FromEDDGriddatos para sa bawat naka-link na dataset sa loob ngERDDAP™na maydatasetIDna katugma ng regular na pananalita (gamitin ang .\\* upang itugma ang lahatdatasetIDs para sa nakatiklop na datos) .
    
Ang daglat ng XML na nililikha ng GenerateDatasetsXml para sa bawat dataset ay kinabibilangan ng:
    
    * AdatasetIDalin angEDDGrid'datasetIDKasama pa ang "\\_ATable".
    * Isang bagong buod na pangglobong katangian na siyang katangianEDDGrid' s buod at isang bagong unang parapo na naglalarawan kung ano ang dataset na ito.
    * Isang bagong titulo na pangglobong katangian na siyang katangianEDDGrid'Pangalang plus ", (Bilang Isang Mesa) ".
    * Isang bagong maxAxis0 global attribute na may halaga na 10.
#### Maaasahan Mula saEDDGridkalansay XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### Mapagkakatiwalaan Mula sa mga Bilibini{#eddtablefromfilenames} 
[ **Mapagkakatiwalaan Mula sa mga Bilibini** ](#eddtablefromfilenames)Lumilikha ng dataset mula sa impormasyon tungkol sa isang grupo ng mga file sa sistema ng server's file, kabilang ang isang URL para sa bawat file upang mai-download ng mga gumagamit ang mga file sa pamamagitan ngERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). Di - gaya ng lahat[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles)Mga subclass, ang uring dataset na ito ay hindi nagsisilbi ng datos mula sa loob ng mga file.

* Ang EDDTable FromFileNames ay kapakipakinabang nang:
    * Mayroon kang isang grupo ng mga file na nais mong ipamahagi bilang buong files dahil ang mga ito ay hindi naglalaman ng "data" sa katulad na paraan na ang mga regular na data file ay may datos. Halimbawa, ang mga file ng larawan, video file, dokumento ng Word, Excel ay nagpalaganap ng mga files ng sheet, PowerPoint representation files, o mga file ng teksto na may hindi naiayos na teksto.
    * May grupo ka ng mga file na may data sa format naERDDAP™Hindi pa makabasa. Halimbawa, isang project-specific, kaugalian, binary format.
         
#### Mapagkakatiwalaang Impormasyon Mula sa mga Biyenan{#eddtablefromfilenames-data} 
*   [Ang datos sa isang EDDTable FromFileNames dataset](#eddtablefromfilenames-data)ay isang mesa naERDDAP™Lumilikha ng on-the-fly na may impormasyon tungkol sa isang grupo ng mga lokal na files. Sa mesa, may isang hanay para sa bawat file. Apat na natatanging katangian sa[datasets.xmlpara sa datos na ito](#eddtablefromfilenames-skeleton-xml)kung aling mga file ang isasama sa dataset na ito:
    
##### talaksan Dir{#filedir} 
    *   &lt;fileDir&gt; -- Ito ay nagsasaad sa source directory sa sistemang file ng server na may mga file para sa dataset na ito. Ang mga file na aktuwal na matatagpuan sa file system ng server&lt;lilitaw ang fileDir&gt; sa url column ng dataset na ito sa loob ng isang virtual directory na pinangalanan https://*serverUrl*/erddap/files/*datasetID/* .
Halimbawa, kung angdatasetIDay jplMURSST,
at ang&lt;fileDir&gt; ay /home/data/mur/ ,
at ang directory na iyon ay may talaksan na pinanganlang jplMURSST20150103000000.png,
Pagkatapos ang URL na ipapalabas sa mga tagagamit para sa talaksang iyon ay magiging
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Bukod sa paggamit ng isang lokal na directory para sa&lt;fileDir&gt;, maaari mo ring tiyakin ang URL ng isang malayong, directory-tulad ng web page. Ito'y may kaugnayan sa:
        
        * Di-nag-aagregated datasets sa THEDDS, e.g.,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Ang server na ito ay hindi na magagamit.\\]
        * Hindi ma-gregated datasets saHyrax, e.g.,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Karamihan sa mga talaan ng Apache-tulad ng directory, e.g.,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### mula sa Bahay - Bata{#fromonthefly} 
[\\*\\*\\* mula sa On theFly](#fromonthefly)-- Para sa ilang malalaking timba na S3 (tulad ng noa-goes17, na may 26 milyong files) , maaaring kailanganin itoERDDAP™hanggang 12 oras upang kunin ang lahat ng impormasyon tungkol sa laman ng timba (at pagkatapos ay may iba pang mga problema) . Upang mapagtagumpayan ito, may isang pantanging paraan ng paggamit&lt;fileDir&gt; sa EDDTable FromFileNames upang gumawa ng dataset kasama ang directory at file na mga pangalan mula sa isang AWS S3 back. Ang dataset ay hindi magkakaroon ng listahan ng lahat ng mga direktoryo ng S3 bucket at file na mga pangalan na maaaring hanapin ng gumagamit sa pamamagitan ng mga kahilingan sa dataset. Ngunit ang dataset ay makakakuha ng mga pangalan ng mga direktoryo at files on-the-fly kung ang gumagamit ay tatawid sa directory hierarchy na may dataset's"files"Pumili. Kaya, ito ay nagpapahintulot sa mga gumagamit na browse ang file hierarkiya ng S3 back at mga file sa pamamagitan ng dataset's"files"sistema. Upang magawa ito, sa halip na itakda ang URL para sa bucket ng S3 bilang ang "Starting directory" (sa GenerateDatasets Xml) o&lt;fileDir&gt; (sa loobdatasets.xml) , gamitin:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
Halimbawa:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Tingnan ang Dokumentasyon para sa[Paggawang kasama ng S3 BucketsERDDAP™](#working-with-aws-s3-files), partikular na ang paglalarawan ng espesipikong format na dapat gamitin para sa S3 bucket URL. At tingnan
[ang mga detalyeng ito at ang isang halimbawa](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)ng paggamit\\*\\*\\* mula sa On TheFly.
        
##### Muling Pagdalaw{#recursive} 
*   &lt;Ibalik ang&gt; -- Mga larawan sa subdirectories ng&lt;fileDir&gt; na may mga pangalang katugma ng&lt;lilitaw ang talaksangRegex&gt; sa parehong subdirectories sa"files"URL kung&lt;Ang resitive&gt; ay nakatakdang magkatotoo. Ang default ay mali.
* [&lt;PathRegex&gt;] (#pathregex) -- Kung babalikan=tunay, Tanging mga pangalang directory na tumutugma sa pathRegex (default=".\\*") ay tatanggapin. Kung bumalik muli=mali, ito ay hindi pinapansin. Bihira itong gamitin, ngunit maaaring maging kapaki - pakinabang sa di - pangkaraniwang mga kalagayan. (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### Larawan ng talaksan{#fileregex} 
*   &lt;talaksang Regex&gt; -- Mga pangalan lamang kung saan ang buong talaan (hindi kasama ang pangalan ng directory) makatugma ng&lt;Ang talaksangRegex&gt; ay isasama sa dataset na ito. Halimbawa, ang jplMURSST.&#123;14&#125;[kailangan ng sanggunian].png . (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### Mula sa talaan ng mga symbolic link{#from-file-names-data-table-contents} 
Sa dulang ay magkakaroon ng mga haliging kalakip:
* url -- Ang URL na magagamit ng mga gumagamit upang i-download ang file sa pamamagitan ngERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* Pangalan -- Ang pangalan ng talaksan (walang pangalang directory) .
* Huling Natukoy -- Ang panahon nang ang file ay huling binago (itago bilang doble"seconds since 1970-01-01T00:00:00Z") . Ang variable na ito ay kapakipakinabang dahil maaaring makita ng mga gumagamit kung/kapag ang nilalaman ng isang ibinigay na file ay huling nagbago. Ang variable na ito ay isang[panahon Pabagu - bago ang Selyo](#timestamp-variables), kaya ang data ay maaaring lumitaw bilang mga halaga ng numero (mga segundo simula 1970-01-01T00:00:00Z) o ang halagang String (ISO 8601:2004 (E) format) , depende sa kalagayan.
* laki -- Ang laki ng talaksan sa byte, na nakaimbak bilang doble. Ang mga ito ay iniimbak bilang mga doble dahil ang ilang mga file ay maaaring mas malaki sa mga int na pinapayagan at ang mga haba ay hindi suportado sa ilang mga response file type. Ang mga doble ay magbibigay ng eksaktong laki, kahit na sa napakalaking mga salansan.
* Mga tudling sa pagdaragdag na binigyang - kahulugan ngERDDAP™Tagapangasiwa na may impormasyong kinuha mula sa pangalan (halimbawa, ang oras na kaugnay ng datos sa file) Batay sa dalawang katangian na tinukoy mo sa metadata para sa bawat karagdagang kolum/dataVariable:
    
    * extract Regex -- Ito ay isang[Palagiang pagpapahayag](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([pagtuturo](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . Ang buong regex ay dapat na katugma ng buong pangalan (hindi kasama ang pangalan ng directory) . Dapat na kasali sa regex ang di - kukulangin sa isang grupo na nanghuhuli (isang bahagi ng regular na ekspresyon na napaliligiran ng mga panaklong) alinERDDAP™ay ginagamit upang malaman kung aling bahagi ng pangalan ang makukuha upang maging datos.
    * kinuha Grupo -- Ito ang bilang ng grupong binibihag (Ang #1 ay ang unang grupong nakahuli) sa regular na pananalita. Ang default ay 1. Ang isang grupong bihag ay isang bahagi ng isang regular na ekspresyon na napaliligiran ng mga panaklong.
    
Narito ang dalawang halimbawa:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
Sa kaso ng time variable, kung ang isang file ay may pangalang jplMURSST20150103000000.png, ang hinangongRegex ay magtutugma sa pangalan, kukunin ang mga karakter na tumutugma sa unang pangkat na bumihag ("201501030000000000".) bilang dataType=String, saka gamitin ang[mga pisi](#string-time-units)upang i-parse ang mga strando sa mga halaga ng datos (2015-01-03T00:00:00Z) .

Sa kaso ng day variable, kung ang isang file ay may pangalang jplMURSST20150103000000.png, ang hinangongRegex ay magtutugma sa pangalan, kukunin ang mga karakter na tumutugma sa unang pangkat na bumihag ("03") ng [&lt;dataType&gt;] (#datatype) \\=int, nagbibigay ng halagang datos na 3.
        
#### Iba Pang Impormasyon{#other-information} 
* [ Hindi]&lt;update EveryNMillis&gt;] (Mga #update offenmilli) -- Ang uring ito ng dataset ay hindi kailangan at hindi maaaring gamitin ang&lt;update EveryNMillis&gt; tag dahil ang impormasyong pinaglilingkuran ng EDDTable FromFileNames ay laging ganap na up-to-date dahilERDDAP™Tanungin ang sistema ng talaksan upang matugunan ang bawat kahilingan para sa impormasyon. Kahit na maraming file, dapat na mabisa ang pamamaraang ito. Ang isang tugon ay maaaring maging mabagal kung may malaking bilang ng mga file at ang dataset ay hindi na-requeried ng ilang sandali. Subalit sa loob ng ilang minuto pagkatapos niyan, pinananatili ng operating system ang impormasyon sa loob ng isang cache, kaya ang mga pagtugon ay dapat na napakabilis.
     
* Magagamit mo ang[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gawin angdatasets.xmlPara sa ganitong uri ng dataset. Maaari mong idagdag/pinohin ang karagdagang mga haligi na may impormasyong kinuha mula sa pangalan, gaya ng ipinakikita sa itaas.
     
#### EDDTable Mula sa kalansay ngFileNames XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Mapagkakatiwalaan Mula sa mga Bakod{#eddtablefromfiles} 
[ **Mapagkakatiwalaan Mula sa mga Bakod** ](#eddtablefromfiles)ang superclass ng lahat ng EDDTable From...Files classs. Hindi mo maaaring gamitin nang tuwiran ang EDDTable FromFiles. Sa halip, gumamit ng isang subclass ng EDDTable FromFiles upang pangasiwaan ang espesipikong uri ng talaksan:

*   [Mapagkakatiwalaan Buhat sa mga AsiciiFile](#eddtablefromasciifiles)Ang aggregates data mula sa mga comma-, tab-, semikolon-, o space-expressed tabular ASCII data files.
*   [Mga EDDTable Mula sa AudioFile](#eddfromaudiofiles)Ang aggregates data mula sa isang grupo ng mga lokal na audio files.
*   [Maaasahan Mula sa Mga HawsXmlFile](#eddtablefromawsxmlfiles)Ang mga datos mula sa set ng Automatic Weather Station (MGA AW) XML files.
*   [Kawili - wili Mula sa mga Labi ngColumnarAscii](#eddtablefromcolumnarasciifiles)Ang aggregates data mula sa tabular ASCII data files na may nakapirmeng-width data column.
*   [Maaasahan Mula saHyraxMga Bunton](#eddtablefromhyraxfiles)  (PINAHAHALAGAHAN) Ang aggregates data na may ilang variables, bawat isa ay may kabahaging dimensiyon (Halimbawa, panahon, altitud (o lalim) , latitud, longhitud) , at pinaglilingkuran ng isang[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
*   [Mapagkakatiwalaan Mula sa mga Di - pangkaraniwang CRAFile](#eddtablefrominvalidcrafiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .ncmga talaksan na gumagamit ng espesipiko, hindi tanggap, at iba't ibang uri ng CF DSG Contiguous Ragged Array (CRA) mga file. BagamanERDDAP™ay sumusuporta sa uring ito ng talaksan, ito ay isang hindi tanggap na uri ng talaksan na hindi dapat simulan ng sinuman na gamitin. Ang mga grupo na kasalukuyang gumagamit ng uring ito ng talaksan ay lubhang hinihimok na gamitinERDDAP™upang lumikha ng mga tanggap na talaksang CF DSG CRA at tumigil sa paggamit ng mga file na ito.
*   [EDDTable Mula saJsonlCSVFiles](#eddtablefromjsonlcsvfiles)Inaalam ang mga impormasyon mula sa[JON Mga file ng Lines CSV](https://jsonlines.org/examples/).
*   [Mga EDDTable Mula sa mga MultidimNcFile](#eddtablefrommultidimncfiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) na may iba't ibang sukat (Halimbawa, panahon, altitud (o lalim) , latitud, longhitud) .
*   [Mapagkakatiwalaan Mula sa mga Latian](#eddtablefromncfiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) na may iba't ibang sukat (Halimbawa, panahon, altitud (o lalim) , latitud, longhitud) . Mainam na ipagpatuloy ang paggamit ng dataset type na ito para sa umiiral na datasets, ngunit para sa mga bagong datasets inirerekomenda namin gamit ang EDDTable FromMultimNcFiles sa halip.
*   [Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) mga talaksan na gumagamit ng isa sa mga format ng talaksan na itinakda ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Mga kombensiyon. Subalit para sa mga file na gumagamit ng isa sa mga multidimensional na CF DSG variant, gamitin[Mga EDDTable Mula sa mga MultidimNcFile](#eddtablefrommultidimncfiles)sa halip.
*   [Nakasusuyang mga Latian](#eddtablefromnccsvfiles)Inaalam ang mga impormasyon mula sa[NCSV](/docs/user/nccsv-1.00)ASCII .csv files.
*   [Mapagkakatiwalaan Mula sa mga ParquetFile](#eddtablefromparquetfiles)humahawak ng datos mula sa[Parating](https://parquet.apache.org/).
*   [Mapagkakatiwalaang mga Talento](#eddtablefromthreddsfiles)  (PINAHAHALAGAHAN) Ang aggregates data mula sa mga files na may ilang variables na may kabahaging dimensiyon na pinaglilingkuran ng isang[MGA THEDDOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
*   [Maaasahan Mula saWFSMga Bunton](#eddtablefromwfsfiles)  (PINAHAHALAGAHAN) ay gumagawa ng lokal na kopya ng lahat ng impormasyon mula sa isang kopyaArcGISMapserWFSserver upang ang data ay agad na mai-serveERDDAP™gumagamit.

Sa kasalukuyan, walang ibang uri ng talaksan ang suportado. Subalit karaniwan nang madaling magdagdag ng suporta para sa ibang uri ng talaksan. Makipag - ugnayan sa amin kung mayroon kang kahilingan. O, kung ang iyong data ay nasa isang lumang file format na nais mong alisin, inirerekomenda namin na ikumberte ang mga fileNetCDFv3.ncmga talaksan (at lalo na.ncng talaksan kasama ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kontiguous Raged Array data istruktura --ERDDAP™ay madaling makakuha ng impormasyon mula sa mga ito) .NetCDFay isang malawak na suportado, binary format, nagpapahintulot ng mabilis na pag-akses sa datos, at suportado na ngERDDAP.

#### Mula sa mga Detalye{#fromfiles-details} 
Ang sumusunod na impormasyon ay kumakapit sa lahat ng mga subclass ng EDDTable FromFiles.
##### Pakikipagpunyagi{#aggregation} 
Ang klaseng ito ay nagkokodigo ng mga datos mula sa mga lokal na file. Ang bawat talaksan ay may hawak na isang (relatibo) maliit na talaan ng mga datos.
    * Ang resultang dataset ay lumilitaw na para bang ang lahat ng mga talaan ng talaksan ay pinagsama - sama (lahat ng hanay ng datos mula sa talaksan #1, at lahat ng hanay mula sa talaksan #2, ...) .
    * Ang mga file ay hindi kailangang magkaroon ng lahat ng mga itinakdang variables. Kung ang ibinigay na talaksan ay walang espesipikong variable,ERDDAP™ay magdaragdag ng nawawalang mga pamantayan kung kinakailangan.
    * Ang mga variable sa lahat ng mga file na MUST ay may parehong mga halaga para sa[add\\_offset](#scale_factor),[missing\\_value](#missing_value),[\\_Fill Halaga](#missing_value),[scale\\_factor](#scale_factor), at[mga yunit](#units)mga katangian (kung mayroon) .ERDDAP™tanong, ngunit isa itong hindi perpektong pagsubok - kung may iba't ibang pamantayan,ERDDAPhindi alam kung alin ang tama at kung gayon kung aling files ang hindi tanggap. Kung ito ay isang problema, maaari mong gamitin[NcML](#ncml-files)o[NCO](#netcdf-operators-nco)upang lutasin ang problema.
         
##### Mga Bukál na Nililikha{#compressed-files} 
Ang mga source data files para sa lahat ng EDDTable FromFiles subclass ay maaaring panlabas na siksik (e.g.,.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, o .Z) . Tingnan ang[Ang Externally Compressed File Dokuments](#externally-compressed-files).
     
##### Tinanggal na Impormasyon ng File{#cached-file-information-1} 
* Kapag ang isang EDDTable FromFiles dataset ay unang nakakarga, ang EDDTable FromFiles ay nagbabasa ng impormasyon mula sa lahat ng mga kaugnay na file at lumilikha ng mga mesa (isang hanay sa bawat file) na may impormasyon tungkol sa bawat tanggap na talaksan at bawat "masama" (iba o hindi tanggap) talaksan.
    * Ang mga mesa ay iniimbak din sa disk, gaya ngNetCDFv3.ncipinasok sa talaksan *Malaking Direktoryo* /dataset/ *Huling2CharsofDatasetID* / *datasetID* / sa mga talaksang ipinangalan:
DirTable.nc  (na may listahan ng natatanging mga pangalan ng directory) ,
talaksan Talaan.nc  (na humahawak sa mesa ng bawat tanggap na impormasyon ng talaksan) ,
Masamang Uso.nc  (na humahawak sa mesa ng bawat masamang impormasyon ng talaksan) .
    * Upang mapabilis ang pagpasok sa EDDTable FromFiles dataset (ngunit sa kapinsalaan ng paggamit ng higit pang memorya) , magagamit mo
[&lt;Maaaring Ilagay sa Memory&gt; Totoo&lt;/ DefileTable inMemory&gt;] (#Latin)   
upang magsumbongERDDAP™upang tandaan ang isang kopya ng talaan ng impormasyon.
    * Ang kopya ng file information tables sa disk ay kapaki-pakinabang din kapagERDDAP™ay sinasarhan at muling isiningit: ito ay nagliligtas ng EDDTable Mula sa mgaFile mula sa kinakailangang muling basahin ang lahat ng data files.
    * Kapag ini-reload muli ang dataset,ERDDAP™kailangan lamang basahin ang datos sa mga bagong file at file na nagbago na.
    * Kung ang isang file ay may kakaibang istraktura mula sa iba pang files (halimbawa, ibang uri ng datos para sa isa sa mga variable, o ibang halaga para sa "[mga yunit](#units)" attribute) ,ERDDAPidagdag ang file sa listahan ng mga "masamang" files. Ang impormasyon tungkol sa problema sa talaksan ay isusulat sa *Malaking Direktoryo* /log/log.txt file.
    * Hindi mo na kailangan pang mag - alis o gumawa sa mga file na ito. Ang isang eksepsiyon ay: kung gumagawa ka pa ng mga pagbabago sa dataset'sdatasets.xmlsetup, baka gusto mong alisin ang mga file na ito upang ma-pwersaERDDAP™upang muling basahin ang lahat ng mga files dahil ang mga files ay babasahin/binibigkas nang iba-iba. Kung kailangan mong alisin ang mga file na ito, magagawa mo ito kapagERDDAP™ay tumatakbo. (Pagkatapos ay magtakda ng[bandila](/docs/server-admin/additional-information#set-dataset-flag)upang muling maikarga ang dataset ASAP.) Gayunman,ERDDAP™karaniwang napapansin na angdatasets.xmlhindi tumutugma ang impormasyon sa talaksan Talaan ng impormasyon at i-delets ang mga talahanayan ng talaksan nang kusa.
    * Kung nais mong magpatibay - loobERDDAP™upang i-update ang nakaimbak na dataset na impormasyon (Halimbawa, kung basta daragdagan, aalisin, o papalitan mo ang ilang file sa dataset's data directory) , gamitin ang[sistema ng bandila](/docs/server-admin/additional-information#flag)lakasERDDAP™upang i - update ang impormasyong nasa loob ng talaksan.
         
##### Pagharap sa mga Kahilingan{#handling-requests-1} 
*   ERDDAP™Ang mga kahilingan ng tabular data ay maaaring maglagay ng mga limitasyon sa anumang iba't ibang paraan.
    * Kapag ang kahilingan ng kliyente para sa datos ay naproseso, ang EDDTable FromFiles ay maaaring mabilis na maghanap sa mesa na may tanggap na impormasyong file upang makita kung aling files ang maaaring may kaugnay na datos. Halimbawa, kung ang bawat source file ay may datos para sa isang nakapirmeng-location boya, ang EDDTable FromFiles ay maaaring lubos na matukoy kung aling mga files ay maaaring magkaroon ng datos sa loob ng isang ibinigay na longhitud range at latitud range.
    * Dahil sa ang tanggap na file information table ay kinabibilangan ng minimum at pinakamataas na halaga ng bawat variable para sa bawat tanggap na file, EDDTable FromFiles ay kadalasang maaaring humawak ng iba pang mga queries ng mahusay. Halimbawa, kung ang ilan sa mga boya ay walang air pressure sensor, at ang isang kliyente ay humihiling ng datos para sa airPressure&#33;=NaN, ang EDDTable FromFiles ay mahusay na makapagsasabi kung aling boya ang may datos ng presyon ng hangin.
         
##### Pag - alam sa Kapsiyon ng File Information{#updating-the-cached-file-information-1} 
Kailanma't ang dataset ay muling ididiskarga, ang impormasyong nasa loob ng talaksan ay ina - update.
    
* Ang dataset ay muling idinidiskarga sa pana - panahon gaya ng tinitiyak ng&lt;Muling ikarga ang EveryNMinutes&gt; sa dataset's information sadatasets.xml.
* Ang dataset ay muling idinidiskarga sa lalong madaling panahon hangga't maaariERDDAP™na iyong idinagdag, inalis,[Ang touch'd](https://en.wikipedia.org/wiki/Touch_(Unix)) (upang palitan ang huli ng talaksan Binagong panahon) , o nagpalit ng datafile.
* Ang dataset ay muling ikarga sa lalong madaling panahon kung gagamitin mo ang dataset[sistema ng bandila](/docs/server-admin/additional-information#flag).

Kapag muling nadiskarga ang dataset,ERDDAP™ihambing ang kasalukuyang makukuhang files sa cached file information table. Ang mga bagong file ay binabasa at idinaragdag sa mga tanggap na file table. Ang mga talaksan na hindi na umiiral ay ibinababa mula sa tanggap na mga file table. Ang mga talaksan kung saan nagbago na ang file timestamp ay binabasa at ang kanilang impormasyon ay inaapruba. Ang mga bagong talahanayan ay pinapalitan ang mga lumang talahanayan sa memorya at sa disk.
     
##### Masasamang Bunton{#bad-files-1} 
Ang mesa ng mga sirang file at ang mga dahilan kung bakit ang mga file ay ipinahayag na masama (sirang talaksan, nawawalang variables, maling halaga ng axis, atbp.) ay ipinadadala sa email Lahat Sa adres ng email (malamang na ikaw) Sa tuwing muling ididiskarga ang dataset. Dapat mong palitan o kumpunihin agad ang mga file na ito.
     
##### Nawawalang mga Kasangkapan{#missing-variables-1} 
Kung ang ilan sa mga file ay walang ilan sadataVariablekatuturan sa dataset'sdatasets.xmlOkay lang. Kapag nabasa ng EDDTable FromFiles ang isa sa mga file na iyon, ito ay kikilos na parang ang file ay may variable, ngunit may lahat ng nawawalang mga halaga.
     
##### Malapit sa Tunay na Panahon{#near-real-time-data} 
* Itinuturing ng EDDTable FromFiles ang mga kahilingan para sa pinakabagong impormasyon bilang isang pantanging kaso. Ang problema: Kung ang mga file na bumubuo ng dataset ay madalas na inaapruba, malamang na ang dataset ay hindi i-apdeyt tuwing babaguhin ang isang file. Kaya ang EDDTable FromFiles ay hindi malalaman ang mga binagong files. (Magagamit mo ang[sistema ng bandila](/docs/server-admin/additional-information#flag), ngunit maaaring humantong ito saERDDAP™Halos walang tigil ang pag - aayos ng dataset. Kaya kadalasan, hindi namin inirerekomenda ito.) Sa halip, ang EDDTable FromFiles ay nakikitungo rito sa pamamagitan ng sumusunod na sistema: KailanERDDAP™ay humihiling ng impormasyon sa loob ng nakalipas na 20 oras (halimbawa, 8 oras na ang nakalipas hanggang sa Ngayon) ,ERDDAP™ang lahat ng file na may datos sa huling 20 oras. Kaya,ERDDAP™ay hindi kinakailangang magkaroon ng ganap na up-to-date data para sa lahat ng mga file upang mahanap ang pinakabagong datos. Dapat pa rin kayong magtakda [&lt;Muling pagkarga [[Talaksan] (Mga #reload offenminute) sa isang makatuwirang maliit na halaga (halimbawa, 60) , ngunit hindi kailangang maging maliit (halimbawa, 3) .
     
    *    **Hindi inirerekomenda** organisasyon ng mga halos-real-time data sa mga files: Halimbawa, kung mayroon kang dataset na nag - iimbak ng impormasyon para sa maraming istasyon (o boya, o trajectory, ...) sa loob ng maraming taon, maaari mong ayusin ang mga file upang, halimbawa, may isang file sa bawat istasyon. Subalit pagkatapos, tuwing may dumarating na bagong impormasyon para sa isang istasyon, kailangan mong basahin ang isang malaking lumang file at sumulat ng isang malaking bagong file. At kapagERDDAP™Muling ikarga ang dataset, napapansin nito na ang ilang file ay binago, kaya lubusan nitong binabasa ang mga file na iyon. Hindi iyan mabisa.
         
    *    **Inirerekomenda** organisasyon ng mga halos-real-time data sa mga files: Itago ang mga datos sa mga tipak, halimbawa, lahat ng datos para sa isang istasyon/buoy/trajectory sa loob ng isang taon (o isang buwan) . Pagkatapos, pagdating ng isang bagong datum, ang salansan lamang na may ganitong taon (o buwan) apektado ang datos.
        
        * Pinakamagaling: GamitinNetCDFv3.ncmga talaksan na walang takdang dimensiyon (panahon) . Pagkatapos, upang magdagdag ng bagong impormasyon, maaari mo lamang i -ppend ang bagong impormasyon nang hindi na kailangang basahin at muling isulat ang buong file. Ang pagbabago ay napakahusay at halos atomikong ginagawa, kaya ang talaksan ay hindi kailanman nasa pabagu - bagong kalagayan.
        * Kung hindi ay: Kung hindi/huwag gamitin.ncmga talaksan na walang takdang dimensiyon (panahon) , kung gayon, kapag kailangan mong magdagdag ng bagong impormasyon, kailangang basahin at isulat mong muli ang buong apektadong talaksan (Sana'y maliit pa sapagkat mayroon lamang itong isang taon (o buwan) halaga ng datos) . Mabuti na lamang, lahat ng salansan sa nakalipas na mga taon (o mga buwan) sapagkat ang istasyong iyon ay hindi nagbabago.
        
Sa parehong kaso, kapagERDDAP™Muling ikarga ang dataset, karamihan ng mga file ay hindi nagbabago; ilan lamang, maliit na file ang nagbago at kailangang basahin.
         
##### Mga Direktor{#directories-1} 
Ang mga file ay maaaring nasa isang directory, o nasa isang directory at ang mga subdirectories nito (Paulit - ulit) . Kung maraming files (Halimbawa, &gt;1,000) , ang operating system (at sa gayo'y Mapagkakatiwalaan Mula sa mga Latian) mas mahusay na tatakbo kung iimbak mo ang mga file sa isang serye ng mga subdirectory (sa bawat taon, o isa sa bawat buwan para sa mga dataset na may napakadalas na mga file) , kung kaya't hindi nagkaroon ng napakaraming files sa isang ibinigay na directory.
     
##### Mga Direktoryo at HTTP Range Kahilingan{#remote-directories-and-http-range-requests-1} 
*    **Mga Direktoryo at HTTP Range Kahilingan**   (AKA Byte Service, Byte Range requests) --
    EDDGridMula saNcFiles, EDDTable FromMultidimNcFiles, EDDTable FromNcFiles, at EDDTable FromNcCFFililes, kung minsan ay maaaring magsilbi ng datos mula sa datos mula sa.ncmga file sa remote servers at access sa pamamagitan ng HTTP kung ang server ay sumusuporta[Paglilingkod Nang Byte](https://en.wikipedia.org/wiki/Byte_serving)sa pamamagitan ng HTTP range requests (ang mekanismo ng HTTP para sa byte na nagsisilbi) . Posible ito dahil netcdf-java (alinERDDAP™mga gamit upang basahin.ncmga talaksan) ay umaalalay sa pagbasa ng datos mula sa malayo.ncmga file sa pamamagitan ng HTTP range requests.
    
     **Huwag mong gawin ito&#33;**   
Sa halip, gamitin ang [&lt;Hache Mula sa sistemang&gt;] (#cache simulaurl) .
    
##### Sakit Mula sa Urol{#cachefromurl} 
* [ ** &lt;Hache Mula sa Url&gt; ** ] (#cache simulaurl) -
LahatEDDGridAng mga FromFile at lahat ng EDDTable FromFiles datasets ay sumusuporta sa isang set ng mga tag na nagsasabi ngERDDAP™upang makuha at mapanatili ang isang kopya ng lahat ng remote dataset's files, o isang cache ng ilang file (nadownload kung kinakailangan) . **Napakalaking tulong nito.** 
    * Ang&lt;Ang cache FromUrl&gt; tag ay nagpapangyari sa iyo na magtakda ng isang URL na may listahan ng mga file ng remote dataset mula sa isang malayong listahan ng talaksan.
        
        * Di-nag-aagregated datasets sa THEDDS, e.g.,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Ang server na ito ay hindi na magagamit.\\]
        * Hindi ma-gregated datasets saHyrax, e.g.,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Karamihan sa mga talaan ng Apache-tulad ng directory, e.g.,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * Mga timba na s3, e.g,
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Gayunman, ito ay maaaring mangailangan ng isang ulat ng AWS at higit pang setup.
Tingnan[Paggawang kasama ng S3 BucketsERDDAP™](#working-with-aws-s3-files).
Gayundin, karaniwan nang hindi mo kailangang gumamit ng cache Mula sa Url na may talaksan sa mga baldeng S3 kung ang mga file ay mga talaksang ASCII (e.g., .csv) , dahilERDDAP™ay mahusay na nakababasa ng impormasyon mula sa timba sa pamamagitan ng isang sapa.
        
        ERDDAP™ang mga file na ito sa dataset's&lt;fileDir&gt; directory. Kung kailangan mo ng suporta para sa isa pang uri ng remote file list (e.g., FTP) , pakisuyong i-mail ang iyong kahilingan kay Chris. Juan sa noaa.gov .
        
        * Ang default na halaga para sa&lt;Hache FromUrl&gt; tag ay null. Kung hindi mo espesipikong pinahahalagahan ito&lt;cache FromUrl&gt; tag, ang copy/cache system ay hindi gagamitin para sa dataset na ito.
        * Kung ang dataset's&lt;talaksang Regex&gt; Ang pagtatakda ay isang bagay bukod sa .\\*,ERDDAP™ay mag-download lamang ng files na tumutugma sa fileRegex.
        * Kung ang dataset's&lt;Totoo ang reconstructive&gt; setting at ang mga remote file ay nasa subdirectories,ERDDAP™ay titingin sa liblib na subdirectories na tumutugma sa dataset's [&lt;PathRegex&gt;] (#pathregex) , lumikha ng parehong istraktura ng directory sa lugar na iyon, at ilagay ang mga lokal na file sa parehong subdirectories.
        * Sa mga GenerateDataset Xml, kung ikaw ay nagtatakda ng isang&lt;Ang halaga ng cache Mula sa Url&gt;, Generate Mga Data Xml ay lilikha ng lokal&lt;fileDir&gt; directory at kopyahin ang 1 remote file dito. Mga GenerateDataset Pagkatapos ay lilikhain ng Xml angdatasets.xmlLarawan batay sa talaksang sampol na iyon (Espesipikong sampol Sawi ang paglikha ng talaksang=) .
        * Kung ang pinagmulang datos ay malayoERDDAP™, gamitin[EDDGridMula sa Erddap](#eddfromerddap)o[Mapagkakatiwalaang Mula sarddap](#eddfromerddap)sa halip&lt;Hache Mula sa Url&gt;. Sa ganiyang paraan, ang inyong lugarERDDAP™ay lilitaw na may dataset subalit hindi na kailangang mag - imbak ng anumang impormasyon sa inyong lugar. Ang tanging dahilan upang gamitin&lt;Hache Mula sa Url&gt; upang makakuha ng impormasyon mula sa isang liblib na lugarERDDAP™ay kapag may iba ka pang dahilan kung bakit nais mong magkaroon ng isang lokal na kopya ng mga data file. Sa kasong iyan:
            * Ang dataset na ito ay magsisikap na magsuskribe sa dataset sa remoteERDDAPkung kaya't ang mga pagbabago sa dataset ay tatawag sa bandilang ito ng dataset Url, na naging dahilan upang ang lokal na dataset na ito ay muling magkarga at mag-download ng binagong mga remote file. Sa gayon, ang lokal na dataset ay magiging up-to-dote sa lalong madaling panahon matapos gawin ang mga pagbabago sa remote dataset.
            * I - email mo ang administrador sa liblib na lugarERDDAP™upang hingin angdatasets.xmlpara sa remote dataset upang magawa mo ang dataset sa inyong lugarERDDAP™tulad ng dataset sa malayoERDDAP.
        * Kung ang pinagmulang datos ay malayoERDDAP™, ang lokal na dataset ay magsisikap na magsuskribe sa remote dataset.
            * Kung magtagumpay ang suskrisyon, kailanma't nasa malayoERDDAPMuling nagkarga at may bagong datos, ito ay makikipag-ugnayan sa flagURL para sa dataset na ito, na nagiging dahilan upang ito ay muling magkarga at mag-download ng bago at/o baguhin ang data files.
            * Kung mabigo ang suskrisyon (sa anumang dahilan) o kung nais mo lamang tiyakin na ang lokal na dataset ay up-to-date, maaari kang magtakda ng isang[bandila](/docs/server-admin/additional-information#flag)para sa lokal na dataset, kaya ito ay mag-e -load muli, kaya ito ay mag-secure para sa bago at/o nagpalit ng mga remote data files.
        * Kung ang pinagmulang datos ay hindi malayoERDDAP: ang dataset ay magtsek ng bago at/o magpapalit ng mga remote files kailanma't ito ay muling magkarga. Karaniwan na, ito ay kontrolado [ng]&lt;Muling pagkarga [[Talaksan] (Mga #reload offenminute) . Subalit kung alam mo kung kailan may bagong remote files, maaari kang magtakda ng isang[bandila](/docs/server-admin/additional-information#flag)para sa lokal na dataset, kaya ito ay mag-ee -load at mag-seksperimento ng bago at/o magpalit ng mga remote data file. Kung ganito ang nangyayari sa isang partikular na oras (e.g., nasa 7am) , maaari kang gumawa ng trabahong cron upang gamitincurlupang makipag - alam sa bandila Url para sa dataset na ito, kaya ito ay mag-reload at mag-secure ng bago at/o magpalit ng mga remote data files.
    * Ang&lt;Binabanggit ng tag ng cachesizeGB&gt; ang laki ng lokal na cache. Marahil ay kailangan mo lamang gamitin ito kapag gumagawang kasama ng mga sistema sa pag - iimbak ng ulap na gaya ng[S3 ng Amazon](https://aws.amazon.com/s3/)na karaniwang ginagamit na sistema ng imbakan na bahagi ng[Mga Web Serbisyo ng Amazon (MGA AW) ](https://aws.amazon.com/). Ang default ay -1.
        * Kung ang halaga ay&lt;=0 (e.g., ang default na halaga ng -1) ,
            ERDDAP™ay mag - download at mag - iingat ng isang **kumpletong kopya** ng lahat ng remote dataset's files sa dataset's&lt;fileDir&gt;.
            * Ito ang tagpo na inirerekomenda kailanma't maaari.
            * Sa tuwing ang dataset ay muling ididiskarga, inihahambing nito ang mga pangalan, sukat, at hulingModified na panahon ng mga remote file at ang mga lokal na file, at nakapag-download ng anumang remote files na bago o nagbago.
            * Kapag nawala ang isang file na nasa remote server,ERDDAP™hindi ibubuwag ang kaukulang lokal na talaksan (Sa ibang paraan, kung may pansamantalang may diperensiya sa remote server,ERDDAP™ay maaaring mag - alis ng ilan o lahat ng lokal na talaksan&#33;) .
            * Sa ganitong kalagayan, karaniwan nang maglalagay ka&lt;update EveryNMillis&gt; to -1, dahil alam ng dataset kung kailan nito kinopya ang mga bagong data file.
        * Kung ang halaga ay &gt;0,
            ERDDAP™ay mag-download ng mga file mula sa remote dataset kung kinakailangan sa isang lokal **cache** (sa dataset's&lt;fileDir&gt;) na may stage na laki ng nakatakdang bilang ng GB.
            * Ang cache ay dapat na sapat ang laki upang maglaman ng di - kukulangin sa ilang data file.
            * Sa pangkalahatan, mientras mas malaki ang cache, mas mabuti, sapagkat ang susunod na hiniling na talaksan ng datos ay malamang na nasa cache na.
            * Ang pananakit ay dapat lamang gamitin kapagERDDAP™ay tumatakbo sa isang cloud na server (e.g., isang halimbawa ng balita ng AWS) at ang mga remote file sa sistema ng imbakan ng ulap (e.g., WAS S3) .
            * Kapag ang disk space na ginagamit ng lokal na mga file ay nakahihigit sa cache SizeGB,ERDDAP™malapit na (Siguro hindi kaagad) I - delete ang ilan sa mga nalagyang file (Sa kasalukuyan, batay sa Ginamit Kamakailan na Lastea (LRU) algorithm) hanggang sa ang disk space na ginagamit ng lokal na mga files&lt;0.75\\*cachesizeGB (ang "goal") . Oo, may mga kaso kung saan ang LRU ay gumagawa ng napakasama -- walang perpektong algorithm.
            *   ERDDAP™Hinding - hindi tatangkaing i - delete ang isang talaksang may cacheERDDAP™Nagsimulang gamitin sa huling 10 segundo. Ito ay isang di - sakdal na sistema upang pakitunguhan ang sistema ng cache at ang sistema ng mambabasa ng data file ay malayang pinagsasama lamang. Dahil sa alituntuning ito,ERDDAP™ay maaaring hindi makapag - alis ng sapat na mga salansan upang maabot ang tunguhin nito, kung saan sakaling mag - imprenta ito ng isang lipstick sa log.txt file, at ang sistema ay mag - aaksaya ng maraming panahon sa pagsisikap na pustahin ang cache, at posibleng ang laki ng mga file sa cache ay maaaring lubhang lumampas sa cacheSizeGB. Kung mangyari ito, gumamit ng mas malaking cacheSizeGB setting para sa dataset na iyon.
            * Sa kasalukuyan,ERDDAP™Huwag tingnan kung ang remote server ay may mas bagong bersiyon ng talaksan na nasa lokal na cache. Kung kailangan mo ang bahaging ito, pakisuyong email Chris. Juan sa noaa.gov .
        * Bagaman ang paggamit ng parehong mga pangalang tag ay maaaring magpahiwatig na ang sistemang copy at ang sistemang cache ay gumagamit ng parehong sistemang ilalim, hindi tama iyan.
            * Ang sistemang copy proactively ay nagsisimula ng mga taskThread na mga atas upang mag-download ng bago at baguhin ang mga file sa tuwing ang dataset ay muling ikarga. Mga talaksan lamang na aktuwal na kinopya sa lokal na directory ang makukuha sa pamamagitan ngERDDAP™datos.
            * Ang sistema ng cache ay nakakakuha ng remote file list tuwing ang dataset ay muling ididiskarga at nagpanggap na ang lahat ng mga file na iyon ay makukuha sa pamamagitan ngERDDAP™datos. Kawili - wili, lahat ng mga remote file ay lumilitaw pa nga sa /files/ web page ng dataset at magagamit sa pag-download (Bagaman marahil pagkatapos lamang ng pagkaantala samantalang ang salansan ay unang kinukuha mula sa remote server tungo sa lokal na cache.) 
        * Maaaring makinabang ang mga datos na gumagamit ng cachesizeGB sa paggamit ng caches[Mga "nThread "](#nthreads)Nagtakda ng mas malaki sa 1, dahil ito ay magpapangyari sa dataset na mag-download ng higit sa 1 remote file sa isang panahon.
    * Ang&lt;Ang cachePartialPathRegex&gt; tag ay isang bihirang gamiting tag na maaaring magtakda ng alternatibo para sa dataset's [&lt;PathRegex&gt;] (#pathregex) . Ang default ay null.
        * Gamitin lamang ito kung ginagaya mo ang buong dataset sa pamamagitan ng default&lt;cachesizeGB&gt; halaga ng -1.&lt;Ang cachesizeGB&gt; mga halaga ng &gt;1, ito ay ignored dahil ito ay hindi sensical.
        * Tingnan [ang dokumentasyon para sa&lt;PathRegex&gt;] (#pathregex) para sa patnubay kung paano itatayo ang regex.
        * Kung ito ay espesipikong gagamitin, ito ay gagamitin sa tuwing ang dataset ay muling ikarga, maliban sa unang pagkakataon na ang isang dataset ay muling ikarga sa simula ng isang buwan.
        * Ito'y kapaki - pakinabang kapag ang remote dataset ay nakaimbak sa isang labyrinth ng mga subdirectory at kapag ang karamihan ng mga file na iyon ay bihira, kung mayroon man, na magbago. (&lt;tapos ng pag-ubo NASA&lt;tapos ng ubo) Halimbawa, maaari kang magtakda ng isang&lt;cachePartialPathRegex&gt; na tumutugma lamang sa kasalukuyang taon o sa kasalukuyang buwan. Ang mga regexe na ito ay lubhang mapandaya upang tiyakin, sapagkat ang lahat ng bahagya at buong pangalan ng landas ay dapat na katugma ng mga pangalan&lt;cachePartialPathRegex&gt; at dahil sa ang&lt;Ang cachePartialPathRegex&gt; ay dapat na magtrabaho sa mga malalayong URL at sa mga lokal na direktoryo. Ang isang tunay na halimbawa sa buhay ay:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
Ang sampol na URL sa itaas ay may mga file sa subdirectories batay sa taon (e.g., 2018) at araw ng taon (e.g., 001, 002, ..., 365 o 366) .
Pansinin na ang&lt;cachePartialPathRegex&gt; ay nagsisimula sa .\\*,
ay may espesipikong subdirectory na karaniwan sa mga liblib na URL at sa mga lokal na direktoryo, e.g., /v4\\.1/
Pagkatapos ay may sunud - sunod na pangkat ng mga pangkat na nakahuli kung saan ang unang mapagpipilian ay wala
at ang ikalawang mapagpipilian ay isang espesipikong halaga.
            
Ang halimbawa sa itaas ay magtutugma lamang ng mga direktoryo sa ikalawang 10 araw ng 2018, e.g.,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Ang server na ito ay hindi na magagamit.\\]  
at araw 011, 012, ..., 019.
             (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Kung kailangan mo ng tulong sa paglikha&lt;cachePartialPathRegex&gt;, pakisuyong i-mail ang&lt;cache FromUrl&gt; hanggang Chris. Juan sa noaa.gov .
            
        * Isang karaniwang paraan: Kung gusto mong gamitin&lt;cachePartialPathRegex&gt;, huwag itong gamitin sa simula, dahil gusto moERDDAP™upang makuha ang lahat ng file sa simula. PagkataposERDDAP™ang lahat ng files, idagdag ito sa dataset's scoredatasets.xml.
             
##### Libu - libong Filipina{#thousands-of-files} 
Kung ang iyong dataset ay maraming libu - libong file,ERDDAP™ay maaaring mabagal tumugon sa mga kahilingan para sa impormasyon mula sa dataset na iyon. May dalawang isyu rito:
 

1. Ang bilang ng files kada directory.
Panloob,ERDDAP™tumatakbo sa parehong bilis anuman ang n files ay nasa isang directory o nakakalat sa ilang directories.
     
Subalit may problema: Mientras mas maraming file sa isang ibinigay na directory, mas mabagal ang pag - oopera sa listahan ng mga file sa directory (bawat file) hanggang saERDDAP. Ang panahon ng pagtugon ay maaaring O (In log n) . Mahirap sabihin kung ilang files sa isang directory ay masyadong marami, ngunit 10,000 ay marahil masyadong marami. Kaya kung ang iyong setup ay lumilikha ng maraming files, ang isang rekomendasyon dito ay: ilagay ang mga file sa mga subdirectories na may makatuwirang pagkakaorganisa (e.g., istasyon o istasyon/year) .
    
Isa pang dahilan upang gumamit ng mga subdirectory: kung nais gamitin ng gumagamitERDDAP'"files"sistema upang mahanap ang pangalan ng pinakamatandang file para sa station X, ito ay mas mabilis at mas mahusay kung ang mga file ay nasa station/year subdirectories, dahil mas kaunting impormasyon ang kinakailangan upang ilipat.
    
2. Ang kabuuang bilang ng mga files.
Para sa mga taskular datasets,ERDDAP™ang saklaw ng mga halaga para sa bawat variable sa bawat file. Kapag humiling ang gumagamit,ERDDAP™kailangang basahin ang lahat ng datos mula sa lahat ng file na maaaring may datos na tumutugma sa kahilingan ng gumagamit. Kung ang gumagamit ay humingi ng datos mula sa limitadong panahon (e.g., isang araw o isang buwan) , pagkataposERDDAP™Hindi mo na kailangang buksan ang napakaraming file sa iyong dataset. Subalit may sukdulang mga kaso kung saan halos ang bawat file ay maaaring magkaroon ng katugmang impormasyon (e.g., kapag waterTemperature=13.2CC) . Yamang kinakailangan itoERDDAP™kaunting panahon (isang bahagi ay ang paghahanap ng panahon sa HDD, ang bahagi ay ang panahon upang basahin ang header ng file) upang buksan lamang ang ibinigay na talaksan (at higit pa kung maraming file sa directory) , may malaking parusang oras kung ang kabuuang bilang ng mga talaksan naERDDAP™na kailangang buksan ay napakalaki. Kahit na ang pagbubukas ng 1000 files ay nangangailangan ng mahalagang panahon. Kaya may mga pakinabang sa pana - panahon na pagbuo ng mga salansan sa araw - araw tungo sa mas malalaking tipak (e.g., 1 istasyon sa loob ng 1 taon) . Nauunawaan ko na baka ayaw mong gawin ito sa iba't ibang kadahilanan, subalit umaakay ito sa mas mabilis na pagtugon. Sa sukdulang mga kaso (e.g., pinakikitunguhan ko ang isang GTSP dataset na may ~35 milyong source files) , hindi praktikal ang paghain ng datos mula sa napakaraming source files dahilERDDAPAng pagtugon ng mga tao sa simpleng mga tanong ay maaaring gumugol ng maraming oras at gumamit ng tone - toneladang memorya. Sa pamamagitan ng pagbuo sa mga source file sa mas maliit na numero (para sa GTSP, mayroon na akong 720 ngayon, 2 sa bawat buwan) ,ERDDAP™ay maaaring tumugon kaagad. Tingnan[Milyun - milyong Filipina](#millions-of-files)  
     

Ang N.B. Solid State Drives ay napakahusay&#33; Ang pinakamabilis, pinakamadali, pinakamurang paraan upang makatulongERDDAP™tungkol sa napakaraming bilang (maliit) ang mga file ay gumamit ng matatag na state drive. Tingnan[Ang matatag na mga Drayber ng Estado ay napakahusay&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Milyun - milyong Filipina{#millions-of-files} 
* Ang ilang dataset ay may milyun-milyong source files.ERDDAP™ay maaaring humawak nito, subalit may iba't ibang resulta.
    
    * Para sa mga kahilingan na nagsasangkot lamang ng mga pagkakaiba - iba na nakatala sa [&lt;subsetVariables&gt;] (Mga #subsetvariable) ,ERDDAP™ang lahat ng kinakailangang impormasyon na nakuha na mula sa mga datafile at nakaimbak sa isang file, kaya napakabilis nitong tumugon.
    * Para sa ibang kahilingan,ERDDAP™ang dataset's[Nilagyan ng impormasyon ang talaksan](#cached-file-information)at alamin na ilan lamang sa mga file ang maaaring may data na nauugnay sa kahilingan at sa gayo'y mabilis na tumugon.
    * Subalit para sa ibang kahilingan (Halimbawa, waterTemperature=18 degree\\_C) kung saan maaaring may kaugnay na datos ang anumang file,ERDDAP™kailangang buksan ang isang malaking bilang ng mga file upang makita kung ang bawat isa sa mga file ay may anumang data na may kaugnayan sa kahilingan. Ang mga file ay binubuksan sa sequentially. Sa anumang operating system at anumang file system (maliban sa matatag na kalagayan) , matagal ito (gayo'yERDDAP™dahan - dahang tumugon) at talagang itinatali ang sistema ng talaksan (gayo'yERDDAP™dahan - dahang tumugon sa iba pang kahilingan) .
    
Mabuti na lamang, may solusyon.
    
    1. I-set ang dataset sa isang hindi-publishERDDAP™  (personal na computer mo?) .
    2. Gumawa ng iskrip na nangangailangan ng serye ng.ncAng mga file ng CF, na bawat isa'y may malaking bahagi ng dataset, ay karaniwan nang isang yugto ng panahon (halimbawa, lahat ng datos para sa isang ibinigay na buwan) . Piliin ang yugto ng panahon upang ang lahat ng resultang talaksan ay wala pang 2GB (ngunit inaasahan na mas malaki kaysa 1GB) . Kung ang dataset ay may halos-real-time data, patakbuhin ang script upang muling likhain ang file para sa kasalukuyang time period (e.g., ngayong buwan) madalas (tuwing 10 minuto? bawat oras?) . Mga KahilinganERDDAP™para sa.ncAng mga file ng CF ay lumilikha ngNetCDFv3.nctalaksan na gumagamit ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Raged Array data istruktura).
    3. Maglagay ng[Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)datos sa inyong publikoERDDAP™na kumukuha ng datos mula sa.nc (CF) mga file.ERDDAP™ay madaling makakuha ng impormasyon mula sa mga file na ito. At yamang napakarami na o daan - daan na ngayon (sa halip na milyun - milyon) ng mga file, kahit na kungERDDAP™Kailangang buksan ang lahat ng salansan, magagawa ito nang mabilis.
    
Oo, ang sistemang ito ay nangangailangan ng panahon at pagsisikap upang maitatag, subalit ito'y gumaganang mabuti. Karamihan sa mga kahilingan ng datos ay maaaring pangasiwaan ng 100 beses na mas mabilis kaysa dati.
    \\[Alam ni Bob na ito ay isang posibilidad, ngunit si Kevin O'Brien ang unang gumawa nito at ipinakita na ito ay mahusay. Ngayon, Ginagamit ito ni Bob para sa GTSP dataset na may mga 18 milyong source file at kung alin angERDDAP™naglilingkod ngayon sa mga 500.nc (CF) mga file.\\]
    
Ang N.B. Solid State Drives ay napakahusay&#33; Ang pinakamabilis, pinakamadali, pinakamurang paraan upang makatulongERDDAP™tungkol sa napakaraming bilang (maliit) ang mga file ay gumamit ng matatag na state drive. Tingnan[Ang matatag na mga Drayber ng Estado ay napakahusay&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### Pagkalalaking Espasyo{#huge-files} 
* Isang napakalaking data file (Partikular na ang malalaking data files ng ASCII) ay maaaring maging sanhi ng isang outOfMemoryError. Kung ito ang problema, dapat na maging maliwanag ito sapagkatERDDAP™ay hindi magkarga ng dataset. Ang solusyon, kung posible, ay hatiin ang talaksan sa maraming salansan. Sa pinakamabuting paraan, maaari mong hatiin ang salansan sa lohikal na mga tipak. Halimbawa, kung ang file ay may 20 buwang halaga ng datos, hatiin ito sa 20 file, na bawat isa ay may 1 buwang halaga ng datos. Subalit may mga bentaha kahit na kung ang pangunahing talaksan ay nahahati nang hindi makatuwiran. Ang pamamaraang ito ay may maraming pakinabang: a) Babawasan nito ang memory na kailangan upang mabasa ang mga data files sa 1/20th, dahil isa lamang file ang binabasa sa isang panahon. b) Kadalasan,ERDDAP™ay mas mabilis na makahaharap sa mga kahilingan sapagkat kailangan lamang tingnan ang isa o ilang files upang mahanap ang data para sa isang ibinigay na kahilingan. c) Kung ang koleksiyon ng impormasyon ay nagpapatuloy, kung gayon ang umiiral na 20 file ay maaaring manatiling hindi nagbabago, at kailangan mo lamang baguhin ang isa, maliit, bagong talaksan upang idagdag ang halaga ng impormasyon sa susunod na buwan sa dataset.
     
##### Kaguluhan ng FTP/Advice{#ftp-troubleadvice-1} 
* Kung ikaw ay magbibigay ng bagong mga data file saERDDAP™server habangERDDAP™tumatakbo, may tsansa naERDDAP™ay muling magkarga ng dataset sa panahon ng proseso ng FTP. Mas madalas itong mangyari kaysa sa inaakala mo&#33; Kapag nangyari ito, lilitaw na tanggap ang talaksan (may tanggap na pangalan) , ngunit walang bisa ang talaksan. KungERDDAP™ay sumusubok na basahin ang datos mula sa hindi tanggap na talaksang iyon, ang resultang error ay magpapangyari sa talaksan na idagdag sa mesa ng hindi tanggap na mga file. Hindi ito mabuti. Upang maiwasan ang problemang ito, gumamit ng temporary file kapag ang FTP'ing the file, halimbawa, ABC2005.nc\\_TEMP . Pagkatapos, ang fileNameRegex test (Tingnan ang ibaba) ay magpapakita na ito ay hindi isang nauugnay na talaksan. Pagkatapos makumpleto ang proseso ng FTP, palitan ng pangalan ang talaksan sa tamang pangalan. Ang proseso ng pagpapalit ng pangalan ay magpapangyari sa talaksan na maging mahalaga sa isang iglap.
    
##### Mga Inilabas na Pangalan{#file-name-extracts} 
\\[Ang bahaging ito ay DEPRECATED. Pakisuyong gamitin[\\*\\*\\*fileName pseudosourceName](#filename-sourcenames)sa halip.\\]  
Ang EDDTable FromFiles ay may sistema ng pagkuha ng isang String mula sa bawat pangalan at paggamit na gumagawa sa isang pseudo data na pabagu - bago. Sa kasalukuyan, walang sistema upang bigyang kahulugan ang mga String na ito bilang mga petsa/panahon. May ilang mga XML tag na maglalagay ng sistemang ito. Kung hindi mo kailangan ang bahagi o ang lahat ng sistemang ito, huwag mo lamang tiyakin ang mga tag na ito o gamitin ang "" mga pagpapahalaga.

* Ang preExtractRegex ay isang[Palagiang pagpapahayag](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([pagtuturo](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) ginagamit upang makilala ang teksto na aalisin sa simula ng pangalan. Ang pag-alis ay nangyayari lamang kung ang regex ay magkatambal. Ito ay karaniwang nagsisimula sa "^" upang itugma ang simula ng pangalan.
* post Ang ExtractRegex ay isang karaniwang pananalita na ginagamit upang makilala ang teksto na aalisin sa dulo ng pangalan. Ang pag-alis ay nangyayari lamang kung ang regex ay magkatambal. Ito ay karaniwang nagtatapos sa "$" upang itugma ang dulo ng talaksan.
* regex ng katas Kung naroroon, ang regular na pananalitang ito ay ginagamit pagkatapos ng preExtractRegex at postExtractRegex upang makilala ang isang kuwerdas na kukunin mula sa pangalan (Halimbawa, angstationID) . Kung ang regex ay hindi tugma, ang buong pangalan ay ginagamit (minus pre-extract at post Pag - aalis) . Gamitin ang ".\\*" upang itugma ang buong pangalan na naiwan pagkatapos ng preExtractRegex at postExtractRegex.
* kolum Pangalang ForExtract ang pinagmulang pangalan ng data column para sa hinangong Strings. AdataVariablena taglay ito[sourceName](#sourcename)dapat na nasadataVariablelistahan ng mga ito (sa anumang uri ng datos, subalit karaniwan nang String) .

Halimbawa, kung ang isang dataset ay may mga file na may mga pangalang gaya ng XYZAble.nc, XYZBaker.nc, XYZCharlie.nc, ..., at nais mong lumikha ng isang bagong variable (stationID) kapag binasa ang bawat file na magkakaroon ng mga halaga ng station ID (Able, Baker, Charlie, ...) Hinango mula sa mga files, maaari mong gamitin ang mga tag na ito:

*   &lt;preExtractRegex&gt;^XYZ&lt;/preExtractRegex&gt;
Ang paunang ^ ay isang regular na ekspresyong espesyal na karakter na puwersaERDDAP™upang hanapin ang XYZ sa simula ng pangalan. Ito ang dahilan kung bakit ang XYZ, kung matatagpuan sa simula ng pangalan, ay inaalis (Halimbawa, ang pangalan na XYZAble.ncnagiging Mabuti.nc) .
*   &lt;postExtractRegex&gt;\\.nc$&lt;/posExtractRegex&gt;
Ang $ sa dulo ay isang regular na ekspresyon ng espesyal na karakter na pwersaERDDAP™upang hanapin.ncsa dulo ng pangalan. Yamang ang . ay isang regular na pagpapahayag ng pantanging katangian (na tumutugma sa anumang karakter) , ito ay naka-install bilang \\. dito (Dahil ang 2E ang numero ng karakter na hexadecimal sa loob ng isang panahon) . Ito ang mga sanhi.nc, kung masumpungan sa dulo ng pangalan, na aalisin (Halimbawa, ang bahaging pangalan Madali.ncnagiging Mabuti) .
*   &lt;kinuha Regex&gt;.\\*&lt;/extractRegex&gt;
Ang .\\* regular na ekspresyon ay tumutugma sa lahat ng natitirang karakter (Halimbawa, ang bahaging pangalan Ang Able ang nagiging hinango para sa unang talaksan) .
*   &lt;kolumnameForExtract&gt;stationID&lt;/columnNameForExtract&gt;
Ito ay nagsasabiERDDAP™upang lumikha ng isang bagong pitak na mapagkukunan na tinatawag nastationIDkapag binabasa ang bawat file. Ang bawat hanay ng datos para sa ibinigay na talaksan ay magkakaroon ng tekstong makukuha mula sa pangalan nito (Halimbawa, Madali) bilang halaga sastationIDkolum.

Sa karamihan ng mga kaso, maraming mga halaga para sa mga extract tag na ito na magbibigay ng parehong mga resulta -- ang mga regular na ekspresyon ay masyadong nababaluktot. Subalit sa ilang kaso, may isa lamang paraan upang matamo ang ninanais na mga resulta.
     
##### PseudosourceNames{#pseudo-sourcenames} 
Iba - iba sa bawat datasetERDDAP™ay may [&lt;sourceName&gt;] (#sourcename) na nagpapaliwanag sa pangalan ng pinagmulan ng iba't ibang bagay. Ang mga EDDTable FromFile ay sumusuporta sa ilang huwad na katawagansourceNamena kumukuha ng halaga mula sa ibang lugar (e.g., pangalan ng talaksan o halaga ng isang pandaigdigang katangian) at itinataguyod ang halagang iyan upang maging isang hanay ng di - nagbabagong mga pamantayan para sa katiting na impormasyong iyon (e.g., ang talaan ng data ng talaksang iyon) . Para sa mga variable na ito, dapat mong tiyakin ang mga data type ng variable sa pamamagitan ng [&lt;dataType&gt;] (#datatype) tag. Kung ang nakuhang impormasyon ay isang string ng "dateT, " ayon sa pagkakasunud - sunod ng "dateTime "[attribute](#string-time-units). Ang huwadsourceNameAng mga opsyon ay:
 
###### pangglobo:sourceNames{#global-sourcenames} 
Ang isang global metadata attribute sa bawat source data file ay maaaring itaguyod upang maging isang hanay ng datos. Kung ang Isang variable'&lt;sourceName&gt; may format
```
        <sourceName>global:*attributeName*</sourceName>
```
saka kapagERDDAP™ay nagbabasa ng datos mula sa isang file,ERDDAP™ang pangglobong katangian ng pangalang iyan (Halimbawa, PI) at lumikha ng isang kolum na punô ng halaga ng attribute. Ito ay kapakipakinabang kapag ang attribute ay may iba't ibang halaga sa iba't ibang source files, dahil kung hindi, ang mga gumagamit ay makikita lamang ang isa sa mga halaga para sa buong dataset. Halimbawa,
```
        <sourceName>global:PI</sourceName>
```
Kapag itinataguyod mo ang isang attribute bilang datos,ERDDAP™ang katumbas na attribute. Angkop ito sapagkat ang halaga ay malamang na naiiba sa bawat file; samantalang sa aggregated dataset saERDDAP™Magkakaroon lamang ito ng isang halaga. Kung gusto mo, maaari kang magdagdag ng bagong halaga para sa attribute para sa buong dataset sa pamamagitan ng pagdaragdag&lt;pangalan=" *attribute Pangalan* "&gt; *bago Halaga* &lt;/att&gt; sa buong mundo ng dataset&lt;addAttributes&gt;] (#Adattributes) . Dahil sa pangglobong mga katangian naERDDAP™ay nangangailangan, halimbawa, ng institusyon, ikaw MUST ay nagdaragdag ng isang bagong halaga para sa katangian.
     
###### Iba't iba:sourceNames{#variable-sourcenames} 
Ang metadata attribute ng isang variable sa bawat file ay maaaring i-promote upang maging isang hanay ng datos. Kung ang Isang variable'&lt;[sourceName](#sourcename)Ang `&gt; ay may format
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
saka kapagERDDAP™ay nagbabasa ng datos mula sa isang file,ERDDAP™ang espesipikong attribute (Halimbawa, ID) ng espesipikong variable (Halimbawa, instrumento) at lumikha ng isang kolum na punô ng halaga ng attribute. Iba - iba ang magulang (Halimbawa, instrumento) hindi kailangang maging isa sadataVariablemga uri na kasama sa pagpapakahulugan ng datasetERDDAP. Halimbawa,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Ito ay kapakipakinabang kapag ang attribute ay may iba't ibang halaga sa iba't ibang source files, dahil kung hindi, ang mga gumagamit ay makikita lamang ang isa sa mga halaga para sa buong dataset.

Kapag itinataguyod mo ang isang attribute bilang datos,ERDDAP™ang katumbas na attribute. Angkop ito sapagkat ang halaga ay malamang na naiiba sa bawat file; samantalang sa aggregated dataset saERDDAP™Magkakaroon lamang ito ng isang halaga. Kung gusto mo, maaari kang magdagdag ng bagong halaga para sa attribute para sa buong dataset sa pamamagitan ng pagdaragdag&lt;pangalan=" *attribute Pangalan* "&gt; *bago Halaga* &lt;/att&gt; sa mga variable' [&lt;addAttributes&gt;] (#Adattributes) . Para sa mga katangiangERDDAP™ay humihiling, halimbawa,ioos\\_category  (depende sa iyong setup) , ikaw MUST magdagdag ng bagong halaga para sa katangian.
        
###### fileNamesourceNames{#filename-sourcenames} 
Maaari mong kunin ang bahagi ng file na Name ng isang file at itaguyod iyan upang maging isang hanay ng datos. Ang format para sa pseudo na ito [&lt;sourceName&gt;] (#sourcename) ay
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Halimbawa,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Kapag ang EDDTable FromFiles ay nagbabasa ng datos mula sa isang file, titiyakin nito ang fileName (Halimbawa, A20180741442.slcpV1.nc) katugma ng espesipikong regular na pananalita ("regex") at kunin ang binanggit na (sa kasong ito, ang una) bihagin (na isang bahagi na napalilibutan ng mga panaklong) Halimbawa, "201807041442". (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Ang regex ay maaaring itukoy bilang isang strando na may o walang nakapaligid na mga sinipi. Kung ang regex ay tinukoy bilang isang kuwerdas na may nakapaligid na mga sinipi, ang kuwerdas ay dapat na maging[string ng JSON-style](https://www.json.org/json-en.html)  (na may pantanging mga karakter na nakaligtas na may \\ karakter) . Ang bilang ng mga nahuhuling grupo ay karaniwang 1 (unang grupo na nahuli) , ngunit maaaring bilang.
     
###### PathNamesourceNames{#pathname-sourcenames} 
Maaari mong kunin ang bahagi ng buong landas ng talaksan Pangalan (/directories/fileName.ext) at itinataguyod ito upang maging isang hanay ng mga impormasyon. Ang format para sa pseudo na ito [&lt;sourceName&gt;] (#sourcename) ay
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Halimbawa,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Kapag ang EDDTable FromFiles ay nagbabasa ng datos mula sa isang file, titiyakin nito ang buong pathName (Halimbawa, /data/myDatasettID/BAY17/B2018070442.nc. Para sa pagsubok na ito, ang directory separators ay laging magiging'/', hindi kailanman '\\ ') katugma ng espesipikong regular na pananalita ("regex") at kunin ang binanggit na (sa kasong ito, ang una) bihagin (na isang bahagi na napalilibutan ng mga panaklong) Halimbawa, "BAY17". (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Ang regex ay maaaring itukoy bilang isang strando na may o walang nakapaligid na mga sinipi. Kung ang regex ay tinukoy bilang isang strando na may nakapaligid na mga sinipi, ang kuwerdas ay dapat na maging isang kuwerdas[string ng JSON-style](https://www.json.org/json-en.html)  (na may pantanging mga karakter na nakaligtas na may \\ karakter) . Ang bilang ng mga nahuhuling grupo ay karaniwang 1 (unang grupo na nahuli) , ngunit maaaring bilang.
         
##### "0 files" Error sa pagbasa ng Mensahe{#0-files-error-message-2} 
* Kung tumatakbo ka[GenerateDatasetsXml](#generatedatasetsxml)o[Mga Dasd](#dasdds), o kung sisikapin mong magkarga ng EDDTable Mula sa... Sawi ang pagbasa ng datosERDDAP™, at nakakuha ka ng "0 files" error message na nagpapahiwatig naERDDAP™nakakita ng 0 katugmang files sa directory (kung inaakala mong may katugmang mga file sa directory na iyon) :
    * Tingnan kung talagang nasa directoryng iyon ang mga file.
    * Tingnan ang baybay ng pangalang directory.
    * Tingnan ang fileNameRegex. Sa totoo lang, talagang madaling magkamali gamit ang regexes. Para sa mga layuning pangsubok, subukan ang regex .\\* na dapat tumugma sa lahat ng mga pangalan. (Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Tiyakin na ang gumagamit na nagpapatakbo ng programa (e.g., gumagamit ng=tomcat (?) para sa Tomcat/ERDDAP) ay may pahintulot ng 'read' para sa mga file na iyon.
    * Sa ilang operating system (Halimbawa, ang SCORINux) at depende sa system settings, ang gumagamit na nagpapatakbo ng programa ay dapat na may 'read' na pahintulot para sa buong kadena ng mga directories na humahantong sa directory na may mga files.
         
##### Maging limitado Ano{#standardizewhat} 
* Kapag ang anumang subclass ng EDDTable FromFiles ay nag-ebolb ng isang set ng mga source files, para sa isang ibinigay na variable, lahat ng mga source files MUST ay may magkatulad na attribute halaga para sa ilang mga katangian:scale\\_factor,add\\_offset\\_Hindi nakalagda,missing\\_value,, \\_FillValue, at mga yunit). Pag-isipan ito: kung ang isang file ay may windSpeed units=knots at ang isa pa ay may windSpeed units=m/s, kung gayon ang mga halaga ng datos mula sa dalawang file ay hindi dapat isama sa parehong agregated dataset. Kaya, kapag ang EDDTable FromFiles ay unang lumilikha ng dataset, binabasa nito ang mga halaga ng attribute mula sa isang file, pagkatapos ay itinatakwil ang lahat ng mga file na may iba't ibang halaga para sa mga mahahalagang katangiang iyon. Para sa karamihan ng mga kalipunan ng mga talaksan, hindi ito problema dahil ang mga katangian ng lahat ng mga variable ay hindi pabagu-bago. Gayunman, para sa ibang mga kalipunan ng mga talaksan, ito ay maaaring humantong sa 1%, 10%, 50%, 90%, o kahit 99% ng mga file ay itinatakwil bilang "masamang" files. Iyan ay problema.
    
Ang EDDTable From files ay may sistema upang lutasin ang problemang ito: Maging pamantayan Ano iyon? Ang Pamantayan Kung anong tagpo ang nagsasabi sa EDDTable FromFiles na gawing pamantayan ang mga file sa sandaling basahin ito, bago tingnan ng EDDTable FromFiles ang mga katangian upang makita kung ang mga ito ay hindi pabagu - bago.
    
Ang flip side ay: kung ang dataset ay walang ganitong problema, huwag gumamit ng standardize Ano iyon? Maging limitado Ang may ilang potensiyal na panganib (na tinatalakay sa ibaba) at mga kawalang - kakayahan. Kaya kung hindi mo aktuwal na kailangan ang mga katangian ng pagiging pamantayan Isa pa, hindi kailangang harapin ang potensiyal na mga panganib at mga kawalang - kakayahan. Ang pinakamalaking kawalang - kakayahan ay: Kapag iba't ibang pamantayan Kung anong mapagpipilian ang ginagamit ng isang dataset, ipinahihiwatig nito na ang mga source file ay nag - iimbak ng impormasyon sa lubhang iba't ibang paraan (e.g., naiibascale\\_factoratadd\\_offset, o gamit ang mga kuwerdas ng oras na gumagamit ng iba't ibang format) . Kaya, para sa isang takdang kahilingan sa gumagamit, walang paraan para saERDDAP™upang makagawa ng isang solong source-level demand na maaaring ipahid sa lahat ng source files. KayaERDDAP™ang apektadong mga pagbabawal sa mas mataas na antas. KayaERDDAP™kailangang basahin ang datos mula sa higit pang mga files bago i-play ang mas mataas, destinasyon-level demandts. Kaya humiling sa mga dataset na gumagamit ng pamantayan Mas matagal itong iproseso.
    
Para magamit ang sistemang ito, kailangan mong magtakda
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
sa loob[datasets.xmlpara sa Mapagkakatiwalaan... Mga talaksang datos](#eddtablefromfiles-skeleton-xml)(Sa loob ng&lt;dataset&gt; tag).
    
Ang *Maging limitado Ano* Ipinaliliwanag ng halaga kung aling pagbabago sa EDDTable FromFiles ang dapat ikapit. Ang mga pagbabago ay ang kabuuan ng ilang kombinasyon ng:
    
1. Buksan
Ito ay gumagawa ng maraming karaniwan at ligtas na operasyon upang gawing pamantayan ang mga hanay ng numero sa mga file:
    * Kungscale\\_factorat/oadd\\_offsetAng mga katangian ay naroroon, inaalis ang mga ito at ikinakapit upang buksan ang mga halaga ng datos.
    * Walang packed na mga attribute (e.g., aktuwal\\_min, aktwal na\\_max,actual\\_range,data\\_min,data\\_max, datos\\_ranggo,valid\\_min,valid\\_max,valid\\_range) , kung naroroon, kung ang variable ay siksik, at kung ang mga halaga ng attribute ay siksik (Ito ay mapandaya, ngunit makatuwirang maaasahan) .
    * Kung \\_FillValue at/omissing\\_valueay naroroon, binabago ang mga halaga ng datos na iyonERDDAP's "standard" missing values: MAX\\_VALUE para sa mga integer type (e.g., 127 para sa byte, 32,767 para sa maikli, at 2,147,483,647 para sa mga int, 92233 720368547807 mahaba) at NaN para sa mga doble at lumulutang.
    * Alisin ang lumang \\_FillValue at/omissing\\_valuemga katangian (kung mayroon) , at palitan lamang ng \\_FillValue=\\[angERDDAP™pamantayang nawawalang halaga\\].
         
2. Gawing Pamantayan ang mga Panahon ng Numerika
Kung ang isang numerikong kolum ay may CF-style numeric time units (" *MgaUnit ng Panahon* mula noon *saligang panahon* ", e.g., "mga araw mula 1900-01-01".) , kinumberte nito ang petsa Halaga ng panahon"seconds since 1970-01-01T00:00:00Z"mga pamantayan at mga pagbabago na ipinalalagay ng mga yunit na nagpapahiwatig niyan.
Kung ito ay napili at may tsansa na ang variable na ito ay mayscale\\_factoroadd\\_offset, #1 MUST mapipili din.
     
3. Pahiranmissing\\_value  
Kung ang isang String column ay may \\_FillValue at/omissing\\_valuemga katangian, kinokumberte nito ang mga pagpapahalagang iyon sa "" at inaalis ang mga katangian.
     
4. Humanap ng Numerikamissing\\_value  
Kung ang isang hanay ng numero ay walang \\_FillValue omissing\\_valuemga katangian, ito ay sumusubok na matukoy ang isang hindi ibinigay na numerikomissing\\_value  (e.g., -999, 999, 1e37f) at binabago ang mga halimbawa nito sa "stand" na mga pagpapahalaga (MAX\\_VALUE para sa mga uri ng integer, at NIAN para sa mga doble at lumulutang) .
     **Ang opsyon na ito ay may panganib:** kung ang pinakamalaki o pinakamaliit na tanggap na halaga ng datos ay mukhang nawawalang halaga (e.g., 999) , kung gayon ang makatuwirang mga halaga ng datos ay babaguhin sa nawawalang mga halaga (e.g., NaNN) .
     
5. Palitan ang "N/A" sa ""
Para sa bawat String column, ang ilang mga strandong karaniwang ginagamit upang ipahiwatig ang nawawalang halaga ng String sa "". Sa kasalukuyan, ito ay naghahanap ng ".", "...", "-", "???", "N/A", "NA", "nanone", "hindi kapit", "null", "hindi kilala", "di-kilala", "di-kilala". Ang strand search ay case-insensitive at nilalapat pagkatapos na ang mga strando ay trial'd. Ang "nd" at "iba pa" ay partikular na hindi nasa talaan.
     **Ang opsyon na ito ay may panganib:** Ang mga string na itinuturing mong tama ay maaaring makomberte sa "".
     
6. Magtakda ng Pamantayan sa mga Petsa ng ISO 8601
Para sa bawat String column, sikaping i-publish ang not-purially-numeric String date Times (e.g., "Jan 2, 2018") sa ISO 8601 String date Times ("2018-01-02".) .
     **Pansinin** na ang lahat ng mga halaga ng datos para sa kolum ay dapat gumamit ng iisang format, kung hindi, ang opsiyon na ito ay hindi gagawa ng anumang pagbabago sa isang ibinigay na kolum.
     **Ang opsyon na ito ay may panganib:** Kung may isang kolum na may mga halaga ng kuwerdas na nagkataong parang karaniwang petsa Time formation, ito ay gagawing ISO 8601 String dateTimes.
     
7. Magtakda ng Karaniwang mga Oras ng Petsa sa ISO 8601 Petsa
Sa bawat String o integer-type column, sikaping gawing purong-numerikong String dateTimes (e.g., "20180102") sa ISO 8601 String date Times ("2018-01-02".) .
     **Pansinin** na ang lahat ng mga halaga ng datos para sa kolum ay dapat gumamit ng iisang format, kung hindi, ang opsiyon na ito ay hindi gagawa ng anumang pagbabago sa isang ibinigay na kolum.
     **Ang opsyon na ito ay may panganib:** Kung may hanay na may mga pamantayan na hindi siksik ang petsa Panahon ngunit mukhang siksik na dateTimes, ito ay babaguhin sa ISO 8601 String dateTimes.
     
8. Gawing Pamantayan ang mga Unit
Ito ay sumusubok na gawing pamantayan ang mga unit string para sa bawat variable. Halimbawa, "meters per second", "meter/second","m.s^-1","m s-1", "m.s-1" ay lahat makukumberte sa "m.s-1". Hindi nito binabago ang mga halaga ng datos. Mabisa itoUDUNITSang mga kuwerdas, subalit maaaring magkaroon ng mga problema sa walang - bisa o masalimuot na mga kuwerdas. Mahaharap mo ang mga problema sa pamamagitan ng pagbibigay ng espesipikong mga pares mula sa-to&lt;Pamantayang&gt; sa loobERDDAP'
    \\[tomcat\\]/webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml file. Pakisuyong mag - email ng anumang pagbabagong gagawin mo kay Chris. John sa noaa.gov upang sila ay maisama sa mga default message.xml.
     **Ang opsyon na ito ay may panganib:** Ito ay maaaring magresulta sa ilang mga komplikado o hindi tanggap na yunit; gayunpaman, maaari mong gamitin ang work-round na inilarawan sa itaas upang maiwasan ang mga problema kung ito ay mangyari.
         
    
Ang default na halaga ng pag-aayos ng pamantayan Ang 0 ay walang ginagawa.

Kung/kapag binago mo ang halaga ng pamantayan Ano, sa susunod na pagkakataon na muling ikarga ang dataset,ERDDAP™muling basahin ang lahat ng data files para sa dataset upang muling buuin ang mini-database na may impormasyon tungkol sa bawat file. Kung ang dataset ay maraming files, ito ay mangangailangan ng mahabang panahon.
    
Mga Paunawa:

* Isang mapandayang bagay ay -
Ang Pamantayan Anong tagpo ang ginagamit para sa lahat ng haligi sa source file. Kaya, halimbawa, ang paggamit ng #2048 ay maaaring matagumpay na gawing ISO 8601 String dateTimes ang isang kolum na may String dateTimes, subalit maaari rin itong may kamaliang baguhin ang isang kolum na may Strings na nagkataon lamang na parang siksik na mga dateTimes.
     
*   datasets.xmlat mga GenerateDataset Xml -
Lalo nang mapandaya na ituwid ang mga kalagayandatasets.xmlupang gawing mabisa ang iyong dataset sa paraang nais mo. Ang pinakamabuting paraan (gaya ng lagi) ay:
    1. Gamitin[GenerateDatasetsXml](#generatedatasetsxml)at tiyakin ang kahalagahan ng pag - uuri Kung ano ang gusto mong gamitin.
    2. Gamitin[Mga Dasd](#dasdds)upang matiyak na ang dataset na mga karga ay tama at ipinababanaag ang pamantayan Anong tagpo ang binanggit mo?
    3. Subukin ang dataset sa pamamagitan ng kamay kapag ito ay nasaERDDAP™upang tiyakin na ang apektado ay gumagana gaya ng inaasahan.
         
* Panganib
Options #256 at sa itaas ay mas mapanganib, i.e., may mas malaking tsansa na mas malaki ang tsansa naERDDAP™gagawa ng pagbabago na hindi dapat gawin. Halimbawa, ang opsyon #2048 ay maaaring di sinasadyang magpakumberte ng isang variable sa pamamagitan ng station ID strando na lahat ay nagkataong mukhang ISO 8601 "compact" dates (e.g., 20180102) sa ISO 8601"extended"petsa ("2018-01-02".) .
     
* Mabagal pagkatapos ng isang pagbabago --
Yamang mahalaga na maging pamantayan Ano ang nagbabago sa mga halaga ng datos na nakikita ng EDDTable FromFiles para sa bawat data file, kung babaguhin mo ang standardize Anong tagpo, ang EDDTable FromFiles ay mag - aalis ng lahat ng impormasyon tungkol sa bawat talaksan na nalagyan ng laman (na kinabibilangan ng main at max para sa bawat data variable sa bawat file) at muling basahin ang bawat data file. Kung ang isang dataset ay may malaking bilang ng mga file, ito ay maaaring maging napaka-time na pagkonsumo, kaya ito ay mangangailangan ng mahabang panahon upang ang dataset ay muling magkarga sa unang pagkakataonERDDAP™Ikarga muli ito pagkatapos mong gumawa ng pagbabago.
     
* Heuristiko -
Options #256 at nabanggit ay gumagamit ng mga huristiko upang gawin ang kanilang mga pagbabago. Kung makakita ka ng isang situwasyon kung saan ang mga huristiko ay gumagawa ng masamang pasiya, pakisuyong mag - email ng paglalarawan ng problema kay Chris. Juan sa noa. gov upang mapasulong natin ang mga huristiko.
     
* Mga mapagpipilian --
Kung ang isa sa pamantayan na kung Anong mapagpipilian ang hindi makalulutas sa isang problema para sa isang ibinigay na dataset, maaari mong malutas ang problema sa pamamagitan ng paggawa ng isang bagay[.nctalaksang ml](#ncml-files)sa pagpapantay sa bawat data file at pagbibigay ng kahulugan sa mga pagbabago sa mga bagay sa mga file upang ang mga file ay hindi pabagu-bago. Pagkatapos, sabihin sa EDDTTable Mula sa... Mga datos na binibigay ng aggrega.ncMga file ng ml.
    
O, gamitin[NCO](#netcdf-operators-nco)upang aktuwal na gumawa ng mga pagbabago sa mga file upang ang mga file ay hindi pabagu-bago.
        
##### Hiwalay na mga Column Para sa Taon, Buwan, Petsa, Oras, Minute, Ikalawang Taon{#separate-columns-for-year-month-date-hour-minute-second} 
Karaniwan na sa mga taskular data file na magkaroon ng hiwalay na mga kolum para sa taon, buwan, petsa, oras, minuto, segundo. BagoERDDAP™v2.10, ang tanging solusyon ay ayusin ang data file upang pagsamahin ang mga column na iyon upang maging isang nagkakaisang time column. KasamaERDDAP™2.10+, magagamit mo ang
[&lt;sourceName&gt;= *pananalita* &lt;sourceName&gt;] (#sourcename) upang magsumbongERDDAP™kung paano pagsasamahin ang mga source column upang gumawa ng isang nagkakaisang time column, kaya hindi mo na kailangang ayusin ang source file.
##### &lt;Malapitin ang Header toRegexgt;{#skipheadertoregex} 
* [&lt;Jake Header toRegex&gt;] (#skipheadertoregex) --
OPSYONAL. (Para sa EDDTable FromAsciiFiles at EDDTable FromColumnarAsciiFiles datasets lamang.)   
Kapag ang EDDTable FromAsciiFiles ay nagbabasa ng isang data file, ito ay magwawalang bahala sa lahat ng mga linya hanggang at isama ang linya na tumutugma sa regular na ekspresyong ito. Ang default ay "", na hindi gumagamit ng opsiyon na ito. Ang isang halimbawa ay
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
na magwawalang - bahala sa lahat ng linya hanggang sa at kasali na ang isang linya na nagsisimula "\\*\\*\\*ISTAT NG HEADER".

Kapag ginagamit mo ang tag na ito,&lt;kolumnamesRow&gt; at&lt;Ang firstDataRow&gt; ay gumaganap na parang tinanggal na ang header bago pa mabasa ang talaksan. Halimbawa, gagamit ka ng kolumNamesRow=0 kung ang mga pangalan ng kolum ay nasa hanay mismo pagkatapos ng header.

Kung gusto mong gamitin ang mga ito Mga Data Xml na may dataset na nangangailangan ng tag na ito:

1. Gumawa ng bago, pansamantala, sampol na talaksan sa pamamagitan ng pagkopya ng umiiral na talaksan at pagtanggal ng header.
2. Lumikha ng pagtakbo Mga Data Xml at magtakda ng talaksang sampol na iyon.
3. Manual na idagdag ang&lt;Tatak ng "Header ToRegex&gt; tag " sadatasets.xmlLarawan.
4. Itapon ang pansamantala at sampol na talaksan.
5. Gamitin ang dataset saERDDAP.
##### &lt;Maliligos;{#skiplinesregex} 
OPSYONAL. (Para sa EDDTable FromAsciiFiles at EDDTable FromColumnarAsciiFiles datasets lamang.)   
Kapag ang EDDTable FromAsciiFiles ay nagbabasa ng isang data file, ito ay magwawalang bahala sa lahat ng linya na tumutugma sa regular na ekspresyong ito. Ang default ay "", na hindi gumagamit ng opsiyon na ito. Ang isang halimbawa ay
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
na magwawalang bahala sa lahat ng mga linya na nagsisimula sa "#".

Kapag ginagamit mo ang tag na ito,&lt;kolumnamesRow&gt; at&lt;Ang firstDataRow&gt; ay gumaganap na parang ang lahat ng magkapares na mga linya ay inalis bago pa mabasa ang talaksan. Halimbawa, gagamit ka ng kolumNamesRow=0 kahit na may ilang linya simula, halimbawa, "#" sa simula ng file.
    
#### EDDTable FromFiles kalansay XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Mapagkakatiwalaan Mula sa AsiciiService{#eddtablefromasciiservice} 
[ **Mapagkakatiwalaan Mula sa AsiciiService** ](#eddtablefromasciiservice)ay isang screen scracker. Ito ay nilalayon upang harapin ang mga source ng datos na may simpleng web service sa paghiling ng datos (Kadalasang isang anyong HTML sa isang web page) at alin ang maaaring ibalik ang impormasyon sa ilang organisadong format ng ASCII (Halimbawa, isang comma-extend-halaga o columnar ASCII text format, na kadalasang may ibang impormasyon bago at/o pagkatapos ng datos) .

Ang EDDTable FromAsciiService ay ang superclass ng lahat ng EDDTable FromAsciiService... classs. Hindi mo maaaring gamitin nang tuwiran ang EDDTable FromAsciiService. Sa halip, gumamit ng subclass of EDDTable FromAsciiService upang pangasiwaan ang espesipikong mga uri ng serbisyo:

*   [MAHIRAP SA MGA ASciiServiceNO](#eddtablefromasciiservicenos)nakakakuha ng datos mula saNOAAMga serbisyo ng ASCII ng NOS.

Sa kasalukuyan, walang ibang uri ng serbisyo ang sinusuportahan. Subalit karaniwan nang madaling suportahan ang iba pang mga paglilingkod kung sila'y nagtatrabaho sa katulad na paraan. Makipag - ugnayan sa amin kung mayroon kang kahilingan.

#### Mga Detalye{#details} 
Ang sumusunod na impormasyon ay kumakapit sa lahat ng mga subklase ng EDDTable FromAsciiService.

* Mga Pagpigil --ERDDAP™Ang mga kahilingan ng tabular data ay maaaring maglagay ng mga limitasyon sa anumang iba't ibang paraan. Ang saligang serbisyo ay maaari o maaaring hindi payagan ang mga limitasyon sa lahat ng mga variable. Halimbawa, maraming serbisyo ang sumusuporta lamang sa mga limitasyon sa mga pangalan ng istasyon, latitud, longhitud, at panahon. Kaya kapag ang isang subclass ng EDDTable FromAsciiService ay nakakuha ng kahilingan para sa isang subset ng isang dataset, ito ay nagreresulta ng hangga't maaari'y maraming mga entry sa source data service at pagkatapos ay ilalapat ang mga natitirang entry sa data ibinalik sa pamamagitan ng serbisyo, bago ibigay ang datos sa user.
* Walang - Hanggang Range -- Hindi tulad ng maraming iba pang mga uri ng dataset, ang EDDTable FromAsciiService ay karaniwang hindi alam ang saklaw ng datos para sa bawat variable, kaya't hindi ito madaling makatatanggi sa mga kahilingan para sa datos sa labas ng tanggap na saklaw.
* Pagsasaayos ng ASCII Text Response -- Kapag nakuha ng EDDTable FromAsciiService ang tugon mula sa ASCII Text Service, dapat nitong patunayan na ang tugon ay may inaasahang format at impormasyon, at pagkatapos ay kunin ang impormasyon. Matutukoy mo ang format sa pamamagitan ng paggamit ng iba't ibang espesyal na tag sa daglat ng XML para sa dataset na ito:
    *   &lt;bago angData1&gt;&lt;mga tag ng pre-Data10&gt;- Masasabi mo ang isang serye ng mga teksto (hanggang 10) na ang EDDTable FromAsciiService ay dapat maghanap sa header ng teksto ng ASCII na ibinalik ng serbisyo kasama ang&lt;bago angData1&gt;&lt;bago angData10&gt;. Halimbawa, ito ay kapaki-pakinabang sa pagpapatunay na kasama sa tugon ang mga inaasahang variable gamit ang inaasahang yunit. Ang huling tag bago angData na tinukoy mo ay ang teksto na lumilitaw bago pa man magsimula ang datos.
    *   &lt;matapos angData&gt; -- Ito ay nagsasaad ng teksto na EDDTable FromAsciiService ay hahanapin sa teksto ng ASCII na ibabalik sa pamamagitan ng serbisyo na nangangahulugang dulo ng data.
    *   &lt;noData&gt; -- Kung masumpungan ng EDDTable FromAsciiService ang tekstong ito sa tekstong ASCII na ibinalik ng serbisyo, ito ay naghihinuha na walang datos na tumutugma sa kahilingan.
#### EDDTable Mula sa kalansay ni AsciiService XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### MAHIRAP SA MGA ASciiServiceNO{#eddtablefromasciiservicenos} 
[ **MAHIRAP SA MGA ASciiServiceNO** ](#eddtablefromasciiservicenos)gumagawa ng EDDTable datasets mula sa ASCII text data services na iniaalok ngNOAA'[Paglilingkod sa Karagatang Pambansa (WALA) ](https://oceanservice.noaa.gov/). Para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin, tingnan ang superclass ng klaseng ito[Mapagkakatiwalaan Mula sa AsiciiService](#eddtablefromasciiservice). Malamang na hindi kailangang gamitin ng sinuman maliban kay Bob Simons ang subclass na ito.

Yamang ang impormasyon na nasa loob ng pagtugon mula sa serbisyo ng NOS ay gumagamit ng isang columnar ASCII text format, ang mga data variables maliban sa latitud at longitude ay dapat na may espesyal na attribute na nagsasabi kung aling mga karakter ng bawat data line ang naglalaman ng variable's data, halimbawa,
```
<att name="responseSubstring">17, 25</att>  
```
 
### Mapagkakatiwalaan Buhat sa AllDatasets{#eddtablefromalldatasets} 
[ **Mapagkakatiwalaan Buhat sa AllDatasets** ](#eddtablefromalldatasets)ay isang mas mataas na-level dataset na may impormasyon tungkol sa lahat ng iba pang datasets na kasalukuyang nakakarga sa inyongERDDAP. Hindi tulad ng ibang mga uri ng datasets, walang speciation para saallDatasetsdatos sa loobdatasets.xml.ERDDAP™Awtomatikong lumilikha ng isang EDDTable Mula sa AllDatasets dataset (kasamadatasetID=allDatasets) . Sa gayon, isangallDatasetsAng dataset ay gagawin sa bawat isaERDDAP™pagluluklok at gayundin ang gagawin sa bawat isaERDDAP™pagluluklok.

AngallDatasetsAng dataset ay isang tabular dataset. Mayroon itong hanay ng impormasyon para sa bawat dataset. Mayroon itong mga tudling na may impormasyon tungkol sa bawat dataset, e.g.,datasetID, madaling marating, institusyon, pamagat, main Longthitude, max Longthitude, mainLatude, maxLatude, mainTime, maxTime, atbp. SapagkatallDatasetsay tabular dataset, maaari mong itanong ito sa paraan na maaari mong tanungin ang anumang iba pang tabular datasetERDDAP™, at maaari mong tiyakin ang uri ng talaksan para sa pagtugon. Ito'y nagpapangyari sa mga gumagamit na hanapin ang mga dataset ng interes sa napakabisang mga paraan.
 
### Mapagkakatiwalaan Buhat sa mga AsiciiFile{#eddtablefromasciifiles} 
[ **Mapagkakatiwalaan Buhat sa mga AsiciiFile** ](#eddtablefromasciifiles)Ang aggregates data mula sa mga comma-, tab-, semikolon-, o space-expressed tabular ASCII data files.

* Kadalasan, ang mga file ay magkakaroon ng mga pangalan ng kolum sa unang hanay at datos simula sa ikalawang hanay. (Dito, ang unang hanay ng talaksan ay tinatawag na hanay bilang 1.) Pero magagamit mo&lt;kolumnamesRow&gt; at&lt;firstDataRow&gt; sa inyong lugardatasets.xmlang isang naiibang numero ng hanay.
*   ERDDAP™ay pumapayag sa mga hanay ng datos na magkaroon ng iba't ibang bilang ng mga halaga ng datos.ERDDAP™mga palagay na ang nawawalang mga halaga ng datos ang pangwakas na mga hanay sa hanay.ERDDAP™Nag-aatas ng pamantayang kulang na halaga para sa nawawalang mga halaga ng datos. (idinagdag na v1.56) 
* Ang mga file ng ASCI ay madaling pagtrabahuin, ngunit hindi ito ang pinakamahusay na paraan ng pag-iimbak/retrieve data. Para sa higit na kahusayan, itabi ang mga file bilangNetCDFv3.ncmga talaksan (na may isang dimensiyon, "row", na pinagsasaluhan ng lahat ng mga variables) sa halip. Puwede[gamitinERDDAP™upang lumikha ng bagong mga files](#millions-of-files).
* Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Dahil sa ganap na kawalan ng metadata sa mga file ng ASCII, kailangan mong laging ayusin ang mga resulta ng GenerateDatasetsXml.
* BABALA: KailanERDDAP™basahin ang ASCII data files, kung makakita ito ng error sa isang ibinigay na linya (e.g., maling bilang ng mga bagay) , nilalagyan nito ang isang babalang mensahe (" PANGANGALAGA: Masamang guhit (s) ng datos" ... na may listahan ng mga masamang linya sa mga kasunod na linya) sa[log.txt file](/docs/server-admin/additional-information#log)at pagkatapos ay patuloy na babasahin ang natitirang bahagi ng data file. Kaya pananagutan mong tumingin paminsan - minsan (o sumulat ng iskrip upang gawin iyon) para sa mensaheng iyon sa troso. Tsext upang maayos mo ang mga problema sa data files.ERDDAP™ay itinatayo sa ganitong paraan upang patuloy na mabasa ng mga gumagamit ang lahat ng makukuhang mabisang impormasyon bagaman ang ilang linya ng talaksan ay may mga depekto.
     
### Maaasahan Mula sa Mga HawsXmlFile{#eddtablefromawsxmlfiles} 
[ **Maaasahan Mula sa Mga HawsXmlFile** ](#eddtablefromawsxmlfiles)Ang mga datos mula sa set ng Automatic Weather Station (MGA AW) XML data files gamit ang WeatherBug Rest XML API (na hindi na aktibo) .

* Ang uring ito ng talaksan ay isang simple ngunit hindi epektibong paraan ng pag-iimbak ng datos, dahil ang bawat file ay karaniwang naglalaman ng obserbasyon mula sa isang punto lamang ng oras. Kaya maaaring may malaking bilang ng mga talaksan. Kung nais mong pagbutihin ang iyong pagtatanghal, isaalang - alang ang nakapagpapatibay na mga grupo ng mga obserbasyon (halaga ng isang linggo?) sa loobNetCDFv3.ncmga talaksan (Pinakamabuti:.ncng talaksan kasama ng[CF Mga Sampling Geometriya (DSG) Pabagu - bagong anyong Array](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) at paggamit[Mga EDDTable Mula sa mga MultidimNcFile](#eddtablefrommultidimncfiles)  (o[Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)) upang i-serialize ang datos. Puwede[gamitinERDDAP™upang lumikha ng bagong mga files](#millions-of-files).
* Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.
     
### Kawili - wili Mula sa mga Labi ngColumnarAscii{#eddtablefromcolumnarasciifiles} 
[ **Kawili - wili Mula sa mga Labi ngColumnarAscii** ](#eddtablefromcolumnarasciifiles)Ang aggregates data mula sa tabular ASCII data files na may nakapirmeng-width column.

* Kadalasan, ang mga file ay magkakaroon ng mga pangalan ng kolum sa unang hanay at datos simula sa ikalawang hanay. Ang unang linya/row sa file ay tinatawag na row #1. Pero magagamit mo&lt;kolumnamesRow&gt; at&lt;firstDataRow&gt; sa inyong lugardatasets.xmlang isang naiibang numero ng hanay.
* Ang&lt;addAttributes&gt; para sa bawat isa&lt;dataVariable&gt; para sa mga dataset na ito, isama sa MUST ang dalawang espesyal na katangiang ito:
    
    *   &lt;Pangalang= "startColumn"&gt; *integer* &lt;att&gt; -- banggitin ang hanay ng karakter sa bawat linya na siyang simula ng pagkakaiba-iba ng datos na ito.
    *   &lt;Pangalang="stopColumn"&gt; *integer* &lt;att&gt; -- banggitin ang hanay ng karakter sa bawat linya na 1 pagkatapos ng dulo ng datos na ito na magkakaiba.
    
Ang unang pitak ng karakter ay tinatawag na kolum #0.
Halimbawa, para sa talaksang ito na may panahon ay nagpapahalaga sa pag-iiba ng mga halaga ng temperatura :
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
ang time data variable
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
at iba't iba sana ang panahon ng datos
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Ang mga katangiang ito ay espesipikong binabanggit para sa lahat ng iba't ibang bagay maliban sa[nakapirmeng-halaga](#fixed-value-sourcenames)at[file-name-source-names](#filename-sourcenames)Iba't iba.
* Ang mga file ng ASCI ay madaling pagtrabahuin, ngunit ang mga ito ay hindi mahusay na paraan ng pag-iimbak/retrieve data. Para sa higit na kahusayan, itabi ang mga file bilangNetCDFv3.ncmga talaksan (na may isang dimensiyon, "row", na pinagsasaluhan ng lahat ng mga variables) sa halip. Puwede[gamitinERDDAP™upang lumikha ng bagong mga files](#millions-of-files).
* Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Dahil sa kahirapang malaman ang simula at katapusang mga posisyon para sa bawat hanay ng datos at ang kabuuang kakulangan ng metadata sa mga talaksang ASCII, lagi mong kakailanganing ayusin ang mga resulta mula sa GenerateDatasetsXml.
     
### NABAUTISAN NG EDDTTEGO{#eddtablefromhttpget} 
Mapagkakatiwalaan Ang FromHttp Gett ay iba sa lahat ng iba pang uri ng datasets saERDDAP™sa bagay na ito ay may sistema kung saan ang espisipikong "authors" ay maaaring magdagdag ng impormasyon, baguhin ang impormasyon, o i - delete ang data mula sa dataset sa pamamagitan ng regularHTTP GETo[POST](#http-post)mga kahilingan mula sa isang programa sa computer, isang iskrip o isang browser. Ang dataset ay queryable ng mga gumagamit sa katulad na paraan na ang lahat ng iba pang mga EDDTable datasets ay queryable saERDDAP. Tingnan ang paglalarawan ng superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), basahin ang tungkol sa mga katangian na namamana mula sa superclass na iyon.

Ang mga natatanging katangian ng EDDTable FromHttp Gett ay inilalarawan sa ibaba. Kailangan mong basahin ang lahat ng panimulang bahaging ito at unawain ito; kung hindi, maaaring mayroon kang di - makatotohanang mga inaasahan o masangkot ka sa problema na mahirap ayusin.

#### Patuloy na Paggamit{#intended-use} 
Ang sistemang ito ay nilayon para sa:

* Tablar (sa loob ng nu) ang impormasyon, hindi naka-upload na datos.
* Tunay na panahon data -
Ang tunguhin ay upang pahintulutan ang isang awtor (e.g., ang sensor, ang automated QC script, o ang isang espesipikong tao) upang baguhin ang dataset (sa pamamagitan ng isang[.insert o .delete command](#insert-and-delete)) at gawin itong posibleERDDAP™ang mga gumagamit, lahat ay wala pang 1 segundo, at malamang na mas mabilis. Karamihan sa 1 segundong iyon ay network time.ERDDAP™ay maaaring magproseso ng kahilingan sa halos 1 m at ang impormasyon ay agad na makukuha ng mga gumagamit. Ito ay isang[mabilis](#httpget-speed),[matipuno](#robust), at[Maaasahang sistema](#system-reliability).
* Halos anumang dalas ng datos -
Ang sistemang ito ay maaaring tumanggap ng bihirang datos (e.g., araw - araw) sa pamamagitan ng napakadalas na datos (e.g., 100 datos ng Hz) . Kung babaguhin mo ang sistema, mahaharap nito ang mas mataas na frequency data (Marahil 10 KHz data kung ikaw ay labis - labis) .
* Data mula sa isang sensor o koleksiyon ng katulad na sensor.
*   [Paglalathala](#versioning)/[Binabago ang Siyensiya](https://en.wikipedia.org/wiki/Reproducibility)/DOI-
Mga sitwasyon kung saan kailangan mong baguhin ang impormasyon (e.g., palitan ang bandilang pangkontrol ng kalidad) , alamin kung sinong awtor ang gumawa ng bawat pagbabago, alamin ang timestamp ng kung kailan ginawa ng awtor ang pagbabago, at (kung hihilingin) na makita ang orihinal na datos mula bago nagawa ang pagbabago. Kaya, ang mga dataset na ito ay maaaring makuha[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). sapagkat nakasalubong nila angDOIna ang dataset ay hindi nagbabago, maliban sa pamamagitan ng agregation. Sa pangkalahatan, ang halos tunay na mga dataset ay hindi maaaring makuhaDOIs sapagkat ang impormasyon ay kadalasang muling binabago (e.g., para sa mga layuning QA/QC) .
     

Minsang ang datos ay nasa isang EDDTable FromHttp Get dataset, ang sinumang gumagamit ay maaaring humiling ng datos sa katulad na paraan na sila ay humihingi ng datos mula sa anumang iba pang EDDTable dataset.
     
#### Eksperimento: Maging Maingat{#experimental-be-careful} 
Yamang ang sistemang ito ay bago at yamang ang nawawalang impormasyong pangkapaligiran ay hindi maaaring gamuting muli, dapat mong gamutin ang EDDTable FromHttp Get na eksperimental. Kung ikaw ay nagbabago mula sa ibang sistema, pakisuyong pangasiwaan ang matandang sistema at ang bagong sistema na magkahanay hanggang sa ikaw ay magtiwala na ang bagong sistema ay gumaganang mahusay (mga linggo o buwan, hindi lamang mga oras o araw) . Sa lahat ng kaso, pakisuyong tiyaking hiwalay na arkibo ng inyong sistema ang .insert at .delete URLs na ipinadadala sa EDDTable FromHttp Get dataset (kahit na lamang sa Apache at/o mga trosong Tomcat) , sa paano man sa sandaling panahon. At sa lahat ng kaso, tiyakin na ang mga data file na nilikha ng inyong EDDTable FromHttp Get dataset ay karaniwang sinusuhayan ng mga panlabas na data storage device. (Pansinin na[rsync](https://en.wikipedia.org/wiki/Rsync). ay maaaring suportahan ang mga data files na nilikha ng EDDTable FromHttp Get na napakahusay.)   
     
#### .insert at .delete{#insert-and-delete} 

Para sa anumang dataset saERDDAP™, kapag ikaw ay humihilingERDDAP™para sa isang subset ng datos sa isang dataset, tinukoy mo ang file type na nais mo para sa tugon, e.g., .csv,.htmlTable,.nc,.json. Mapagkakatiwalaan Mula sa Hap Palawigin ang sistemang ito upang suportahan ang dalawang karagdagang "uri ngfile" na maaaring magpasok (o pagbabago) o i-delete ang datos sa dataset:

* .insert
    * Ang kahilingan ay binubuo na parang isang pamantayang anyong HTML na tugon, na may susing=halagang pares, na pinaghihiwalay ng '&'. Halimbawa,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
nagsasabiERDDAP™idagdag o palitan ang datos para sastationID=46088 para sa itinakdang panahon.
    * Ang may akda ng pagbabagong ito ay si JohnSmith at ang susi ay mgaKey1.
    * Dapat ilakip sa URL ang makatuwirang mga pamantayan (hindi nawawalang mga pamantayan) sa lahat[httpMaging Mausisa](#httpgetrequiredvariables-global-attribute)
    * Kung ang mga pamantayan ayhttpMaulit Pa Mga pagbabago sa kahilingan (e.g.,stationIDat panahon) ang mga pamantayan sa isang hanay na nasa dataset na, ang bagong mga pamantayan ay mabisang nakahihigit sa pagsulat ng dating mga pamantayan (Bagaman ang dating mga pamantayan ay makukuha pa rin kung ang gumagamit ay humihiling ng impormasyon mula sa isang naunang kopya[bersyon](#versioning)ng dataset) .
    * Hindi dapat isama sa .insert URL ang &timestamp= (ERDDAP™gumagawa ng halagang iyon) o & Inutos= (na binitukoy ng .insert (na command=0) o .delete (na ito ay command= 1) ) .
    * Kung ang .insert na URL ay hindi nagtatakda ng mga halaga para sa ibang mga kolum na nasa dataset, ang mga ito ay ipinapalagay na ang mga katutubong nawawalang halaga (MAX\\_VALUE para sa mga integer data type, NaN para sa mga palutang at doble, at "" para sa Strings) .
             
    * .delete
        * Ang kahilingan ay binubuo na parang isang pamantayang anyong HTML na tugon, na may susing=halagang pares, na pinaghihiwalay ng '&'. Halimbawa,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
nagsasabiERDDAP™upang alisin ang impormasyon para sastationID=46088 sa itinakdang panahon.
        * Ang may akda ng pagbabagong ito ay si JohnSmith at ang susi ay mgaKey1.
        * Kailangang tiyakin ng URL ang[httpMaging Mausisa](#httpgetrequiredvariables-global-attribute)sa kahilingan (e.g.,stationIDat panahon) . Kung ang mga pamantayang iyon ay katugma ng mga pamantayan sa isang hanay na nasa dataset na (na karaniwang gagawin nila) , ang dating mga pamantayan ay mabisang inaalis (Bagaman ang dating mga pamantayan ay maaari pa ring makuha kung ang gumagamit ay humihiling ng impormasyon mula sa isang nauna[bersyon](#versioning)ng dataset) .
        * Hindi kailangang magtakda ng mga halaga para sa mga hindi-Http GetRequiredVariables, maliban sa may akda, na kinakailangan upang matiyak ang kahilingan.
             
    
Mga Detalye:
    * .insert at .delete requests ay formed tulad ng standard HTML form reactions, na may key=halagang pares, hiwalay ng '&'. Ang mga pamantayan ay dapat na[naka-iskedyul ng porsiyento](https://en.wikipedia.org/wiki/Percent-encoding). Kaya, kailangan mong i-install ang mga espesyal na karakter sa anyong %HH, kung saan ang HH ang 2 digit na hexadecimal na halaga ng karakter. Karaniwan, kailangan mo lamang gawing %25, & sa %26, " tungo sa %22,&lt;sa %3C, = sa %3D, &gt; sa %3E, + sa %2B,|sa %7C,\\[sa %5B,\\]sa %5D, ang espasyo sa %20, at ginagawa ang lahat ng mga character sa itaas #127 sa kanilang UTF-8 form at pagkatapos ay ang porte ng UTF-8 format (humingi ng tulong sa isang programmer) .
    * .insert at .delete na mga kahilingan ay dapat isama ang[httpMaging Mausisa](#httpgetrequiredvariables-global-attribute), e.g.,stationIDat panahon. Para sa mga kahilingan ng .insert, ang mga variable na hindi nakatakda sa kahilingan ay ipinapalagay na nawawalang mga halaga (MAX\\_VALUE para sa mga integer variable, NaN para sa mga lumulutang at double variables, at isang walang laman na String para sa String variables) . Para sa mga kahilingan ng .delete, mga halaga para sa non-Htp GetRequired Iba - iba (maliban sa awtor, na kinakailangan) ay ipinagwawalang - bahala.
    * .insert at .delete requests dapat isama ang pangalan ng may akda at susi ng may akda sa pamamagitan ng isang parameter sa anyong may akda= *awtor na\\_key* bilang huling parameter sa kahilingan. Ang paghiling na ito na maging huling kahilingan ay tumitiyak na ang buong kahilingan ay tinanggap naERDDAP. Ang awtor lamang (hindi ang susi) ay itatabi sa data file. Dapat mong tiyakin ang listahan ng ipinahihintulot *awtor na\\_key* ' Sa pamamagitan ng pangglobong katangian[httpMga GetKey](#httpgetkeys)
    * Ang .insert at .delete parameter ay maaaring scalarite (nag - iisa) mga halaga o hanay ng anumang haba ng anyo\\[halaga1, may halaga2, may halaga3,..., may halaga\\]. Para sa isang ibinigay na kahilingan, ang lahat ng mga variable na may mga array ay dapat magkaroon ng mga hanay na may parehong bilang ng mga halaga (isa pa itong pagkakamali) . Kung ang isang kahilingan ay may mga pamantayang scalar at array, ang mga halaga ng scalar ay tinutularan upang maging mga hanay na may katulad na haba ng espesipikong mga hanay, e.g., &stationID=46088 ay maaaring ituring na &stationID=\\[46088,46088,46088\\]. Ang mga array ang susi sa[mataas sa pamamagitan ngput](#httpget-speed). Kung walang mga array, magiging hamon ang .insert o .delete ng higit sa 8 hanay ng datos kada segundo mula sa isang malayong may akda (dahil sa lahat ng taas ng network) . Sa mga array, magiging madali ang .insert o .delete ng higit sa 1000 hanay ng datos kada segundo mula sa isang malayong sensor.
    * .insert at .delete tanggapin (walang maling mensahe) Paglutang ng puntos number kapag ang mga integer ay inaasahan. Sa mga kasong ito, ang dataset ay sumasakop sa mga halaga sa mga integers.
    * .insert at .delete tanggapin (walang maling mensahe) integer at lumulutang na mga point number na mga out-of-range ng tipo ng datos ng variable. Sa mga kasong ito, iniimbak ng dataset ang mga pamantayan bilangERDDAP'Ang katutubong nawawalang mga halaga para sa uring iyon ng datos (MAX\\_VALUE para sa mga uri ng integer at NaN para sa mga palutang at doble) .
         
#### Pagtugon{#response} 
Kung magtagumpay ang .insert o .delete URL, ang kodigo ng pagtugon ng HTTP ay magiging 200 (OK) at ang magiging tugon ay teksto na may kasamang.jsonbagay, e.g.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Pansinin na ang mga timestamp ay may millise second presensya.

Kung mabigo ang .insert o .delete URL, magkakaroon ka ng kodigo ng pagtugon ng HTTP maliban sa 200 (Okay) , e.g., Error 403 Bawal kung magsumite ka ng di - wastong awtor na si\\_key.ERDDAP™ay nagpapadala ng kodigo ng pagtugon ng HTTP (hindi, eg., a.jsonerror sa pagbasa ng talaksang '%s': %s) sapagkat ganiyan ang ginagawa sa internet at dahil sa maaaring mangyari ang mga pagkakamali saanman sa sistema (e.g., sa network, na nagbabalik ng isang HTTP error) . Kung ang pagkakamali ay mula saERDDAP™, maaaring kalakip sa tugon ang ilang teksto (hindi.json) na may mas detalyadong paliwanag kung ano ang nagkamali, subalit ang kodigo ng pagtugon ng HTTP (200=Okay, kahit ano ay problema) ay ang tamang paraan ng pagsusuri kung ang .insert o .delete ay nagtagumpay. Kung ang pagsuri sa HTTP response code ay hindi posible o hindi kombinyente, hanapin ang "status": "tagumpay" sa teksto ng tugon na dapat ay maaasahang indikasyon ng tagumpay.
    
#### Log Files{#log-files} 
Kapag ang EDDTable FromHttp Gett ay tumatanggap ng .insert at .delete utos, ito ay nagreresulta lamang sa impormasyon sa kaugnay na file sa isang set ng log files, na ang bawat isa ay isang mesa na nakaimbak sa isang kaugnay na file[JON Ang talaksang Lines CSV](https://jsonlines.org/examples/). Kapag humiling ng datos ang gumagamit nito,ERDDAP™basahin agad ang kaugnay na mga log file, ikapit ang mga pagbabago sa dataset ayon sa pagkakasunud - sunod ng mga ito, at pagkatapos ay salain ang kahilingan sa pamamagitan ng mga limitasyon ng gumagamit na gaya ng iba pang bagayERDDAP™kailangan ng datos. Ang paghahati ng impormasyon sa iba't ibang log file, ang pag - iimbak ng iba't ibang piraso ng impormasyon (e.g., ang timestamp ng utos, at kung ang utos ay .insert o .delete) , at iba't ibang aspekto ng setup ng dataset, lahat ay gumagawa ritong posible para saERDDAPupang mabilis at mabisang makuha ang mga datos mula sa dataset na ito.
     
#### Katiwasayan at Awtor{#security-and-author} 
Ang bawat .insert at .delete command ay dapat isama ang &author= *awtor na\\_key* bilang ang huling parameter, kung saan ang awtor na si\\_key ay binubuo ng identifier ng awtor (pinili mo: pangalan, mga inisyal, pseudonym, numero) , diin, at lihim na susi. AngERDDAP™Ang administrador ay gagawang kasama ng mga awtor upang gumawa ng listahan ng mabisang awtor na si\\_key, na maaaring baguhin sa anumang panahon.
Kapag ang EDDTable FromHttp Gett ay nakatanggap ng .insert o .delete command, tinitiyak nito na ang may akda na ID\\_key ang huling parameter at may bisa. Dahil ito ang huling parameter, ipinahihiwatig nito na ang buong command line ay nakaratingERDDAP™at hindi nakaya. Tinitiyak ng sekretong susi na ang espesipikong mga awtor lamang ang maaaring magpasok o mag - alis ng impormasyon sa dataset.ERDDAP™Pagkatapos ay kinukuha ang awtor na ito at inililigtas na sa awtor ay iba - iba, upang makita ng sinuman kung sino ang may pananagutan sa isang pagbabago sa dataset.
.insert at .delete mga utos ay magagawa lamang sa pamamagitan nghttps:  (matatag)  ERDDAP™URLs. Tinitiyak nito na ang impormasyong inililipat ay pinananatiling lihim sa panahon ng paghahatid.
     
#### paatras{#timestamp} 
Bilang bahagi ng sistema ng troso, ang EDDTable FromHtp Gett ay nagdaragdag ng timestamp (ang panahong iyonERDDAPay tumanggap ng kahilingan) sa bawat utos na mag - imbak ito sa mga log file. SapagkatERDDAP™ay lumilikha ng timestamp, hindi ang mga awtor, hindi mahalaga kung ang iba't ibang awtor ay gumagawa ng mga pagbabago mula sa mga computer na may mga orasan na itinakda sa bahagyang naiibang panahon. Ang timestamp ay tiyak na nagpapahiwatig ng panahon nang gawin ang pagbabago sa dataset.
     
#### TANGGAP{#http-post} 
*   ["Ano ba ang HTTP POST?".](#http-post)  
HTTP[POST](https://en.wikipedia.org/wiki/POST_(HTTP)) ang mas mabuting alternatibo (kumpara saHTTP GET) para sa pagpapadala ng impormasyon mula sa isang kliyente sa isang HTTP server. Kung magagawa mo, o kung talagang nais mong pagbutihin ang seguridad, gumamit ng POST sa halip na huminto upang ipadala ang impormasyonERDDAP. ANG libangan ay mas tiwasay sapagkat: sa pamamagitan ng pag - iisa at pag - iisahttps, ang URL ay naililipat sa isang ligtas na paraan, ngunit ang buong URL (kasama ang mga parameter, pati na ang awtor na si\\_key) ay isusulat sa Apache, Tomcat, atERDDAP™Mga log file, kung saan mababasa ng isa ang mga ito kung ang mga file ay hindi wasto ang pagkakakabit. Sa pamamagitan ng POST, ang mga parameter ay naililipat sa isang ligtas na paraan at hindi isinulat sa mga log file. Ang SOST ay medyo mas mahirap para sa mga kliyente na magtrabaho at hindi ito sinusuportahan nang malawakan ng client software, ngunit sinusuportahan ito ng mga wikang pamprograma. Ang nilalaman na ipadadala mo sa dataset sa pamamagitan ng SOUT o POST ay magiging pareho, basta na lamang bubuo sa ibang paraan.
     
#### httpMaulit Pa Iba - iba ang Kalagayan sa Buong Daigdig{#httpgetrequiredvariables-global-attribute} 
Ang isang mahalagang bahagi ng gawain ng buong sistemang ito ay ang kinakailangang pangglobong katangianhttpMaulit Pa Variables, na isang comma-nahating talaan ngdataVariableMga pangalan ng pinagmulan na natatanging nagpapakilala ng isang hanay ng datos. Ito'y dapat na walang gaanong halaga hangga't maaari at halos sa tuwina'y kasali ang iba't ibang panahon. Halimbawa, narito ang iminumungkahihttpMaulit Pa Mga pagbabago sa bawat isa sa[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Mangyari pa, ang mga pangalan ng ID ay maaaring naiiba sa inyong dataset.) :

* Para sa mga Liham:stationID, oras
* Para sa Trajectory: trajectoryID, oras
* Para sa Profile: panahon (Ang pag - aaksaya ng panahon ay profile\\_id) , lalim
* Para sa mga Orasan Larawan:stationID, oras (Ang pag - aaksaya ng panahon ay profile\\_id) , lalim
* Para sa Trajectory Profile: trajectoryID, oras (Ang pag - aaksaya ng panahon ay profile\\_id) , lalim

    
Halimbawa:
Nagbigay ng .insert command na kinabibilangan ngstationID=46088 at oras=2016-06-23T19:53:00Z (at iba pang mga pamantayan para sa iba pang mga pagkakaiba - iba) :
* Kung walang umiiral na datos para sa istasyong iyon at sa panahong iyon, kung gayon ang epekto ay idagdag ang datos sa dataset.
* Kung may umiiral na datos para sa istasyong iyon at sa panahong iyon, kung gayon ang epekto ay palitan ang umiiral na hanay ng mga datos ng bagong datos na ito. (Mangyari pa, mula noonERDDAP™ang talaan ng bawat utos na natatanggap nito, ang lumang impormasyon ay nasa logo pa rin. Kung ang gumagamit ay humihingi ng datos mula sa bersyon ng dataset bago ang pagbabagong ito, makikita nila ang mas lumang datos.)   
         
#### httpKumuha ng DisrectoryStructure{#httpgetdirectorystructure} 
*   [httpKumuha ng Direktoryo Pangglobong Attribute at Data (Log) Mga Pangalan ng File](#httpgetdirectorystructure)  
Ang bahagi ng mahusay na gumagana sa buong sistemang ito ay yaongERDDAP™Lumilikha ng isang set ng datos (log) ang mga talaksan, na bawat isa'y may iba't ibang bahagi ng dataset. Kung ang mga ito ay maayos,ERDDAP™ay mabilis na makatutugon sa karamihan ng mga kahilingan para sa impormasyon. Ang setup na ito ay tinitiyak nghttpKumuha ng pangglobong katangian na DirectoryStructure, na isang String na mukhang isang tatak, e.g., "stationID/10years", ngunit sa katunayan ay isang tiyak na para sa istraktura ng directory. Ipinakikita ng mga bahagi nito kung paano binibigyan ng directory at mga files ang data (log) gagawa ng mga talaksan.
    
    * Kung ang isang bahagi ay isang integer (&gt;= 1) Isang Oras Pa (Halalan, ikalawa, minuto, oras, petsa, buwan, taon, o ang kanilang mga pangmaramihan) , e.g., 10years, pagkatapos ang EDDTable FromHttp Get dataset ay gugugol ng panahon para sa hanay ng datos (e.g., 2016-06-23T19:53:00Z) , kalkulahin ang panahon na itinakda sa gayong kaeksaktuhan (e.g., 2010) , at gumawa ng folder o fileName mula diyan.
        
Ang tunguhin ay kumuha ng isang di - gaanong malaking bahagi ng impormasyon sa bawat file, subalit wala pang 2GB.
        
    * Kung hindi, ang bahagi ng detalye ay dapat na isangdataVariable'sourceName, e.g.,stationID. Sa kasong ito, ang EDDTable FromHttp Gett ay gagawa ng isang folder o file mula sa halaga ng variable para sa bagong hanay ng datos (e.g., "46088") .
    
Dahil ang .insert at .delete command data ay nakaimbak sa espesipikong datos (log) mga talaksan, EDDTable FromHttp Gett Karaniwang kailangan lamang buksan ang isa o ilang datos (log) mga talaksan upang mahanap ang datos para sa isang ibinigay na kahilingan ng gumagamit. At dahil sa bawat datos (log) Ang talaksan ay may lahat ng kaugnay na impormasyon sa laki ng dataset nito, ito ay mabilis at madali para sa EDDTable FromHttp Get upang gumawa ng espesipikong bersiyon (o ang kasalukuyang bersiyon) ng dataset para sa datos na nasa talaksang iyon (at hindi na kailangang lumikha ng hiniling na bersiyon ng buong dataset) .
    
Ang mga pangkalahatang panuntunan ay batay sa kantidad at dalas ng datos. Kung tayo ay magpapalagay ng 100 byte kada hanay ng datos, kung gayon ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Halimbawa, kung ang istraktura ng directorystationID/2month at ikaw ay nagpapasok ng impormasyon mula sa dalawang istasyon (46088 at 46155) na may halaga ng panahon mula Dec 2015 hanggang Mayo 2016, EDDTable FromHttp Makakakuha ng mga directories na may pangalang 46088 at 46155 at lilikha ng mga file sa bawat pangalan 2015-11.jsonl, 2016-01.jsonl, 2016-03.jsonl, 2016-05.jsonl (ang bawat isa ay naglalaman ng 2 buwang halaga ng impormasyon para sa angkop na istasyon) . Sa anumang oras sa hinaharap, kung gagamit ka ng .insert o .delete upang baguhin o i-delete ang data para, halimbawa, istasyon 46088 sa 2016-04-05T14:45:00Z, EDDTTable FromHtp Kumuha ng apend na utos sa 46088/2016-03.jsonl, ang kaugnay na datos (log) talaksan. At maliwanag, mainam na magdagdag ng impormasyon para sa iba pang mga istasyon anumang oras sa hinaharap, yamang ang dataset ay basta lilikha ng karagdagang mga direktoryo kung kinakailangan upang makuha ang impormasyon mula sa bagong mga istasyon.
    
#### httpMga GetKey{#httpgetkeys} 
Ang Bawat Mapagkakatiwalaan Mula sa Http Ang pagkuha ng datos ay dapat na may pangglobong katangianhttpGetKeys na nagsasaad sa talaan ng mga pinapayagang may akda at ang kanilang mga sekretong key bilang isang comma-weasted list ng *awtor na\\_key* , e.g., JohnSmith\\_EMEKey1, HOMBOLOgter\\_UNoKey2, QCScript59\\_SomeKey3 .
* Ang awtor na si\\_key's ay case-sensitive at dapat na buo ang karakter na ASCII (#33 - #126, at walang komma, " o 'mga karakter
* Ang mga susi ay parang mga password, kaya ang mga ito ay ₱ &gt;=8 karakter, mahirap hulaan, at walang panloob na mga salita sa diksyunaryo. Dapat mong tratuhin ang mga ito gaya ng pakikitungo mo sa mga password - panatilihing pribado ang mga ito.
* Inihihiwalay ng unang karakter na '\\_' ang may akda mula sa susi, kaya hindi maaaring isama sa pangalan ng awtor ang karakter na '\\_' (ngunit ang susi ay makatutulong) .
* Ang sinumang awtor ay maaaring magkaroon ng isa o higit pang awtor na si\\_key's, e.g., JohnSmith\\_some Key1, JohnSmith\\_some Key7, atbp.
* Maaari mong baguhin ang halaga ng katangiang ito sa anumang panahon. Ang mga pagbabago ay nagkakaroon ng epekto sa susunod na pagkarga ng dataset.
* Ang impormasyong ito ay aalisin sa global Attributes ng dataset bago ito gawing publiko.
* Ang bawat kahilingan sa dataset na ipasok o i-delete ang datos ay dapat na may kasamang &author= *awtor na\\_key* Parame. Pagkatapos tiyakin ang pagiging totoo ng susi,ERDDAP™ay nagliligtas lamang sa awtor na bahagi (hindi ang susi) sa data file.

#### Magtatag{#set-up} 

Narito ang iminungkahing mga hakbang sa pagtatatag ng isang EDDTable FromHttp Get dataset:

1. Gawing pangunahing directory ang paghawak ng datos ng dataset na ito. Para sa halimbawang ito, gamitin natin ang /data/test Gett/ . Ang gumagamit ay nagpapatakbo ng GenerateDatasetsXml at ang gumagamit ay tumatakboERDDAP™ay parehong may read-write access sa directory na ito.
     
2. Gumamit ng text editor para gumawa ng sampol.jsonL CSV na may karugtong.jsonl sa directory na iyon.
Hindi mahalaga ang pangalan. Halimbawa, maaari mong tawagin itong sampol.jsonl
Gumawa ng 2 linya.jsonL CSV file, na may mga pangalan ng kolum sa unang linya at dummy/karaniwang mga halaga (ng tamang uri ng datos) sa ikalawang linya. Narito ang isang sampol na talaksan na angkop para sa koleksiyon ngfeatureType= Mga impormasyong pang-imperyo na sumusukat ng temperatura ng hangin at tubig.
    \\[SapagkatfeatureType= Trajectory, maaari kang magbagostationIDupang maging trajectoryID.\\]  
    \\[SapagkatfeatureType= Profile, maaari kang magbagostationIDupang maging profileID at magdagdag ng isang deep variable.\\]
    
    \\["stationID","time", "latitude", "tagalan", "airTemp", "waterTemp", "timestamp", "author", "utos", "utos"\\]
    \\["myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, "Ilang Body", 0\\]
    
Pansinin:
    * Ang aktwal na data values ay hindi mahalaga dahil sa sa kalaunan ay i-delete mo ang file na ito, ngunit ang mga ito ay dapat sa tamang data type. Kapansin - pansin, ang time variable ay dapat gumamit ng kaparehong format na gagamitin ng aktuwal na datos mula sa pinagkunan.
    * Para sa lahat ng iba't ibang bagay, angsourceNamekatumbas ngdestinationName, kaya gamitin ang tama/final variable na mga pangalan ngayon, kabilang ang panahon, latitud, longhitud at kung minsan ay lalim o altitud kung isasama ang mga variables na may gayong impormasyon.
    * Halos laging magkakaroon ng iba't ibang panahon ng pangalan na nagtatala sa panahon ng pagmamasid. Ito ay maaaring dataType String kasama ng[mga pisi](#string-time-units)  (e.g.,yyyy-MM-dd'T'H:mm:s.SSZ) o datos Uring doble ng[angkop para sa numerong panahon](#time-units)  (e.g., segundo mula 1970-01-01T00:00:00Z, o iba pang baseng oras) .
    * Tatlo sa mga haligi (karaniwang ang huling tatlo) ay kailangang pabagu - bago, autor, utos.
    * Ang kolum na timestamp ay gagamitin ng EDDTable FromHttp Get upang magdagdag ng timestamp na nagpapahiwatig kapag nagdagdag ito ng isang ibinigay na linya ng datos sa data file. Magkakaroon ito ng dataType double at units segundo simula 1970-01-01T00:00:00Z.
    * Ang may akda na tudling na may dataType String ay gagamitin upang itala kung aling awtorisadong may akda ang nagbigay ng datos ng linyang ito. Ang may - akda ay tinitiyak ng mga[httpKumuha ng pangglobong katangian](#httpgetkeys). Bagaman ang mga susi ay tinitiyak bilang *awtor na\\_key* at nasa "request" na URL sa anyong iyon, tanging ang may akda na bahagi ang natitipid sa data file.
    * Ang command column na may dataType byte ay magpahiwatig kung ang datos sa linyang ito ay isang inklusyon (0) o isang deleksiyon (1) .
         
3. Mga GenerateData Xml at sabihin ito
    
    1. Ang dataset type ay EDDTable FromHtp Get
    2. Ang directory ay (sa halimbawang ito) /data/test Get/
    3. Ang sampol na talaksan ay (sa halimbawang ito) /data/test Get/startup.jsonl
    4. AnghttpMaulit Pa May iba't ibang kulay (sa halimbawang ito)  stationID, oras Tingnan ang paglalarawan[httpMaging Mausisa](#httpgetrequiredvariables-global-attribute)sa ibaba.
    5. Kung ang impormasyon ay makukuha sa bawat 5 minuto, anghttpAng Get DirektoryStructure para sa halimbawang ito aystationID/2months . Tingnan ang paglalarawan[httpKumuha ng DisrectoryStructure](#httpgetdirectorystructure)sa ibaba.
    6. Ang[httpMga GetKey](#httpgetkeys)
    
Idagdag ang output (sukatdatasets.xmlpara sa datos) hanggang sadatasets.xml.
     
4. Baguhin angdatasets.xmlPara sa dataset na ito upang gawin itong tama at kumpleto.
Kapansin-pansin, palitan ang lahat ng ? na may tamang nilalaman.
     
5. Para sa&lt;kalagayan ng talaksang Mamemory&gt;:
    * Itakda ito upang magkatotoo kung ang dataset ay karaniwang makakakuha ng madalas .insert at/o .delete requests (e.g. mas madalas kaysa minsan sa bawat 10 segundo) . Ito ay tumutulong sa EDDTable FromHttp Get na mas mabilis na tumugon sa .insert at/o .delete requests. Kung gagawin mong totoo ito, ang EDDTable FromHttp Get ay makapagliligtas pa rin sa fileTable at kaugnay na impormasyon sa disk sa pana - panahon (kung kinakailangan, humigit - kumulang bawat 5 segundo) .
    * Itapon ito (ang default) kung ang dataset ay karaniwang magkakaroon ng madalang .insert at/o .delete requests (e.g., wala pang minsan sa bawat 10 segundo) .
         
6. Pansinin: Posibleng gamitin&lt;Ang cache FromUrl&gt; at ang kaugnay na mga setting sadatasets.xmlpara sa EDDTable Mula sa Http Kumuha ng mga dataset bilang isang paraan ng paggawa at pagpapanatili ng isang lokal na kopya ng isang malayong EDDTable FromHttp Get dataset sa isa paERDDAP. Subalit, sa kasong ito, tatanggihan ng lokal na dataset na ito ang anumang .insert at .delete requests.

#### Paggamit ng EDDTable Mula sa Http ay Kumuha ng mga Dakets{#using-eddtablefromhttpget-datasets} 

* Ang mga may akda ay maaaring gumawa ng mga "request" na[magpasok ng datos o mag - delete ng datos mula sa dataset](#insert-and-delete).
     
* Pagkatapos na maisingit ang tunay na datos sa dataset, maaari at dapat mong alisin ang orihinal na sampol na talaksang datos.
     
* Ang mga gumagamit ay maaaring humiling ng datos mula sa dataset gaya ng ginagawa nila sa anumang iba pang EDDTable dataset saERDDAP. Kung ang kahilingan ay hindi naglalakip ng limitasyon sa pitak ng timestamp, kung gayon ang kahilingan ay kumukuha ng datos mula sa kasalukuyang bersiyon ng dataset (ang log file matapos ang pagproseso ng lahat ng inkorsyon at deleksiyon ay nag-uutos at re-sorting sa pamamagitan nghttpMaging Mausisa) .
     
* Ang mga gumagamit ay maaari ring gumawa ng mga kahilingan na espesipiko sa EDDTable FromHttp Get datasets:
    * Kung may kalakip na kahilingan&lt;o&lt;= Mahigpit sa tudling ng timestamp, pagkataposERDDAP™ang mga hanay ng log file hanggang sa espesipikong timestamp. Sa katunayan, pansamantalang inaalis nito ang lahat ng pagbabagong ginawa sa dataset mula noong panahong iyon. Para sa higit pang info, tingnan[Paglalathala](#versioning).
    * Kung ang kahilingan ay may kasamang &gt;, &gt;=, o = pagbabawal sa tudling ng timestamp, e.g., &timestamp&lt;=0, pagkataposERDDAP™ibalik ang datos mula sa mga data files gaya ng, nang hindi pinoproseso ang integrasyon at mga utos ng deleksiyon.
* Sa hinaharap, nakikini - kinita natin na magkakaroon ng mga kagamitan (sa pamamagitan natin? sa pamamagitan mo?) para sa paggawa sa mga dataset na ito. Halimbawa, maaaring magkaroon ng iskrip na nagbabasa ng mga hilaw na log file, maglalapat ng ibang ekwasyon ng calibrasyon, at gumawa/updates ng ibang dataset na may hinangong impormasyon. Pansinin na makukuha ng script ang orihinal na impormasyon sa pamamagitan ng kahilinganERDDAP™  (na makukuha ang impormasyon sa file format na pinakamadaling gamitin ng script) at lumilikha/update ang bagong dataset sa pamamagitan ng .insert "requests" sa toERDDAP. Ang script ay hindi nangangailangan ng direktang pag-access sa data files; ito ay maaaring sa anumang awtorisadong computer ng awtor.
     

#### Detalyadong Impormasyon tungkol sa EDDTable FromHttp{#detailed-information-about-eddtablefromhttpget} 

Ang mga paksa ay:

*   [HUWAG baguhin ang setup&#33;](#dont-change-the-setup)
*   [KRUD](#crud)
*   [Hindi tanggap na mga Request](#invalidrequests)
*   [Bilis](#httpget-speed)
*   [Si Robust](#robust)
*   [Relibilidad ng Sistema](#system-reliability)
*   [Paglalathala](#versioning)
*   ["Ano naman ang HTTP PUT at DELETE?".](#https-put-and-delete)
*   [Mga Noble](#httpget-notes)
*   [Salamat sa CORDS para sa saligang ideya.](#thanks)

Narito ang detalyadong impormasyon:

##### HUWAG baguhin ang setup&#33;{#dont-change-the-setup} 
Minsang malikha na ang dataset at nakapagdagdag ka na ng datos dito:

* HUWAG magdagdag o alisin ang anumandataVariables.
* HUWAG baguhin angsourceNameodestinationNamengdataVariables.
* HUWAG baguhin ang datos Uri ngdataVariables. Subalit mababago mo angdataVariable''s metadata.
* HUWAG baguhin anghttpMaulit Pa Ang pangglobong katangian ay maaaring baguhin.
* HUWAG baguhin anghttpKumuha ng DirektoryStructure global attribute.

Kung kailangan mong baguhin ang alinman sa mga bagay na ito, gumawa ng bagong dataset at ilipat ang lahat ng impormasyon sa bagong dataset.
     
##### KRUD{#crud} 
Sa siyensiya ng computer, ang apat na pangunahing utos sa paggawa sa isang dataset ay[KALAYAAN, BASAHIN, TANGGAPIN, PELETE (KRUD) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Ang SQL, ang wika para sa paggawa ng mga kaugnay na database, ay may katumbas sa INSERT, SELECT, UPDATE, at DELET. Sa EDDTTable Mula sa Gettp,

* Ang .insert ay kombinasyon ng CREEE at UPDATE.
* .delete ang DELETE.
* Ang regular na sistema ng paghiling ng mga subset ng impormasyon ay binabasa.

Sa gayon, sinusuportahan ng EDDTable FromHttp ang lahat ng mga pundamental na utos sa paggawa ng isang dataset.
     
* .insert o .delete requests na walang pagkakamali ay ibabalik ang HTTP status code=200 at isang JSON object, e.g.,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Ang dalawang timestamp na mga halaga ay tumutukoy sa parehong millisecond, na ang millisecond na iiimbak sa timestamp variable para sa mga hanay ng datos na ipinasok o inalis.ERDDAP™Huwag baguhin ang pangalan at formating ng key-halagang pares na ito sa hinaharap.ERDDAP™ay maaaring magdagdag ng karagdagang key-halagang pares sa JSON object sa hinaharap.
     
##### Hindi tanggap na mga Request{#invalidrequests} 
Hindi tanggap na .insert o .delete requests Ang isang HTTP error status code maliban sa status=200 at walang pagbabago ay gagawin sa dataset. Ito ay kinabibilangan ng mga kahilingan na may maling impormasyon ng awtor, mga maling variable na mga pangalan, iba't ibang mga haba ng hanay para sa iba't ibang mga variable, nawawalang mga kinakailangang variable, nawawala na kinakailangan ng iba't ibang mga halaga, atbp. Kung ang kahilingan ay nagsasangkot ng higit sa isang talaksang datos, posible na ang bahagi ng kahilingan ay magtatagumpay at ang bahagi ay mabibigo. Gayunman hindi ito dapat maging problema kung ang sensor na nagpapadala ng kahilingan ay nakikitungo sa anumang kabiguan bilang isang ganap na kabiguan. Halimbawa, kung magsusumbong kaERDDAP™kung paano magpapasok (o paso) ang gayunding impormasyon nang dalawang beses sa isang hanay, ang pinakamasamang kaso ay na ang impormasyon ay dalawang beses na iniimbak, malapit na magkasama sa log file. Mahirap maunawaan kung paano ito magiging sanhi ng problema.
     
##### Bilis ng Http{#httpget-speed} 
Para sa mga kahilingang .insert o .delete (hindi kabilanghttpsa itaas) , ang ballpark ang bilis ng .insert o .delete ang bilis ng .
1ms per .insert na may 1 hanay ng datos
2ms per .insert na may 10 hanay ng datos sa hanay (\\[\\])   
3ms per .insert na may 100 hanay ng datos sa hanay (\\[\\])   
13ms per .insert na may 1000 hanay ng datos sa hanay (\\[\\])   
Maliwanag na mga hanay ang susi sa[mataas sa pamamagitan ngput](#httpget-speed). Kung walang mga array, magiging hamon ang .insert o .delete ng higit sa 8 hanay ng datos kada segundo mula sa isang malayong may akda (dahil sa lahat ng taas ng network) . Sa mga array, magiging madali ang .insert o .delete ng higit sa 1000 hanay ng datos kada segundo mula sa isang malayong sensor.

Taglay ang napakaraming impormasyon sa bawat kahilingan, mararating mo ang sukdulang haba ng pagtatanong ni Tomcat (default ay 8KB?) , subalit maaaring dagdagan iyan sa pamamagitan ng pag - aayos ng maxHtpHaderSize setting *tomcat* /conf/server.xml's HTTP/1.1. Ikonekta ang entry.

KailanERDDAP™basahin ang datos ng JSON Lines CSV (log) ay may maliit na parusang oras kumpara sa pagbasa ng binary data files. Inaakala namin na sa pagkakataong ito ang parusa kapag nagbabasa ay isang makatuwirang halaga upang bayaran ang bilis at tibay ng sistema kapag sumusulat ng impormasyon (na siyang pinakamahalaga) .

##### SSD{#ssd} 
[Para sa mas mabilis,](#ssd)gumamit ng a[Mabilis na Paggamit ng Estado (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)upang itago ang mga impormasyon. Ang mga ito ay may mas mabilis na talaksang access time (&lt;0.1ms) kaysa hard disk drives (3 - 12 m) . Mayroon din silang mas mabilis na data transfer rate (200 - 2500 MB/s) kaysa hard disk drives (~200 MB/s) . Ang kanilang halaga ay lubhang bumaba nitong nakalipas na mga taon. Bagaman ang mga unang SSD ay nagkaroon ng mga problema pagkatapos ng maraming sulat sa isang ibinigay na bloke, ang problemang ito ay lubhang nababawasan ngayon. Kung gagamitin mo lamang ang SSD upang isulat ang datos minsang mabasa mo ito nang maraming beses, maging ang isang mamimiling-grade SSD (na hindi gaanong mahal kaysa isang negosyo-grade SSD) ay dapat na tumagal nang mahabang panahon.
    
##### Si Robust{#robust} 
Sinikap naming gawin ang sistemang ito bilang madaling-to-work-with at malakas hangga't maaari.
* Ang sistema ay dinisenyo upang magkaroon ng maraming sinulid (e.g., ang sensor, isang automated QC script, at isang tao) Magkakasabay na gumagana sa parehong dataset at maging sa parehong file. Karamihan dito ay ginagawang posible sa pamamagitan ng paggamit ng log file approach sa pag-iimbak ng datos at sa pamamagitan ng paggamit ng napaka-simpleng file type,[JON Mga file ng Lines CSV](https://jsonlines.org/examples/), itago ang datos.
* Ang isa pang malaking bentaha sa JSON Lines CSV ay na kung ang isang file ay magiging masama (e.g., walang bisa dahil sa isang pagkakamali sa isang linya) , madaling buksan ang file sa isang text editor at ayusin ang problema.
* Ang isa pang bentaha ay, kung may pagkakamali sa isang linya sa isang file, mababasa pa rin ng sistema ang lahat ng datos sa mga linya bago at pagkatapos ng error line. At ang sistema ay maaari pa ring magtala ng karagdagang .insert at .delete na impormasyon.
* Napakalaking bentaha ng paggamit ng mga admin-accessible na batayang files (Kung ihahambing sa isang kaugnay na database o Cassandra o iba pang software) : Walang ibang software na kailangang panatilihin at kailangang tumakbo upang makapag-imbak o makakuha ng datos. At madaling i-upload ang mga pamantayang file sa anumang oras at sa inkremental na paraan dahil ang data ay nasa mga tipak (pagkatapos ng ilang sandali, tanging ang kasalukuyang-time file para sa bawat istasyon ang magbabago) . Sa kabaligtaran, nangangailangan ng malaking pagsisikap at sistema sa paglipas ng panahon upang makagawa ng panlabas na backup files mula sa mga database at mula sa Cassandra.
         
##### Relibilidad ng Sistema{#system-reliability} 
Makatuwirang asahan na may isang serverERDDAP™upang magkaroon ng 99.9% uptime - iyan ay halos 9 oras ng downtime bawat taon (Bagaman, magagamit mo iyan sa isang masamang gabi&#33;) .
Kung ikaw ay masipag at masuwerte, maaari kang magkaroon ng 99.99% na panahon sa pag - unlad (53 minuto sa bawat taon) , yamang kaunting panahon lamang ang kakailanganin para sa mga update.
Kailangang gumawa ka ng sukdulang mga hakbang (isang hiwalay na backup server, di-interruptive power supply, backup air conditioning, 24x365 tauhan upang masubaybayan ang site, atbp.) upang magkaroon ng maliit na tsansa sa 99.999% uptime (5.25 minuto sa bawat taon) . Magkagayunman, malamang na hindi mo maabot ang 99.999% upgrade (o kahit 99.99%) sapagkat ang mga problema ay kadalasang hindi mo masupil. Halimbawa, ang Amazon Web Service at Google ay nagbibigay ng di - kapani - paniwalang maaasahang mga serbisyo sa web, gayunman ang malalaking bahagi nito kung minsan ay bumababa sa loob ng ilang oras.

Harapin ito, nais ng lahatERDDAP™na magkaroon ng 100% up time, o sa paano man ay ng ipinagmamalaking "anim na siyam" (99.999% upgrade ay katumbas ng 32 segundo ng downtime sa bawat taon) , ngunit walang paraan para makuha mo ito gaano mang panahon, pagsisikap, at salapi ang gugugulin mo.

SubalitERDDAP™hindi ang panahon ng pag - iisa ang tunay na tunguhin dito. Ang tunguhin ay ang makagawa ng maaasahan **sistema** , isa na hindi nawawalan ng anumang datos. Ito ay isang problema na maaaring lutasin.

Ang solusyon ay: gumawa ng fault-tolerance sa computer software na nagpapadala ng datos saERDDAP. Sa espesipikong paraan, ang software na iyon ay dapat mag - ingat ng isang koleksiyon ng mga impormasyon na naghihintay na magtungo saERDDAP. Kapag dinagdagan ng datos ang queue, dapat suriin ng software ang tugon mula saERDDAP. Kung hindi kasama sa tugon ang natanggap na Data. Walang pagkakamali., pagkatapos ay dapat iwan ng software ang datos sa queue. Kapag mas maraming datos ang nalikha at nadagdag sa queue, ang software ay dapat sumubok muli na .insert ang data sa queue (marahil kasama ng\\[\\]sistema) . Ito'y magtatagumpay o mabibigo. Kung mabigo ito, sisikapin nitong muli sa dakong huli. Kung isusulat mo ang software sa ganitong paraan at kung ang software ay handa nang mag - queue ng ilang araw na halaga ng datos, talagang malaki ang tsansa mong makapagkarga ng 100% ng impormasyon ng sensorERDDAP. At nagawa mo na iyon nang hindi mo na kailangan pang magpagal o gumastos.

\\[Larawan sa likuran: Hindi namin naisip ito.[Ganito nagiging maaasahan ang mga network ng computer.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Likas na hindi maaasahan ang mga network ng computer. Kaya kapag inilipat mo ang isang file mula sa isang kompyuter tungo sa isa pa, nalalaman ng nagpadalang software/inaasahan na ang ilang mga pakete ay maaaring mawala. Kung hindi ito makakuha ng wastong pagkilala para sa isang ibinigay na pakete mula sa receiver, ibinabalik nito ang nawawalang pakete. Sa pamamaraang ito, ang mga simpleng tagapadala at receiver software ay makapagtatayo ng maaasahang sistema ng paglilipat ng talaksan sa ibabaw ng hindi maaasahang network.\\]
    
##### Bakit ang JSON Lines CSV files?{#why-json-lines-csv-files} 
Gumamit ng EDDTable FromHttp[JON Mga file ng Lines CSV](https://jsonlines.org/examples/). para sa pag-iimbak ng datos. Ang mga dahilan ay:

* Ang pangunahing dahilan ay: Ang pagiging simple ng JSON Lines CSV files ay nagbibigay ng mabilis, madali at maaasahang paraan upang makapagsulat ng maraming sinulid sa isang ibinigay na file (e.g., sa pamamagitan ng pagdurugtong sa pangalan) .
* Kung ang isang file ng JSON Lines CSV ay naging sira (e.g., walang bisa dahil sa isang pagkakamali sa isang linya) , EDDTable FromHttp Gett ay mababasa pa rin ang lahat ng datos sa lahat ng mga linya bago at pagkatapos ng error line. At ang sistemang .insert at .delete ay maaaring patuloy na magdagdag ng bagong datos sa data file.
* Dahil sa ang JSON Lines CSV files ay ASCII files, kung ang isang file ay naging sira, madaling ayusin (sa isang editor ng teksto) .
* Sinusuporta ng JSON Lines CSV Mga kuwerdas na unikode.
* Ang JSON Lines CSV ay sumusuporta sa iba't ibang strando ng haba (hindi limitado sa ilang haba ng max) .
* Sinusuportahan ng JSON Lines CSV ang 64-bit integers (mahaba) .
* Ang pormal na katangian at ekstrang koleksyon ng JSON Lines CSV (vs old-school CSV) ay nagbibigay ng karagdagang katiyakan na ang isang ibinigay na linya ay hindi pa nasisira.

Noong una, sinubukan naming gamitin.nc3 files na may walang hangganang dimensiyon. Gayunman, may mga problema:

* Ang pangunahing problema ay: Walang maaasahang paraan upang makapagsulat ng maraming sinulid.nc3 talaksan, kahit na ang mga sinulid ay nagtutulungan sa paggawa ng sulat sa isang sabay na paraan.
* Kung mayroon.nc3 file ay nagiging sira, ang .insert at .delete system ay hindi maaaring patuloy na gamitin ang file.
* Sapagkat ang.nc3 files ay binary, kung ang isang file ay masira (na ginagawa nila dahil sa problemang multi-threading) ang mga ito ay napakahirap o imposibleng ayusin. Walang mga kasangkapan upang makatulong sa pagkukumpuni.
* Walang paraan ang CF upang matiyak ang estruktura ng mga kuwerdas, kaya't walang opisyal na paraan upang suportahan ang Unicode, e.g., ang UTF-8 Edway. Sinikap naming makakuha ng CF upang suportahan ang isang \\_Encoding attribute ngunit hindi kami nakagawa ng anumang pagsulong. (Unidata, sa kanilang kapurihan, ay sumusuporta sa \\_Encoding attribute.) 
*   .nc3 files lamang ang sumusuporta sa nakapirmeng mga strando ng haba. Muli, sinikap naming kumuha ng CF atUnidataupang suportahan ang iba't ibang haba ng kuwerdas subalit hindi makagawa ng anumang pagsulong.
*   .nc3 files ay hindi sumusuporta sa isang madaling paraan upang makilala ang isang character variables mula sa String variables. Muli, sinikap naming kumuha ng CF atUnidataupang suportahan ang isang sistema sa pagkilala sa dalawang klaseng ito ng datos, subalit hindi nakagawa ng anumang pagsulong.
*   .nc3 files lamang ang sumusuporta sa 8-bit characters sa pamamagitan ng hindi matukoy na composition. Muli, sinikap naming kumuha ng CF atUnidataupang suportahan ang isang sistema para sa pagtiyak sa ekwasyon, subalit hindi nakagawa ng anumang pagsulong.
*   .nc3 files ay hindi sumusuporta sa 64-bit integers (mahaba) . Muli, sinikap naming kumuha ng CF atUnidataupang suportahan ang isang sistema sa loob ng mahabang panahon, subalit hindi makagawa ng anumang pagsulong.
         
##### Paglalathala{#versioning} 
Sapagkat Madaling Tablan Mula sa Http Kumuha ng talaan ng lahat ng pagbabago sa dataset sa timestamp at sa awtor ng bawat pagbabago, maaari nitong mabilis na baguhin ang dataset na iyon sa anumang punto sa panahon. Sa isang diwa, may isang bersiyon para sa anumang punto sa paglipas ng panahon. Kung kasama sa kahilingan ng gumagamit ng datos ang timestamp&lt;= pumipigil, e.g., &timestamp&lt;=2016-06-23T16:32:22.128Z (o anumang punto ng panahon) , ngunit walang pagbabawal sa awtor o utos,ERDDAP™ay tutugon sa kahilingan sa pamamagitan ng paggawa muna ng isang bersiyon ng dataset na gaya ng puntong iyon sa tamang panahon. Pagkatapos,ERDDAP™ikapit ang iba pang mga limitasyon ng gumagamit, gaya ng anumang iba pang kahilingan para sa datos mula saERDDAP. Ang EDDTable FromHttp Gett ay binuo upang ang prosesong ito ay napakabilis at mahusay, kahit para sa napakalaking datasets.

Sa katulad na paraan, malalaman ng gumagamit kung kailan ang dataset ay huling binago sa pamamagitan ng paghiling ng ...?timestamp&timestamp=max (paatras) Hindi alam () 

At para sa anumang kahilingan para sa datos, para sa anumang bersyon ng dataset, makikita ng mga gumagamit kung aling may akda ang gumawa ng mga pagbabago, at kapag ginawa nila ito.

Pinangyayari ng sistemang ito ng pag - version[Binabago ang Siyensiya](https://en.wikipedia.org/wiki/Reproducibility)sapagkat ang sinuman, anumang oras, ay maaaring humiling ng impormasyon mula sa bersiyon ng dataset sa anumang punto sa panahon. Ang pinong-guined versioning na ito ay hindi posible sa anumang ibang sistema na alam natin. Ang saligang mekanismo ay napakahusay, sa bagay na wala nang karagdagang lugar na mapag - iimbakan, at ang pagpoproseso sa itaas ay talagang kakaunti.

Hindi lahat ay may pangangailangan sa ganitong uri ng pinong-guined versioning, ngunit ito ay lubhang kapaki-pakinabang, marahil kinakailangan, sa konteksto ng isang malaking data management organization (e.g., OOI, Earth Cube, Data One, atNOAA' NCEI 's) kung saan ang isang dataset ay maaaring magkaroon ng maraming awtor (e.g., ang sensor, isang automated QC script, at isang taong editor) .

\\[Kasaysayan: Ang pangangailangan para sa ganitong uri ng version ay unang dumating para sa akin (Bob) kapag binabasa at tinatalakay ang OOI noong 2008. Noong panahong iyon, ang OOI ay may mahirap, mabagal, hindi mahusay na sistema para sa pag-verforming batay sa Git. Ang Git ay maganda sa kung ano ang idinisenyo para rito, subalit hindi ito. Noong 2008, habang nasa talakayan ng OOI, nagdisenyo ako ng isang malawak at mahusay na alternatibong sistemang-to-OOI para sa pangangasiwa ng datos, kasama na ang marami sa mga tampok na idinagdag koERDDAP™mula noon, at kasama ang sistemang ito ng pag-iinhinyero. Noong panahong iyon at mula noon, ang OOI ay nakatalaga sa kanilang sistema ng versioning at hindi interesado sa mga alternatibo. Noong 2016, nagkaroon ng iba pang aspekto ng planong ito at sinimulan kong ipatupad ito. Dahil sa maraming pag - abala upang magtrabaho sa ibang proyekto, natapos ko lamang ito hanggang 2018. Kahit na ngayon, wala akong kaalam - alam sa anumang iba pang siyentipikong sistema ng impormasyon na nag - aalok ng gayong kabilis at madaling pagkuha ng isang bersiyon ng impormasyon mula sa anumang punto sa panahon, para sa madalas na pagbabago ng mga dataset. Ang mga simpleng sistema ng talaksan ay hindi nag-aalok nito. Ang mga relational database ay hindi. Hindi ito ginagawa ni Cassandra.\\]
    
##### ISINULAT at Pinahihina ang HTTPS{#https-put-and-delete} 
*   ["Ano naman ang HTTPS PUT at DELETE?".](#https-put-and-delete)  
    [Hypertext Transfer Protocol (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)ang saligan ng World Wide Web at ang dahilan kung bakit nagsisimula ang mga web page na URL " http://" o " https://" . Ang HTTPS ay HTTP na may karagdagang patong ng seguridad. Araw - araw, bilyun - bilyong HTTP ang ginagawa ng mga browser, script at computer program (S)   **MABUTI** na kumuha ng impormasyon mula sa malalayong pinagmumulan. HTTP (S) kasama rin ang iba pa[mga pandiwa](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), PUT lalo na (upang itulak ang data sa server) at ANG DELETE (sa STELETE data mula sa server) . Oo, ang PUT at DELETE ang tamang paraan ng pagpapasok ng impormasyon, at pag - aalis ng impormasyon mula sa, isang dataset sa pamamagitan ng HTTP (S) . Ang akses ay suportado ng bawat piraso ng software na maaaring gumana gamit ang HTTP (S) . ANG paninigarilyo ay talagang madaling pakitunguhan. Alam na ng lahat kung paano magtrabaho nang tahimik at marami ang marunong gumamit ng POST (na maaaring gamitin sa aktuwal na paraan na katulad ng paghinto) , kaya gumawa kami ng EDDTable FromHttp Get na trabaho sa pamamagitan ng SCT at POST. Kakaunting tao (maging ang iilang computer programmer) ay kailanman gumawa kasama ng PUT at DELETE. PUT at DELETE ay karaniwan nang sinusuportahan lamang ng mga wika ng computer, kaya ang paggamit nito ay nangangailangan ng isang mahusay na programa. Kaya ang PUT at DELETE ay karaniwan nang mas mahirap na paraan kung paano lumitaw ang mga kagamitan.
     
##### Kumuha ng Pansin ang Http{#httpget-notes} 
*   [Mga Noble](#httpget-notes)
    * HindidataVariableay maaaring may dataType=char. Gumamit ng dataType=String sa halip. Kung talagang kailangan mo ng dataType=char, email Chris. Juan sa noaa.gov .
         
##### Salamat{#thanks} 
*   [Salamat sa CORDS para sa saligang ideya.](#thanks)  
Ang pangunahing ideya para sa EDDTable FromHttp Get (I.e., gamit ang isangHTTP GEThumiling na magdagdag ng datos sa isang dataset) mula sa UCAR's (NCAR's?)  [Cloud-Hosted Real-time Data Services (MGA KORDO) ](https://github.com/earthcubeprojects-chords)proyekto. Ang format para sa mga parameter sa kahilingan (inulit *Pangalan=halaga* , hiwalay ng &'s) ay ang parehong pamantayang format na ginagamit ng mga anyong HTML sa mga web page. Ito'y isang simple at maningning na ideya at lalo pa nga dahil sa ito'y lubusang kasuwato ng ideyaERDDAP'Ang umiiral na sistema para sa pakikitungo sa tabular data. Kitang - kita ang ideyang ito, pero ako (Bob) Hindi ito naisip. Mapagkakatiwalaan Mula sa Hap Gamitin ang saligang ideyang iyan, lakip na ang ating mga ideya kung paano ito isasagawa, upang gumawa ng isang sistema saERDDAP™para sa pag-download ng datos. Bukod sa pangunahing ideya ng paggamit ng fall upang itulak ang impormasyon sa sistema, ang EDDTable FromHtp Get pagpapatupad ay lubhang kakaiba at lubusang independiyente sa CORDS at may iba't ibang katangian (e.g., log files, pag - aalis ng mga datos, iba't ibang sistema ng seguridad, suporta ng CRUD, reproducibleng datos) . Ang aming pagkalantad sa CRODS ay isa lamang tirahan. Hindi namin tiningnan ang kanilang kodigo o binasa ang kanilang proyekto sapagkat agad naming alam na nais naming ipatupad ang sistema sa ibang paraan. Subalit kami'y nagpapasalamat sa kanila sa saligang ideya. Ang buong pagtukoy sa CRODS ay
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Cloud-Hosted Real-time Data Services for the Geosciences (MGA KORDO) software. UCAR/NCAR -- Earth Observing Laboratory.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### Maaasahan Mula saHyraxMga Bunton{#eddtablefromhyraxfiles} 
[ **Maaasahan Mula saHyraxMga Bunton** ](#eddtablefromhyraxfiles)  (pinabayaan) Hinahati ang mga data file na may iba't ibang sukat, na bawat isa ay may isa o higit pang sukat (Halimbawa, panahon, altitud (o lalim) , latitud, longhitud) , at pinaglilingkuran ng isang[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).

* Ang uring dataset na ito ay **PINAHAHALAGAHAN** . Ang mas bago at mas pangkalahatang solusyon ay gamitin ang[cache Mula sa Pagpipilian Para sa EDDTable Mula sa mga Latian](#cachefromurl)  (o naiiba) , na gumagawa sa isang lokal na kopya ng mga remote files at nagsisilbi sa data mula sa lokal na mga files. Ang&lt;Ang cache FromUrl&gt; option ay maaaring gamitin na may anumang uri ng tabulular data file. **   
Kung hindi mo magawa iyan sa ilang kadahilanan, email Chris. Juan sa noaa.gov .
Kung walang reklamo bago ang 2020, ang uring dataset na ito ay maaaring alisin. ** 
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
* Sa karamihan ng mga kaso, ang bawat file ay may maraming halaga para sa kaliwa (una) Halimbawa, ang sukat ay panahon.
* Ang mga file ay kadalasang (ngunit huwag mong gawin) may isang halaga para sa iba pang dimensiyon (Halimbawa, altitud (o lalim) , latitud, longhitud) .
* Ang mga file ay maaaring may karakter variables na may karagdagang dimensiyon (Halimbawa, ang mga nCharacter) .
*   HyraxAng mga server ay makikilala sa "/dods-bin/nph-dods/" o "/opendap/" sa URL.
* Itong class screen-scrapes angHyraxMga web page na may listahan ng mga file sa bawat directory. Dahil dito, napakaespesipiko nito sa kasalukuyang format ngHyraxweb pahina. Sisikapin naming makibagayERDDAP™mabilis kung/kapag hinaharap na bersyon ngHyraxbaguhin kung paano nakatala ang mga file.
* Ang&lt;ang talaksangDir&gt; setting ay hindi pinapansin. Yamang ang klaseng ito ay nag - download at gumagawa ng lokal na kopya ng bawat remote data file,ERDDAP™ang talaksan Malapit na *Malaking Direktoryo* /copy/ *datasetID* /.
* Sapagkat&lt;sourceUrl&gt;, gamitin ang URL ng base directory ng dataset saHyraxserver, halimbawa,
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/sourceUrl&gt;
     (ngunit ilagay ito sa isang linya)   (Ikinalulungkot mo, wala na ang serverg iyon) .
AngsourceUrlweb page na karaniwang may "OPeNDAPSeryeng Indise ng\\[directoryName\\]" sa itaas.
* Yamang ang klaseng ito ay laging nag - download at gumagawa ng lokal na kopya ng bawat remote data file, hindi mo dapat ibalot ang dataset na ito[Mapagkakatiwalaang Komponiya](#eddtablecopy).
* Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.
* Tingnan ang 1D, 2D, 3D, at 4D halimbawa para sa[Mapagkakatiwalaan Mula sa mga Latian](#eddtablefromncfiles).
     
### Mapagkakatiwalaan Mula sa mga Di - pangkaraniwang CRAFile{#eddtablefrominvalidcrafiles} 
[ **Mapagkakatiwalaan Mula sa mga Di - pangkaraniwang CRAFile** ](#eddtablefrominvalidcrafiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .ncmga talaksan na gumagamit ng espesipiko, hindi tanggap, at iba't ibang uri ng CF DSG Contiguous Ragged Array (CRA) mga file. BagamanERDDAP™ay sumusuporta sa uring ito ng talaksan, ito ay isang hindi tanggap na uri ng talaksan na hindi dapat simulan ng sinuman na gamitin. Ang mga grupo na kasalukuyang gumagamit ng uring ito ng talaksan ay lubhang hinihimok na gamitinERDDAP™upang lumikha ng mga tanggap na talaksang CF DSG CRA at tumigil sa paggamit ng mga file na ito.

Mga Detalye: Ang mga file na ito ay may multiple row\\_size variables, bawat isa ay may sampol na\\_dimension attribute. Ang mga talaksan ay hindi-CF-standard files dahil ang multiple sampol (obs) Ang mga dimensiyon ay dapat na i-decode at mag-ugnay sa isa't isa sa karagdagang tuntunin at pangako na hindi bahagi ng CF DSG speciation: "Maaari mong iugnay ang isang ibinigay na e.g., halaga ng temperatura. (ABRO_obs dimensiyon) na may malalim na halaga (z_obs dimensiyon, ang dimensiyon na may pinakamaraming halaga) , dahil: ang hanay ng temperatura\\_size (sa isang ibinigay na hulma) ay 0 o katumbas ng katumbas na hanay ng lalim na\\_size (dahil diyan)   (iyan ang tuntunin) . Kaya, kung ang hanay ng temperatura na\\_size ay hindi 0, kung gayon ang halaga ng temperatura para sa cause ay tuwirang nauugnay sa halaga ng lalim para sa cause (iyon ang pangako) ."

Ang isa pang problema sa mga file na ito: ang Prinsipal\\_Investigator row\\_size variable ay walang sampol\\_dimension attribute at hindi sumusunod sa nasabing tuntunin.

Ang mga Sample file para sa uring dataset na ito ay matatagpuan sa https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Ang server na ito ay hindi na magagamit\\].

Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.

Ang unang bagay na GenerateDatasets Xml para sa ganitong uri ng dataset matapos mong sagutin ang mga tanong ay inililimbag ang ncdump-tulad ng istraktura ng sampol na talaksan. Kaya kung papasok ka sa ilang kasagutan ng goofy para sa unang silo sa pamamagitan ng GenerateDatasets Xml, sa paano man ay makikita mo kungERDDAP™ay maaaring magbasa ng file at tingnan kung anong dimensiyon at variables ang nasa file. Pagkatapos ay makapagbibigay ka ng mas mabuting mga sagot para sa ikalawang silo sa pamamagitan ng GenerateDatasetsXml.
 
### EDDTable Mula saJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDTable Mula saJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)Inaalam ang mga impormasyon mula sa[JON Mga file ng Lines CSV](https://jsonlines.org/examples/). Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

* Gaya ng sinasabi ng jsonlines.org, ang format na ito ay "mas mabuti kaysa sa CSV". (at sa legal na paraan, bilang isang empleadong pederal, hindi ako maaaring sumang - ayon o di sumang - ayon sa kanila - bakit?) . Ang CSV ay hindi kailanman pormal na nabigyan ng kahulugan at nahahadlangan ng makasaysayang bagahe na may kaugnayan sa kaugnayan nito sa orihinal na mga programang disheet. Ang JSON Lines CSV, kung ihahambing, ay lubusang binibigyan - kahulugan at mga pakinabang mula sa kaugnayan nito sa malawakang ginagamit na pamantayan ng JSON, na nakikinabang naman mula sa kaugnayan nito saJavaScript atJava. Kapansin - pansin, may ganap na suporta para sa mahahabang integers at para sa mga tauhan sa Unicode sa mga kuwerdas, at isang maliwanag na paraan upang isama ang iba pang pantanging mga tauhan (Partikular na ang mga tab at newline) sa loob ng mga kuwerdas.
    
Ang format na ito ay partikular na mabuti para sa datasets kung saan kailangan mong pana-panahong i-ppend ang karagdagang hanay sa dulo ng isang ibinigay na data file. Dahil diyan at ang iba pa (Tingnan ang nasa itaas) ,[NABAUTISAN NG EDDTTEGO](#eddtablefromhttpget)gumagamit ang Json Lines CSV files para sa pag-iimbak ng datos.
    
* Ang mga input file ay ipinapalagay na ang UTF-8 na rehistro. Gayunman, bigyan ng \\u *ddd* format para sa pag - aayos ng pantanging mga karakter (Ang e.g., \\u20ac ay ang  encoding para sa karakter na Euro) , mayroon kang opsiyon na isulat ang mga file upang ang mga ito ay naglalaman lamang ng 7-bit ASCII character sa pamamagitan ng paggamit ng \\u *ddd* upang i-record ang lahat ng mga character sa itaas #127.
     
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
    
Ang unang bagay na ginagawa ng GenerateDatasetsXml para sa ganitong uri ng dataset matapos mong sagutin ang mga tanong ay ilimbag ang ncdump-tulad na istraktura ng sampol na talaksan. Kaya kung papasok ka sa ilang kasagutan ng goofy para sa unang silo sa pamamagitan ng GenerateDatasets Xml, sa paano man ay makikita mo kungERDDAP™ay maaaring magbasa ng file at tingnan kung anong dimensiyon at variables ang nasa file. Pagkatapos ay makapagbibigay ka ng mas mabuting mga sagot para sa ikalawang silo sa pamamagitan ng GenerateDatasetsXml.
    
* BABALA: KailanERDDAP™basahin ang JSON Lines CSV data files, kung makakita ito ng error sa ibinigay na linya (e.g., maling bilang ng mga bagay) , nilalagyan nito ang isang babalang mensahe (" PANGANGALAGA: Masamang guhit (s) ng datos" ... na may listahan ng mga masamang linya sa mga kasunod na linya) sa[log.txt file](/docs/server-admin/additional-information#log)at pagkatapos ay patuloy na babasahin ang natitirang bahagi ng data file. Kaya pananagutan mong tumingin paminsan - minsan (o sumulat ng iskrip upang gawin iyon) para sa mensaheng iyon sa troso. Tsext upang maayos mo ang mga problema sa data files.ERDDAP™ay itinatayo sa ganitong paraan upang patuloy na mabasa ng mga gumagamit ang lahat ng makukuhang mabisang impormasyon bagaman ang ilang linya ng talaksan ay may mga depekto.
     
### Mga EDDTable Mula sa mga MultidimNcFile{#eddtablefrommultidimncfiles} 
[ **Mga EDDTable Mula sa mga MultidimNcFile** ](#eddtablefrommultidimncfiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) ang mga talaksan na may ilang mga variables, bawat isa ay may isa o higit pang kabahaging dimensiyon. Ang mga file ay maaaring may karakter variables na mayroon o walang karagdagang dimensiyon (Halimbawa, HULING14) . Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

* Kung ang mga file ay multidimensional CF DSG variant, gamitin ang dataset type na ito sa halip na[Mga EDDTable Mula sa mga Latian](#eddtablefromncfiles).
     
* Para sa mga bagong taskular datasets mula.ncmga talaksan, gamitin ang opsiyon na ito bago subukin ang mas matanda[Mapagkakatiwalaan Mula sa mga Latian](#eddtablefromncfiles). Ang ilang bentaha ng klaseng ito ay:
    * Ang klaseng ito ay makababasa ng mas maraming mga variable mula sa isang mas malawak na iba't ibang mga istraktura ng file. Kung Itatakda mo ang Dimensiyon (isang komma-nahating talaan ng mga dimensiyonal na pangalan) sa GenerateDatasets Xml (o&lt;Malaking CSV&gt; sadatasets.xmlIpasok ang isa sa mga dataset na ito), pagkataposERDDAP™ay magbabasa lamang ng mga variable sa source files na gumagamit ng ilan o lahat ng mga dimensiyong ito, pati na ang lahat ng mga scalar variables. Kung ang isang dimensiyon ay nasa isang grupo, dapat mong tiyakin ang buongName nito, e.g., " *groupName/dimensionName* ".
    * Kadalasang kayang tanggihan ng klaseng ito ang mga files nang napakabilis kung hindi ito tumutugma sa mga limitasyon ng hiling. Kaya ang pagbabasa ng impormasyon mula sa malalaking koleksiyon ay kadalasang mas mabilis.
    * Ang klaseng ito ay humahawak ng tunay na mga variables (di-String variables) tama.
    * Ang klaseng ito ay maaaring umere ng String variables kapag ang manlilikha ay hindi gumamit ng Netcdf-java's writeStrings (na may appends char #0 upang markahan ang dulo ng kuwerdas) .
    * Ang klaseng ito ay mas mahusay sa pakikitungo sa mga indibiduwal na file na walang ilang mga variables o dimensiyon.
    * Maaaring alisin ng klaseng ito ang mga bloke ng hanay na may nawawalang mga halaga gaya ng itinakdang halaga para sa[CF Mga Sampling Geometriya (DSG) Sa Ganap na Multimensional Array files](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
    
Ang unang bagay na ginagawa ng GenerateDatasetsXml para sa ganitong uri ng dataset matapos mong sagutin ang mga tanong ay ilimbag ang ncdump-tulad na istraktura ng sampol na talaksan. Kaya kung papasok ka sa ilang kasagutan ng goofy para sa unang silo sa pamamagitan ng GenerateDatasets Xml, sa paano man ay makikita mo kungERDDAP™ay maaaring magbasa ng file at tingnan kung anong dimensiyon at variables ang nasa file. Pagkatapos ay makapagbibigay ka ng mas mabuting mga sagot para sa ikalawang silo sa pamamagitan ng GenerateDatasetsXml.
    
Grupo -- Mga GenerateDataset Xml ay hihingi ng "Group". Makapapasok ka "upang ipahanap nito ang anumang/lahat ng grupo," *ilan Grupo* " o " *ilang "Group"/ilanSubGroup* " upang hanapin nito ang isang espesipikong grupo, o "\\[root\\]" upang hanapin nito ang ugat na grupo lamang. Ang "Group" na string ay nagiging&lt;grupo&gt; sadatasets.xmlLarawan para sa dataset (bagaman "\\[root\\]"maging") .
    
Dimensiyon -- GenerateDatasets Xml ay hihingi ng isang "DimensionsCSV" string. Ito ay isang comma-extend-halagang talaan ng mga pinagmulang pangalan ng isang set ng dimensiyon. Mga GenerateDataset Xml ay magbabasa lamang ng data variables sa sampol.ncmga talaksan na gumagamit ng ilan o lahat ng mga dimensiyong iyon (at wala nang iba pang dimensiyon) , pati na ang lahat ng scalar variables sa file, at gawin ang dataset mula sa mga data variables na iyon. Kung ang isang dimensiyon ay nasa isang grupo, dapat mong tiyakin ang buongName nito, e.g., " *groupName/dimensionName* ".
Kung hindi mo ito espesipikong sasabihin (walang laman na string) , GenerateDatasets Xml ay hahanapin ang mga variables na may pinaka dimensiyon, sa teoriya na ang mga ito ay magiging pinaka-kawili-wili, ngunit maaaring may mga panahon na nais mong gumawa ng isang dataset mula sa ilang ibang grupo ng mga data variables na gumagamit ng ilang iba pang grupo ng dimensiyon.
Kung magbibigay ka lamang ng dimensiyon na hindi umiiral (e.g., WALA\\_MATCH) ,ERDDAP™ay basta masusumpungan ang lahat ng iba't ibang anyo ng scalar.
Ang "DimensionsCSV" na string ay nagiging&lt;Malaking CSV&gt; sadatasets.xmlIpasok ang impormasyon para sa dataset.
    
#### ang Dimension Bilang{#treatdimensionsas} 
May kategoryang hindi tanggap.ncmga talaksan (sapagkat hindi nila sinusunod ang mga tuntunin ng CF) na maraming dimensiyon (e.g., lat, lon, oras) kung kailan dapat ay gumamit sila ng isa lamang dimensiyon (e.g., oras) , halimbawa:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
Ang EDDTable FromMultidimNcFiles ay may espesyal na tampok na mahaharap sa mga file na ito: kung idaragdag mo ang global attribute na "DreatDimensionsAs" sa datasets globaladdAttributes, masasabi moERDDAP™upang gamutin ang ilang dimensiyon (e.g., lat at lon) na para bang ang mga ito ay isa pang dimensiyon (e.g., oras) . Ang halaga ng attribute ay dapat isang comma na hiwalay na talaan na nagtatakda ng "mula sa" dimensiyon at pagkatapos ay ang "to" dimensiyon, e.g.,
<att name="treatDimensionsAs">Git, lon, oras</att>  
PagkataposERDDAP™ang talaksan na para bang:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Mangyari pa, ang kasalukuyang laki ng bawat dimensiyon sa talaan ay dapat na pareho; kung hindi, hindi,ERDDAP™ang talaksan bilang isang "Bad File".

Pansinin na ang mga file na ito ay hindi tanggap dahil hindi ito sumusunod sa mga tuntunin ng CF. Kaya bagamanERDDAP™ay maaaring basahin ang mga ito, mariin naming inirerekomenda na hindi kayo lumikha ng mga files na tulad nito dahil ang ibang CF-based software na mga kasangkapan ay hindi mababasa nang tama ang mga ito. Kung mayroon ka nang gayong mga file, inirerekomenda namin na palitan agad ito ng tanggap na mga file.
    
### Mapagkakatiwalaan Mula sa mga Latian{#eddtablefromncfiles} 
[ **Mapagkakatiwalaan Mula sa mga Latian** ](#eddtablefromncfiles)Inaalam ang mga impormasyon mula saNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) mga talaksan at[Kumandante](https://github.com/zarr-developers/zarr-python)mga talaksan (ng bersyon 2.25) na may iba't ibang sukat (halimbawa, panahon) o higit pa sa isang kabahaging dimensiyon (Halimbawa, panahon, altitud (o lalim) , latitud, longhitud) . Ang mga file ay dapat may parehong dimensiyonal na mga pangalan. Ang isang ibinigay na file ay maaaring magkaroon ng multiple na halaga para sa bawat dimensiyon at ang mga halaga ay maaaring iba-iba sa iba't ibang source file. Ang mga file ay maaaring may karakter variables na may karagdagang dimensiyon (Halimbawa, HULING14) . Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

Ang mga talaksang Zar ay may bahagyang kakaibang pag-uugali at nangangailangan ng alin sa fileNameRegex o ang pathRegex upang isama ang "zarr".

* Kung gayon.ncgumagamit ng isa sa mga[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Mga file format, subukang gamitin[Mga EDDTable Mula sa mga Latian](#eddtablefromncfiles)bago subukan ito.
     
* Para sa mga bagong taskular datasets mula.ncmga talaksan, subukan ang mas bago[Mga EDDTable Mula sa mga MultidimNcFile](#eddtablefrommultidimncfiles)Una.
     
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
    
Ang unang bagay na ginagawa ng GenerateDatasetsXml para sa ganitong uri ng dataset matapos mong sagutin ang mga tanong ay ilimbag ang ncdump-tulad na istraktura ng sampol na talaksan. Kaya kung papasok ka sa ilang kasagutan ng goofy para sa unang silo sa pamamagitan ng GenerateDatasets Xml, sa paano man ay makikita mo kungERDDAP™ay maaaring magbasa ng file at tingnan kung anong dimensiyon at variables ang nasa file. Pagkatapos ay makapagbibigay ka ng mas mabuting mga sagot para sa ikalawang silo sa pamamagitan ng GenerateDatasetsXml.
    
Dimensiyon -- GenerateDatasets Xml ay hihingi ng isang "DimensionsCSV" string. Ito ay isang comma-extend-halagang talaan ng mga pinagmulang pangalan ng isang set ng dimensiyon. Mga GenerateDataset Xml ang iba't ibang impormasyon.ncmga talaksan na gumagamit ng ilan o lahat ng mga dimensiyong iyon, pati na ang lahat ng mga scalar variable, at gumagawa ng dataset mula sa mga data variable na iyon. Kung hindi mo ito espesipikong sasabihin (walang laman na string) , GenerateDatasets Xml ay hahanapin ang mga variables na may pinaka dimensiyon, sa teoriya na ang mga ito ay magiging pinaka-kawili-wili, ngunit maaaring may mga panahon na nais mong gumawa ng isang dataset mula sa ilang ibang grupo ng mga data variables na gumagamit ng ilang iba pang grupo ng dimensiyon.
    
* 1D Halimbawa: 1D files medyo naiiba sa 2D, 3D, 4D, ... files.
    * Baka mayroon kang set ng.ncdata files kung saan ang bawat file ay may isang buwang halaga ng datos mula sa isang naanod na boya.
    * Ang bawat talaksan ay magkakaroon ng 1 dimensiyon, halimbawa, panahon (laki =\\[marami\\]) .
    * Ang bawat file ay magkakaroon ng isa o higit pang 1D variables na gumagamit ng dimensiyon na iyon, halimbawa, oras, longhitud, latitud, temperatura ng hangin, ....
    * Ang bawat talaksan ay maaaring may 2D character variables, halimbawa, na may dimensiyon (Oras, mga manggagawa) .
         
* 2D Halimbawa:
    * Baka mayroon kang set ng.ncdata files kung saan ang bawat file ay may isang buwang halaga ng datos mula sa isang naanod na boya.
    * Ang bawat talaksan ay magkakaroon ng 2 dimensiyon, halimbawa, panahon (laki =\\[marami\\]) at iid (laki = 1) .
    * Ang bawat file ay magkakaroon ng 2 1D variables na may parehong mga pangalan tulad ng dimensiyon at gamit ang parehong-name dimensiyon, halimbawa, panahon (panahon) , id (id) . Ang 1D variables na ito ay dapat isama sa talaan ng&lt;dataVariable&gt;'s sa XML ng dataset.
    * Ang bawat talaksan ay magkakaroon ng isa o higit pang 2D variables, halimbawa, longhitud, latitud, temperatura ng hangin, temperatura ng tubig, ...
    * Ang bawat talaksan ay maaaring may 3D character variables, halimbawa, na may dimensiyon (Oras,id,nCharacters) .
         
* 3D Halimbawa:
    * Baka mayroon kang set ng.ncdata files kung saan ang bawat file ay may isang buwang halaga ng datos mula sa isang hindi gumagalaw na boya.
    * Ang bawat talaksan ay magkakaroon ng 3 dimensiyon, halimbawa, panahon (laki =\\[marami\\]) , lat (laki = 1) , at lon (laki = 1) .
    * Ang bawat file ay magkakaroon ng 3 1D variable na may parehong mga pangalan tulad ng dimensiyon at gamit ang parehong-name dimensiyon, halimbawa, panahon (panahon) , lat (Hiwa) , lon (lon) . Ang 1D variables na ito ay dapat isama sa talaan ng&lt;dataVariable&gt;'s sa XML ng dataset.
    * Ang bawat talaksan ay magkakaroon ng isa o higit pang 3D variables, halimbawa, temperatura ng hangin, temperatura ng tubig, ...
    * Ang bawat talaksan ay maaaring may 4D karakter variables, halimbawa, na may dimensiyon (Oras, oras,lon,nCharacters) .
    * Maaaring nasa pangalan ng talaksan ang pangalan ng boya sa loob ng pangalan ng talaksan.
         
* 4D Halimbawa:
    * Baka mayroon kang set ng.ncdata files kung saan ang bawat file ay may isang buwang halaga ng datos mula sa isang istasyon. Sa bawat pagkakataon, ang istasyon ay nagbabasa sa sunud - sunod na kalaliman.
    * Ang bawat talaksan ay magkakaroon ng 4 na dimensiyon, halimbawa, panahon (laki =\\[marami\\]) , lalim (laki =\\[marami\\]) , lat (laki = 1) , at lon (laki = 1) .
    * Ang bawat file ay magkakaroon ng 4 1D variable na may parehong mga pangalan tulad ng dimensiyon at gamit ang parehong-name dimensiyon, halimbawa, panahon (panahon) , lalim (lalim) , lat (Hiwa) , lon (lon) . Ang 1D variables na ito ay dapat isama sa talaan ng&lt;dataVariable&gt;'s sa XML ng dataset.
    * Ang bawat talaksan ay magkakaroon ng isa o higit pang 4D variables, halimbawa, temperatura ng hangin, temperatura ng tubig, ...
    * Ang bawat talaksan ay maaaring may 5D karakter variables, halimbawa, na may dimensiyon (panahon, -depth,lat,lon,nCharacters) .
    * Maaaring nasa pangalan ng talaksan ang pangalan ng boya sa loob ng pangalan ng talaksan.
         
### Mga EDDTable Mula sa mga Latian{#eddtablefromnccffiles} 
[ **Mga EDDTable Mula sa mga Latian** ](#eddtablefromnccffiles)Ang aggregates data aggregates data mula saNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) mga talaksan na gumagamit ng isa sa mga format ng talaksan na itinakda ng[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Mga kombensiyon. Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

Para sa mga file na gumagamit ng isa sa mga multidimensional CF DSG variant, gamitin[Mga EDDTable Mula sa mga MultidimNcFile](#eddtablefrommultidimncfiles)sa halip.

Binibigyang - kahulugan ng CF DSG conventions ang maraming file format at kalakip dito ang maraming maliliit na pagkakaiba - iba. Tinatalakay ng klaseng ito ang lahat ng pagkakaiba - iba na nalalaman natin, subalit maaaring nakaligtaan natin ang isa (o higit pa) . Kaya kung ang klaseng ito ay hindi makabasa ng datos mula sa inyong CF DSG files, pakisuyo[humingi ng karagdagang tulong](/docs/intro#support).

Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
 
### Nakasusuyang mga Latian{#eddtablefromnccsvfiles} 
[ **Nakasusuyang mga Latian** ](#eddtablefromnccsvfiles)Inaalam ang mga impormasyon mula sa[NCSV](/docs/user/nccsv-1.00)ASCII .csv files. Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
    
Ang unang bagay na ginagawa ng GenerateDatasetsXml para sa ganitong uri ng dataset matapos mong sagutin ang mga tanong ay ilimbag ang ncdump-tulad na istraktura ng sampol na talaksan. Kaya kung papasok ka sa ilang kasagutan ng goofy para sa unang silo sa pamamagitan ng GenerateDatasets Xml, sa paano man ay makikita mo kungERDDAP™ay maaaring magbasa ng file at tingnan kung anong dimensiyon at variables ang nasa file. Pagkatapos ay makapagbibigay ka ng mas mabuting mga sagot para sa ikalawang silo sa pamamagitan ng GenerateDatasetsXml.
    
* BABALA: KailanERDDAP™basahin ang NCCSV data files, kung makakita ito ng error sa isang ibinigay na linya (e.g., maling bilang ng mga bagay) , nilalagyan nito ang isang babalang mensahe (" PANGANGALAGA: Masamang guhit (s) ng datos" ... na may listahan ng mga masamang linya sa mga kasunod na linya) sa[log.txt file](/docs/server-admin/additional-information#log)at pagkatapos ay patuloy na babasahin ang natitirang bahagi ng data file. Kaya pananagutan mong tumingin paminsan - minsan (o sumulat ng iskrip upang gawin iyon) para sa mensaheng iyon sa troso. Tsext upang maayos mo ang mga problema sa data files.ERDDAP™ay itinatayo sa ganitong paraan upang patuloy na mabasa ng mga gumagamit ang lahat ng makukuhang mabisang impormasyon bagaman ang ilang linya ng talaksan ay may mga depekto.
     
### MAHIRAP SA MGA DOTO{#eddtablefromnos} 
[ **MAHIRAP SA MGA DOTO** ](#eddtablefromnos)  (PINAHAHALAGAHAN) humahawak ng datos mula sa isangNOAA [WALA](https://opendap.co-ops.nos.noaa.gov/axis/)source, na ginagamit[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)para sa mga kahilingan at mga pagtugon. Napakaespesipiko nito saNOAANOS's XML. Tingnan ang sampol na EDDTable FromNOS dataset sa datasets2.xml.
 
### MAHABANG MGA ULOBIS{#eddtablefromobis} 
[ **MAHABANG MGA ULOBIS** ](#eddtablefromobis)Gamitin ang datos mula sa Ocean Biogeographic Information System (OBIS) server (noon ay http://www.iobis.org  ) . Posibleng wala nang mga aktibong server na gumagamit nito ngayong out-of-date na uri ng sistemang OBIS server.

* Inaasahan ng mga server ng OBIS ang isang kahilingan ng XML at ibabalik ang isang tugon ng XML.
* Dahil pare - pareho ang paraan ng lahat ng server ng OBIS (noon ay http://iobis.org/tech/provider/questions ) , hindi mo na kailangan pang magtakda ng isang dataset ng OBISERDDAP.
* Ikaw AY May Kabilang na "creator\\_email" Nasa pangglobong katangianaddAttributes, dahil ang impormasyong iyon ay ginagamit sa loob ng lisensiya. Matatagpuan ang angkop na adres ng email sa pamamagitan ng pagbasa ng tugon ng XML mula sa sourceURL.
* Maaaring makuha o hindi mo makuha ang pangglobong katangian [&lt;subsetVariables&gt;] (Mga #subsetvariable) upang magtrabaho sa isang ibinigay na OBIS server. Kung ikaw ay sumusubok, subukin mo lamang ang isang pagbabago (Halimbawa, ang ScientificName o Genus) .
#### MAHABANG MGA ULOBIS kalansay XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Mapagkakatiwalaan Mula sa mga ParquetFile{#eddtablefromparquetfiles} 
[ **Mapagkakatiwalaan Mula sa mga ParquetFile** ](#eddtablefromparquetfiles)humahawak ng datos mula sa[Parating](https://parquet.apache.org/). Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.

* Ang parquet ay dinisenyo upang mag - compress nang napakahusay, kaya maaaring bigyan ka nito ng mas maliliit na sukat ng talaksan kaysa ibang format.
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
* BABALA: KailanERDDAP™basahin ang Parquet data files, kung may mali sa ibinigay na linya (e.g., maling bilang ng mga bagay) , nilalagyan nito ang isang babalang mensahe (" PANGANGALAGA: Masamang guhit (s) ng datos" ... na may listahan ng mga masamang linya sa mga kasunod na linya) sa[log.txt file](/docs/server-admin/additional-information#log)at pagkatapos ay patuloy na babasahin ang natitirang bahagi ng data file. Kaya pananagutan mong tumingin paminsan - minsan (o sumulat ng iskrip upang gawin iyon) para sa mensaheng iyon sa troso. Tsext upang maayos mo ang mga problema sa data files.ERDDAP™ay itinatayo sa ganitong paraan upang patuloy na mabasa ng mga gumagamit ang lahat ng makukuhang mabisang impormasyon bagaman ang ilang linya ng talaksan ay may mga depekto.
     
### Maaasahan Mula saSOS {#eddtablefromsos} 
[ **Maaasahan Mula saSOS** ](#eddtablefromsos)humahawak ng datos mula sa Sensor Obserbasyon Service (SWE/[SOS](https://www.ogc.org/standards/sos)) server.

* Ang dataset na ito ng tipo ng titik ay nagbibigay ng impormasyon mula sa isang grupo ng mga istasyon na pawang pinaglilingkuran ng isaSOSserver.
* Ang lahat ng istasyon ay may iisang set ng mga variable (Bagaman ang pinagmumulan ng bawat istasyon ay hindi kinakailangang magsilbi sa lahat ng iba't ibang bagay) .
*   SOSInaasahan ng mga server ang isang XML request at ibabalik ang isang XML tugon.
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti. Hindi madaling lumikha ng dataset XML para saSOSmga datos sa pamamagitan ng kamay. Upang masumpungan ang kinakailangang impormasyon, dapat kang dumalawsourceUrl+"? serbisyo=SOS&request=GetCapabilities" sa browser; tingnan ang XML; humiling ng isang GetObservation sa pamamagitan ng kamay; at tingnan ang tugon ng XML sa kahilingan.
* Sa paminsan-minsang pagdaragdag ng mga bagong uri ngSOSAng mga server at mga pagbabago tungo sa dating mga server, ito ay nagiging mas mahirap para saERDDAP™upang awtomatikong makita ang uri ng server mula sa mga tugon ng server. Ang paggamit ng&lt;sos ProserType&gt; (na may halaga ng IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, o WHOI) ngayon ay ROMENDED. Kung may problema ka sa anumang datasets ng tipong ito, subukan ang re-running GenerateDatasets Xml para saSOSserver. Pag - aanak Mga Data Xml ay hahayaan mong subukin mo ang kakaiba&lt;Mga mapagpipiliang sosserType&gt; hanggang sa masumpungan mo ang tamang numero para sa isang ibinigay na server.
*   SOSBilang sumaryo:
    * SWEE (Mapagkakatiwalaang Web) atSOS  (Paglilingkod ng Sensor Obserbasyon) Ay[Mga pamantayang OpenGIS MERA](https://www.ogc.org/standards). Nasa website na iyon ang mga pamantayang dokumento.
    * AngOGCWeb Services Common Speciation ver 1.0 (OGC06-121r3) ang pagtatayo ng mga queries ng COT at POST (tingnan ang seksiyon 7.2.3 at seksiyon 9) .
    * Kung magpadala ka ng accessCapabilities xml requestSOSserver (sourceUrl+ "?service=SOS&request=GetCapabilities") , makakakuha ka ng isang xml na resulta sa listahan ng mga istasyon at sa mga naobserbahan Mga detalye na mayroon silang datos para sa.
    * Ang isang napagmasdang Property ay isang pormal na reference sa URI sa isang propesyunal. Halimbawa, urn:ogc:phenomenon:longude:wgs84 o https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * Ang nakikitang Property ay hindi nagbabago.
    * Maaaring mahigit sa isang bagay ang may iisang obserbasyon Mga ari - arian (Halimbawa, sa loob ng Temp at labas Maaaring kapuwa napansin ng temp Mga ari - arian https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Kung magpadala ka ng isang kahilingan para sa goObservation xmlSOSserver, makakakuha ka ng isang xml na resulta ng mga paglalarawan ng mga pangalan sa larangan sa tugon, field units, at datos. Kabilang sa mga pangalan sa larangan ang longhitud, latitud, lalim (marahil) , at panahon.
    * Bawat IsadataVariablepara sa Isang Mapagkakatiwalaang BagaySOSay dapat na kinabibilangan ng isang "naobserbahang Property" attribute, na nagpapakilala sa napagmasdang Property na dapat hilingin mula sa server upang makuha ang variable na iyon. Kadalasan, ang ilan aydataVariableay magtatala ng parehong kalipunan ng napagmasdang Property.
    * Ang dataType para sa bawat isadataVariableay maaaring hindi tiyakin ng server. Kung gayon, dapat mong tingnan ang mga tugon ng datos ng XML mula sa server at mag - atas ng angkop [&lt;dataType&gt;s] (#datatype) sa loobERDDAP™datosdataVariableMga katuturan.
    *    (Sa panahon ng pagsulat nito) ilanSOSTinutugon ng mga server ang mga kahilingan sa pagkuha ng tulong para sa higit sa isa na naobserbahan Ang mga ari - arian sa pamamagitan ng basta pagbabalik ng mga resulta para sa una sa naobserbahang mga Property. (Walang maling mensahe&#33;) Tingnan ang kahilingan ng tagapagtayong parameter Ipagdiwang Nang Lubusan ang mga Hula.
* Maaasahan Mula saSOSkusang idagdag
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
sa mga katangiang global ng dataset kapag nilikha ang dataset.
*   SOSKaraniwang nagpapahayag ang mga server[mga yunit](#units)kasama ng[UCUM](https://unitsofmeasure.org/ucum.html)sistema. KaramihanERDDAP™Ang mga server ay nagpapahayag ng mga yunit sa pamamagitan ng[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)sistema. Kung kailangan mong magpakumberte sa dalawang sistema, magagamit mo[ERDDAPAng web service upang gawing/mula sa UCUM unitsUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### Maaasahan Mula saSOSkalansay XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Mapagkakatiwalaang mga Talento{#eddtablefromthreddsfiles} 
[ **Mapagkakatiwalaang mga Talento** ](#eddtablefromthreddsfiles)  (pinabayaan) Hinahati ang mga data file na may iba't ibang sukat, na bawat isa ay may isa o higit pang sukat (Halimbawa, panahon, altitud (o lalim) , latitud, longhitud) , at pinaglilingkuran ng isang[MGA THEDDOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).

* Ang uring dataset na ito ay **PINAHAHALAGAHAN** . Ang mas bago at mas pangkalahatang solusyon ay gamitin ang[cache Mula sa Pagpipilian Para sa EDDTable Mula sa mga Latian](#cachefromurl)  (o naiiba) , na gumagawa sa isang lokal na kopya ng mga remote files at nagsisilbi sa data mula sa lokal na mga files. Ang&lt;Ang cache FromUrl&gt; option ay maaaring gamitin na may anumang uri ng tabular data file mula sa anumang web-based source na naglalathala ng isang directory-tulad ng listahan ng mga files. **   
Kung hindi mo magawa iyan sa ilang kadahilanan, email Chris. Juan sa noaa.gov .
Kung walang reklamo bago ang 2020, ang uring dataset na ito ay maaaring alisin. ** 
* Mahigpit naming inirerekomenda ang paggamit ng[Mga GenerateDataset Xml programa](#generatedatasetsxml)upang gumawa ng isang magaspang na burador ngdatasets.xmlPara sa dataset na ito. Pagkatapos ay maaari mo itong i - edit na mabuti.
* Sa karamihan ng mga kaso, ang bawat file ay may maraming halaga para sa kaliwa (una) Halimbawa, ang sukat ay panahon.
* Ang mga file ay kadalasang (ngunit huwag mong gawin) may isang halaga para sa iba pang dimensiyon (Halimbawa, altitud (o lalim) , latitud, longhitud) .
* Ang mga file ay maaaring may karakter variables na may karagdagang dimensiyon (Halimbawa, ang mga nCharacter) .
* Ang mga server ng THEDDS ay makikilala sa pamamagitan ng "/thredds/" sa URLs. Halimbawa,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* ANG mga server ay may mga katalogo sa iba't ibang dako. Ang klaseng ito ay REQURRES na kinabibilangan ng URL ng "/thredds/catalog/". Karaniwang masusumpungan mo ito sa pamamagitan ng pagsisimula sa isang browser sa katalogo ng ugat, at pagkatapos ay pag - iintroberto sa ninanais na subcatalog.
* Binabasa ng klaseng ito ang katalogo.xml files na pinaglilingkuran ng THEDDS na may listahan ng mga talaan ng mga talaan&lt;katalogong Refs&gt; (Mga reperensiya sa karagdagang katalogo.xml sub-files) at&lt;datos&gt; (mga talaksang datos) .
* Ang&lt;ang talaksangDir&gt; setting ay hindi pinapansin. Yamang ang klaseng ito ay nag - download at gumagawa ng lokal na kopya ng bawat remote data file,ERDDAP™ang talaksan Malapit na *Malaking Direktoryo* /copy/ *datasetID* /.
* Sapagkat&lt;sourceUrl&gt;, gamitin ang URL ng katalogo.xml file para sa dataset sa THREDS server, halimbawa: para sa URL na ito na maaaring gamitin sa isang web browser,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Ang server na ito ay hindi na magagamit.\\],
gamitin&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/sourceUrl&gt;
     (ngunit ilagay ito sa isang linya) .
* Yamang ang klaseng ito ay laging nag - download at gumagawa ng lokal na kopya ng bawat remote data file, hindi mo dapat ibalot ang dataset na ito[Mapagkakatiwalaang Komponiya](#eddtablecopy).
* Ang dataset type na ito ay sumusuporta sa isang OPSIYONAL, bihirang-gamit, espesyal na tag,&lt;espesyal na "Mode&gt; " *mode* &lt;/ espesyal naMode&gt; na maaaring gamitin upang magtakda na ang mga espesyal, hard-coded na alituntunin ay dapat gamitin upang malaman kung aling files ang dapat download mula sa server. Sa kasalukuyan, ang tanging may bisa *mode* ay SAMOS na ginagamitan ng datos mula sa https://tds.coaps.fsu.edu/thredds/catalog/samos upang i-download lamang ang mga files na may huling numero ng bersyon.
* Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.
* Tingnan ang 1D, 2D, 3D, at 4D halimbawa para sa[Mapagkakatiwalaan Mula sa mga Latian](#eddtablefromncfiles).
     
### Maaasahan Mula saWFSMga Bunton{#eddtablefromwfsfiles} 
[ **Maaasahan Mula saWFSMga Bunton** ](#eddtablefromwfsfiles)  (PINAHAHALAGAHAN) ay gumagawa ng lokal na kopya ng lahat ng impormasyon mula sa isang kopyaArcGISMapserWFSserver upang ang data ay agad na mai-serveERDDAP™gumagamit.

* Kailangan mong magtakda ng isang pantanging anyosourceUrlpangglobong katangian na sabihinERDDAP™kung paano hihilingin ang impormasyon mula sa server. Pakisuyong gamitin ang halimbawang ito bilang template:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (ngunit ilagay ang lahat ng ito sa iisang linya) 
* Kailangang magdagdag ka ng isang pantanging pangglobong katangian na sasabihinERDDAP™kung paano malalaman ang pangalan ng mga tipak ng impormasyon na dapat i - download. Ito marahil ay magiging mabisa sa lahat ng Mapagkakatiwalaang Panahon Mula NoonWFSMga datos:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Yamang ang klaseng ito ay laging nag - download at gumagawa ng lokal na kopya ng bawat remote data file, hindi mo dapat ibalot ang dataset na ito[Mapagkakatiwalaang Komponiya](#eddtablecopy).
* Tingnan ang superclass ng klaseng ito,[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles), para sa karagdagang impormasyon kung paano gumagana ang klaseng ito at kung paano ito gagamitin.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
[ **EDDTableAggregateRows** ](#eddtableaggregaterows)ay maaaring gumawa ng EDDTable dataset mula sa isang grupo ng "child" EDDTable datasets.

* Narito ang ilang gamit ng EDDTableAggregateRows:
    * Maaari kang gumawa ng isang EDDTableAggregateRows dataset mula sa dalawang magkaibang uri ng files o data sources, halimbawa, isang dataset na may datos hanggang sa dulo ng nakaraang buwan na nakaimbak sa.ncAng CF files at isang dataset na may datos para sa kasalukuyang buwan na nakaimbak sa isang conlatial database.
    * Maaari kang gumawa ng EDDTableAggregateRows dataset upang harapin ang pagbabago sa mga source files (Halimbawa, nagbago ang format ng oras, o nagbago ang pangalan, o data Uri/scale\\_factor/add\\_offsetBinago) . Sa kasong ito, ang isang bata ay makakakuha ng datos mula sa mga file na ginawa bago ang pagbabago at ang isa pang bata ay makakakuha ng datos mula sa mga file na ginawa pagkatapos ng pagbabago. Ang paggamit na ito ng EDDTableAggregateRows ay isang alternatibo sa paggamit ng[NcML](#ncml-files)o[NCO](#netcdf-operators-nco). Maliban na lamang kung may pagkakakilanlang katangian sa mga talaan (upang magamit mo&lt;fileNameRegex&gt; upang malaman kung aling file ang pag-aari ng child dataset), malamang na kailangan mong itago ang mga file para sa dalawang child datasets sa magkaibang directories.
    * Maaari kang gumawa ng isang EDDTableAggregateRows dataset na may kabahaging subset ng mga variable ng isa o higit pang katulad ngunit iba't ibang dataset, halimbawa, isang dataset na gumagawa ng isang Profile dataset mula sa kombinasyon ng isang Profile dataset, isang TimeSeriesProfile dataset, at isang TrajectoryProfile dataset (na may ilang iba't ibang variables at ilang mga variables sa karaniwan -- na kung saan ay kailangang gumawa ng mga espesyal na variables para sa bata datasets, na may lamang in-common variables) .
    * Maaari kang magkaroon ng ilang standalone datasets, bawat isa ay may iisang uri ng datos subalit mula sa ibang istasyon. Maaari mong iwan ang mga datasets na iyon nang buo, ngunit maaari ring lumikha ng isang EDDTableAggregateRows dataset na may datos mula sa lahat ng mga istasyon -- ang bawat bata datasets ay maaaring maging simple[Mapagkakatiwalaang Mula sarddap](#eddfromerddap), na tumutukoy sa isa sa umiiral na mga dataset ng istasyon. Kung gagawin mo ito, iba - iba ang ibigay sa bawat datos ng EDDTable FromErddapdatasetIDkaysa orihinal na standalone datasets, e.g., sa pamamagitan ng pag-apruba ng "Anak" sa orihinal na "Child"datasetID.
* Bawat isa sa bata&lt;Ang tinukoy na dataset&gt; ay dapat kumpletong dataset, na para bang ito ay isang stand-alone dataset. Ang bawat isa ay dapat na magkaroon ng magkakatulad[dataVariables](#datavariable), sa parehong pagkakasunud-sunod, kasama ang parehong[destinationNames](#destinationname),[datos Mga Uri](#datatype),[missing\\_values](#missing_value),[\\_FillValues](#missing_value), at[mga yunit](#units). Ang metadata para sa bawat variable para sa EDDTableAggregateRows dataset ay mula sa mga variable sa unang child dataset, ngunit ang EDDTableAggregateRows ay mag-a-apdeyt ng update[actual\\_range](#actual_range)metadata na maging aktuwal na range para sa lahat ng mga bata.
* Mungkahi: Kunin ang bawat bata datasets gumagana bilang stand-alone datasets. Pagkatapos ay sikaping gawin ang EDDTableAggregateRows dataset sa pamamagitan ng pagputol at pagpasa ng mga datosdatasets.xmlPara sa bawat isa sa bagong EDDTableAggregate Rows dataset.
* Talaan ng mga Nilalaman Ang pagkakasunud - sunod ng mga dataset ng bata ang tumitiyak sa kabuuang default na uri ng mga resulta. Mangyari pa, ang mga gumagamit ay maaaring humiling ng ibang uri ng order para sa isang ibinigay na set ng mga resulta sa pamamagitan ng pag - aapending &orderBy (" *Kasama-hating listahan ng mga variables* ") hanggang sa dulo ng kanilang tanong.
* Ang "oras"[pangglobo Attributes](#global-attributes)para sa EDDTableAggregateRows ang pinagsamang global Attributes mula sa unang child dataset. Ang Mapagkakatiwalaang Aggregamento Ang mga hanay ay maaaring magkaroon ng isang pangglobong daigdig&lt;addAttributes&gt; maglaan ng karagdagang pangglobong mga katangian o daigin ang pinagmumulan ng pangglobong mga katangian.
#### PAG - AAGgregate SA EDDTE Mga kalansay ng Rows XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Mapagkakatiwalaang Komponiya{#eddtablecopy} 
[ **Mapagkakatiwalaang Komponiya** ](#eddtablecopy)ay maaaring gumawa ng isang lokal na kopya ng maraming mga uri ng EDDTable datasets at pagkatapos ay muling-serserve ang data agad mula sa lokal na kopya.

* Mapagkakatiwalaang Komponiya (at para sa grid data,[EDDGridKopya](#eddgridcopy)) ay napakadaling gamitin at napakabisa **ang ilan sa pinakamalalaking problema sa pag - aanunsyo ng impormasyon mula sa malalayong pinagmumulan ng impormasyon:** 
    * Maaaring maging mabagal ang pagkuha ng datos mula sa isang malayong pinagkukunan ng datos.
        * Ang mga ito ay maaaring mabagal sapagkat ang mga ito ay likas na mabagal (Halimbawa, isang di - mabisang uri ng server) ,
        * Sapagka't sila'y nadaraig ng napakaraming kahilingan,
        * o dahil limitado ang iyong server o ang remote server.
    * Ang remote dataset kung minsan ay hindi makukuha (muli, sa iba't ibang kadahilanan) .
    * Ang pagtitiwala sa isang pinagmumulan ng impormasyon ay hindi sapat (Halimbawa, kapag maraming gumagamit at marami ang gumagamitERDDAPginagamit ito ng mga s) .
         
* Kung Paano Ito Gumagana -- Nilulutas ng EDDTableCopy ang mga problemang ito sa pamamagitan ng awtomatikong paggawa at pagpapanatili ng isang lokal na kopya ng datos at pagsisilbi ng datos mula sa lokal na kopya.ERDDAP™ay magsisilbi ng impormasyon mula sa lokal na kopya nang napakabilis. At ang paggawa at paggamit ng isang lokal na kopya ay nagpapagaan sa pasanin sa remote server. At ang lokal na kopya ay backup ng orihinal, na kapaki - pakinabang sakaling may mangyari sa orihinal.
    
Walang bago sa paggawa ng lokal na kopya ng isang dataset. Ang bago rito ay na ginagawa ito ng klaseng ito\\*Madali\\*upang lumikha at\\*tagapangalaga\\*isang lokal na kopya ng impormasyon mula sa isang\\*pagkakasari - sari\\*ng mga uri ng remote data source at\\*idagdag ang metadata\\*habang kinokopya ang impormasyon.
    
#### EDDTableCopy vs&lt;Oche mula sa Urlg;{#eddtablecopy-vs-cachefromurl} 
&lt;Ang cache FromUrl&gt; ay isang alternatibo sa EDDTableCopy. Iba - iba ang trabaho nila.

* Mapagkakatiwalaan Ang pagkopya ay gumagana sa pamamagitan ng paghiling ng mga piraso ng impormasyon mula sa isang remote service at pag - iimbak ng mga tipak na iyon sa lokal na mga file. Kaya, ang EDDTableCopy ay kapaki - pakinabang sa ilang kaso kung saan ang impormasyon ay makukuha sa pamamagitan ng isang malayong serbisyo.
* [&lt;Hache Mula sa Url&gt;] (#cache simulaurl) download ang mga umiiral na files na nakatala sa isang remote website.&lt;Ang cache FromUrl&gt; ay mas madaling gamitin at mas maaasahan yamang madali nitong masasabi kung kailan may bagong remote data file o kung ang isang remote data file ay nagbago at sa gayo'y kailangang i-download.

Kung may mga kalagayan kung saan ang EDDTableCopy o ang&lt;Maaaring gamitin ang cache FromUrl&gt;&lt;cache FromUrl&gt; sapagkat ito ay mas madali at mas maaasahan.
     
#### &lt;Pag - aalis ng Prestina Pangalan;{#extractdestinationnames} 
Mapagkakatiwalaan Ang pagkopya ay gumagawa sa lokal na kopya ng impormasyon sa pamamagitan ng paghiling ng mga tipak ng impormasyon mula sa malayong dataset. Mapagkakatiwalaan Kopya ang tumitiyak kung aling tipak ang hihilingin sa pamamagitan ng paghiling ng &now () Mga pamantayan para sa&lt;IDestinationNames&gt; (Itinakda sadatasets.xml, tingnan ang ibaba) , na ang mga space-weed destinasyon na pangalan ng mga variable sa remote dataset. Halimbawa,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
ay maaaring magbigay ng mga magkakaibang halaga kombinasyon ng drider=tig17, profile=1017, drider=tig17, profile=1095, ... drider=une12, profile=1223, drider=une12, profile=1251, ....

Sa mga kalagayan kung saan ang isang tudling (Halimbawa, tingnan ang profile) ay maaaring ang lahat ng kinakailangan upang makilala ang isang grupo ng mga hanay ng impormasyon, kung may napakalaking bilang, halimbawa, ng mga profile, maaaring kapaki - pakinabang na tiyakin din ang isang karagdagang katas Pag - aalis Pangalan (Halimbawa, ang tagapaganod) na nagsisilbing subdivide sa mga profile. Iyan ay umaakay sa mas kaunting data files sa isang ibinigay na directory, na maaaring humantong sa mas mabilis na pagpasok.
    
#### Lokal na mga Pamana{#local-files} 
Ang bawat bahagi ng datos ay nakatago sa isang hiwalayNetCDFtalaksan sa isang subdirectory ng *Malaking Direktoryo* /copy/ *datasetID* / (na itinakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) . May isang subdirectory level para sa lahat ngunit ang huling hinango naDestinationName. Halimbawa, ang datos para sa ig17+1017, ay i-imbak sa
     *Malaking Direktoryo* /copy/sampleDataset/tig17/1017.nc.
Halimbawa, ang datos para sa une12+1251, ay i-imbak sa
     *Malaking Direktoryo* /copy/sampleDataset/une12/1251.nc.
Ang direktoryo at mga file na nilikha mula sa data value ay binabago upang gawin itong file-name-ligtas (Halimbawa, ang mga espasyo ay pinapalitan ng "x20") - ito ay hindi nakakaapekto sa aktuwal na datos.
     
#### Bagong Data{#new-data} 
Sa bawat pagkakataon, ang EDDTable Kopyahin - muli, sinusuri nito ang remote dataset upang makita kung anong iba't ibang tipak ang makukuha. Kung hindi pa umiiral ang talaksan para sa isang bahagi ng datos, isang kahilingan upang makuha ang daglat ay idinaragdag sa isang queue.ERDDAP'Thread processs lahat ng mgaqueued requests para sa mga tipak ng datos, one-by-one. Makikita mo ang mga estadistika para sa gawain ng taskThread[Katayuan Pahina](/docs/server-admin/additional-information#status-page)at sa[Pang - araw - araw na Report](/docs/server-admin/additional-information#daily-report). (Oo,ERDDAP™ay maaaring mag-atas ng maramihang gawain sa prosesong ito, ngunit ito ay gagamit ng maraming mga remote data source's bandwidth, memory, at CPU panahon, at maraming lokalERDDAP''s bandwidth, memory, at CPU time, alinman dito ay hindi magandang ideya.) 
    
TANO: Sa unang pagkakataon isang EDDTableCopy ang may karga, (kung mabuti ang takbo ng lahat) maraming mga kahilingan para sa mga tipak ng datos ay idadagdag sa queue ng taskThread, ngunit walang mga lokal na data file ang malilikha. Kaya ang tagapagtayo ay mabibigo ngunit ang taskThread ay patuloy na magtatrabaho at lilikha ng mga lokal na file. Kung ang lahat ay magiging maayos, ang taskThread ay gagawa ng ilang lokal na data file at ang susunod na pagtatangka na muling ikarga ang dataset (sa ~15 minuto) ay magtatagumpay, subalit sa simula ay limitado lamang ang impormasyon.
    
TANE: Pagkatapos ng lokal na dataset ay may ilang datos at makikita sa inyong lugarERDDAP, kung ang remote dataset ay pansamantala o permanenteng hindi makukuha, ang lokal na dataset ay gagana pa rin.
    
BABALA: Kung malaki ang remote dataset at/o mabagal ang remote server (iyan ang problema, hindi ba?) , matagal bago makagawa ng isang kumpletong lokal na kopya. Sa ilang kaso, hindi magiging katanggap - tanggap ang panahong kailangan. Halimbawa, naghahatid ng 1 TB ng datos sa isang linya ng T1 (0.15 GB/s) ay gumugugol ng di - kukulangin sa 60 araw, sa ilalim ng pinakamabuting mga kalagayan. Bukod pa riyan, gumagamit ito ng maraming bandwidth, memory, at CPU na panahon sa liblib at lokal na mga computer. Ang solusyon ay magpadala ng hard drive sa administrador ng remote data set upang ang s/siya ay makagawa ng isang kopya ng dataset at ihulog ang hard drive pabalik sa iyo. Gamitin ang datos na iyon bilang simula at ang EDDTableCopy ay magdadagdag ng datos dito. (Ganiyan ginagamit ang EC2 Cloud Service ng Amazon upang lutasin ang problema, kahit na ang kanilang sistema ay maraming bandwidth.) 
    
BABALA: Kung ang isang ibinigay na kombinasyon ng mga pamantayan ay maglaho sa isang remote dataset, ang EDDTableCopy ay hindi nag - aalis sa lokal na kopyang talaksan. Kung nais mo, maaari mo itong alisin sa iyong sarili.
    
#### Talaan ng mga Nilalaman&lt;(Talahulugang Tagalog);{#tablecopy-checksourcedata} 
Angdatasets.xmlpara sa dataset na ito ay maaaring magkaroon ng opsyonal na tag
```
    <checkSourceData>true</checkSourceData>  
```
Totoo ang default na halaga. Kung/kapag ito ay mali, ang dataset ay hindi kailanman titingnan ang source dataset upang malaman kung may karagdagang datos na makukuha.
     
#### Inirerekomendang Gamit{#recommended-use} 
1. Gumawa ng&lt;Kakaibang datos&gt; ipinasok (ang katutubong uri, hindi ang EDDTableCopy) para sa malayong pinagkukunan ng datos. **Kunin itong gumagana nang tama, pati na ang lahat ng ninanais na metadata.** 
2. Kung masyadong mabagal, magdagdag ng XML code upang ibalot ito sa isang EDDTableCopy dataset.
    * Gumamit ng ibang paraandatasetID  (marahil sa pamamagitan ng pagbabago ngdatasetIDng matatandadatasetIDbahagya) .
    * Tularan ang&lt;Makukuha Sa&gt;,&lt;Muling magkarga sa Bawat NMinutes&gt; at&lt;onChange&gt; mula sa malayong XML ng EDDTable hanggang sa XML ng EDDTableCopy. (Ang kanilang mga pagpapahalaga sa materyang EDDTableCopy; ang kanilang mga pagpapahalaga sa panloob na dataset ay nagiging walang kaugnayan.) 
    * Gumawa ng&lt;tag ng hinangongDestinationNames&gt; (Tingnan ang nasa itaas) .
    *   &lt;Ang orderExtract By&gt; ay isang OPTIONAL na espasyong tukudlangit na talaan ng patutunguhang iba't ibang pangalan sa malayong dataset. Kapag ang bawat bahagi ng impormasyon ay na - download mula sa remote server, ang tipak ng yelo ay ibubukud - bukod ng mga variable na ito (...) . Sa ilang kaso,ERDDAP™ay mas mabilis na makakakuha ng datos mula sa mga lokal na data file kung ang unang variable sa listahan ay isang numberikong variable ("time"bilang isang numerong pabagu - bago) . Subalit piliin ang mga variable na ito sa paraang angkop para sa dataset.
3.  ERDDAP™ang lokal na kopya ng impormasyon.
         
* BABALA: Ipinalalagay ng EDDTableCopy na ang halaga ng datos para sa bawat tipak ay hindi kailanman nagbabago. Kung/kapag ginawa nila ito, kailangan mong manu-manong i-display ang mga score files sa *Malaking Direktoryo* /copy/ *datasetID* / na nagbago at[bandila](/docs/server-admin/additional-information#flag)ang dataset na muling ikarga upang mapalitan ang inalis na mga tipak. Kung mayroon kang subscription ng email sa dataset, makakakuha ka ng dalawang email: isa kapag ang dataset ay unang nag - reload at sinimulang kopyahin ang impormasyon, at ang isa naman kapag ang dataset ay muling nagkakarga (kusa) at nakikita ang bagong lokal na data files.
     
* Palitan ang Metadata -- Kung kailangan mong magpalitaddAttributeso baguhin ang pagkakasunud-sunod ng mga variable na nauugnay sa source dataset:
    1. Palitan angaddAttributespara sa source datasetdatasets.xml, kung kinakailangan.
    2. Isalin ang isa sa mga kinopyang files.
    3. Magtakda ng[bandila](/docs/server-admin/additional-information#flag)upang muling maikarga kaagad ang dataset. Kung gagamitin mo ang isang bandila at mayroon kang isang email subscription sa dataset, kukuha ka ng dalawang email: isa kapag ang dataset ay unang nagkarga at sinimulang kopyahin ang impormasyon, at isa pa kapag ang dataset ay muling nakunan (kusa) at nakikita ang bagong lokal na data files.
    4. Ang tinanggal na talaksan ay muling pakikita ng bagong metadata. Kung ang source dataset ay hindi na makukuha, ang EDDTableCopy dataset ay makakakuha ng metadata mula sa retailed file, dahil ito ang pinakabatang file.
         
*   [EDDGridKopya](#eddgridcopy)ay katulad na katulad ng EDDTableCopy, ngunit gumagana sa pamamagitan ng mga grided datasets.
#### EDDTableCopy kalansay XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - -

## Mga Detalye{#details-1} 

Narito ang detalyadong paglalarawan ng karaniwang mga tag at mga katangian.

### &lt;Binibining Pag-ibig;{#angulardegreeunits} 
* [ ** &lt;Aguilar na mga Pag - aari&gt; ** ] (Mga #anguildegreeunit) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlna naglalaman ng isang comma-nahating listahan ng mga strando ng yunit naERDDAP™dapat ituring bilang mga yunit na pang-uri. Kung ang isang variable ay may isa sa mga yunit na ito,tabledap'orderByMeanSasalahin ang kahulugan sa isang natatanging paraan, pagkatapos ay iulat ang kahulugan bilang isang halaga mula -180 hanggang 180. TingnanERDDAP'Ang EDstatic.java source code file para sa kasalukuyang default list. Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
### &lt;Isang Tapat at Tapat na Unitso;{#angulardegreetrueunits} 
* [ ** &lt;pang-uri Itakwil ang Tunay na mga Pag - asa&gt; ** ] (#anguildegree greities) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlna naglalaman ng isang comma-nahating listahan ng mga strando ng yunit naERDDAP™Dapat ituring na pare - parehong antas ang tunay na mga yunit. Kung ang isang variable ay may isa sa mga yunit na ito,tabledap'orderByMeanSasalahin ang kahulugan sa isang pantanging paraan, pagkatapos ay iulat ang kahulugan bilang isang halaga mula 0 hanggang 360. TingnanERDDAP'Ang EDstatic.java source file para sa kasalukuyang default list. Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
     
### &lt;Karaniwang StandardNames gt;{#commonstandardnames} 
* [ ** &lt;Karaniwang StandardNames&gt; ** ] (#commonstandardnames) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang magtakda ng isang comma-breated na talaan ng mga karaniwan[Mga karaniwang pangalan ng CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). E.g.,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Ang talaang ito ay ginagamit sa Data ReviderForm3.html bilang isang kaginhawahan sa mga gumagamit.
Kung nais mong ibigay ang impormasyong itodatasets.xml, simulan sa pamamagitan ng pagkopya ng kasalukuyang default list sa&lt;DEFAULT\\_common StandardNames&gt; sa loobERDDAP'
\\[tomcat\\]/webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml file.
     
### &lt;cacheMinutes gt;{#cacheminutes} 
* [ ** &lt;Mga cacheMinute&gt; ** ] (Mga #cacheminute) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang magtakda ng edad (sa loob ng ilang minuto) Kung saan ang mga file sa cache ay dapat alisin (default=60) . E.g.,
```
    <cacheMinutes>60</cacheMinutes>  
```
Sa pangkalahatan, mga talaksan lamang ng larawan (sapagkat ang parehong mga imahen ay kadalasang paulit - ulit na hinihiling) at.ncmga talaksan (sapagkat ang mga ito ay kailangang ganap na likhain bago ipadala sa gumagamit) ay kinakalupkop. Bagaman parang iyon din ang dapat na maging tugon, hindi iyan totoo. Halimbawa, isangtabledaptanong na may kalakip na time&gt; *ilan Panahon* ay magbabago pagdating ng bagong datos para sa dataset. At ang kahilingang griddap na kasama rito\\[huli\\]para sa sukat ng oras ay magbabago kapag dumating ang bagong impormasyon para sa dataset. Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag). BagoERDDAP™v2.00, ito ay tinukoy sa setup.xml, na pinapayagan pa rin ngunit nasisiraan ng loob.
     
### &lt;Komberte ng InterpolateRequestCSVExamplegt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;Palitan ng InterpolateRequestCSVExample&gt; ** ] (#convertinterpolaterequestcsvexample) ay isang OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xml \\[pasimula saERDDAP™v2.10\\]na naglalaman ng halimbawa na ipakikita sa web page ng Interpolate converter. Ang halagang default ay: jplMURSST41/analyssed\\_sst/Bilipino/4 .
### &lt;Komberte ng InterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;Palitan ng InterpolateDatasetTIDVariableList&gt; ** ] (#convertinterpolatedatasetidvariablelist) ay isang OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xml \\[pasimula saERDDAP™v2.10\\]na naglalaman ng listahan ng CSVdatasetID/ Madaling makuha Sabihin ang mga halimbawa na gagamitin bilang mga mungkahi ng web page ng Interpolate converter. Ang halagang default ay: jplMURSST41/analyssed\\_sst.
### &lt;Makipagkumberte sa mga ManoverSourceUrl.{#converttopublicsourceurl} 
* [ ** &lt;kumbinasyon Upang IpublicSourceUrl&gt; ** ] (#convertto Publicsourceurl) ay isang OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlna naglalaman ng "mula" at isang "magsabi" kung paano kukumbertehin ang isang magkatambal na lokalsourceUrl  (karaniwang numero ng IP) sa publikosourceUrl  (pangalan ng sakop) . "mula sa" dapat may anyo "\\[isang bagay\\]//\\[isang bagay\\]/". Maaaring may 0 o higit pa ng mga tag na ito. Para sa higit pang impormasyon tingnan [&lt;sourceUrl&gt;] (#sourceurl) . Halimbawa,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
ay magpapangyari ng isang katugmang lokalsourceUrl  (gaya ng https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
sa publikosourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).

Subalit, sa mga kadahilanang panseguridad at mga kadahilanang nauugnay sa sistema ng suskripsiyon, **HUWAG MONG SAGUMPAYAN ITO&#33;**   
Sa halip, laging gamitin ang public domain na pangalan sa publiko&lt;sourceUrl&gt; tag at gamitin ang[/etc/hosts table](https://linux.die.net/man/5/hosts)sa inyong server upang ikumberte ang mga pangalan ng lokal na nasasakupan sa mga numero ng IP nang hindi gumagamit ng isang server ng DNS. Masusubok mo kung ang pangalan ng isang lugar ay wastong ginawang numero ng IP sa pamamagitan ng paggamit ng:
Ping *pangalan ng ilan.*   
     
### datos: Image/png;base64,{#dataimagepngbase64} 
* Kapag ang gumagamit ay humiling ng isang.htmlTabletugon mulaERDDAP™, kung ang datos sa isang selulang String ay naglalaman ng datos: region/png;base64, na sinusundan ng base64 na kodigo .png imahe,ERDDAP™magpapakita ng imahen (upang makita ng gumagamit ang larawan kung sila'y aali - aligid dito) at mga butones upang itago ang teksto o ang larawan sa clipboard. Idinagdag ang bahaging itoERDDAP™v2.19 ni Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)Sabihin ang default setting na kumokontrol sa oras at kung paano ito dapat idrowingERDDAP™ang isang mapa. Maaari itong tiyakin sa tatlong magkakaibang lugardatasets.xml  (nakatala mula sa pinakamababa hanggang sa pinakamataas na prayoridad) :
    
    1. KungdrawLandMaskay nakatakda sa loob&lt;" erddapDatasets&gt; " (walang kaugnayan sa anumang espisipikong dataset) , pagkatapos ay binabanggit nito ang halaga ng defaultdrawLandMaskpara sa lahat ng mga variable sa lahat ng datasets. Halimbawa,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAPbasahindatasets.xml.
Kung wala ang tag na ito, ang saligang default na halaga ay nasa ilalim.
         
    2. KungdrawLandMaskay tinitiyak bilang isang pangglobong katangian ng isang ibinigay na dataset, pagkatapos ay binabanggit nito ang default na halaga ngdrawLandMaskpara sa lahat ng pagkakaiba - iba sa dataset na iyon, na nangingibabaw sa anumang mas mababang prayoridad. Halimbawa,
    ```
        <att name="drawLandMask">under</att>  
    ```
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™Muling ikarga ang dataset.
         
    3. KungdrawLandMaskay nakatakda bilang isang variable's attribute sa isang ibinigay na dataset, pagkatapos ay binabanggit nito ang default na halaga ngdrawLandMaskpara sa pagbabagong iyan sa dataset, na nangingibabaw sa anumang mas mababang prayoridad. Halimbawa,
    ```
        <att name="drawLandMask">under</att>  
    ```
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™Muling ikarga ang dataset.
    
Maaaring daigin ng gumagamit ang default (Kung saan ito espesipikong) sa pamamagitan ng pagpili ng halaga para sa "Lil land mask" mula sa isang dropdown list sa dataset's Make A Graph web page, o sa pamamagitan ng paglalakip ng &.land= *halaga* sa URL na humihingi ng mapa mula saERDDAP.
    
Sa lahat ng kalagayan, may 4 na posibleng pamantayan para sa katangian:
    
    * "under" ang humihila sa landmask bago ito gumuhit ng datos sa mapa.
Para sa nakatiklop na mga dataset, ang lupa ay lumilitaw bilang isang laging mapusyaw na kulay abo.
Para sa tabular datasets, ang "under" ay nagpapakita ng topograpiyang datos sa ibabaw ng lupa at mga karagatan.
    * "over" -- Para sa mga nakatiklop na datasets, ang "over" ay kumukuha ng landmask pagkatapos nitong gumuhit ng datos sa mga mapa upang itago nito ang anumang datos sa ibabaw ng lupa. Para sa tabular datasets, ang "over" ay nagpapakita ng bathymetry ng karagatan at isang patuloy na liwanag gray kung saan may lupa, parehong iginuhit sa ilalim ng datos.
    * Ang "outline" ay kumukuha lamang ng balangkas ng landmask, mga hangganang pampolitika, mga lawa at ilog.
    * "off" ay walang naguguhit na anuman.
### &lt;Ang emailDiagnosticsTErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;" emailDiagnosticsTErdData&gt; " ** ] (#emaildiagnosticstoerddata) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xml. Maaaring totoo ang halaga ng tag (ang default) o kabulaanan. Kung totoo,ERDDAP™ang bakas ng salansan ni Chris. Juan sa noa. gov (angERDDAP™development team) . Ito'y dapat na ligtas at tiwasay yamang walang kompidensiyal na impormasyon (e.g., ang kahilingan) ay kasama sa email. Dapat na gawin nitong posible na mahuli ang anumang malabo, ganap na di - inaasahang mga insekto na hahantong sa NullPointerException. Kung hindi, nakikita ng gumagamit ang mga eksepsiyon, subalit nakikita naman ng gumagamit ang mga eksepsiyonERDDAP™Hindi ito ginagawa ng development team (kaya hindi namin alam na may problema na kailangang ayusin) .
     
### &lt;Larawan sa ibaba;{#graphbackgroundcolor} 
* [ ** &lt;Larawan ng grapBackgroundCor&gt; ** ] (#graphbackgroundcolor) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang magtakda ng default background color sa mga graph. Apektado nito ang halos lahat ng mga graph. May ilang kalagayan na hindi apektado. Itinakda ang kulay bilang isang 8 digit na hexadecimal na halaga sa anyong 0xAARRGGBB, kung saan ang AA, RR, GG, at BB ay ang opacity, pula, berde at asul na mga sangkap, ayon sa pagkakasunod. Ang "0x" ay kasong sensitibo, subalit ang mga hexadecimal digit ay hindi sensitibo sa kaso. Halimbawa, isang opaque (ff) Ang berdeng-blue na kulay na may pula=22, berde=88, asul na=ee ay 0xff2288e. Ang puting opaque ay 0xffff. Ang default ay opaque light blue (0xffaccoff) , na may bentaha na maging iba sa puti, na isang mahalagang kulay sa maraming paleta na ginagamit upang gumuhit ng datos. Halimbawa,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
### &lt;Ang EPAdddressMaxRequests&gt;{#ipaddressmaxrequests} 
* [ ** &lt;IPAAdddressMaxRequests&gt; ** ] (Mga #ipadddressmaxrequest) ay bihirang gamitin na tag na opsyonal (unang suportadoERDDAP™v2.12) sa loob&lt;" erddapDatasets&gt; " tag indatasets.xmlna bahagi ng isang sistema upang takdaan ang kakayahan ng labis na agresibong lehitimong mga gumagamit at may masamang hangaring mga gumagamit upang gumawa ng maraming sabay - sabay na mga kahilingan na magpapahina sa paggawa ng sistema para sa ibang gumagamit. UPAdress MaxRequests ang pinakamaraming sabay - sabay na mga kahilingan na tatanggapin mula sa anumang espesipikong direksiyon ng IP. Ang karagdagang mga kahilingan ay tatanggap ng HTTP 429 na pagkakamali: Napakaraming Kahilingan. Ang maliliit, static files sa erddap/download/ at erddap/images/ ay HINDI libre mula sa bilang na ito. Ang default ay 15. Ang pinakamatagal na ipinahihintulot ay 1000, na hibang na mataas -- huwag gawin ito&#33;ERDDAP™ay hindi tatanggap ng numerong wala pang 6 dahil sa maraming lehitimong tagagamit (Mga web browser at mga web browserWMSMga kliyente) hanggang 6 na kahilingan sa isang panahon. AngERDDAP™Ang Daily Report at ang katulad na impormasyon na nakasulat sa log.txt file na may bawat Major Dataset Reload, ay magkasali ngayon ng isang talaan ng mga kahilingan ng IP adress na ito sa ilalim ng pamagat na "Requester's IP Address" (Napakaraming Kahilingan) ".
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
    
Ang "Major LedDatasets Time Series" segment ng status.html ay kinabibilangan ng isang "too maraming" kolum na nagtatala ng bilang ng mga kahilingan na lumampas sa iPAdddressMaxRequests setting ng isang user at sa gayon ay nakakita ng isang "Too maraming requests" error. Ito'y nagpapangyari sa iyo na madaling makita kung may mga taong labis na agresibo at may masamang hangarin na gumamit nito upang makakita ka (Hindi sapilitan) Tingnan ang log.txt file at magpasiya kung gusto mong i - blacklist ang mga gumagamit na iyon.
    
Wala namang masama sa paglalagay nito sa mas mataas na bilang. Nasa iyo na ito. Ngunit ang paggawa ng gayon ay nagpapahintulot/nagpapasigla sa mga tao na bumuo ng mga sistema na gumagamit ng isang malaking bilang ng mga sinulid upang gumana sa mga proyekto at pagkatapos ay hindi nagbibigay sa kanila ng impormasyon na ang kanilang ginagawa ay hindi nakakakuha sa kanila ng anumang pakinabang.
### &lt;EPAdddressMaxRequestsActivegt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;EPAAdddressMaxRequestsActive&gt; ** ] (Ang #ipadddressmaxrequestsactive) ay bihirang gamitin na tag na opsyonal (unang suportadoERDDAP™v2.12) sa loob&lt;" erddapDatasets&gt; " tag indatasets.xmlna bahagi ng isang sistema upang takdaan ang kakayahan ng labis na agresibong lehitimong mga gumagamit at may masamang hangaring mga gumagamit upang gumawa ng maraming sabay - sabay na mga kahilingan na magpapahina sa paggawa ng sistema para sa ibang gumagamit. Ang iPAAdddressMaxRequestsActive ay nagsasaad ng pinakamaraming sabay - sabay na mga kahilingan na aktibong gagawin mula sa anumang espesipikong direksiyon ng IP. Ang karagdagang mga kahilingan ay uupo sa isang queue hanggang ang mga dating kahilingan ay naproseso. Ang maliit, static files sa erddap/download/ at erddap/images/LE immune mula sa bilang na ito at ang kaugnay na throtling. Ang default ay 2. Ang pinakamatagal na ipinahihintulot ay 100, na hibang -- huwag mong gawin&#33; Maitatakda mo ito sa 1 na maging mahigpit, lalo na kung may mga problema ka sa mga masyadong agresibo o mapaminsalang gumagamit nito. Agad pa ring makukuha ng mga gumagamit ang lahat ng impormasyon na hinihiling nila (hanggang sa mga repaddressMaxRequest) , ngunit hindi nila kaya ang mga mapagkukunan ng sistema ng baboy. Hindi namin inirerekomenda na ilagay ito sa mas malaking bilang sapagkat hinahayaan nitong mangibabaw ang labis na agresibong mga gumagamit ng lehitimong mga bagay at may masamang hangaring mga gumagamit nitoERDDAP'kayang magproseso.
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
     
### &lt;EPAdddress Unlimited gt;{#ipaddressunlimited} 
* [ ** &lt;IPAAddress Unlimited&gt; ** ] (#ipadddressunlimited) ay bihirang gamitin na tag na opsyonal (unang suportadoERDDAP™v2.12) sa loob&lt;" erddapDatasets&gt; " tag indatasets.xmlna bahagi ng isang sistema upang takdaan ang kakayahan ng labis na agresibong lehitimong mga gumagamit at may masamang hangaring mga gumagamit upang gumawa ng maraming sabay - sabay na mga kahilingan na magpapahina sa paggawa ng sistema para sa ibang gumagamit. Ang iPAdddress Unlimited ay isang comma-weadd list ng IP addresss na nais mong payagang makapasok nang walang limitasyon sa iyongERDDAP. Tingnan sa iyong log. Txt file upang makita kung aling format ng server mo ang ginagamit para sa IP addresss. Sa ilang server, ang IP addresss ay nasa format #.#.#.#.# (kung saan si # ay isang integer mula 0 hanggang 255) ; samantalang sa iba ito ay nasa format #:#:#:#:#:#:#:#:#:#:# . Ang mga humihiling sa talaang ito ay hindi sakop ng alinman sa mga iPAdddressMaxRequest o ng mga iPAdddressMaxRequestsActive setting. Maaaring ito ay pangalawa lamangERDDAP™o para sa ilang gumagamit o server sa inyong sistema.ERDDAP™laging idagdag " (di - kilalang IPAdress) ", na...ERDDAP™ay ginagamit kapag ang IP address ng request ay hindi matiyak, e.g., para sa ibang proseso na tumatakbo sa parehong server.
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
    
Kung sa ilang kadahilanan ang lahat ng mga kahilingan ng tagagamit ay nakakuha ng maling mensahe na "Timeout na naghihintay sa iyong iba pang mga kahilingan na magproseso.", kung gayon ay malulutas mo ang problema sa pamamagitan ng pagdaragdag ng IP address ng tagagamit sa listahan ng iPAdddressUnlimited, na ikinakapit ang pagbabagong iyon, pagkatapos ay inaalis ito sa listahang iyon.
    
### &lt;loadDatasetsMinMinutes&gt;{#loaddatasetsminminutes} 
* [ ** &lt;"loadDatasetsMinMinutes&gt; " ** ] (Mga #basedatasetsminute) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang magtakda ng pinakakaunting panahon (sa loob ng ilang minuto) sa pagitan ng malaking kargada Mga Data (kapagERDDAP™Mga reprocessdatasets.xml, kasama na ang pagsusuri sa bawat dataset upang malaman kung kailangan itong muling ikarga ayon sa reload nito Ang mga setting ng EveryNMinutes, default=15) . E.g.,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Kung ang isang ibinigay na run ng mga loadDataset ay mas mababa sa panahong ito, ang loader ay paulit-ulit na tumitingin lamang sa flag directory at/o mga tulog hanggang sa lumipas ang natitirang panahon. Ang default ay 15 minuto, na dapat ay mabuti para sa halos lahat. Ang tanging disbentaha sa pagtatakda nito sa isang mas maliit na bilang ay na madaragdagan nito ang dalas na magagawa nitoERDDAP™Mga dataset na may mga pagkakamali na humahadlang sa mga ito na mailulan (e.g., isang malayong server ang bumagsak) . Kung maraming gayong datasets at ang mga ito ay madalas na muling sinusubok, maaaring isaalang - alang ng pinagkunan ng impormasyon na ito'y nagdudulot ng peste/mapusok na paggawi. Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag). BagoERDDAP™v2.00, ito ay tinukoy sa setup.xml, na pinapayagan pa rin ngunit nasisiraan ng loob.
     
### &lt;loadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;loadDatasetsMaxMinutes&gt; ** ] (#Dloaddatasetsmaxminutes) ay isang OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang matiyak ang sukdulang panahon (sa loob ng ilang minuto) isang malaking pasan Ang pagsisikap ng mga datos ay pinahihintulutang gawin (bago ang pasan Ang sinulid ng mga Datesets na itinuturing na "staled" at ito ay itinigil)   (default=60) . E.g.,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Sa pangkalahatan, ito'y dapat na itakda nang di - kukulangin sa dalawang beses hangga't makatuwirang inaakala mo na muling nag - aalis ng lahat ng datasets (Sa kabuuan) dapat kunin (yamang ang mga computer at mga network kung minsan ay mas mabagal kaysa inaasahan) Ito ay dapat na palaging mas mahaba sa mga loadDatasetsMinMinute. Ang default ay 60 minuto. Itatakda ito ng ilang tao sa mas mahabang panahon. Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag). BagoERDDAP™v2.00, ito ay tinukoy sa setup.xml, na pinapayagan pa rin ngunit nasisiraan ng loob.
     
### &lt;logLevelgt;{#loglevel} 
* [ ** &lt;logLevel&gt; ** ] (#loglevel) ay isang OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang tiyakin kung ilang mga mensahe sa pagsusuri ang ipinadadala sa log.txt file. Maaari itong itakda sa "pag-iinit". (pinakakaunting mensahe) , "info" (ang default) , o "lahat" (ang karamihan sa mga mensahe) . E.g.,
```
    <logLevel>info</logLevel>  
```
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag). BagoERDDAP™v2.00, ito ay tinukoy sa setup.xml, na pinapayagan pa rin ngunit nasisiraan ng loob.
     
### &lt;Bahagi ng RequestMax Bytes&gt; at&lt;bahagi RequestMaxCells gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;bahaging RequestMax Bytes&gt; **] (#partialrequestmaxbytes-and-partialrequestmaxcells) at [** &lt;bahaging RequestMaxCells&gt; ** ] (#partialrequestmaxbytes-and-partialrequestmaxcells) ay bihirang gamiting OPSYONAL na mga tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xml. Kung maaari (at hindi ito laging posible) ,ERDDAP™ay sumisira sa malalaking kahilingan ng data sa mga tipak upang maingatan ang memorya.
    
May 32 bitJava, sa simpleng diwa, ang pinakamataas na bilang ng sabay - sabay *malaking* mga 3/4 ng memoryang makukuha (Ang halagang -Xmx ay ipinasa kay Tomcat) Nahahati ayon sa laki (e.g., 1200 MB / 100 MB =&gt; 12 kahilingan) . Ang iba pang mga bagay ay nangangailangan ng memorya, kaya ang aktuwal na bilang ng mga kahilingan ay magiging kaunti. Sa aktuwal, ang pagtabas ay hindi laging posible. Kaya ang isang napakalaki o ilang napakalaking sabay - sabay na mga kahilingan na hindi puwede ay maaaring magdulot ng problema sa 32 bitJava.

May 64 bitJava, ang halaga ng -Xmx ay maaaring mas malaki. Kaya ang memorya ay malamang na hindi isang hadlang.

Mapawawalang - saysay mo ang default stage sa pamamagitan ng pagbibigay - kahulugan sa mga tag na itodatasets.xml  (na may iba't ibang pamantayan kaysa ipinakikita rito) :
Para sa mga grid:&lt;bahaging RequestMax Bytes&gt;10000000000000000000000&lt;/partialRequestMax Bytes&gt;
Para sa mga tala:&lt;bahaging RequestMaxCells&gt;10000000000000000&lt;/partialRequestMaxCells&gt;

Ang partialRequestMax Bytes ang pinipiling pinakamaraming byte para sa isang partial grid data request (ang kabuuang kahilingan) . default=100000000000000000000 (10^8) . Ang mas malalaking sukat ay hindi laging mas mabuti (at huwag pumunta sa mahigit 500 MB dahil iyan ang default limit ng THREDSDAPtugon) . Subalit ang mas malalaking sukat ay maaaring mangailangan ng mas kaunting pagkuha ng tone - toneladang mga file (isipin ang tungkol saERD'Ang satellite data na may bawat punto ng oras sa isang hiwalay na file - mas mabuting kumuha ng higit na datos mula sa bawat file sa bawat partial request) .

Ang partialRequestMaxCells ang pinipiling pinakamaraming selula (Mgaow \\* Mga numero sa talaan ng datos) para sa partial data request (ang kabuuang kahilingan) . Default = 100000. Ang mas malalaking sukat ay hindi laging mas mabuti. Ang mga ito'y nagbubunga ng mas mahabang paghihintay sa unang talaksan ng impormasyon mula sa pinagmumulan.

Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag). BagoERDDAP™v2.00, ang mga ito ay tinukoy sa setup.xml, na pinapayagan pa rin ngunit nasisiraan ng loob.
     
### &lt;hiling ngBlacklistgt;{#requestblacklist} 
* [ ** &lt;requestBlacklist&gt; ** ] (#requestblacklist)  [ay isang OPSYONAL na tag](/docs/server-admin/additional-information#frequent-crashes-or-freezes)sa loob&lt;" erddapDatasets&gt; " tag indatasets.xmlna naglalaman ng isang comma-based na listahan ng mga numerong numerikong IP address na ialist. Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
    * Maaari itong gamitin upang itaboy ang isang tao[Pagtanggi sa Pag - atake sa Paglilingkod](https://en.wikipedia.org/wiki/Denial_of_service), labis na masigasig[web robot](https://en.wikipedia.org/wiki/Internet_bot), o iba pang uri ng maligalig na gumagamit.
    * Magulong User -- KungERDDAP™Mabagal sa isang gumagapang o nagyeyelo/stops, ang sanhi ay kadalasang isang maligalig na tagagamit na tumatakbo ng higit sa isang script nang minsanan at/o gumagawa ng isang malaking bilang ng napakalaki, labis na walang kakayahan, o walang bisang mga kahilingan, o sabay-sabay na mga kahilingan. Tingnan[log.txt](/docs/server-admin/additional-information#log)upang makita kung gayon nga at upang masumpungan ang numeromerikong direksiyon ng nakayayamot na gumagamit ng IP. Kung ito ang problema, malamang na i - blacklist mo ang gumagamit nito.
        
KailanERDDAP™ay humihiling mula sa isang blacklisted IP address, ito ay magbabalik ng HTTP Error 403: Bawal. Ang kalakip na maling mensahe ng teksto ay humihimok sa gumagamit na mag - email sa iyo, ang gumagamit nitoERDDAPadministrador, upang lutasin ang mga problema. Kung maglalaan sila ng panahon upang basahin ang maling mensahe (lumilitaw na hindi ito ginagawa ng marami) at makipag - ugnayan sa iyo, pagkatapos ay maaari kang gumawang kasama nila upang maitakbo nila ang isang iskrip lamang sa isang panahon, gumawa ng mas mahusay na mga kahilingan, ayusin ang mga problema sa kanilang iskrip (Halimbawa, humiling ng impormasyon mula sa remote dataset na hindi maaaring tumugon bago dumating sa tamang panahon) , o ano pa man ang pinagmumulan ng problema.
        
Kadalasan nang hindi nalalaman ng mga gumagamit nito na ang kanilang mga kahilingan ay nakayayamot. Kadalasan nang hindi nila alam ang tungkol sa mga insekto, malulubhang kawalang - kakayahan, o iba pang problema sa kanilang mga iskrip. Madalas nilang isipin iyan dahil sa iyoERDDAP™ay nag - aalok ng impormasyon na libre, na maaari nilang hingin ang kasindami ng impormasyon na nais nila, e.g., sa pamamagitan ng pagpapatakbo ng maraming iskrip o sa pamamagitan ng sabay - sabay na paggamit ng maraming sinulid.
        
        * Maipaliliwanag mo sa kanila na ang bawat isaERDDAP™, kung gaano kalaki at kalakas, ay may limitadong kakayahan (CPU oras, hard drive I/O, network bandwidth, atbp.) at hindi makatarungan kung ang isang gumagamit ay humiling ng impormasyon sa paraang hindi na kailangan ng ibang gumagamit o ng mga pabigatERDDAP.
        * Minsang malaman ng gumagamit kung paano gagawa ng 2 sabay - sabay na mga kahilingan, kadalasang wala silang nakikitang dahilan upang huwag gumawa ng 5, 10 o 20 sabay - sabay na mga kahilingan, yamang ang karagdagang mga kahilingan ay walang kapalit. Tulad ito ng digmaang asymmetric: dito, napakalaki ng bentaha ng mga sandatang nakakasagabal (Halaga ng sero) ang mga sandatang pandepensa (isang limitadong instalasyon na may tunay na halaga) .
        * Ituro sa kanila na may umuunting pakinabang sa paggawa ng higit at higit na sabay - sabay na mga kahilingan; ang karagdagang mga kahilingan ay lalo lamang humahadlang sa mga kahilingan ng ibang gumagamit; hindi sila nagbubunga ng malaking pagsulong para sa kanila.
        * Ipaalaala sa kanila na may iba pang gumagamit (kapuwa ang mga di - sinasadyang gumagamit ng iskrip at ang iba pang gumagamit nito) , kaya hindi makatuwiran na sila'y hog lahatERDDAP' Mga yaman.
        * Sabihin sa kanila na ang mga higante sa teknolohiya ang nag - udyok sa mga gumagamit nito na umasa ng walang - katapusang yaman mula sa mga serbisyo sa web. Bagaman may mga paraan upang maitatag[Mga grid/clusters/federation ngERDDAPs](/docs/server-admin/scaling)upang makagawa ng isangERDDAP™sistema na may higit pang yaman, ang karamihan ayERDDAP™Ang mga administrador ay walang salapi o lakas ng tao upang magtatag ng gayong mga sistema, at ang gayong sistema ay may hangganan pa rin. NasaERDHalimbawa, may isang tao (ako) sumusulatERDDAP™, pagbibigay ng dalawaERDDAPs (sa tulong ng aking amo) , at namamahala sa ilang mapagkukunan ng impormasyon, na pawang may taunang badyet ng hardware na $0 (Umaasa tayo sa paminsan - minsang mga kaloob upang ibayad sa mga kagamitan) . Ito ay hindi Google, Facebook, Amazon, atbp na may 100's ng mga inhinyero, at milyun-milyong dolyar ng kita upang iresiklo sa mas malaking sistema. At hindi natin maaaring basta ilipat ang ating sariliERDDAP™Halimbawa, ang Amazon AWS, dahil ang halaga ng data storage ay malaki at ang data egress singil ay malaki at iba-iba, habang ang ating badyet para sa panlabas na serbisyo ay isang nakapirmeng $0.
        * Ang kahilingan ko sa mga gumagamit ay: para sa non-time-sensitive na mga kahilingan (na siyang pinakakaraniwang kaso) , ang kanilang sistema ay dapat na isa - isang humiling. Kung ang mga kahilingan ay panahon na sensitibo (e.g., multiple .pngs sa isang web page, multiple tiles para sa isangWMSkliyente, atbp.) , kung gayon marahil 4, sabay - sabay na mga kahilingan ay dapat na ang max (at sandali lamang) .
        * Kung ipaliliwanag mo ang kalagayan sa gumagamit, mauunawaan at handa ang karamihan sa mga gumagamit na gumawa ng kinakailangang mga pagbabago upang matanggal mo ang kanilang IP address sa blacklist.
             
    * Sa blacklist isang gumagamit, idagdag ang kanilang numeromeric IP address sa comma-weadd list ng IP addresss sa&lt;kahilingan ng blacklist&gt; sa inyongdatasets.xmltalaksan. Upang masumpungan ang IP address ng gumagamit ng nakayayamot na gamit, tingnan ang IP addressERDDAP™  *Malaking Direktoryo* /log/log.txt file ( *Malaking Direktoryo* ay nakatakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) upang makita kung ito nga ang kalagayan at upang masumpungan ang direksiyon ng gumagamit na iyon ng IP. Ang direksiyon ng IP para sa bawat kahilingan ay nakatala sa mga linya na nagsisimula sa "&#123;&#123;&&#123;&&#123;#" at ay 4 na bilang na pinaghiwalay ng mga panahon, halimbawa, 123.45.67 . Ang paghahanap ng "EROR" ay tutulong sa iyo na makahanap ng mga problema tulad ng mga hindi epektibong kahilingan.
    * Maaari mo ring palitan ang huling numero sa isang direksiyon ng IP\\*(halimbawa, 202.109.200.\\*) upang harangan ang sakop ng IP adress, 0-255.
    * Maaari mo ring palitan ang huling 2 numero sa isang direksiyon ng IP\\*.\\*  (Halimbawa, 121.204.\\*.\\*) upang harangin ang mas malawak na saklaw ng IP adress, 0-255.0-255.
    * Halimbawa,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Hindi mo kailangang mag - restartERDDAP™ng mga pagbabago&lt;hilingin ng blacklist&gt; na ipatupad. Ang mga pagbabago ay mapapansin sa susunod na pagkakataonERDDAP™kung may anumang dataset na kailangang ikargang muli. O, maaari mong pabilisin ang proseso sa pamamagitan ng pagdalaw sa isang bisita[set URL ng Bandila](/docs/server-admin/additional-information#set-dataset-flag)para sa anumang dataset.
    * Ang iyong sariliERDDAP™Ang pang-araw-araw na ulat ay kinabibilangan ng isang talaan/sa kabuuan ng pinaka-aktibong pinapayagan at hinarangang mga request.
    * Kung nais mong malaman kung anong domain/institution ay nauugnay sa isang numerong IP address, maaari kang gumamit ng isang libre, baligtad na serbisyo sa web ng DNS tulad ng[ https://network-tools.com/ ](https://network-tools.com/).
    * Maaaring may mga panahon na makatuwirang hadlangan ang ilang gumagamit sa mas mataas na antas, halimbawa, ang may masamang hangaring mga gumagamit nito. Halimbawa, maaari mong hadlangan ang kanilang paglapit sa lahat ng bagay sa iyong server, hindi lamang bastaERDDAP. Sa Linux, ang isa sa gayong paraan ay ang gamitin ang[Mga gamit](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Halimbawa, maaari kang magdagdag ng tuntunin na hahadlang sa lahat ng bagay na darating mula 198.51.100.0 na may utos
Iptables -I INPUT -s 198.51.100.000. -j DROP
       
### &lt;Mabagal na DownTrobleMillisgt;{#slowdowntroublemillis} 
* [ ** &lt;Mabagal na DownTrobleMillis&gt; ** ] (#Slowdown Billis) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlna naglalaman ng isang integer na nagtatakda sa bilang ng mga millisecond (default=1000) upang huminto kapag tumutugon sa lahat ng bigong mga kahilingan, e.g., hindi alam na dataset, humiling ng napakalaki, gumagamit ng blacklist. E.g.,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Kung ang isang iskrip ay gumagawa ng sunud - sunod na kahilingan, kung gayon ay maaaring mabilis na gumawa ito ng sunud - sunod na di - kanais - nais na kahilingan. Sa ganitong tagpo, maaari mong pabagalin ang isang bigong iskrip nang gayonERDDAP™ay hindi punô ng masasamang kahilingan. Kung ang isang tao ay gumawa ng isang masamang kahilingan, hindi man lamang nila mapapansin ang pagkaantalang ito. Mungkahi:
    
    * Kung ang problema ay ang Pamamahaging Pagtanggi sa Paglilingkod (MGA DDO) pag - atake mula sa 100+ na sumalakay, ay nagtakda nito sa mas maliit na bilang (100?) . Ang matagal na pagpapabagal sa mga ito ay umaakay sa napakaraming aktibong sinulid.
    * Kung ang gulo ay mula sa 1-10 sources, i-set ito sa 1000 ms (ang default) , ngunit mas malaking bilang (tulad ng 10000) ay makatuwiran din. Pinababagal nito ang mga ito upang maaksaya nila ang kaunting yaman ng network. Gayundin, 1000 m o higit pa ang hindi makaiinis sa mga taong gumagamit nito na gumagawa ng masamang kahilingan.
    
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
     
### &lt;₱28.00.{#subscriptionemailblacklist} 
* [ ** &lt;ng suskripsiyon EmailBlacklist&gt; ** ] (#subscriptionemailblacklist) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlna naglalaman ng isang comma-hiwalay na listahan ng mga direksiyon ng email na agad na inalis sa talaan[sistema ng suskripsiyon](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions), halimbawa
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Ito ay isang case-insensitive system. Kung ang adres ng email ay idaragdag sa listahang ito, kung ang adres na iyon ng email ay may mga suskripsiyon, ipakansela ang mga suskripsiyon. Kung ang adres ng email na nasa listahan ay magsisikap na magskribe, tatanggihan ang kahilingan. Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
     
### Pamantayang Teksto{#standard-text} 
*   [ **Pamantayang Teksto** ](#standard-text)-- May ilang OPSYONAL na mga tag (Karamihan ay bihirang gamitin) sa loob&lt;" erddapDatasets&gt; " tag indatasets.xmlpara magtakda ng espesipikong teksto na makikita sa iba't ibang lugarERDDAP. Kung nais mong baguhin ang tekstong default, kopyahin ang umiiral na halaga mula sa tag ng kaparehong pangalan
     *tomcat* /webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util.mesages.xml sa loobdatasets.xml, pagkatapos ay baguhin ang nilalaman. Ang bentaha ng pagkakaroon ng mga itodatasets.xmlay na maaari mong tiyakin ang bagong mga pamantayan sa anumang panahon, kahit na kung kailanERDDAP™ay tumatakbo. Anumang pagbabago sa mga halaga ng tag na ito ay makaaapekto sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag). Inilalarawan ng mga pangalan ng tag ang kanilang layunin, ngunit tingnan ang default nilalaman sa mga mensahe.xml para sa mas malalim na pagkaunawa.
    
    *   &lt;Pamantayang&gt;
    *   &lt;Pamantayang Contact&gt;
    *   &lt;standardDataLicense&gt;
    *   &lt;Pamantayang DisclaimerOfensorsment&gt;
    *   &lt;Pamantayang DisclapperOFExternalLinks&gt;
    *   &lt;PamantayangGGeneral Disclailer&gt;
    *   &lt;Pamantayan Privacy&gt;
    *   &lt;Magsimulang HHtml5&gt;
    *   &lt;Ang startBodyHtml5&gt; ay isang mabuting tag upang baguhin ang anyo ng bawat web page sa iyong katawanERDDAP. Kapansin - pansin, magagamit mo ito upang madaling magdagdag ng isang pansamantalang mensahe saERDDAP™pantahanang pahina (e.g., "Ilabas ang bagong JPL MUR SST v4.1 dataset ..." o "Ito ay"ERDDAP™ay magiging offline para sa pagpapanatili 2019-05-08T17:00:00 PDT hanggang 2019-05-08T20:00:00 PDT.") . Isang taktika ng paglalagay ng tag na itodatasets.xmlay: kapag ikaw ay nagre - restartERDDAP, ang unang kahilinganERDDAP™ibabalik ang default start BodyHtml5 HTML, ngunit ang bawat kasunod na kahilingan ay gagamit ng simulaBodyHtml5 HTML na itinakda sadatasets.xml.
    *   &lt;Ang IShort Description Ang Html&gt; ay isang mabuting tag upang baguhin ang paglalarawan sa iyoERDDAP. Pansinin na madali mo itong mababago upang magdagdag ng isang pansamantalang mensahe sa home page (e.g., "Ito ayERDDAP™ay magiging offline para sa pagpapanatili 2019-05-08T17:00:00 PDT hanggang 2019-05-08T20:00:00 PDT.") .
    *   &lt;duloBodyHtml5&gt;
    
      
BagoERDDAP™v2.00, ang mga ito ay tinukoy sa setup.xml, na pinapayagan pa rin ngunit nasisiraan ng loob.
     
### &lt;Pambihira Gawain;{#unusualactivity} 
* [ ** &lt;Di - pangkaraniwang&gt; ** ] (Pag - uusap - usap) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang tiyakin ang pinakamaraming kahilingan sa pagitan ng dalawang run ng mga pandDataset na itinuturing na normal (default=10000000000) . Kung ang bilang na iyan ay mahigitan, ang isang email ay ipinadadala sa email ally to (gaya ng itinakda sa setup.xml) . E.g.,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag). BagoERDDAP™v2.00, ito ay tinukoy sa setup.xml, na pinapayagan pa rin ngunit nasisiraan ng loob.
     
### &lt;updateMax vents gt;{#updatemaxevents} 
* [ ** &lt;updateMax Advents&gt; ** ] (Mga #updatemaxevent) ay bihirang gamiting OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlupang tiyakin ang pinakamaraming bilang ng pagbabago sa talaksan (default=10) na pangangasiwaan ng [&lt;update EveryNMillis&gt;] (Mga #update offenmilli) sistema bago ilipat ang pagkarga muli ng dataset sa halip. Halimbawa,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Ang sistemang update EveryNMillis ay nilalayong tumakbo ng napakabilis bago iproseso ang kahilingan ng gumagamit. Kung maraming mga pangyayaring pagbabago sa talaksan, kung gayon malamang na hindi ito maaaring tumakbo kaagad, kaya sa halip ay tumatawag ito na muling ikarga ang dataset. Kung ikaw ayERDDAP™ay may mga dataset na dapat panatilihing up-to-date kahit na may mga pagbabago sa isang malaking bilang ng data files, maitatakda mo ito sa isang mas malaking numero (100?) .

### &lt;tagagamit{#user} 
* [ ** &lt;gumagamit&gt; ** ] (#user) ay isang OPSYONAL na tag sa loob ng isang&lt;" erddapDatasets&gt; " tag indatasets.xmlna nagpapakilala sa username, password (kung totoo ang= customer) , at mga papel (isang comma-hiwalay na talaan) . Ang paggamit ng username at password ay bahagyang nagkakaiba batay sa halaga ng [&lt;Tunay na&gt;] (/docs/server-admin/additional-impormasyon#authentication) sa iyongERDDAP''s setup.xml file.
    * Bahagi ito ngERDDAP'[sistemang panseguridad](/docs/server-admin/additional-information#security)dahil sa paghihigpit sa ilang datasets sa ilang gumagamit nito.
    * Gumawa ng paghihiwalay&lt;user&gt; tag sa bawat user. Optionly, kung ang awtipikasyong=oauth2, maaari kang magtatag ng dalawa&lt;gumagamit&gt; Mga tag para sa bawat gumagamit: isa para sa kung kailan ang gumagamit ay gumagamit ng troso sa pamamagitan ng Google, isa para sa kung kailan ang gumagamit ay gumagamit ng mga troso sa pamamagitan ng Orcid, marahil ay may gayunding papel.
    * Kung walang&lt;user&gt; tag para sa isang kliyente, s/siya lamang maka-access sa mga public datasets, i.e., datassets na walang [&lt;Makarating sa&gt;] (Ang #accessible) tag.
    * Pangalan ng gumagamit
Para sa istrukturang= customer, ang username ay karaniwang kombinasyon ng mga titik, digit, diin, at mga yugto.
Para sa realation=email, ang username ay ang adres ng email ng gumagamit. Maaaring ito ang anumang adres ng email.
Para sa realation=google, ang username ay ang full Google email address ng gumagamit. Ito ay kinabibilangan ng mga account na Google-mandailed tulad ng@noaa.govang ulat.
Para sa awdisyong=orcid, ang username ay ang numero ng account na Orcid ng gumagamit (na may mga gatlang) .
Para sa realation=oauth2, ang username ay ang full Google email address ng tagagamit o ang numero ng user na Orcid account (na may mga gatlang) .
    * password
Para sa realation=email, google, ocid, o oauth2, huwag magtakda ng password attribute.
Para sa istrukturang= customer, kailangan niyong magtakda ng password attribute para sa bawat user.
        * Ang mga password na ipinapasok ng mga gumagamit nito ay sensitibo sa kaso at dapat na may 8 o higit pang mga karakter kaya mas mahirap itong i-tak. Ngayon, kahit na ang 8 karakter ay maaaring mabasag nang mabilis at hindi magastos sa pamamagitan ng malupit na puwersa na ginagamit ang isang kumpol ng mga computer sa AWS.ERDDAP™ay nagpapatupad lamang ng 8-character minimum kapag ang gumagamit ay sumusubok na mag- log in (hindi kapag ang&lt;Inaproseso ang user&gt; tag, sapagkat nakikita lamang ng kodigong iyon ang hashed ng password, hindi ang cleantext password).
        * setup.xml's&lt;passwordEncoding&gt; Alamin kung paano iniimbak ang mga password&lt;gumagamit&gt; Mga tag sa loob ngdatasets.xml. Dahil sa lumalaking seguridad, ang mapagpipilian ay:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Huwag mong gamitin ito&#33;) - para sa password attribute, magtakda ng MD5 hashished ng user's password.
            * UEPMD5 (Huwag mong gamitin ito&#33;) - para sa password attribute, magtakda ng MD5 hashish of *Pangalan ng gumagamit* :ERDDAP: *password* . Ang Pangalan ng gumagamit at "ERDDAP" ay ginagamit na sa[asin](https://en.wikipedia.org/wiki/Salt_(cryptography)) ang halaga ng hash, ginagawang mas mahirap ang decode.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (hindi inirerekomenda) - para sa password attribute, magtakda ng SHA-256 hash pagtunaw ng password ng gumagamit.
            * UEPHA256 (default, mungkahi ng passwordEncoding. Subalit mas mabuti: gamitin ang google, orkidya, o oauth2 na mapagpipiliang pag - iral.) - para sa password attribute, magtakda ng SHA-256 hashish of *Pangalan ng gumagamit* :ERDDAP: *password* . Ang Pangalan ng gumagamit at "ERDDAP" ay ginagamit upang asinin ang halaga ng hash, ginagawang mas mahirap na i - decode.
        * Sa Windows, maaari kang lumikha ng MD5 password na tumutunaw ng mga halaga sa pamamagitan ng pag - download ng isang programang MD5 (gaya ng[MD5](https://www.fourmilab.ch/md5/)) at paggamit (halimbawa) :
Md5 -djsmith:ERDDAP: *Aktuwal na Pasawi* 
        * Sa Linux/Unix, maaari kang lumikha ng mga halagang MD5 pagtunaw sa pamamagitan ng paggamit ng itinayong-in md5sum program (halimbawa) :
-n "smith:ERDDAP: *Aktuwal na Pasawi* "|md5sum
        * Ang nakaimbak na mga password na simpletext ay sensitibo sa kaso. Ang mga nakaimbak na anyo ng mga password na MD5 at UEPMD5 ay hindi sensitibo sa kaso.
        * Halimbawa (paggamit ng UEPMD5) , kung username="jsmith" at password="my Pasword", ang&lt;Ang user&gt; tag ay:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
kung saan ginagawa ang nakaimbak na password
Md5 -djsmith:ERDDAP: Password ko
        * Ang mga papel ay isang comma-extended na talaan ng mga papel kung saan ang gumagamit ay awtorisado. Sinuman&lt;Maaaring magkaroon ng isang [&lt;Makarating sa&gt;] (Ang #accessible) taguri na nagtatala ng mga papel na pinapayagang ma-akses sa dataset na iyon. Para sa isang ibinigay na user at isang ibinigay na dataset, kung ang isa sa mga papel sa listahan ng mga papel ng gumagamit ay tumutugma sa isa sa mga papel sa listahan ng dataset&lt;Ang magagamit na mga papel sa&gt;, pagkatapos ang gumagamit ay awtorisadong gamitin ang dataset na iyon.
            
Bawat gumagamit na pumapasok ay awtomatikong binibigyan ng papel\\[SINISIRA Sa loob\\], kung meron&lt;user&gt; tag para sa kaniladatasets.xmlo hindi. Kaya kung may ibinigay na dataset
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
kung gayon ang sinumang gumagamit na nakatala ay bibigyan ng pahintulot na gamitin ang dataset na iyon, kahit na kung walang talaan&lt;user&gt; tag para sa kaniladatasets.xml.
            
    * Anumang pagbabago sa halaga ng tag na ito ay matutupad sa susunod na pagkakataonERDDAP™basahindatasets.xml, kasama bilang tugon sa isang dataset[bandila](/docs/server-admin/additional-information#flag).
         
### &lt;pathRegexgt;{#pathregex} 
* [ ** &lt;PathRegex&gt; ** ] (#pathregex) Hayaan mong banggitin mo ang isang regular na pananalita kung aling mga landas ang dapat sundin (kung aling mga subdirectory) ay isasama sa dataset. Ang default ay .\\*, na tumutugma sa lahat ng mga landas. Ito ay bihirang gamitin, bihirang kailanganin, OPSIYAL tag para saEDDGridMula saFiles datasets, EDDTable FromFiles datasets, at ilan pang mga uri ng dataset. Gayunman, kapag kailangan mo ito, talagang kailangan mo ito.
    
Upang magawa ito, kailangang maging mahusay ka sa regular na mga kapahayagan. Tingnan ito[dokumentasyon ng regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)at[regex tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). Sa partikular, kailangan mong malaman ang tungkol sa mga grupong bumibihag (sa loob ng mga panaklong) , at ang "o" simbolo "|".
Kung pagsasamahin mo ang mga ito, maaari mong tiyakin ang ilang mapagpipilian, e.g., (opsyon1|opsyon2|opsyon3) .
Isa pa, ang anumang mapagpipilian ay maaaring wala, e.g., (|opsyon2|opsyon3) .
Gayundin, kailangang malaman mo na ang mga grupong nanghuhuli ay maaaring ipugad, i.e., ang anumang mapagpipilian sa isang grupo ng mga nahuli ay maaaring maglaman ng isa pang grupo, e.g., (|opsyon2 (|opsyon2 b|opsyon2c) |opsyon3) na nagsasabing ang opsyon2 ay maaaring sundan ng wala, o opsyon2b, o opsyon2c.
Para sa mga pathRegexes, ang bawat opsiyon ay magiging isang folder na pangalan na susundan ng isang /, e.g., bar/ .
    
Ang mapanganib na bahagi ng pathRegex ay: KapagERDDAP™Muling bumaba sa puno ng directory, dapat tanggapin ng pathRegex ang lahat ng landas na nakakaharap nito patungo sa mga direktoryo na may datos. Ang regex sa mga grupong namumugad ay isang mabuting paraan upang pakitunguhan ito.
    
Isang Halimbawa:
Ipagpalagay nang taglay natin ang sumusunod na kayarian ng directory:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
at ang espesipikong talaksang Direktory ay /foo/bar/, at gusto lamang natin ang.ncmga file sa D\\[0-9\\]&#123;4&#125;/a/ subdirectories.
Ang solusyon ay magtakda ng pathRegex sa /foo/bar/ (|D\\[0-9\\]&#123;4&#125;/ (|a/) )   
Iyan ay nagsasabi:
Ang landas ay dapat magsimula sa /foo/bar/
Iyan ay maaaring sundan ng wala o D\\[0-9\\]&#123;4&#125;/
Iyan ay maaaring sundan ng wala o isang/
    
Oo, ang pathRegex's ay maaaring maging napakahirap gawin. Kung maipit ka, magtanong sa isang computer programmer (ang pinakamalapit na bagay sa tunay na daigdig sa isang manghuhula na naglalabas ng mga orasyon?) o magpadala ng email kay Chris. John sa noaa.gov.
    
### &lt;datos ng datos;{#dataset} 
* [ ** &lt;Kakaibang datos&gt; ** ] (Pag - i - #data) ay OPSYONAL (ngunit laging ginagamit) tag sa loob ng isang tag&lt;" erddapDatasets&gt; " tag indatasets.xmlna (kung isasama mo ang lahat ng impormasyon sa pagitan ng&lt;datos&gt; at&lt;/dataset&gt;) ay buong naglalarawan ng isang dataset. Halimbawa,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Maaaring maraming dataset tag sa iyong katawandatasets.xmltalaksan.
Tatlong katangian ang maaaring lumitaw sa loob ng isang&lt;tag ng datos&gt;:
     
    *    **type=" *a Uri* "** ay isang kapani - paniwalang katangian sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagpapakilala sa uri ng dataset (Halimbawa, kung ito ba ay isangEDDGrid/grired o EDDTable/tabular dataset) at ang pinagmulan ng datos (Halimbawa, isang database, files, o isang remoteOPeNDAPserver) . Tingnan ang[ **Talaan ng mga Uri ng Dataset** ](#list-of-types-datasets).
         
#### datos Id{#datasetid} 
*   [ **datasetID=" *NGDatasetID* "** ](#datasetid)ay isang kapani - paniwalang katangian sa loob ng isang&lt;tag ng datos&gt; na nag-aatas ng maikli (karaniwang&lt;15 karakter), natatangi at pagkakakilanlan ng pangalan sa isang dataset.
    * AngdatasetIDAng SUST ay isang liham (A-Z, a-z) sinundan ng anumang bilang ng A-Z, a-z, 0-9, at \\_ (ngunit pinakamahusay kung&lt;32 tauhan sa kabuuan).
    * Talaan ng mga Nilalaman Ang mga ID ay sensitibo sa kaso, subalit huwag lumikha ng dalawadatasetIDs na nagkakaiba lamang sa mga titik na pang-ibabaw/lowercase. Magdudulot ito ng mga problema sa mga Windows computer (at/o computer ng gumagamit) .
    * Pinakamabuting mga kaugalian: Iminumungkahi namin ang paggamit[kamelyo Kaso](https://en.wikipedia.org/wiki/CamelCase).
    * Pinakamabuting mga kaugalian: Iminumungkahi namin na ang unang bahagi ay isang acronym o daglat ng pangalan ng source institute at ang ikalawang bahagi ay maging isang acronym o daglat ng pangalan ng dataset. Hangga't maaari, lumilikha tayo ng pangalan na sumasalamin sa pangalan ng pinagmulan para sa dataset. Halimbawa, ginamit namindatasetID= "erdPH"ssta8day" para sa isang dataset mula saNOAA NMFS SWFSCPaghahati sa Pananaliksik sa Kapaligiran (ERD) na itinalaga ng source na maging satellite/PH/ssta/8day.
    * Kung babaguhin mo ang pangalan ng dataset, ang lumang dataset (na may lumang pangalan) sa ngayonERDDAP. Ito ay isang "orphan" dataset, dahil sa ang speciation para dito sadatasets.xmlay wala na ngayon. Ito'y kailangang pakitunguhan:
        1. SapagkatERDDAP™v2.19 at kalaunan, hindi mo na kailangan pang gawin ang anuman.ERDDAP™ay awtomatikong aalisin ang ulilang mga dataset na ito.
        2. SapagkatERDDAP™v2.18 at mas maaga pa rito, kailangang may gawin ka upang alisin ang ulilang mga dataset: Gumawa ng active=" false" dataset, e.g.,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Pagkatapos ng susunod na malaking pasan Mga Data, Maaari mong alisin ang tag na iyon pagkatapos na ang lumang dataset ay hindi aktibo.
                 
#### aktibo{#active} 
*   [ **aktibo=" *Ekstasi* "** ](#active)ay isang OPSYONAL na katangian sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagpapakita kung ang isang dataset ay aktibo (Maaaring gamitinERDDAP) o hindi.
    * Totoo ang makatuwirang mga pamantayan (ang default) at kabulaanan.
    * Yamang ang default ay totoo, hindi mo kailangang gamitin ang katangiang ito hanggang sa gusto mong pansamantalang alisin ang dataset na itoERDDAP.
    * Kung aalisin mo lamang ang isang active="tunay" na dataset mula sa datasetdatasets.xml, ang dataset ay aktibo pa rinERDDAP™kundi hindi kailanman babaguhin. Ang gayong dataset ay magiging isang "orphan" at itatala bilang gayon sa katayuan. html web page sa ibaba mismo ng listahan ng mga dataset na hindi nakapagkarga.
    * Kung nagtatakda ka ng active=" false",ERDDAP™ang dataset sa susunod na pagkakataong sikapin nitong i-update ang dataset. Kapag ginagawa mo ito,ERDDAP™ay hindi naglalabas ng anumang impormasyon na maaaring naimbak nito tungkol sa dataset at tiyak na hindi gumagawa ng anumang bagay sa aktuwal na impormasyon.
    * Upang alisin ang isang dataset saERDDAP™, tingnan[Pag - aalis ng Puwersa](/docs/server-admin/additional-information#removing-datasets).
         

 ** Ang ilang tag ay maaaring lumitaw sa pagitan ng&lt;datos&gt; at&lt;/dataset&gt; tags. **   
May ilang pagkakaiba-iba kung saan ang mga tag ay pinapayagan ng mga uri ng dataset. Tingnan ang dokumento para sa isang espesipiko[uri ng datos](#list-of-types-datasets)para sa mga detalye.

#### &lt;Makukuha togt;{#accessibleto} 
* [ ** &lt;Makukuha Sa&gt; ** ] (Ang #accessible) ay isang OPSYONAL na tag sa loob ng isang&lt;dataset&gt; tag na nagsasaad ng isang comma-hiwalay na talaan ng[papel](#user)na pinapayagang ma-access ang dataset na ito. Halimbawa,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Bahagi ito ngERDDAP'[sistemang panseguridad](/docs/server-admin/additional-information#security)dahil sa paghihigpit sa ilang datasets sa ilang gumagamit nito.
    * Kung wala ang tag na ito, lahat ng gumagamit nito (kahit na hindi sila nakapasok) ay magkakaroon ng akses sa dataset na ito.
    * Kung ang tag na ito ay naroroon, ang dataset na ito ay makikita lamang at magagamit sa mga logged-in user na may isa sa mga itinakdang papel. Ang dataset na ito ay hindi makikita ng mga gumagamit nito na hindi napapasok.
    * Bawat gumagamit na pumapasok ay awtomatikong binibigyan ng papel\\[SINISIRA Sa loob\\], kung meron&lt;user&gt; tag para sa kaniladatasets.xmlo hindi. Kaya kung may ibinigay na dataset
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
kung gayon ang sinumang gumagamit na nakatala ay bibigyan ng pahintulot na gamitin ang dataset na iyon, kahit na kung walang talaan&lt;user&gt; tag para sa kaniladatasets.xml.
         
#### &lt;Ng grapsAccessibleTO&gt;{#graphsaccessibleto} 
* [ ** &lt;grapsAccessible To&gt; ** ] (#graphsaccesibleto) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagtatakda kung ang graphics at metadata para sa dataset ay makukuha ng publiko. Nag-aalok ito ng paraan upang bahagyang matumbasan ang dataset's [&lt;Makarating sa&gt;] (Ang #accessible) tagpo. Ang ipinahihintulot na mga pamantayan ay:
    * auto -- Ang halagang ito (o ang kawalan ng isang&lt;Ang grapsAccessibleTo&gt; tag para sa dataset) ay nag-access sa mga grap at metadata mula sa dataset na ginagaya ang dataset's&lt;Makukuha sa&gt; setting.
Kaya kung ang dataset ay pribado, ang mga graph at metadata nito ay magiging pribado.
At kung ang dataset ay publiko, ang mga graph at metadata nito ay magiging publiko.
    * publiko -- Ang pagtatakdang ito ay gumagawa sa mga grap ng dataset at metadata na madaling makuha ng sinuman, kahit na ng mga gumagamit na hindi nasiksik, kahit na kung ang dataset ay pribado sapagkat ito ay may isang iskala&lt;Makukuhang tag ng TE&gt;.
         
#### &lt;Makukuha ViaFiles&gt;{#accessibleviafiles} 
* [ ** &lt;Mga "ViaFile "&gt; ** ] (Mgafile ng #accessiblevia) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlpara sa[EDDGridPagdidisiplina](#eddgridaggregateexistingdimension),[EDDGridKopya](#eddgridcopy),[EDDGridMapagkakatiwalaan](#eddgridfromeddtable),[EDDGridMula sa Erddap](#eddfromerddap),[EDDGridMula sa Estopo](#eddgridfrometopo),[EDDGridMula sa mga Labi](#eddgridfromfiles)  (pati na ang lahat ng subclass) ,[EDDGridSide Side Side](#eddgridsidebyside),[Mapagkakatiwalaang Komponiya](#eddtablecopy) [Mapagkakatiwalaang Mula sarddap](#eddfromerddap),[Maaasahan Mula saEDDGrid](#eddtablefromeddgrid), at[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles)  (pati na ang lahat ng subclass) mga datos. Maaari itong magkaroon ng halaga na totoo o mali. Halimbawa,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Kung totoo ang halaga,ERDDAP™ay gagawin ito upang ang mga gumagamit ay makapag - browse at mai - download ang mga source data file ng dataset sa pamamagitan ngERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/). Tingnan ang"files"ng sistema[Mga dokumento](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)para sa higit pang impormasyon.
    
Ang halagang default ng&lt;Mga "ViaFile "&gt; nanggagaling sa&lt;defaultAccessibleViaFiles&gt; sa loob[setup.xml](/docs/server-admin/deploy-install#setupxml). Ito ay may default na halaga ng mali, ngunit inirerekomenda namin na idagdag mo ang tag na iyon sa iyong setup.xml na may halaga ng totoo.
    
Mungkahi -- Iminumungkahi namin na gawing madaling makuha ang lahat ng nauugnay na mga dataset sa pamamagitan ng sistema ng talaksan sa pamamagitan ng pagtatakda&lt;defaultAccessibleViaFiles&gt; upang magkatotoo sa setup.xml dahil may isang grupo ng mga gumagamit na ito ang mas gustong paraan upang makuha ang datos. Kabilang sa iba pang mga dahilan, ang"files"Ginagawang madali ng sistema para sa mga gumagamit na makita kung aling files ang makukuha at kapag ang mga ito ay huling nagbago, sa gayon ay ginagawa itong madali para sa isang gumagamit na panatilihin ang kanilang sariling kopya ng buong dataset. Kung karaniwan nang ayaw mong gumawa ng mga dataset na makukuha sa pamamagitan ng sistema ng mga file, magtakda ng&lt;defaultAccessibleViaFiles&gt; upang magsinungaling. Sa alinmang kaso, gamitin lamang ang&lt;Madaling makuhang "ViaFiles&gt; " para sa ilang datasets na mga eksepsiyon sa pangkalahatang patakaran na itinakda ng&lt;defaultAccessibleViaFiles&gt; (Halimbawa, kapag ginamit ang dataset[.ncml](#ncml-files)mga talaksan, na hindi talaga kapaki - pakinabang sa mga gumagamit) .
     
#### &lt;Makukuha ViaWMS;{#accessibleviawms} 
* [ ** &lt;Makukuha ViaWMS&gt; ** ] (Mga #accessibleviawm) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmllahat[EDDGrid](#eddgrid)Mga subclass. Maaari itong maging tunay (ang default) o kabulaanan. Halimbawa,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Kung mali ang halaga,ERDDAP'WMSHindi magagamit ang server para sa dataset na ito. Ito ay karaniwang ginagamit para sa datasets na may ilang mga halagang longhitud na mas malaki sa 180 (na sa teknikal na paraan ay hindi tanggapWMSserbisyo) , at dahil dito ay nag-aalok ka rin ng iba't ibang iba ng dataset na may mga halagang longhitúd na buong sa range-180 hanggang 180 via[EDDGridLonPM180](#eddgridlonpm180).
Kung totoo ang halaga,ERDDAP™ay sisikaping gamitin ang datasetERDDAP'WMSserver. Subalit kung ang dataset ay ganap na hindi angkop para saWMS  (e.g., walang longhitud o latitud na datos) , kung gayon ang dataset ay hindi magagamit sa pamamagitan ngERDDAP'WMSserver, anuman ang kalagayang ito.
     
#### &lt;idagdag Iba - iba Saan?{#addvariableswhere} 
* [&lt;Dagdag na mga Bugtong Kung Saan&gt;] (Mga #Advariable) ay isang OPSYONAL na tag sa loob ng&lt;dataset&gt; tag para sa lahat ng EDDTable datasets.
    
Maaaring isama sa mga kahilingan sa anumang EDDTable dataset ang &add Iba - iba Saan (" *attribute Pangalan* "," *attribute Halaga* ") , na nagsasabiERDDAP™upang idagdag ang lahat ng mga variable sa dataset kung saan *attributeName=attributeValue* sa talaan ng hiniling na mga variable. Halimbawa, kung ang gumagamit ay magdagdag ng &add Iba - iba Saan ("ioos\\_category""Isinilang".) tanong,ERDDAPay magdadagdag ng lahat ng mga variable sa dataset na may isangioos\\_category=Wind attribute sa talaan ng mga hiniling na variables (Halimbawa, windSpeed, wind Direction, windGustSpeed) . *attribute Pangalan* at *attribute Halaga* ay case-sensitive.
    
Sa loobdatasets.xml, kung ang score ng dataset.xml para sa isang dataset ay may
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
Halimbawa,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
ng Data Access Form (.html web page) para sa dataset ay may kasamang widget (sa bawat attributeName sa talaang comma-weed) Sa ibaba mismo ng listahan ng mga variable na nagpapangyari sa mga gumagamit na magtakda ng halaga ng isang attribute. Kung ang gumagamit ay pipili ng halagang attribute para sa isa o higit pa sa mga pangalang attribute, ito ay idaragdag sa kahilingan sa pamamagitan ng &add Iba - iba Saan (" *attribute Pangalan* "," *attribute Halaga* ") . Kaya, ang tag na ito sadatasets.xmlPinapayagan mong itakda ang talaan ng mga pangalang attribute na lilitaw sa Date Access Form para sa dataset na iyon at gawing madali para sa mga gumagamit na magdagdag ng &addVariables Kung saan angkop ang kahilingan. Ang *ANNamesCSV* Listahan ang case-sensitive.
    
#### &lt;Ang altitud naMetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;"MetersPerSourceUnit&gt; " ** ] (#altimetropersourceunit) ay isang OPSYONAL na tag sa loob ng&lt;dataset&gt; tag sa datasets. xxml Para sa EDDTTable Mula saSOSdatos (Tanging&#33;) na nagsasabi ng isang bilang na pinarami ng pinagmumulan ng taas o lalim upang gawin itong mga pamantayan sa altitud (sa taas na mga metro mula sa kapantayan ng dagat) . Halimbawa,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Ang tag na ito na MUST ay magagamit kung ang mga vertical axis na halaga ng dataset ay hindi metro, positive=up. Kung hindi, ito ay OPSYONAL, yamang ang default na halaga ay 1. Halimbawa,
    * Kung ang pinagmumulan ay nasukat na sa metro sa ibabaw ng antas ng dagat, gamitin ang 1 (o huwag gamitin ang tag na ito, yamang 1 ang default na halaga) .
    * Kung ang pinagkukunan ay sinusukat sa metrong mas mababa sa antas ng dagat, gamitin ang -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Kung ang pinagmumulan ay sinusukat sa km sa ibabaw ng antas ng dagat, gumamit ng 0.001.
         
#### &lt;defaultDataQuery&gt;{#defaultdataquery} 
* [ ** &lt;defaultDataQuery&gt; ** ] (#defaultaquery) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagsasabiERDDAP™upang gamitin ang espesipikong tanong (ang bahagi ng URL pagkatapos ng "?".) kung ang .html file Uri (ng Data Access Form) ay hinihiling na walang query.
    * Malamang na bihira mong gamitin ito.
    * Kailangan mong XML-encode (hindi porsyento-encode) ang default requeries mula nang ito ay nasa isang dokumento ng XML. Halimbawa, & be &amp; ,&lt;maging&lt;, &gt; maging &gt; .
    * Pakisuyong tingnan ang inyong trabaho. Madaling magkamali at hindi makuha ang gusto mo.ERDDAP™-ngunit huwag kang umasa diyan, yamang\\*kung paano\\*Maaari itong baguhin.
    * Para sa mga dataset na griddap, ang karaniwang gamit nito ay upang magtakda ng ibang default na lalim o taas na dimensiyonal na halaga (Halimbawa,\\[0\\]sa halip\\[huli\\]) .
Sa paano man, dapat na lagi mong itala ang lahat ng mga variables, laging gamitin ang iisang dimensiyonal na mga halaga para sa lahat ng mga variables, at halos palaging gamitin\\[0\\],\\[huli\\], o\\[0: Huli\\]para sa dimensiyong mga halaga.
Halimbawa:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Sapagkattabledapdatasets, kung hindi mo espesipikong itatakda ang anumang limitasyon, ibabalik ng kahilingan ang buong dataset, na maaaring hindi praktikal na malaki, depende sa dataset. Kung ayaw mong magtakda ng anumang limitasyon, sa halip na walang laman&lt;defaultDataQuery&gt; (na katulad ng hindi pagtatakda ng default Mga DataQuy) , kailangan mong detalyadong itala ang lahat ng iba't ibang bagay na nais mong isama sa defaultDataQuery.
    * Sapagkattabledapdatasets, ang pinakakaraniwang gamit nito ay magtakda ng iba't ibang default time range (kamag - anak ng max (panahon) Halimbawa, &time&gt;=max (panahon) -1day, o relatibo sa ngayon, halimbawa, &time&gt;=now-1 araw) .
Tandaan na ang hindi paghiling ng mga data variable ay katulad ng pagtiyak sa lahat ng iba't ibang impormasyon, kaya karaniwan nang maaari mo lamang tiyakin ang bagong limitasyon sa oras.
Halimbawa:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
o
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt;{#defaultgraphquery} 
* [ ** &lt;defaultGraphQuery&gt; ** ] (#defaultgraphy) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagsasabiERDDAP™upang gamitin ang espesipikong tanong (ang bahagi ng URL pagkatapos ng "?".) kung ang talaksang .graph Uri (Ang Pagbuo ng Graph) ay hinihiling na walang query.
    * Malamang na bihira mong gamitin ito.
    * Kailangan mong XML-encode (hindi porsyento-encode) ang default requeries mula nang ito ay nasa isang dokumento ng XML. Halimbawa, & be &amp; ,&lt;maging&lt;, &gt; maging &gt; .
    * Pakisuyong tingnan ang inyong trabaho. Madaling magkamali at hindi makuha ang gusto mo.ERDDAP™-ngunit huwag kang umasa diyan, yamang\\*kung paano\\*Maaari itong baguhin.
    * Para sa mga dataset na griddap, ang pinakakaraniwang gamit nito ay ang magtakda ng ibang default na lalim o taas na dimensiyonal na halaga (Halimbawa,\\[0\\]sa halip\\[huli\\]) at/o magtakda na ang isang espesipikong variable ay i-grap.
Sa paano man, halos lagi mong magagamit\\[0\\],\\[huli\\], o\\[0: Huli\\]para sa dimensiyong mga halaga.
Halimbawa:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (ngunit ilagay ang lahat ng ito sa iisang linya) 
    * SapagkattabledapAng mga dataset, kung hindi mo espesipikong itatakda ang anumang limitasyon, ay magpo - graph ng buong dataset, na maaaring kumuha ng mahabang panahon, depende sa dataset.
    * Sapagkattabledapdatasets, ang pinakakaraniwang gamit nito ay magtakda ng iba't ibang default time range (kamag - anak ng max (panahon) Halimbawa, &time&gt;=max (panahon) -1day, o relatibo sa ngayon, halimbawa, &time&gt;=now-1 araw) .
Tandaan na ang hindi paghiling ng mga data variable ay katulad ng pagtiyak sa lahat ng iba't ibang impormasyon, kaya karaniwan nang maaari mo lamang tiyakin ang bagong limitasyon sa oras.
Halimbawa:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
o
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;Mga dimensiyonValue SaMemorygt;{#dimensionvaluesinmemory} 
* [ ** &lt;dimensiyon Mga Pamantayan sa Memoryang&gt; ** ] (#dimension deficingsinmemory)   (totoo (ang default) o kabulaanan) ay isang OPSYONAL at bihirang gamiting tag sa loob ng&lt;tag ng datos&gt;EDDGriddatos na nagsasabiERDDAP™kung saan pananatilihin ang pinagmumulan ng mga halaga ng sukat (Kilala rin bilang angaxisVariables) :
    
    * totoo = nasa alaala (na mas mabilis ngunit gumagamit ng mas maraming memorya) 
    * mali = nasa disk (na mas mabagal ngunit hindi gumagamit ng memorya) 
    
Halimbawa,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Dapat mo lamang gamitin ito na hindi-default na halaga ng mali kung ang iyongERDDAP™maraming dataset na may napakalaking dimensiyon (e.g., angaw - angaw na mga pamantayan, e.g., saEDDGridMula sa AudioFiles datasets) atERDDAP'Ang paggamit ng memory ay laging napakataas. Tingnan ang Alaala: kasalukuyang gumagamit ng linya sa\\[Ang Iyong domain\\]/erddap/status.htmlupang masubaybayanERDDAP™paggamit ng memory.
     
#### &lt;Listahan ng mga Nilalaman{#filetableinmemory} 
* [ ** &lt;Maaaring Ilagay sa Memory&gt; ** ] (#Latin)   (totoo o mali (ang default) ) ay isang OPSYONAL na tag sa loob ng&lt;tag ng datos&gt;EDDGridMula sa mga Latian at Uso Mula saFiles dataset na nagsasabiERDDAP™kung saan iingatan ang fileTable (na may impormasyon tungkol sa bawat source data file) :
    
    * totoo = nasa alaala (na mas mabilis ngunit gumagamit ng mas maraming memorya) 
    * mali = nasa disk (na mas mabagal ngunit hindi gumagamit ng memorya) 
    
Halimbawa,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Kung ipatutupad mo ito sa anumang dataset, ituon ang mata sa Alaala: kasalukuyang gumagamit ng linya sa\\[Ang Iyong domain\\]/erddap/status.htmlupang tiyakin iyanERDDAP™ay marami pang libreng memorya.
     
#### &lt;fgdcFilegt;{#fgdcfile} 
* [ ** &lt;fgdcFile&gt; ** ] (#fgdcfile) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagsasabiERDDAP™upang gamitin ang pre-made FGDC file sa halip na magkaroon ngERDDAP™Sikaping lumikha ng file. Paggamit:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *puno Larawan* ay maaaring tumukoy sa lokal na talaksan (sa sistema ng talaksan ng server) o ang URL ng isang malayong talaksan.
Kung *puno Larawan* \\=" o ang file ay hindi matatagpuan, ang dataset ay hindi magkakaroon ng FGDC metadata. Kaya kapaki-pakinabang din ito kung nais mong sugpuin ang FGDC metadata para sa isang espesipikong dataset.
O, maaari mong ilagay&lt;sirang&gt;&lt;/fgdcActive&gt; sa setup.xml upang sabihinERDDAP™hindi mag-aalok ng FGDC metadata para sa anumang dataset.
     
#### &lt;iso19115 Sawi{#iso19115file} 
* [ ** &lt;iso19115File&gt; ** ] (#iso19115 Profile) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagsasabiERDDAP™upang gamitin ang pre-made ISO 19115 file sa halip na magkaroon ngERDDAP™Sikaping lumikha ng file. Paggamit:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *puno Larawan* ay maaaring tumukoy sa lokal na talaksan (sa sistema ng talaksan ng server) o ang URL ng isang malayong talaksan.
Kung *puno Larawan* \\=" o ang talaksan ay hindi matatagpuan, ang dataset ay hindi magkakaroon ng ISO 19115 metadata. Kaya kapaki-pakinabang din ito kung nais mong sugpuin ang ISO 19115 metadata para sa isang espesipikong dataset.
O, maaari mong ilagay&lt;ayeo19115Active&gt; false&lt;/iso19115Active&gt; sa setup.xml upang sabihinERDDAP™hindi mag-alok ng ISO 19115 metadata para sa anumang dataset.
     
#### &lt;ng posporo NDigits&gt;{#matchaxisndigits} 
* [ ** &lt;&gt; ng posporo ** ] (#matchaxisndigits) ay isang OPSYONAL na tag sa loob ng isangEDDGrid &lt;tag ng datos&gt;EDDGridmga datos na agregasyon, e.g., mga agregasyon ng mga file. Tuwing ididiskarga muli ang dataset,ERDDAP™Tiyakin na ang halaga ng axis ng bawat sangkap ng aggregation ay pareho. Ang prekwensiya ng pagsubok ay itinatakda ng[mga palito sa posporo](#matchaxisndigits), na bumabanggit sa kabuuang bilang ng mga numero na dapat na tugmaan kapag sinusubok ang dobleng eksaktong halaga ng axis, 0 - 18 (ang default) . Kapag sinusubok ang mga palutang na halaga ng axis, ang pagsubok ay ginagawa gamit ang mga adaxisNDigits/2 digit. Ang halaga ng 18 o sa itaas ay nagsasabiEDDGridupang gawin ang eksaktong pagsubok. Ang halaga ng 0 ay nagsasabiEDDGridhuwag gumawa ng anumang pagsubok, na hindi inirerekomenda, maliban sa inilarawan sa ibaba.
    
BagamanEDDGriday nagpapangyari sa mga bahagi ng aggregation na magkaroon ng bahagyang naiibang halaga ng axis, isang set lamang ng mga pagpapahalaga sa axis ang ipinakikita sa gumagamit. Ang set ay mula sa parehong sangkap na nagbibigay ng source metadata ng dataset. Halimbawa, halimbawa,EDDGridMula saFiles datasets, na itinatakda ng&lt;metadata Mula sa pag - aayos ng&gt; (default=huli) .
    
Ang paggamit ng mga posporoAxisNDigits\\=0 ay malakas na nasisiraan ng loob sa karamihan ng mga kaso, sapagkat pinapatay nito ang lahat ng pagsusuri. Kahit na ang kaunting pagsusuri ay kapaki - pakinabang sapagkat tinitiyak nito na ang mga bahagi ay angkop para sa pag - aalmot. Ipinalalagay naming lahat na ang lahat ng sangkap ay angkop, subalit hindi laging gayon. Kaya ito ay isang mahalagang pagsubok sa katinuan. Kahit na ang mga pamantayan ng posporoAxisNDigits1, 2, 3 o 4 ay nasisiraan ng loob sapagkat ang iba't ibang halaga ng axis ay kadalasang nagpapahiwatig na ang mga sangkap ay nilikha (Hinango?) isang naiibang paraan at sa gayo'y hindi angkop para sa agregasyon.
    
May isang kaso kung saan ang paggamit ng mga patchAxisNDigits\\=0 ay kapaki-pakinabang at inirerekomenda: na may agregasyon ng mga remote file, e.g., data sa S3 buckets. Sa kasong ito, kung ang dataset ay gumagamit ng cache FromUrl, cachessizeGB, adaxisNDigits\\=0, at theEDDGridMula sa sistemangFiles para sa[Pag - aalsa Mga Pangalan ng File](#aggregation-via-file-names-or-global-metadata), pagkataposEDDGriday hindi kailangang basahin ang lahat ng mga remote file upang gawin ang agregation. Ito'y nagpapangyari sa mga dataset na ginawa mula sa datos sa mga timba ng S3 na mabilis na maglulan (kabaligtaran ng kakatwang kabagalan kungEDDGridkailangang download at basahin ang lahat ng files) .
    
#### &lt;"n h";{#nthreads} 
* Pasimula saERDDAP™bersyon 2.00, kung kailan ang anumang subclass ng EDDTable FromFiles oEDDGridng datos mula sa pinagkunan nito, mababasa nito ang isang bahagi ng datos (e.g., isang source file) sa isang panahon (sa isang sinulid)   (yaon ay default) o mahigit sa isang bahagi ng datos (e.g., 2+ source files) sa isang panahon (sa 2 o higit pang sinulid) habang pinoproseso ang bawat kahilingan.
     
    * Pamamahala ni Thumb:
Para sa karamihan ng mga datasets sa karamihan ng mga sistema, gumamit ng nThreads=1, ang default. Kung mayroon kang mahusay na computer (maraming CPU core, maraming alaala) , kung gayon isaalang - alang ang pagtatakda ng mga nThbasa sa 2, 3, 4, o mas mataas pa (subalit hindi hihigit sa bilang ng mga CPU core sa computer) sa mga datos na maaaring pakinabangan:
        
        * Karamihan sa EDDTable FromFiles datasets ay makikinabang.
        * Halimbawa, ang mga impormasyon kung saan ang isang bagay ay nagiging dahilan ng pag - ikli ng isang bahagi ng impormasyon ay maaaring aktuwal na iproseso ay pakikinabangan:
            * May mga Datet[panlabas na-compressed (e.g.,.gz) ](#externally-compressed-files)binaryo (e.g.,.nc) dahilan saERDDAP™ay kailangang i-decompress ang buong file bago ito makapag-umpisang basahin ang file.
            * Mga datos na gumagamit ng mga[Mga cachesizeGB](#cachefromurl), dahilERDDAP™ay kadalasang kailangang i-download ang file bago ito mabasa.
            * Ang mga datos na may data file na naka-imbak sa isang high-bandwidth parallel file system, dahil kaya nitong maghatid ng mas maraming datos, mas mabilis, kapag hiniling. Kabilang sa mga halimbawa ng mga sistemang parallel file[MABUTI](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures),[PNFS](http://www.pnfs.com/),[MGA GlusterF](https://en.wikipedia.org/wiki/Gluster), Amazon S3, at Google Cloud Storage.
                 
        
Babala: Kapag gumagamit ng nThreads&gt;1, tingnanERDDAP'paggamit ng memorya, paggamit ng sinulid, at pangkalahatang pagtugon (tingnan[ERDDAP' status page](/docs/server-admin/additional-information#status-page)) . Tingnan ang mga komento tungkol sa mga isyung ito sa ibaba.
         
    * Para sa isang ibinigay na dataset, ang setting na ito ng nThreads ay maaaring manggaling sa iba't ibang lugar:
        
        * Kung gayondatasets.xmlAng daglat para sa dataset ay may datos&lt;n (sa loob ng tag)&lt;tag ng datos&gt;, hindi bilang isang pangglobong attribute) na may halagang &gt;= 1, ang halagang iyan ng nThreads ay ginagamit. Kaya, maaari mong tiyakin ang iba't ibang numero sa bawat dataset.
        * Kung hindi, kungdatasets.xmlay may&lt;ITableThreads&gt; tag (para sa EDDTable Mula sa mga dataset) o isang&lt;nGridThreads&gt; tag (para saEDDGriddatos) na may halagang &gt;= 1, labas ng a&lt;tag ng dataset&gt;, ang halagang iyon ng nThreads ay ginagamit.
        * Kung hindi, 1 sinulid ang ginagamit, na isang ligtas na pagpili yamang ginagamit nito ang pinakamaliit na dami ng memorya.
             
        
Para sa[orihinalERDDAP™pagluluklok](https://coastwatch.pfeg.noaa.gov/erddap/index.html), ginagamit natin
        &lt;ITableThreads&gt; 6&lt;/ntableThreads&gt; (Ito ay isang malakas na server.) Ang mahihirap na kahilingan ngayon ay kumukuha ng 30% ng nakaraang panahon.
         
##### Pinatutunayan ng Monitor ang Paggamit{#monitor-resource-usage} 
Kapag nag - eeksperimento ka sa iba't ibang setting (at marahil ay humihiling sa iyo ng isang mahirap na sampolERDDAP) , maaari mong subaybayan ang gamit ng iyong computer para sa yaman:
* Sa Macs, gamitin ang Finder : Mga aplikasyon : Mga Utilidad : Monitor ng Gawain : Moving
* Sa Linux, gamitin ang ibabaw
* Sa Windows 10, gamitin *Ctrl + Atmospheric + Esc* sa open Task Manler
             
##### Babala: Hindi Tumugon{#warning-decreased-responsiveness} 
Nag - iisaERDDAP™ay tutupad ng isang kahilingan sa isang dataset na may mas mataas na mga nThread na mas mabilis na nagtatakda kaysa kung nThreads=1. Subalit samantalang ang kahilingang iyan ay pinoproseso, ang iba pang kahilingan mula sa ibang gumagamit ay medyo matatabunan at magkakaroon ng mas mabagal na pagtugon. Gayundin, kapagERDDAP™tumugon sa isang ibinigay na kahilingan, iba pang mga yaman na nagkokodigo (e.g., disk drive access, network bandwidth) ay maaaring limitado, lalo na sa mas mataas na settings. Kaya sa mas mataas na mga setting ng nThreads, ang pangkalahatang sistema ay magiging mas masahol pa kapag may maramihang mga kahilingan na prinoseso - ito ay maaaring maging nakakainis sa mga gumagamit&#33; Dahil dito: hindi kailanman naglagay ng mga nThbasa sa higit sa bilang ng mga CPU core sa kompyuter. Ang nTh reads=1 ay ang pinaka-mabisang setting mula sa bawat hiling (sa ilang sabay - sabay na kahilingan) ay magkakaroon ng katumbas na bahagi sa computer. Subalit mientras mas malakas ang computer, hindi ito magiging problema.
         
##### Babala: Mas Mataas na Alaala PaggamitEDDGridMga Data{#warning-higher-memory-use-for-eddgrid-datasets} 
Ang paggamit ng memorya habang nagpoproseso ng mga kahilingan ay direktang proporsiyonal sa nThreads setting. Ang makatuwirang ligtas na tuntunin ng hinlalaki ay: kailangan mong magtakda[ERDDAP'mga memory setting](/docs/server-admin/deploy-install#memory)sa di - kukulanging 2GB + (2GB \\* nThreads) . Ang ilang kahilingan sa ilang dataset ay nangangailangan ng higit na memorya kaysa riyan. Halimbawa, nagtatakda ng nThreads=3 para sa kahit anongEDDGridAng dataset ay nangangahulugang ang setting na -Xmx ay dapat na hindi bababa sa -Xmx8000M. Kung ang pagtatakdang iyon ng memorya ay mas malaki sa 3/4 ang pisikal na memorya ng kompyuter, bawasan ang mga nThread setting upang mabawasan mo ang pag-iral ng memorya.

Ang paggamit ng memorya ng mga sinulid sa pagproseso ng mga kahilingan sa EDDTable datasets ay halos palaging mas mababa dahil ang mga file ay karaniwang mas maliit. Gayunman, kung ang ibinigay na EDDTable dataset ay malaki (e.g., &gt;=1 GB) kung gayon ang mga komento sa itaas ay kumakapit din sa mga dataset na iyon.

Anuman ang kalagayan ng mga nTHread, tingnang mabuti ang mga estadistika sa iyong memorya[ERDDAP' status page](/docs/server-admin/additional-information#status-page). Hindi mo dapat isaalang - alang ang paggamit sa memoryaERDDAP; kung hindi ay magkakaroon ng malulubhang pagkakamali at kabiguan.
        
##### Temporyal na Ibinigay sa 1{#temporarily-set-to-1} 
Kung ang kasalukuyang paggamit ng memorya ay medyo mataas pa nga,ERDDAP™ay maglalagay ng nThreads para sa kahilingang ito sa 1. Kaya,ERDDAP™Naiingatan ang memorya kapag kakaunti ang memorya.
         
##### Nagpapahamak na Pagbabalik{#diminishing-returns} 
May umuunting mga pagbabalik sa pagdami ng setting ng nThreads: 2 sinulid ang mas mabuti kaysa 1 (kung ipagwawalang - bahala natin ang dinamikong labis na pag - iisip) . Subalit ang 3 ay magiging isa lamang tipak na mas mabuti kaysa 2. At ang 4 ay magiging maliit lamang na mas mabuti kaysa 3.

Sa isang pagsubok ng isang mahirap na tanong sa isang malaking EDDTable dataset, ang oras ng pagtugon na ginagamit ang 1, 2, 3, 4, 5, 6 na sinulid ay 38, 36, 20, 18, 13, 11 segundo. (Ginagamit namin ngayon ang nTableThreads=6 sa server na iyon.) 

n=2: Bagaman, kadalasang may mahalagang pakinabang sa pagtatakda ng nThreads=2 sa halip na nThreads=1, ito ay kadalasang hindi malaki ang magagawang pagkakaiba sa oras ng orasan na kinakailangan upang matugunan ang ibinigay na kahilingan ng tagagamit. Ang dahilan ay: sa pamamagitan ng nThreads=1, ang karamihan ng modernong kalooban ng CPU ay kadalasang[Walang - tigil na paglipas ng oras](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (Pagdami ng turbo) upang pansamantalang dagdagan ang bilis ng orasan ng CPU. Kaya sa pamamagitan ng nTh reads=1, ang isang core ay madalas na gumagana sa mas mataas na bilis ng orasan kaysa sa bawat isa sa dalawang core kung gumamit kayo ng nThreads=2. Sa kabila nito, iniisip pa rin natin na mas mabuting gumamit ng nThreads=2 sa halip na nThreads=1, dahil ang tagpong iyon ay magdudulot ng mas magandang resulta sa mas malawak na iba't ibang sitwasyon. At mangyari pa, kung ang iyong computer ay may sapat na CPU cores, ang mas mataas pang setting ng nThreads ay dapat na magkaroon ng mas mabuting mga resulta.

Gaya ng tinalakay sa itaas, ang napakataas na settings ng nThreads ay maaaring umakay sa mas mabilis na pagtugon sa ilang kahilingan, subalit ang panganib ng pangkalahatang pagbabaERDDAP™Pagtugon at paggamit ng mataas na memorya (gaya ng nabanggit sa itaas) samantalang ang mga kahilingang iyon ay pinoproseso ay nangangahulugan na karaniwan nang hindi ito mabuting ideya.
        
##### CPU Mga cores{#cpu-cores} 
Hindi mo dapat itakda ang nThbasaes sa numerong mas malaki sa bilang ng CPU core sa CPU ng kompyuter. Lahat ng modernong CPU ay may maraming core (e.g., 2, 4, o 8) . Ang ilang computer ay mayroon pa ngang maraming CPU (e.g., 2 CPUs \\* 4 cores/CPU = 8 CPU cores) . Upang malaman kung gaano karaming CPU at core ang mayroon ang isang computer:

* Sa Macs, gamitin *Option key* : Apple Menu : System Information
* Sa Linux, gamitin ang pusa /proc/cpuinfo
* Sa Windows 10, gamitin *Ctrl + Atmospheric + Esc* bukas Task Manler : Performance (Ang mga logical processor ay nagpapakita ng kabuuang bilang ng mga CPU core) 

Oo, karamihan ng mga processor sa ngayon ay nagsasabi na sinusuportahan nila ang 2 sinulid sa bawat ubod (gagamitin[hyper-threading](https://en.wikipedia.org/wiki/Hyper-threading)) , ngunit ang 2 sinulid ay nagbabahagi ng mga mapagkukunang pang-kompyuter, kaya't hindi mo makikita ng dalawang beses ang bitput sa isang CPU sa ilalim ng mabigat na karga. Halimbawa, ang isang kompyuter na may isang CPU na may 4 na core ay maaaring mag-angkin na sumusuporta sa hanggang 8 na sinulid, ngunit hindi ka dapat lumampas sa nThreads=4 sa bagay na iyanERDDAP. Tandaan:

* Ang mga nThread na nakalagay saERDDAP™ay bawat kahilingan.ERDDAP™Kadalasan nang sabay - sabay na ginagampanan ang maraming kahilingan.
*   ERDDAP™ang iba pang bagay maliban sa mga kahilingan sa proseso, e.g., muling magkarga ng mga dataset.
* KailanERDDAP™tumugon sa isang ibinigay na kahilingan, iba pang mga yaman na nagkokodigo (e.g., disk drive access, network bandwidth) ay maaaring limitado. Mientras mas mataas ang itinakda mong mga nThread, mas malamang na ang iba pang yaman na ito ay maaksaya at babagalERDDAP'Ang pangkalahatang tugon.
* Hindi lamang pagtakbo ang ginagawa ng operating systemERDDAP.

Kaya pinakamabuting huwag magtakda ng mga nThread na nagtatakda sa higit sa bilang ng mga core sa CPU ng kompyuter.
         
##### Ang Iyong Piling Kaurian (YMV)  {#your-mileage-may-vary-ymmv} 
Ang mga resulta ng iba't ibang mga setting ng nThreads ay mag-iiba ng malaki para sa iba't ibang mga kahilingan sa iba't ibang datasets sa iba't ibang mga sistema. Kung talagang nais mong malaman ang epekto ng iba't ibang mga setting ng nThreads, patakbuhin ang makatotohanang mga pagsubok.
         
##### Bakit dapat basahin ang bawat kahilingan?{#why-nthreads-per-request} 
Naririnig ko ang ilan sa inyo na nag - iisip "Bakit ang bawat kahilingan ay binabasa? Kung ako'y nagkokodigo nito, gagamit ako ng isang permanenteng pool na yari sa sinulid at isang messaging queue para sa mas mahusay na pagganap." Ang problema sa paggamit ng isang pangkat ng mga manggagawa na gumagawa ng sinulid at ng isang messaging queue ay na ang isang mahirap na kahilingan ay paulanan ang queue ng maraming mabagal na trabaho. Mabisang mahahadlangan niyanERDDAP™mula sa pagpapasimula ng mga gawaing may kaugnayan sa iba pang mga kahilingan hanggang sa ang unang kahilingan ay (talaga) ay natapos. Kaya, kahit na ang simpleng kasunod na mga kahilingan ay lubhang mabagal na tutugon.ERDDAP'Ang paggamit ng nThreads kada request ay humahantong sa mas patas na paggamit ng mga computing force.
         
##### Ang nThreads vs. Multiple Worker Computers{#nthreads-vs-multiple-worker-computers} 
Nakalulungkot,ERDDAPAng sistemang nThreads ay hindi kailanman magiging kasingbisa ng tunay na pagpapantay sa pamamagitan ng maramihang mga computer ng manggagawa, na ang bawat isa ay nagtatrabaho sa isang tipak ng impormasyon, sa paraan na karaniwang ginagamit ang Hadoop o Apache Spark. Kapag ang atas ay tunay na katumbas/distributed sa maramihang mga computer, ang bawat kompyuter ay maaaring gamitin ang lahat ng mga yaman nito sa bahagi ng trabaho nito. KasamaERDDAP' nThreads system, ang bawat hibla ay nakikipagpaligsahan para sa parehong bandwidth ng kompyuter, disk drives, memory, atbp. Sa kasamaang palad, karamihan sa atin ay walang mga kayamanan o pondo upang magtayo o umupa pa nga (sa mga Web Serbisyo ng Amazon (MGA AW) o Google Cloud Platform (GCP) ) Napakaraming grid ng mga computer. Hindi rin tulad ng isang connectional database na pinapayagang ibalik ang mga resultang hanay sa anumang pagkakasunud-sunod,ERDDAP™ay nangangakong ibabalik ang resultang mga hanay sa isang walang pagbabagong pagkakasunud - sunod. Ginagawa ang pagbabawal na itoERDDAPHindi gaanong mahusay ang pagpapatupad ng 'nThreads. SubalitERDDAPAng 'nThreads ay kapaki-pakinabang sa maraming mga kaso.

Gayunman, may mga paraan na dapat gawinERDDAP™kung paano haharapin agad ang maraming kahilingan sa pamamagitan ng pagtatakda ng isang[Panlaping/cluster/federation ofERDDAPs](/docs/server-admin/scaling).
         
#### &lt;Paa;{#palettes} 
* Pasimula saERDDAP™bersyon 2.12,datasets.xmlay maaaring may kasamang&lt;Pale&gt; tag (sa loob&lt;" erddapDatasets&gt; ") na nangingibabaw sa&lt;Mga palect&gt; na halaga mula sa mga mensahe. (o bumabalik sa mga mensahe.xml halaga kung ang tag sadatasets.xmlay walang laman) . Ito'y nagpapangyari sa iyo na baguhin ang listahan ng makukuhang mga paleta samantalangERDDAP™ay tumatakbo. Nagpapahintulot din ito sa iyo na gumawa ng pagbabago at magpatuloy ito kapag nagkabit ka ng isang bagong bersiyon ngERDDAP.
BABALA: Ang mga paleta na nakataladatasets.xmlay kailangang maging isang superset ng mga paleta na nakatala sa mga mensahe.ERDDAP™ang eksepsiyon at hihinto sa pagpoprosesodatasets.xml. Tinitiyak nito na lahatERDDAP™Ang mga instalasyon sa paano man ay sumusuporta sa iisang core paleta.
BABALA:ERDDAP™ang mga hula na ang mga talaksan ng paleta ay espesipikong nasa mga mensahe.xml ay aktuwal na umiiral, subalit hindi nito sinusuri ang mga talaksan ng paleta na nakatala sa mga mensahedatasets.xml. Pananagutan mo na tiyaking naroroon ang mga file.
    
Nagsisimula rin ito saERDDAP™bersyon 2.12, kung gagawa ka ng subdirectory sa cpfileERDDAP™directory,ERDDAP™ang lahat ng \\*.pt files sa directory na iyon\\[tomcat\\]/webapps/erddap/WEB-INF/ctfiles directory sa bawat pagkakataonERDDAP™magsimula. Kaya, kung ilalagay mo sa directory na iyon ang mga talaksan ng custom cp, ang mga file na iyon ay gagamitin ngERDDAP™, nang walang anumang pagsisikap sa iyong bahagi, kahit na magkabit ka ng isang bagong bersiyon ngERDDAP.
    
BABALA: Kung idaragdag mo ang mga kaugalian sa iyong katawanERDDAP™at ikaw ay mayroonEDDGridMula saErddap at/o EDDTable FromErddap datasets sa inyongERDDAP™, kung gayon makikita ng mga gumagamit ang inyong mga mapagpipiliang custom practiceERDDAP™Gumawa ng A Graph web page, pero kung gagamitin ito ng gumagamit, magkakaroon sila ng graph na may default (karaniwang Rainbow) LANGIS. Ito'y dahilan sa ang larawan ay ginawa ng malayoERDDAP™Na walang paleta sa kaugalian. Ang tanging mga solusyon ngayon ay i - email ang liblibERDDAP™administrador upang idagdag ang iyong kaugalian sa kaniyang/herERDDAPo email Chris. John sa noa.gov upang hilingin na idagdag ang mga paleta sa pamantayanERDDAP™pamamahagi.
    
#### &lt;onChangegt;{#onchange} 
* [ ** &lt;onChange&gt; ** ] (Pagpapalit ng #on) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlna nagsasaad ng isang pagkilos na gagawin kapag nilikha ang dataset na ito (kapagERDDAP™ay muling naka-arte) at kailanma't ang dataset na ito ay nagbabago sa anumang paraan.
    * Sa kasalukuyan, para saEDDGridMga subclass, anumang pagbabago tungo sa metadata o sa axis ay iba't iba (Halimbawa, isang bagong time point para sa halos-real-time na datos) ay itinuturing na pagbabago, ngunit ang muling pagkarga ng dataset ay hindi itinuturing na pagbabago (mag - isa) .
    * Sa kasalukuyan, para sa EDDTable subclass, anumang muling pagkarga ng dataset ay itinuturing na pagbabago.
    * Sa kasalukuyan, dalawang uri lamang ng pagkilos ang ipinahihintulot:
        * " http://" o " https://" -- Kung magsimula ang pagkilos " http://" o " https://" ,ERDDAP™ay magpapadala ngHTTP GETtanong sa espesipikong URL. Ang tugon ay ipagwawalang - bahala. Halimbawa, maaaring sabihan ng URL ang iba pang web service na gumawa ng isang bagay.
            * Kung ang URL ay may bahaging query (pagkatapos ng "?".) , ito ay UST na[naka-iskedyul ng porsiyento](https://en.wikipedia.org/wiki/Percent-encoding). Kailangan mong mag - isip ng pantanging mga tauhan sa mga pagbabawal (Kahit na ang unang '&' at ang pangunahin'='mga pagbabawal) sa anyong %H, kung saan ang HH ang 2 digit na hexadecimal na halaga ng karakter. Karaniwan, kailangan mo lamang gawing %25, & sa %26, " tungo sa %22,&lt;sa %3C, = sa %3D, &gt; sa %3E, + sa %2B,|sa %7C,\\[sa %5B,\\]sa %5D, ang espasyo sa %20, at ginagawa ang lahat ng mga character sa itaas #127 sa kanilang UTF-8 form at pagkatapos ay ang porte ng UTF-8 format (humingi ng tulong sa isang programmer) .
Halimbawa, &stationID&gt;="410004"
maging &stationID%3E=%2241004%22
Karaniwan nang kailangan ang percent calcation kapag mayroon kang makuhaERDDAPsa pamamagitan ng software maliban sa browser. Karaniwan nang pinangangasiwaan ng mga Browser ang pag - aayos ng mga porsiyento para sa iyo.
Sa ilang sitwasyon, kailangan mong bigyan ng porsiyento ang lahat ng karakter maliban sa A-Za-z0-9\\_-&#33; ' () \\*, ngunit hindi pa rin nai-record ang paunang '&' o ang pangunahin'='sa mga pagbabawal.
Ang mga wikang pamprograma ay may mga kasangkapan upang magawa ito (halimbawa, tingnanJava'[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)atJava[rip]encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) at mayroon
                [Mga website na pinag - aaralan ng porsiyento](https://www.url-encode-decode.com/).
            * Mula Noondatasets.xmlay isang XML file, ikaw MUST din &-encode all 'Bear', '&lt;', at '&gt;' sa URL bilang 'Lamp;', '&lt;', at 'ligt; pagkatapos ng porsyentong perpektibo.
            * Halimbawa: Para sa isang URL na maaari mong iuri sa isang browser bilang:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Dapat mong magtakda ng isang&lt;tag ng onChange&gt; sa pamamagitan ng (sa isang linya) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Kapag nagsimula ang aksiyon sa "mail",ERDDAP™ay magpapadala ng email sa susunod na adres ng email na nagpapahiwatig na ang dataset ay na-apdeyt/change.
Halimbawa:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onChange&gt; Kung may mabuti kang dahilanERDDAP™upang suportahan ang iba pang uri ng pagkilos, padalhan kami ng email na naglalarawan sa kung ano ang nais ninyo.
    * Ang tagong ito ay OPSYONAL. Maaaring magkaroon ng kasindami ng mga tag na ito na nais mo. Gamitin ang isa sa mga tag na ito para sa bawat aksiyong isasagawa.
    * Ito ay laban saERDDAP''s email/URL subscription system, ngunit ang mga aksiyong ito ay hindi palagiang nakaimbak (I.e., ang mga ito ay iniimbak lamang sa isang EDD na bagay) .
    * Upang alisin ang isang suskrisyon, alisin na lamang ang mga ito&lt;sa tag ngChange&gt;. Ang pagbabago ay mapapansin sa susunod na muli ang dataset.
         
#### &lt;Ay muling magkarga ng EveryNMinutes pgt;{#reloadeverynminutes} 
* [ ** &lt;Muling pagkarga Bawat INMinutes&gt; ** ] (Mga #reload offenminute) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlsa halos lahat ng uri ng dataset na nagsasabi kung gaano kadalas dapat ikargang muli ang dataset. Halimbawa,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Sa pangkalahatan, ang mga dataset na madalas magbago (halimbawa, kumuha ng mga bagong data files) Halimbawa, dapat na madalas na ikargang muli ang mga ito tuwing 60 minuto.
    * Halimbawa, ang mga impormasyon na bihirang magbago ay dapat na ikargang muli sa pana - panahon tuwing 1440 minuto (araw - araw) o 10080 minuto (linggu - linggo) .
    * Ang tag na ito ay OPSYONAL, subalit inirerekomenda. Ang default ay 10080.
    * Ang isang halimbawa ay:&lt;Muling pagkarga sa EveryNMinutes&gt;1440&lt;/ Larawan Bawat INMinutes&gt;
    * Kapag ang isang dataset ay muling ikarga, lahat ng files sa *Malaking Direktoryo* /cache/ *datasetID* Inalis ang directory.
    * Anuman ang nakatakda rito, ang isang dataset ay hindi mas madalas na ikarga kaysa&lt;"loadDatasetsMinMinutes&gt; " (default = 15) , gaya ng binanggit sa[setup.xml](/docs/server-admin/deploy-install#setupxml). Kaya kung nais mong muling maikarga ang mga datasets, kailangan ninyong i-set ang parehong reload EveryNMinutes at loadDatasets Bawasan ang maliliit na pamantayan.
    * Huwag magtakda ng mga reload personNMinute sa parehong halaga ng mga loadDataset Mga MinMinute, sapagkat malamang na lumipas ang panahon (halimbawa) 14:58 o 15:02, kaya ang dataset ay muling ididiskarga lamang sa halos kalahati ng mga pangunahing reload. Sa halip, gumamit ng mas maliit (halimbawa, 10) o mas malaki (halimbawa, 20) Muling pagkarga BawatNMinutes halaga.
    * Anuman ang gawin mo sa lahat ng pagkakataon, masasabi mo nang manu - manoERDDAP™upang muling magkarga ng espisipikong dataset sa lalong madaling panahon sa pamamagitan ng isang[talaksang flag](/docs/server-admin/additional-information#flag).
    * Para sa mga Mausyosong Programmeer -- Sa loobERDDAP™, ang muling pagkarga ng lahat ng datasets ay pinangangasiwaan ng dalawang solong mga sinulid. Ang isang sinulid ay nagsisimula ng isang maliit na muling pagkarga kung masumpungan nito ang isang talaksan ng bandila o isang malaking reload (na sumusuri sa lahat ng datasets upang makita kung kailangan itong muling ikarga) . Ang isa pang sinulid ay gumagawa ng aktuwal na muling pagkarga ng mga dataset nang isa-isa. Ang mga sinulid na ito ay gumagana sa background na tinitiyak na ang lahat ng datasets ay pinananatili up-to-date. Ang sinulid na aktuwal na nagdididiskarga ay naghahanda ng isang bagong bersiyon ng isang dataset pagkatapos ay pinapalitan ito (Palitan ng atomo ang lumang bersiyon) . Kaya posible na ang sumusunod na pagkakasunud - sunod ng mga pangyayari (Mabuti) :
        
        1.  ERDDAP™magsimulang magkarga muli ng dataset (gumagawa ng bagong bersiyon) sa likuran.
        2. Ang User 'A' ay gumagawa ng kahilingan sa dataset.ERDDAP™gamitin ang kasalukuyang bersyon ng dataset upang lumikha ng tugon. (Mabuti iyan. Walang pagkaantala para sa gumagamit, at ang kasalukuyang bersiyon ng dataset ay hindi kailanman dapat na maging masyadong matagal.) 
        3.  ERDDAP™Tatapos ang paglikha ng bagong loaded na bersyon ng dataset at palitan ng bagong bersyon na iyon sa produksiyon. Ang lahat ng kasunod na bagong mga kahilingan ay pinangangasiwaan ng bagong bersiyon ng dataset. Para sa pagiging hindi pabagu - bago, ang kahilingan ng gumagamit na A ay nasasapatan pa rin ng orihinal na bersiyon.
        4. Ang User 'B' ay humihiling sa dataset atERDDAP™gamitin ang bagong bersyon ng dataset upang lumikha ng tugon.
        5. Sa wakas ang mga kahilingan ng gumagamit ng A at gumagamit na si B ay natatapos (marahil Una munang natapos ang B) .
        
May naririnig akong nagsasabing, "Dalawang thredd lang&#33; Ha&#33; Iyan ay pilay&#33; Dapat niyang itakda ito upang ang muling pagkarga ng mga datasets ay gumagamit ng hangga't maraming sinulid na kinakailangan, kaya't ang lahat ay mas mabilis na nagagawa at may kaunti o walang lag." Oo at hindi. Ang problema ay na ang pagkarga ng mahigit sa isang dataset sa isang panahon ay lumilikha ng ilang mahirap na bagong mga problema. Silang lahat ay kailangang lutasin o pakitunguhan. Ang kasalukuyang sistema ay gumaganang mabuti at may mga problema sa paano man (halimbawa, ang potensiyal para sa lag bago mapansin ang isang bandila) . (Kung kailangan mo ng tulong sa pangangasiwa sa kanila, tingnan ang ating[sa pagkuha ng karagdagang suporta](/docs/intro#support).) Ang kaugnay[update Lahat ng Bagay](#updateeverynmillis). sistema ay gumagana sa loob ng mga hibla ng pagtugon, kaya ito ay maaari at talagang humahantong sa maraming datasets na binabago (hindi ang buong reload) Kasabay nito.
##### Muling aktibo{#proactive-vs-reactive} 
ERDDAP's reload system ay proactive-- ang datasets ay muling i-load sa lalong madaling panahon pagkatapos ng kanilang reload Tapos na ang bawat araw (I.e., ang mga ito ay nagiging "matatal", ngunit hindi kailanman tuluyang nawawala) , ito man ay dataset ay pagkuha ng mga kahilingan mula sa mga gumagamit o hindi. KayaERDDAP™Ang mga dataset ay laging up-to-date at handa para gamitin. Kabaligtaran ito ng paraan ng reaksiyon ng THEDDS: ang kahilingan ng gumagamit ang siyang nagsasabi sa THREDDS na suriin kung ang isang dataset ay wala na (maaaring ito ay lumang - luma) . Kung ito'y luma, ang THEDDS ay nagpapangyari sa gumagamit na maghintay (sa loob ng ilang minuto) habang ang dataset ay muling nakakarga.
        
#### &lt;update BawatNMilipinas{#updateeverynmillis} 
* [ ** &lt;updateE EveryNMillis&gt; ** ] (Mga #update offenmilli) ay isang OPSYONAL na tag sa loob ng isang&lt;tag ng datos&gt; sadatasets.xmlng ilang uri ng dataset na tumutulongERDDAP™gumagawa sa pamamagitan ng datasets na madalas magbago (sa tuwing halos bawat segundo) . Di - tuladERDDAP' regular, aktibo, [&lt;Muling pagkarga [[Talaksan] (Mga #reload offenminute) sistema para sa ganap na muling pagkarga ng bawat dataset, ang OPSIYAL na karagdagang sistemang ito ay reaksyonal (udyok ng isang kahilingan ng gumagamit) at mas mabilis sapagkat ito'y hindi makatuwiran (pagbibigay lamang ng impormasyon na kailangang baguhin) . Halimbawa, kung ikaw ay humilingEDDGridMula sa Dap dataset ay nangyayari ng higit pa sa espesipikong bilang ng mga millisecond mula noong huling update,ERDDAP™kung may anumang bagong pamantayan para sa kaliwa (Una, karaniwan nang"time") Sapat at, kung gayon, basta i - download ang bagong mga pamantayang iyon bago pangasiwaan ang kahilingan ng gumagamit. Ang sistemang ito ay napakahusay sa pagpapanatili ng isang mabilis na nagbabagong dataset up-to-date na may kaunting mga kahilingan sa data source, ngunit sa halaga ng bahagyang pagpapabagal sa pagpoproseso ng ilang mga kahilingan ng gumagamit.
    * Upang magamit ang sistemang ito, magdagdag (halimbawa) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
Pagkatapos ng&lt;Muling Pagkarga sa Bawat NMinutes&gt; tag para sa dataset sadatasets.xml. Ang bilang ng mga millisecond na tinukoy mo ay maaaring kasinliit ng 1 (upang matiyak na ang dataset ay laging up-to-date) . Halagang 0 (ang default) o ang isang negatibong numero ay pumapatay sa sistema.
    * Dahilan sa kanilang panloob na katangian, ang mga update ay dapat na matapos nang napakabilis, kaya ang mga gumagamit ay hindi dapat maghintay nang mahabang panahon.
    * Kung dumating ang ikalawang kahilingan ng datos bago matapos ang naunang update, ang ikalawang kahilingan ay hindi mag-uumpisa ng ibang update.
    * Sa buong dokumentasyon, sisikapin naming gamitin ang salitang "reload" para sa regular, buong dataset reloads, at "update" para sa mga bagong inkremental, particular updates na ito.
    * Para sa mga layuning pagsubok, ang ilang mga diagnostiko ay nililimbag upang magtala.txt kung [&lt;logLevel&gt;] (#loglevel) sa loobdatasets.xmlay nakatakda sa "lahat".
    * Kung gumagamit ka ng incremental updates at lalo na kung ang pinakakaliwa (una) Halimbawa, kapag malaki ang axis, baka gusto mong magtakda&lt;Muling ikarga ang EveryNMinutes&gt; sa mas malaking bilang (1440?) , kung kaya't ginagawa ng mga update ang karamihan ng gawain upang panatilihin ang dataset up-to-date, at ang mga buong reload ay ginagawa nang madalang.
    * Pansinin: ang bagong sistemang update na ito ng update ay nagre - update ng metadata (halimbawa, panahonactual\\_range, oras\\_coverage\\_end, ...) ngunit hindi nag-umpisa saChange (email o touch URL) o baguhin angRSSpagkain (Marahil...) .
    * Para sa lahat ng datos na gumagamit ng mga subclass ng[EDDGridMula sa mga Labi](#eddgridfromfiles)at[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles):
        *    **BABALA:** kapag dinagdagan mo ng bagong data file ang dataset sa pamamagitan ng pagkopya nito sa directoryERDDAP™Tingnan mo, may panganib naERDDAP™ang bahagyang nakasulat na talaksan; subukang basahin ito, ngunit nabigo dahil ang talaksan ay hindi kumpleto; ipahayag ang talaksan bilang isang "masamang" talaksan at tanggalin ito (pansamantalang) mula sa dataset.
Upang maiwasan ito, kami **MAHABANG RECOMMEND** na kopyahin mo ang isang bagong file sa directory na may pansamantalang pangalan (halimbawa, 20150226.ncHimp) na hindi tumutugma sa talaksang datasets Pangalang Regex (\\*\\.nc) , pagkatapos ay palitan ng pangalan ang talaksan sa tamang pangalan (halimbawa, 20150226.nc) . Kung gagamitin mo ang paraang ito,ERDDAP™ang pansamantalang talaksan at pansinin lamang ang tamang pangalan ng talaksan kapag ito ay kumpleto na at handa nang gamitin.
        * Kung babaguhin mo ang umiiral na mga datafile (Halimbawa, magdagdag ng bagong punto ng datos) ,&lt;Ang update EveryNMillis&gt; ay magiging mabisa kung ang mga pagbabago ay lalabas sa atomikong paraan (sa isang iglap) at ang talaksan ay laging tanggap na talaksan. Halimbawa, ang aklatan ng netcdf-java ay nagpapahintulot ng mga karagdagan sa walang hangganang dimensiyon ng isang "classic".ncv3 talaksan na gagawing atomiko.
            &lt;Ang update na EveryNMillis&gt; ay magiging masama kung ang file ay hindi tanggap habang ginagawa ang mga pagbabago.
        *   &lt;Ang update EveryNMillis&gt; ay magiging mahusay para sa datasets kung saan ang isa o ilang files ay nagbabago sa maikling panahon.
        *   &lt;Ang update EveryNMillis&gt; ay hindi gagana para sa datasets kung saan ang isang malaking bilang ng mga file ay nagbabago sa maikling panahon (malibang ang mga pagbabago ay lumitaw sa atomikong paraan) . Para sa mga dataset na ito, mas mabuting hindi gamitin&lt;update EveryNMillis&gt; at magtakda ng[bandila](/docs/server-admin/additional-information#set-dataset-flag)upang magsumbongERDDAP™upang muling maikarga ang dataset.
        *   &lt;updateE EveryNMillis&gt; ay hindi nagre - update ng impormasyong nauugnay sa [&lt;subsetVariables&gt;] (Mga #subsetvariable) . Karaniwan na, hindi ito problema, sapagkat angsubsetVariablesmay impormasyon tungkol sa mga bagay na hindi gaanong nagbabago (Halimbawa, ang talaan ng mga pangalan ng istasyon, latitud, at longhitud) . Kung gayonsubsetVariablespagbabago ng datos (Halimbawa, kapag idinagdag ang bagong istasyon sa dataset) , pagkatapos ay makipag - ugnayan sa[URL ng watawat](/docs/server-admin/additional-information#set-dataset-flag)para sa datos na sasabihinERDDAP™upang muling maikarga ang dataset. Kung hindi,ERDDAP™ay hindi mapapansin ang bagong subset Babagu-bago ang impormasyon hanggang sa susunod na muling maikarga ang dataset (salit-salit ang dataset)&lt;Ikarga muli ang EveryNMinutes&gt;).
        * Ang aming panlahat na rekomendasyon ay gamitin:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * MABUTI? Sa mga computer na Linux, kung ginagamit mo&lt;updateE EveryNMillis&gt; kasamaEDDGridMula sa mga Batangas o EDDTable FromFiles class, maaaring makita mo ang isang problema kung saan ang isang dataset ay hindi nakapagkarga (Paminsan - minsan o walang pagbabago) na may maling mensahe: "IOException: User limit of intoficial cases umabot o napakaraming bukas na files". Ang sanhi ay maaaring isang bug inJavana nagpapangyari sa mga pagkakataon na hindi makolekta ang basura. Iniiwasan ang problemang itoERDDAP™v1.66 at mas mataas. Kaya ang pinakamabuting solusyon ay palitan ang pinakabagong bersiyon ngERDDAP.
Kung hindi nito malutas ang problema (samakatuwid nga, kung mayroon kang malaking bilang ng datasets na ginagamit ang&lt;update EveryNMillis&gt;), malulutas mo ang problemang ito sa pamamagitan ng pagtawag:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
O, gumamit ng mas mataas na bilang kung ang problema ay nagpapatuloy. Ang default para sa relos ay 8192. Ang default para sa mga pagkakataon ay 128.
    * Maaari mong ilagay&lt;updateMax Advents&gt;10&lt;/updateMax ults&gt; sa loobdatasets.xml  (kasama ng iba pang mga tagpo malapit sa itaas) upang baguhin ang pinakamaraming bilang ng mga pagbabago sa talaksan (default=10) na ipoproseso ng sistemang update EveryNMillis. Ang mas malaking bilang ay maaaring maging kapaki-pakinabang para sa dataset na kung saan ay napakahalaga na ang mga ito ay palaging panatilihin up-to-date. Tingnan ang[Dokumentasyon ng updateMax](#updatemaxevents).
    * Para sa mga Mausyosong Programmer - ang mga inkremental update na ito, hindi katuladERDDAP‘ Punô[Muling Pagkarga sa Bawat IMinuto](#reloadeverynminutes)sistema, mangyari sa loob ng gumagamit ang mga sinulid. Kaya, ang anumang bilang ng mga dataset ay maaaring sabay na mag-update. May kodigo (at isang kandado) upang matiyak na isang sinulid lamang ang gumagawa sa isang update para sa anumang ibinigay na dataset sa anumang espesipikong sandali. Madaling magbigay ng maramihang sabay - sabay na update; mas mahirap na pahintulutan ang maramihan at sabay - sabay na fullloads.
         
#### &lt;sourceCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;sourceCanConstrainStringEQNE&gt; ** ] (#sourcecanconstrain shuteqne) ay isang OPSYONAL na tag sa loob ng isang EDDTable&lt;tag ng datos&gt; sadatasets.xmlna nagsasabi kung makapipigil sa String variables ang &#33;
    * Para sa EDDTable FromDapSequence, ito ay kumakapit sa panlabas na pagkakasunud-sunod na String variables lamang. Ipinapalagay na hindi kayang hawakan ng pinagmumulan ang anumang limitasyon sa panloob na pagkakasunud - sunod na mga pagbabago.
    * Ang tagong ito ay OPSYONAL. Totoo ang makatuwirang mga pamantayan (ang default) at kabulaanan.
    * Para sa Mapagkakatiwalaang Pag - iingatOPeNDAPDRDS servers, ito ay dapat na itatag sa katotohanan (ang default) .
    * Para sa Mapagkakatiwalaang Pag - iingat Dapper servers, ito ay dapat na pamaliin.
    * Ang isang halimbawa ay:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;Ang sourceConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;sourceCanConstrainStringGTLT&gt; ** ] (#sourcecanconstrain snailtlt) ay isang OPSYONAL na tag sa loob ng isang EDDTable&lt;tag ng dataset&gt; na nagsasabi kung maaaring pigilin ng pinagmumulan ang String variables&lt;,&lt;=, &gt;, at &gt;= operators.
    * Para sa EDDTable FromDapSequence, ito ay kumakapit sa panlabas na pagkakasunud-sunod na String variables lamang. Ipinapalagay na hindi kayang hawakan ng pinagmumulan ang anumang limitasyon sa panloob na pagkakasunud - sunod na mga pagbabago.
    * Totoo ang makatuwirang mga pamantayan (ang default) at kabulaanan.
    * Ang tagong ito ay OPSYONAL. Totoo ang default.
    * Para sa Mapagkakatiwalaang Pag - iingatOPeNDAPDRDS servers, ito ay dapat na itatag sa katotohanan (ang default) .
    * Para sa Mapagkakatiwalaang Pag - iingat Dapper servers, ito ay dapat na pamaliin.
    * Ang isang halimbawa ay:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;Ang sourceCanConstrainStringRegex&gt; ** ] (#sourcecanconstrain snaregex) ay isang OPSYONAL na tag sa loob ng isang EDDTable&lt;tag ng dataset&gt; na nagsasabi kung ang pinagkunan ay maaaring humadlang sa String variables sa pamamagitan ng regular na mga ekspresyon, at kung gayon, kung ano ang operator.
    * Epektibong mga pagpapahalaga ay "=isensiya" (angDAPPamantayan) , "~=" (Sawi ang pagsuporta ng maramiDAPmga server) , o "" (Ipinakikita na hindi sinusuportahan ng pinagmumulan ang regular na mga pananalita) .
    * Ang tagong ito ay OPSYONAL. Ang default ay "".
    * Para sa Mapagkakatiwalaang Pag - iingatOPeNDAPDRDS servers, ito ay dapat itakda sa "" (ang default) .
    * Para sa Mapagkakatiwalaang Pag - iingat Dapper servers, ito ay dapat itakda sa "" (ang default) .
    * Ang isang halimbawa ay:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sourceCanDistinct&gt;{#sourcecandodistinct} 
* [ ** &lt;Ang sourceCanDistinct&gt; ** ] (Ang #sourcecando ay malabo) ay isang OPSYONAL na tag sa loob ng isang EDDTable FromDatabase&lt;tag ng datos&gt; na nagsasabi kung ang pinagkunang database ay dapat humawak at maglabo () Ang mga pagbabawal sa mga queries ng gumagamit.
    * Ang tagong ito ay OPSYONAL. Ang makatuwirang mga pamantayan ay hindi (ERDDAP™Nagpakita ng pagkakaiba; ang default) , bahagi (ang naiiba at pinagmumulan ng impormasyonERDDAP™hawakan itong muli) , at oo (ang naiibang pinagmulan) .
    * Kung ikaw ay hindi gumagamit atERDDAP™ay nawawalan ng alaala kapag humahawak ng naiiba, gumamit ng oo.
    * Kung ikaw ay gumagamit ng oo at ang pinagkukunang database ay marahang humahawak, gumamit ng hindi.
    * Ang partial ay nagbibigay sa iyo ng pinakamasama sa dalawang ito: ito ay mabagal sapagkat ang database na humahawak ng magkaibang bagay ay mabagal at ito ay maaaring maubusan ng memoryaERDDAP.
    * Binibigyang - kahulugan ng mga Databas ang DISTINCT bilang isang kahilingan para sa natatanging mga hanay ng mga resulta, samantalang ang mga ito ay isang kahilingan para sa natatanging mga hanay lamang ng mga resulta, samantalangERDDAP™ay nagbibigay - kahulugan dito bilang isang kahilingan para sa isang bukod - tanging talaan ng natatanging mga hanay ng mga resulta. Kung ilalagay mo ito sa bahagya o oo,ERDDAP™Kusa ring sinasabihan ang database na ayusin ang mga resulta.
    * Isang maliit na pagkakaiba sa mga resulta:
Walang|bahagi,ERDDAP™" sa pasimula ng mga resulta (bago ang non-"" na mga strando) .
Sa pamamagitan ng oo, ang database ay maaaring (Susuko) "uri" sa katapusan ng mga resulta (pagkatapos ng non-"" strings) .
Sa palagay ko'y maaapektuhan din nito ang pag - uuri ng maiikling salita laban sa mas mahahabang salita na nagsisimula sa maikling salita. Halimbawa,ERDDAP™ang "Simon" sa harap ng "Simons".
    * Ang isang halimbawa ay:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;sourceCanOrder By gt;{#sourcecanorderby} 
* [ ** &lt;pinagmulan Canorder by&gt; ** ] (#sourcecanorderby) ay isang OPSYONAL na tag sa loob ng isang EDDTable FromDatabase&lt;tag ng datos&gt; na nagsasabi kung ang source database ay dapat humawak ng &orderBy (...) Ang mga pagbabawal sa mga queries ng gumagamit.
    * Ang tagong ito ay OPSYONAL. Ang makatuwirang mga pamantayan ay hindi (ERDDAP™hawakanorderBy (...) ; ang default) , bahagi (ang source handresorderByatERDDAP™hawakan itong muli) , at oo (ang source handresorderBy (...) ) .
    * Kung ikaw ay hindi gumagamit atERDDAP™ay nawawalan ng memorya kapag humahawakorderBy (...) , gamitin ang oo.
    * Kung ikaw ay gumagamit ng oo at ang pinagkukunang database ang humahawakorderBy (...) masyadong mabagal, gumamit ng hindi.
    * Ang partial ay nagbibigay sa iyo ng pinakamasama sa dalawang ito: ito ay mabagal sapagkat ang database ay humahawak ng databaseorderBy (...) ay mabagal at maaaring hindi na matandaanERDDAP.
    * Isang maliit na pagkakaiba sa mga resulta:
Walang|bahagi,ERDDAP™" sa pasimula ng mga resulta (bago ang non-"" na mga strando) .
Sa pamamagitan ng oo, ang database ay maaaring (Susuko) "uri" sa katapusan ng mga resulta (pagkatapos ng non-"" strings) .
Maaari rin itong makaapekto sa pag-uuri ng maiikling salita laban sa mas mahabang mga salita na nagsisimula sa maikling salita. Halimbawa,ERDDAP™ang "Simon" sa harap ng "Simons", ngunit hindi ko tiyak kung paano sila pag-uriin ng database.
    * Ang isang halimbawa ay:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sourceNeedsExpandFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;sourceNeedsExpandFP\\_EQ&gt; ** ] (#sourceneedsexpandedfp_eq) ay isang OPSYONAL na tag sa loob ng isang EDDTable&lt;tag ng datos&gt; na nagsasabi (totoo (ang default) o kabulaanan) kung ang pinagmumulan ay nangangailangan ng tulong sa pagtatanong&lt;numeriko Binago&gt;=&lt;Paglutang ng PointValue&gt; (at &#33;=, &gt;=,&lt;=). Halimbawa,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Para sa ilang mapagkukunan ng datos, ang mga numerikong queries na kinasasangkutan ng =, &#33;=,&lt;=, o &gt;= ay maaaring hindi gumana na gaya ng nais sa lumulutang na mga numero. Halimbawa, ang isang paghahanap ng longhitud=220.2 ay maaaring mabigo kung ang halaga ay naimbak bilang 220.200000000000000000000001.
    * Ang problemang ito ay bumabangon sapagkat ang lumulutang na mga punto number ay[hindi kinakatawan nang eksakto sa loob ng mga computer](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Kung ang sourceNeedsExpandFP\\_EQ ay nakatakdang magkatotoo (ang default) ,ERDDAP™ang mga katanungan na ipinadala sa pinagkukunan ng impormasyon upang maiwasan ang problemang ito. Sa tuwina'y ligtas at mainam na hayaang magkatotoo ito.
         
#### &lt;sourceUrl;{#sourceurl} 
* [ ** &lt;sourceUrl&gt; ** ] (#sourceurl) ay karaniwang tag sa loob ng isang pangglobong dataset&lt;addAttributes&gt; tag na nagsasabi sa URL na siyang pinagmumulan ng impormasyon.
    * Ang isang halimbawa ay:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (ngunit ilagay ang lahat ng ito sa iisang linya) 
    * Sa loobERDDAP™, lahat ng datasets ay magkakaroon ng "sourceUrl" sa pinagsamang pangglobong mga katangian na ipinakikita sa mga gumagamit.
    * Para sa karamihan ng mga uri ng dataset, ang tag na ito ay REQURED. Tingnan ang paglalarawan ng dataset type upang malaman kung ito ay REQURED o hindi.
    * Para sa ilang datasets, ang hiwalay&lt;sourceUrl&gt; Hindi pinahihintulutan ang tag. Sa halip, dapat kayong maglaan ng isang "sourceUrl"[pangglobong Katangian](#global-attributes), karaniwan sa globo \\&gt;addAttributes&lt;. Kung walang aktuwal na mapagkukunan URL (Halimbawa, kung ang impormasyon ay nakaimbak sa lokal na mga file) , ang katangiang ito ay kadalasang may hawak lamang na halaga, halimbawa,&lt;Pangalang= "pangalan"&gt; (lokal na talaksan) &lt;/att&gt; .
    * Para sa karamihan ng mga dataset, ito ang himpilan ng URL na ginagamit upang humiling ng datos. Halimbawa, halimbawa,DAPMga server, ito ang URL na maaaring idagdag .dods, .das, .dds, o .html.
    * Mula Noondatasets.xmlay isang XML file, ikaw MUST ay nag-encode din ng '&', '&lt;', at '&gt;' sa URL bilang 'Lamp;', '&lt;', at 'gt'.
    * Para sa karamihan ng mga uri ng dataset,ERDDAP™sabi pa ng orihinalsourceUrl  (ang "localSourceUrl" sa source code) sa[Pangglobong mga katangian](#global-attributes)  (kung saan ito ay nagiging "publicSourceUrl" sa source code) . Kapag ang pinagkukunan ng datos ay lokal na mga file,ERDDAP™susog pasourceUrl=" (lokal na talaksan) " sa pangglobong mga katangian bilang isang pag - iingat sa seguridad. Kapag ang pinagkukunan ng datos ay isang database,ERDDAP™susog pasourceUrl=" (source database) " sa pangglobong mga katangian bilang isang pag - iingat sa seguridad. Kung ang ilan sa iyong datasets ay gumagamit ng non-publicsourceUrl' (Karaniwan nang dahil sa ang kanilang computer ay nasa iyong DMZ o nasa lokal na LAN) [&lt;kumbinasyon sa PubliSourceUrl&gt;] (#convertto Publicsourceurl) Mga tag upang tiyakin kung paano kukumbertehin ang lokalsourceUrlmga s sa publikosourceUrls.
    * AsourceUrlay maaaring magsimula sahttp://,https://, ftp://, at marahil iba pang mga unlapi.httpsMga koneksiyon basahin at tingnan ang digital na sertipiko ng pinagkunan upang matiyak na ang pinagkunan ay kung sino sila. Sa mga bihirang kaso, ang tsekeng ito ay maaaring mabigo sa pagkakamaling "javax.net.ssl.SLProtocolException: pakikipagkamay na alerto: hindi kilalang\\_name". Ito marahil ay dahil sa pangalan ng nasasakupan sa sertipiko na hindi tumutugma sa pangalan ng nasasakupan na ginagamit mo. Maaari at dapat mong basahin ang mga detalye ngsourceUrl''s sertipiko sa inyong web browser, lalo na, ang listahan ng "DNS Name" sa seksiyong "Sober Alternative Name".
        
Sa ilang kaso, ang ilan aysourceUrlMaaaring ang ginagamit mo ay alyas ng pangalan ng nasasakupan sa sertipiko. Halimbawa,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ang pagkakamaling ito, subalit
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , na gumagamit ng tatak ng domain sa sertipiko, ay hindi. Kaya ang solusyon sa mga kasong ito ay hanapin at gamitin ang pangalan ng nasasakupan sa sertipiko. Kung hindi mo ito makita sa sertipiko, makipag - ugnayan sa data provider.
        
Sa ibang kaso, ang pangalan ng nasasakupan sa sertipiko ay maaaring para sa isang grupo ng mga pangalan. Kung mangyari ito o ang problema ay hindi maaaring lutasin, pakisuyong email Chris. John sa noa.gov upang iulat ang problema.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt;addAttributes&gt; ** ] (#Adattributes) ay isang OPSYONAL na tag para sa bawat dataset at para sa bawat variable na nagpapahintulot ngERDDAPKontrolado ng mga administrador ang mga katangiang metadata na nauugnay sa isang dataset at mga variable nito.
    *   ERDDAP™pinagsasama ang mga katangian mula sa pinagkunan ng datos ("Lource Attributes") at ang "addAttributes" na binibigyang - kahulugan modatasets.xml  (na may priyoridad) upang gawin ang "combined Attributes", na siyangERDDAP™ang tanong ng mga gumagamit. Sa gayon, magagamit moaddAttributesupang baguhin ang mga halaga ng pinagmumulang attributes, magdagdag ng bagong mga katangian, o alisin ang mga katangian.
    * Ang&lt;addAttributes&gt; naglakip ng 0 o higit pa ** &lt;att&gt; ** Mga subtag, na ginagamit upang tukuyin ang indibiduwal na mga katangian.
    * Ang bawat attribute ay may pangalan at halaga (na may espesipikong uri ng datos, halimbawa, doble) .
    * Iisa lamang ang katangian na may ibinigay na pangalan. Kung mayroon pa, ang huli ang dapat unahin.
    * Ang halaga ay maaaring maging isang nag-iisang halaga o isang space-publish na talaan ng mga halaga.
    * Syntax
        * Ang utos&lt;att&gt; subtag sa loobaddAttributesay hindi mahalaga.
        * Ang&lt;att&gt; subtag format ay
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Ang pangalan ng lahat ng katangian ng patutunguhan na MUST ay nagsisimula sa isang liham (A-Z, a-z) at MUST ay naglalaman lamang ng mga karakter na A-Z, a-z, 0-9, o '\\_'.
        * Kung mayroon&lt;att&gt; subtag ay walang halaga o halaga ng null, ang attribute na iyon ay aalisin sa pinagsamang mga katangian.
Halimbawa,&lt;Pangalang= "rows" /&gt; ay mag-aalis ng mga hanay mula sa mga pinagsamang katangian.
Halimbawa,&lt;Pangalang= "coordinates"&gt;null&lt;/att&gt; ang mga coordinate mula sa mga pinagsamang katangian.
##### attribute Uri{#attributetype} 
* [ Ang OPSYONAL na halaga ng tipo ng titik para sa&lt;att&gt; subtags] (#attributype) ang uri ng datos para sa mga halaga. Ang default type ay String. Ang isang halimbawa ng isang String attribute ay:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Ang mahuhusay na uri para sa iisang pamantayan ay byte (8-bit integer) , maikli (16-bit na nilagdaang integer) , int (32-bit na nilagdaang integer) , mahaba (64-bit na nilagdaang integer) , lumutang (32-bit lumulutang na punto) , doble (64-bit lumulutang na punto) , char, at String. Halimbawa,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Tingnan ang mga notang ito tungkol sa[char data type](#char).
Tingnan ang mga notang ito tungkol sa[mahabang datos na uri](#long).
        
    * Epektibong mga uri para sa mga space-weak na listahan ng mga halaga (o nag - iisang pamantayan) ay bytList, shortList, unsignedShortList, charList, intList, longList, boatList, double Listahan. Halimbawa,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Ang isang hindi naka-signedShortList ay nagpapahintulot sa iyo na magtakda ng isang listahan ng mga unsigned shorts, ngunit ang mga ito ay gagawing isang talaan ng mga katumbas na Unicode character (e.g., "65 67 69" ay gagawing "A C E".
Kung itinalaga mo ang isang charList, mag - isip ng anumang pantanging mga karakter (hal.g., espasyo, dobleng mga sinipi, backslash,&lt;#32, o &gt;#127) gaya ng pag - iukit mo sa mga ito sa bahaging datos ng isang talaksang NCCSV (e.g., ", "\\" o "", "\\\\\\", "\\ \\","\\n", "\\u20ac") .
Walang stringList. Itago ang mga halaga ng String bilang isang multi-line String. Halimbawa,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Pangglobong mga Attribo{#global-attributes} 
* [ ** Pangglobong mga Attribo / Pangglobong Daigdig&lt;addAttributes&gt; ** ] (#Global-attributes) --
    &lt;addAttributes&gt; ay OPSYONAL na tag sa loob ng&lt;dataset&gt; tag na ginagamit upang baguhin ang mga attribute na kumakapit sa buong dataset.
    
    *    ** Gamitin ang Daigdig&lt;addAttributes&gt; baguhin ang mga katangian ng dataset sa buong mundo. ** ERDDAP™Pinagsasama ang mga katangiang global mula sa pinagmulan ng dataset (pinagmulan ng datos)** Pinagmulan **) at ang pangglobo** addAttributes **kung ano ang kahulugan ngdatasets.xml  (na may priyoridad) upang gawing pangglobo** Pinagsamang mga Attributes ** , alin angERDDAP™ang tanong ng mga gumagamit. Sa gayon, magagamit moaddAttributesupang baguhin ang mga halaga ng pinagmumulang attributes, magdagdag ng bagong mga katangian, o alisin ang mga katangian.
    * Tingnan ang [ ** &lt;addAttributes&gt; **ng impormasyon... (#Adattributes) na kumakapit sa pangglobo at iba't ibang bagay** &lt;addAttributes&gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)at[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata -- Karaniwan na,ERDDAP™ay awtomatikong lilikha ng ISO 19115-2/19139 at FGDC (FGDC-STD-001-1998) XML metadata files para sa bawat dataset gamit ang impormasyon mula sa metadata ng dataset. Kaya, **ang mabuting dataset metadataERDDAP- Hinango ISO 19115 at FGDC metadata. Pakisuyong isaalang - alang ang paglalaan ng maraming panahon at pagsisikap upang pagbutihin ang metadata ng iyong datos (na mabuting gawin sa paano man) .** Karamihan sa mga dataset metadata attribute na ginagamit upang lumikha ng ISO 19115 at FGDC metadata ay mula sa[Pamantayan ng ACDD metadata](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)at gayon ang napansin sa ibaba.
    * Maraming pangglobong mga katangian ang natatangi sa bagay na iyanERDDAP™Hanapin ang mga ito at gamitin sa iba't ibang paraan. Halimbawa, ang kaugnayan sainfoUrlay kasama sa mga web page na may listahan ng mga dataset, at iba pang mga lugar, upang higit pang malaman ng mga gumagamit nito ang tungkol sa dataset.
    * Kapag pumipili ang gumagamit ng isang subset ng datos, ang global Attributes na may kaugnayan sa longhitud, latitud, altitud ng variable (o lalim) , at haba ng panahon (Halimbawa, ang pinakatimugang\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) ay awtomatikong nililikha o binabago.
    * Isang simpleng sampol sa buong globo&lt;addAttributes&gt; ay:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Ang walang laman na cwhdf\\_version attribute ang nagiging sanhi ng source cwhdf\\_version attribute (kung mayroon) na aalisin sa panghuli at pinagsamang talaan ng mga katangian.
    * Ang pagtutustos ng impormasyong ito ay nakatutulongERDDAP™gumawa ng mas mabuting trabaho at tulungan ang mga gumagamit nito na maunawaan ang mga dataset.
Ang mahusay na metadata ay gumagawa sa isang dataset na magagamit.
Ang insufficient metadata ay gumagawa sa isang dataset na walang silbi.
Pakisuyong maglaan ng panahon upang gumawa ng mabuting trabaho taglay ang metadata na mga katangian.
##### Pantanging pangglobong mga katangian saERDDAP™
###### Pagkilala{#acknowledgement} 
*   [ **Pagkilala** ](#acknowledgement)at **Pagkilala**   (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang RECOMENDONG paraan upang kilalanin ang grupo o mga grupo na naglalaan ng suporta (Partikular, ang pananalapi) para sa proyektong lumikha ng datos na ito. Halimbawa,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Pansinin na ginamit ng ACD 1.0 at 1.1 ang baybay na "acknowledgment". (na karaniwang baybay sa U.S.) , ngunit binago ito ng ACD 1.3 sa "pagkaalam". (na karaniwang baybay sa U.K.) . Nauunawaan ko na ang pagbabago ay talagang isang aksidente at na tiyak na hindi nila nakilala ang mga pagbabago. Anong laking gulo&#33; Ngayon ay may milyun-milyong data files sa buong mundo na may "backnowledgment" at milyun-milyon na may "acnowment". Itinatampok nito ang kamangmangan ng "simpleng" mga pagbabago tungo sa isang pamantayan, at idiniriin ang pangangailangan ng katatagan sa mga pamantayan. Sapagkat ang ACDD 1.3 (na bersiyon ng ACDDERDDAP™suporta) sabi ng "acnowment", iyan nga angERDDAP™  (Partikular na ang mga GenerateDataset Xml) nakapagpapasigla.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)ay para lamang sa EDDTable datasets na walang taas o lalim na variable ngunit may variable na isang proxy para sa taas o lalim (Halimbawa, presyon, sigma, bottleNumber) , maaaring gamitin mo ang katangiang ito upang makilala ang kakaibang katangiang iyan. Halimbawa,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Kung gayon[cdm\\_data\\_type](#cdm_data_type)ay Profile o TrajectoryProfile at walang altitud o lalim na variable, cdm\\_altude\\_proxy MUST ay bigyan ng kahulugan. Kung ang cdm\\_altitude\\_proxy ay binigyang kahulugan,ERDDAP™ang sumusunod na metadata sa variable: \\_Cordinate AxisType=Hight and axis=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang pangglobong katangian na nagpapahiwatig ngUnidata [Karaniwang Modelo ng Data](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)tipo ng datos para sa dataset. Halimbawa,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
Ang CDM ay evolving pa rin at maaaring magbago muli.ERDDAP™Mga kaugnayan sa kaugnay at mas detalyado[Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kabanata ng[CF 1.6](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Mga kombensiyon ng metadata (Dating tinatawag na CF Point Observation Conventions) .
    * Alinman sa pangglobong dataset[Pinagmulan](#global-attributes)o ang globo nito&lt;addAttributes&gt; Ang MUST ay kinabibilangan ng cdm\\_data\\_type attribute. Ilang uri ng datos (Tulad ng EDDTE Mula sa Obis) ang kusang maglalagay nito.
    * SapagkatEDDGridmga dataset, ang cdm\\_data\\_type option ay Grid (default at ang pinakakaraniwang uri para saEDDGriddatos) , MovingGrid, Other, Point, Profile, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory, at TrajectoryProfile. Sa kasalukuyan,EDDGriday hindi humihiling na tiyakin ang anumang kaugnay na metadata, ni sinusuri man nito na ang impormasyon ay katugma ng cdm\\_data\\_type. Iyan marahil ay magbabago sa malapit na hinaharap.
    * Ang EDDTable ay gumagamit ng cdm\\_data\\_type sa isang mahigpit na paraan, kasunod ng DSG ni CF sa halip ng CDM, na sa ilang kadahilanan ay hindi binago upang maging hindi tumutugma sa DSG. Kung ang metadata ng dataset ay hindi sumusunod saERDDAP' s cdm\\_data\\_type's mga kahilingan (Tingnan ang ibaba) , ang dataset ay hindi magkarga at lilikha ng isang[error sa mensahe](#troubleshooting-tips). (Mabuti iyan, sa diwa na sasabihin sa iyo ng maling mensahe kung ano ang mali upang maayos mo ito.) At kung ang dataset's data ay hindi tumutugma sa metadata setup ng dataset (e.g., kung mayroong higit sa isang latitud na halaga para sa isang ibinigay na istasyon sa isang timesset) , ang ilang mga kahilingan para sa datos ay magbabalik ng maling datos sa tugon. Kaya tiyaking tama ang lahat ng ito.
        
Para sa lahat ng impormasyong ito, sa mga Kombensiyon at saMetadata\\_ConventionsMga katangiang pandaigdig, pakisuyong tumukoy sa CF-1.6 (hindi CF-1.0, 1.1, 1.2, 1.3, 1.4, o 1.5) , dahil ang CF-1.6 ay ang unang bersyon na kinabibilangan ng mga pagbabagong may kaugnayan sa Discrete Sampling Geometry (DSG) Mga kombensiyon.
        *   **ERDDAP™ay may hindi-simpleng relasyon sa CF DSG** 
        *   ERDDAP™ay maaaring gumawa ng tanggap na DSG dataset mula sa source dataset na isa nang tanggap na talaksang DSG (s) , o labas sa isang source dataset na hindi naka-set para sa DSG ngunit magagawa ito sa pamamagitan ng mga pagbabago tungo sa metadata (ang ilan ditoERDDAP-specific upang magbigay ng mas pangkalahatang pamamaraan sa pagtatakda ng DSG setup) .
        *   ERDDAP™ay gumagawa ng maraming pagsubok sa katotohanan kapag ito'y nagkarga ng dataset. Kung ang dataset na may cdm\\_data\\_type (ofeatureType) Isaalang - alang ang matagumpay na pagkakargaERDDAP™, pagkataposERDDAP™ay nagsasabi na ang dataset ay nakatutugon sa mga kahilingan ng DSG (Kung hindi,ERDDAP™ay maghaharap ng eksepsiyon sa pagpapaliwanag ng unang problema na nasumpungan nito) .
BABALA: Lumilitaw na nakaaabot sa DSG ang isang matagumpay na dataset (ito ay may tamang kombinasyon ng mga katangian) , subalit maaari pa ring di - wastong itatag, na humahantong sa maling mga resulta.ncCF at.ncCFMA reaction files. (Ang software ay matalino sa ilang paraan at walang pahiwatig sa iba.) 
        * Kapag tiningnan mo ang metadata ng dataset saERDDAP™, ang DSG dataset ay lumilitaw na nasaERDDAP' panloob na format (isang higante, database-tulad ng mesa) . Hindi ito nasa isa sa mga DSG format (e.g., ang dimensiyon at metadata ay hindi tama) , ngunit ang impormasyong kailangan upang gamutin ang dataset bilang isang DSG dataset ay nasa metadata (Halimbawa, cdm\\_data\\_type=Timeseries at cdm\\_timeseries\\_variables= *Mga ACsvList FromstationRelatedVariable* sa pangglobong metadata at cf\\_role=timeseries\\_id para sa ilang mga variable) .
        * Kung ang gumagamit ay humiling ng isang subset ng dataset sa isang.ncCF (isang taon.ncfile sa contiguous Raged Array file format ng DSG) o.ncCFMA file (a.ncfile sa Multidimensional Array file format ng DSG) , ang talaksang iyon ay magiging isang tanggap na talaksang CF DSG.
BABALA: Gayunman, kung ang dataset ay hindi tama (Upang ang mga pangakong ginawa ng metadata ay hindi totoo) , kung gayon ang talaksan ng pagtugon ay may bisa sa teknikal na paraan subalit ito ay magiging mali sa ilang paraan.
             
###### EDDTable cdm_data_types
* Para sa EDDTable datasets, ang cdm\\_data\\_type opsyon (at kaugnay na mga kahilingan saERDDAP) Ay
###### Punto{#point} 
*   [Punto](#point)- ay para sa isang set ng mga sukat na kinuha sa hindi magkakaugnay na panahon at lokasyon.
    * Katulad ng lahat ng cdm\\_data\\_types bukod sa Iba, ang Point datasets MUST ay may longhitud, latitud, at mga variables ng oras.
###### Larawan{#profile} 
*   [Larawan](#profile)- ay isang set ng sukat na lahat ay kinuha sa isang panahon, sa isang latitud na lugar, subalit sa higit sa isang lalim (o altitud) . Ang dataset ay maaaring isang koleksiyon ng mga Profile na ito, halimbawa, 7 profile mula sa iba't ibang lokasyon. Itong cdm\\_data\\_type ay hindi nagpapahiwatig ng anumang lohikal na koneksiyon sa pagitan ng alinman sa mga profile.
    
* Isa sa mga Iba't Ibang Bagay (Halimbawa, tingnan ang\\_number) Ang MUST ay may variable attribute na cf\\_role=profile\\_id upang matukoy ang variable na natatanging nagpapakilala sa mga profile.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Kung walang ibang bagay ang angkop, isaalang - alang ang paggamit ng panahon na iba - iba.
###### cdm\\_profile\\_variables{#cdm_profile_variables} 
* Kabilang sa dataset na MUST ang global Attribute[cdm\\_profile\\_variables](#cdm_profile_variables), kung saan ang halaga ay isang comma-nahating listahan ng mga variable na may impormasyon tungkol sa bawat profile. Para sa isang ibinigay na profile, ang mga pagpapahalaga ng mga variable na ito na MUST ay hindi nagbabago. Halimbawa,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Kabilang sa talaan ng MUST ang f_role=profile\\_id variable at lahat ng iba pang mga variables na may impormasyon tungkol sa profile, at oras, latitud at longhitud.
Hindi kailanman isasama sa talaan ang altitud, lalim, o anumang mga visual variables.
     

\\[Opinyon: cdm\\_data\\_type=Profile ang bihirang gamitin. Sa pagsasagawa, ang isang ibinigay na dataset ay karaniwang aktuwal na alinman sa isang TimeSeriesProfile (Mga katangian sa isang itinakdang posisyon) o Isang TrajectoryProfile (Mga larawan sa kahabaan ng isang trajectory) , at gayundin ang dapat na wastong makilala bilang gayon.\\]  
###### Mga Orasan{#timeseries} 
*   [Mga Orasan](#timeseries)- ay isang pagkakasunod-sunod ng mga sukat (e.g., temperatura ng tubig sa dagat) kinuha sa isa, nakapirme, latitud, longhitud, lalim (o altitud) lokasyon. (Isipin ito bilang "stasyon".) Ang dataset ay maaaring isang koleksiyon ng mga TimeSeries na ito, halimbawa, isang pagkakasunud-sunod mula sa bawat isa sa 3 iba't ibang lokasyon.
    * Isa sa mga Iba't Ibang Bagay (halimbawa, istasyon\\_id) Ang MUST ay may iba't ibang attribute na cf\\_role=timeseries\\_id upang matukoy ang variable na natatanging nagpapakilala sa mga istasyon.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* Kabilang sa dataset na MUST ang global Attribute[cdm\\_timeseries\\_variables](#cdm_timeseries_variables), kung saan ang halaga ay isang comma-nahating listahan ng mga variable na may impormasyon tungkol sa bawat istasyon. Para sa isang ibinigay na istasyon, ang mga pagpapahalaga ng mga variable na ito na MUST ay hindi nagbabago. Halimbawa,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Kabilang sa talaan ng MUST ang cf\\_role=timeseries na\\_id variable at lahat ng iba pang mga variables na may impormasyon tungkol sa istasyon, na halos palaging kinabibilangan ng latitud at longhitud (at taas o lalim, kung naroroon) .
Hindi kailanman isasama sa talaan ang panahon o anumang pagbabago sa obserbasyon.
* Para sa ilang nakapugal na mga boya, ang isang dataset ay maaaring may dalawang set ng latitud at mga pagbabago sa longhitud:
    1. Isang pares ng latitud at longhitud na hindi nagbabago (I.e., ang itinakdang lokasyon ng pagpugal) . Sa loobERDDAP™, ibigay ang mga variable na itodestinationNames of latitud at longitude, at isama ang mga variable na ito sa listahan ng cdm\\_timeseries\\_variables.
    2. Ang tumpak na latitud at mga kahalagahan ng longhitud na nauugnay sa bawat pagmamasid. Sa loobERDDAP™, ibahin ang mga variable na itodestinationNames (e.g., eksaktongLat at eksaktong Lon) at huwag isama ang mga variable na ito sa listahan ng cdm\\_timeseries\\_variables.
Ang pangangatuwiran dito ay: mula sa teoretikal na perspektibo, para sa isang DSG TimeSeries dataset, ang latitud at longhitud (at taas o lalim, kung naroroon) Ang lokasyon ng istasyon ng MUST ay walang pagbabago.
###### Profile ng mga Kumperensiya{#timeseriesprofile} 
*   [Profile ng mga Kumperensiya](#timeseriesprofile)- ay para sa isang pagkakasunod-sunod ng mga profile na kinuha sa isa, nakapirme at latitud na lokasyon. Ang bawat profile ay isang set ng mga sukat na kinuha sa maraming taas o lalim. Ang dataset ay maaaring isang koleksiyon ng mga TimeSeriesProfile na ito, halimbawa, isang pagkakasunud-sunod ng mga profile na kinuha sa bawat isa sa 12 iba't ibang lokasyon.
    * Isa sa mga Iba't Ibang Bagay (halimbawa, istasyon\\_id) Ang MUST ay may iba't ibang attribute na cf\\_role=timeseries\\_id upang matukoy ang variable na natatanging nagpapakilala sa mga istasyon.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Isa sa mga Iba't Ibang Bagay (Halimbawa, tingnan ang\\_number) Ang MUST ay may variable attribute na cf\\_role=profile\\_id upang matukoy ang variable na natatanging nagpapakilala sa mga profile.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Ang isang ibinigay na profile\\_id ay kailangan lamang na maging natatangi para sa isang ibinigay na mga timeseries na\\_id.) Kung walang ibang bagay ang angkop, isaalang - alang ang paggamit ng panahon na iba - iba.
    * Ang dataset na MUST ay kinabibilangan ng global Attribute cdm\\_timeseries\\_variables, kung saan ang halaga ay isang comma-weaded list ng mga variable na may impormasyon tungkol sa bawat istasyon. Para sa isang ibinigay na istasyon, ang mga pagpapahalaga ng mga variable na ito na MUST ay hindi nagbabago. Halimbawa,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Kabilang sa talaang MUST ang f_role=timeseries na\\_id variable at lahat ng iba pang mga variables na may impormasyon tungkol sa istasyon, na halos palaging kinabibilangan ng latitud at longhitud.
Hindi kailanman isasama sa talaan ang panahon, taas, lalim, o anumang mga visual variables.
    * Ang dataset na MUST ay kinabibilangan ng global Attribute cdm\\_profile\\_variables, kung saan ang halaga ay isang comma-weadd list ng mga variable na may impormasyon tungkol sa bawat profile. Para sa isang ibinigay na profile, ang mga pagpapahalaga ng mga variable na ito na MUST ay hindi nagbabago. Halimbawa,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Kabilang sa talaang MUST ang f_role=profile\\_id variable at lahat ng iba pang mga variables na may impormasyon tungkol sa profile, na halos palaging kinabibilangan ng oras.
Hindi kailanman isasama sa talaan ang latitud, longhitud, altitud, lalim, o anumang pagbabago sa obserbasyon.
###### Trajectory{#trajectory} 
*   [Trajectory](#trajectory)- ay isang pagkakasunod-sunod ng mga sukat na kinuha sa kahabaan ng isang trajectory (isang landas sa kalawakan at panahon)   (e.g., dagat\\_water\\_temperature na kinuha ng isang barko habang ito ay kumikilos sa tubig) . Ang dataset ay maaaring isang koleksiyon ng mga Trajectories na ito, halimbawa, isang pagkakasunud-sunod mula sa bawat isa sa 4 na iba't ibang barko.
    * Isa sa mga Iba't Ibang Bagay (Halimbawa, barko\\_id) Ang MUST ay may attribute na f_role=trajectory\\_id upang matukoy ang variable na natatanging nagpapakilala sa mga trajectories.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_trajectory\\_variables{#cdm_trajectory_variables} 
* Kabilang sa dataset na MUST ang global Attribute[cdm\\_trajectory\\_variables](#cdm_trajectory_variables), kung saan ang halaga ay isang comma-nahating listahan ng mga variable na may impormasyon tungkol sa bawat trajectory. Para sa isang ibinigay na trajectory, ang mga halaga ng mga variable na ito ay hindi nagbabago. Halimbawa,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Kabilang sa talaan ng MUST ang f_role=trajectory\\_id variable at lahat ng iba pang mga variables na may impormasyon tungkol sa trajectory.
Hindi kailanman isasama sa listahan ang panahon, latitud, longhitud, o anumang pagbabago sa obserbasyon.
###### TrajectoryProfile{#trajectoryprofile} 
*   [TrajectoryProfile](#trajectoryprofile)- ay isang pagkakasunod-sunod ng mga profile na kinuha sa kahabaan ng isang trajectory. Ang dataset ay maaaring isang koleksiyon ng mga TrajectoryProfile na ito, halimbawa, isang pagkakasunud-sunod ng mga profile na kinuha ng 14 na iba't ibang barko.
    * Isa sa mga Iba't Ibang Bagay (Halimbawa, barko\\_id) Ang MUST ay may variable attribute na f_role=trajectory\\_id upang matukoy ang variable na natatanging nagpapakilala sa mga trajectories.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Isa sa mga Iba't Ibang Bagay (Halimbawa, tingnan ang\\_number) Ang MUST ay may variable attribute na cf\\_role=profile\\_id upang matukoy ang variable na natatanging nagpapakilala sa mga profile.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Ang isang ibinigay na profile\\_id ay kailangan lamang maging natatangi para sa isang ibinigay na trajectory\\_id.) Kung walang ibang bagay ang angkop, isaalang - alang ang paggamit ng panahon na iba - iba.
    * Ang dataset na MUST ay kinabibilangan ng global Attribute cdm\\_trajectory\\_variables, kung saan ang halaga ay isang comma-based list ng mga variable na may impormasyon tungkol sa bawat trajectory. Para sa isang ibinigay na trajectory, ang mga halaga ng mga variable na ito ay hindi nagbabago. Halimbawa,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Kabilang sa talaan ng MUST ang f_role=trajectory\\_id variable at lahat ng iba pang mga variables na may impormasyon tungkol sa trajectory.
Hindi kailanman isasama sa talaan ang profile-related variables, oras, latitud, longhitud, o anumang mga variables ng obserbasyon.
    * Ang dataset na MUST ay kinabibilangan ng global Attribute cdm\\_profile\\_variables, kung saan ang halaga ay isang comma-weadd list ng mga variable na may impormasyon tungkol sa bawat profile. Para sa isang ibinigay na profile, ang mga pagpapahalaga ng mga variable na ito na MUST ay hindi nagbabago. Halimbawa,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Kabilang sa talaan ng MUST ang f_role=profile\\_id variable at lahat ng iba pang mga variables na may impormasyon tungkol sa profile, na halos palaging kinabibilangan ng panahon, latitud at longhitud.
Hindi kailanman isasama sa talaan ang altitud, lalim, o anumang mga visual variables.
###### Iba Pa{#other} 
*   [Iba Pa](#other)- ay walang mga kahilingan. Gamitin ito kung ang dataset ay hindi angkop sa isa sa iba pang mapagpipilian, lalo na, kung ang dataset ay hindi kasama ang latitud, longhitud at oras variables.
     
###### Kaugnay na mga Nota{#related-notes} 
* Lahat ng EDDTable datasets na may cdm\\_data\\_type maliban sa "Iba" MUST ay may longhitud, latitud, at mga variables ng oras.
* Ang mga datos na may profile na MUST ay may iba't ibang altitud, pagkakaiba - iba ng lalim, o lalim[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)Iba - iba.
* Kung hindi ka makagagawa ng dataset na sumusunod sa lahat ng mga kahilingan para sa huwarang cdm\\_data\\_type, gamitin ang "Point" (na may iilang kahilingan) o "Iba pa" (na walang mga kahilingan) sa halip.
* Ang impormasyong ito ay ginagamit ngERDDAP™sa iba't ibang paraan, halimbawa, subalit karamihan ay para sa paggawa.ncMga file ng CF (.ncmga talaksan na sumusunod sa mga Kontiguous Ragged Array Representasyon na nauugnay sa cdm\\_data\\_type ng dataset) at.ncMga file ng CFMA (.ncmga talaksan na sumusunod sa Multidimensional Array Representasyon na nauugnay sa cdm\\_data\\_type ng dataset) na binigyang - katuturan sa[Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)kabanata ng[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Mga kombensiyon ng metadata, na dating pinangalanang "CF Point Observation Conventions".
* Mungkahi: Para sa mga dataset na ito, ang tamang setting[subsetVariables](#subsetvariables)ay karaniwang ang kombinasyon ng lahat ng mga variable na nakatala sa cdm\\_...\\_variables attributes. Halimbawa, para sa TimeSeriesProfile, gamitin ang cdm\\_timeseries\\_variables pati na ang cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang makilala ang isang tao, organisasyon, o proyekto na nakatulong sa dataset na ito (Halimbawa, ang orihinal na lumikha ng impormasyon, bago ito muling iproseso ng lumikha ng dataset na ito) . Halimbawa,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Kung ang "kontributor" ay hindi talaga kumakapit sa isang dataset, alisin ang katangiang ito. Inihambing sa[creator\\_name](#creator_name), ito kung minsan ay mas nakatuon sa pinagmumulan ng pondo.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDEND na paraan upang malaman ang papel ng[contributor\\_name](#creator_name). Halimbawa,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Kung ang "kontributor" ay hindi talaga kumakapit sa isang dataset, alisin ang katangiang ito.
###### Mga Kombensiyon{#conventions} 
*   [ **Mga Kombensiyon** ](#conventions)  (mula sa[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Pamantayang metadata) ay SONGAL NA RECOMENDE. (Ito'y maaaring MAGAGUMPAY sa hinaharap.) Ang halaga ay isang comma-weaded na talaan ng mga pamantayan ng metadata na sinusunod ng dataset na ito. Halimbawa:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Ang karaniwang mga kombensiyon ng metadata na ginagamit saERDDAP™ay:
    
    *   [COARDSMga Kombensiyon](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)ang nauna sa CF.
    *   [Klima at Hula (CF) Mga Kombensiyon](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ang pinagmumulan ng marami sa inirerekomenda at hinihiling na mga katangianERDDAP. Ang kasalukuyang bersyon ng CF ay nakikilala bilang "CF-1.6".
    * AngNetCDFAttribute Convention for Dataset Discovery (ACDD) ang pinagmumulan ng marami sa inirerekomenda at hinihiling na mga katangianERDDAP. Ang orihinal na 1.0 na bersyon ng ACDD (isang napakahusay na likha ni Ethan Davis) , ay kinilala bilang ,[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Ang agos (simula noong 2015) 1.3 bersyon ng ACDD ang nakikilala bilang[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Kung ang iyong datasets ay ginagamit naUnidataDataset Discovery v1.0, hinihimok ka namin na[Buksan ang inyong datasets sa paggamit ng ACDD-1.3](#switch-to-acdd-13).
    
Kung ang iyong dataset ay sumusunod sa ilang karagdagang pamantayan ng metadata, pakisuyong idagdag ang pangalan sa listahan ng CSV sa attribute ng mga Kombensiyon.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (mula sa[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)Pamantayang metadata) ang RECOMENDED na paraan upang makilala ang uri ng nakatiklop na impormasyon (sa loobEDDGriddatos) . Halimbawa,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Ang tanging pinahihintulutang mga halaga ay ang auxiliary Information, imahe, modelong Result, pisikal Pagsukat (ang default kapag nalikha ang ISO 19115 metadata) , quality Information, reference Information, at steaticClassification. (Huwag gamitin ang tag na ito para sa EDDTable datasets.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay ang RECOMENDEND na paraan upang makilala ang tao, organisasyon, o proyekto (kung hindi isang espesipikong tao o organisasyon) , ang may pinakamalaking pananagutan sa paglalang (o pinakabagong reprocessing) ng datos na ito. Halimbawa,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Kung ang impormasyon ay malawakang babaguhin (halimbawa, ang satelayt na datos mula sa antas 2 hanggang sa antas 3 o 4) , pagkatapos ay karaniwang ang reprocessor ay nakalista bilang manlilikha at ang orihinal na manlilikha ay nakatala sa pamamagitan ng[contributor\\_name](#contributor_name). Inihambing sa[proyekto](#project), ito ay mas madaling makibagay, yamang maaaring makilala nito ang isang tao, isang organisasyon, o isang proyekto.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang matukoy ang direksiyon ng email (tamang format) na naglalaan ng paraan upang makausap ang maylikha. Halimbawa,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang makilala ang isang URL para sa organisasyon na lumikha ng dataset, o isang URL na may impormasyon ng lumikha tungkol sa dataset na ito (ngunit iyan ang higit na layunin ng[infoUrl](#infourl)) . Halimbawa,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang malaman ang petsa kung kailan unang ginawa ang impormasyon (Halimbawa, prinoseso sa anyong ito) , sa ISO 8601 format. Halimbawa,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Kung pana-panahong idaragdag ang datos sa dataset, ito ang unang petsa na ang orihinal na datos ay nagawang makuha.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang malaman ang petsa kung kailan huling binago ang impormasyon (Halimbawa, kapag naayos ang isang pagkakamali o kapag idinagdag ang pinakabagong impormasyon) , sa ISO 8601 format. Halimbawa,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang matukoy ang petsa kung kailan unang ipinagamit ang datos sa iba, sa ISO 8601 format, halimbawa, 2012-03-15. Halimbawa,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Halimbawa, ang dataset ay maaaring may isang dataset[date\\_created](#date_created)ng 2010-01-30, ngunit ipinagamit lamang sa publiko 2010-07-30.date\\_issueday hindi gaanong karaniwang ginagamit kaysadate\\_createdatdate\\_modified. Kungdate\\_issueday inalis, ipinalalagay na ito ay katulad ng sadate\\_created.
###### pangglobodrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- Ito ay isang OPSYONal na pangglobong katangian na ginagamit ngERDDAP™  (at walang pamantayan ng metadata) na nagsasaad ng default na halaga para sa "Love Land Mask" opsyon sa dataset's Make A Graph form ( *datasetID* .grap) at para sa &.land parameter sa isang URL na humihiling ng mapa ng datos. Halimbawa,
    ```
    <att name="drawLandMask">over</att>  
    ```
Tingnan ang[drawLandMaskIpaliwanag](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (mula sa[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Pamantayang metadata) ay IGNORED at/o REPLACED. Kung ang dataset's[cdm\\_data\\_type](#cdm_data_type)angkop,ERDDAP™kusang gagamitin ito upang lumikha ng isangfeatureTypeSabihin pa. Kaya hindi mo na kailangang dagdagan pa ito.
    
Gayunman, kung ginagamit mo[Mga EDDTable Mula sa mga Latian](#eddtablefromnccffiles)upang lumikha ng dataset mula sa mga file na sumusunod sa[CF Mga Sampling Geometriya (DSG) Pamantayan](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), ang mga files mismo ay dapat na mayroonfeatureTypewastong pagpapakahulugan, kung kaya'tERDDAP™ang tamang pagbasa sa mga file. Bahagi iyan ng mga kahilingan ng CF DSG para sa gayong uri ng talaksan.
     
###### Kasaysayan{#history} 
*   [ **Kasaysayan** ](#history)  (mula sa[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)at[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Mga pamantayan ng metadata) ay isang RECOMMENDED multi-line String global attribute na may linya para sa bawat hakbang ng pagpoproseso na sumailalim sa data. Halimbawa,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Tamang - tama, ang bawat linya ay may ISO 8601:2004 (E) format+timeZ (Halimbawa, 2011-08-05T08:55:02Z) na sinusundan ng paglalarawan ng hakbang sa pagpoproseso.
    *   ERDDAP™Lumilikha ito kung hindi pa ito umiiral.
    * Kung umiiral na ito,ERDDAP™ay maghahatid ng bagong impormasyon sa umiiral na impormasyon.
    * Mahalaga ang kasaysayan dahil pinahihintulutan nito ang mga kliyente na bumalik sa orihinal na pinagmulan ng datos.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)ay isang pandaigdig na katangian ng URL ng isang web page na may higit pang impormasyon tungkol sa dataset na ito (Karaniwan sa website ng source institute) . Halimbawa,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Alinman sa pangglobong dataset[Pinagmulan](#global-attributes)o ang globo nito&lt;addAttributes&gt; MUST ang katangiang ito.
    *   infoUrlay mahalaga sapagkat pinahihintulutan nito ang mga kliyente na alamin ang higit pa tungkol sa impormasyon mula sa orihinal na pinagmulan.
    *   ERDDAP™ang kawing sainfoUrltungkol sa dataset's Date Access Form ( *datasetID* .html) , Gumawa ng A Graph web page ( *datasetID* .grap) , at iba pang mga web page.
    * Kung ang URL ay may bahaging query (pagkatapos ng "?".) , ito ay UST na[naka-iskedyul ng porsiyento](https://en.wikipedia.org/wiki/Percent-encoding). Kailangan mong mag - isip ng pantanging mga tauhan sa mga pagbabawal (Kahit na ang unang '&' at ang pangunahin'=', kung mayroon man) sa anyong %H, kung saan ang HH ang 2 digit na hexadecimal na halaga ng karakter. Karaniwan, kailangan mo lamang gawing %25, & sa %26, " tungo sa %22,&lt;sa %3C, = sa %3D, &gt; sa %3E, + sa %2B,|sa %7C,\\[sa %5B,\\]sa %5D, ang espasyo sa %20, at ginagawa ang lahat ng mga character sa itaas #127 sa kanilang UTF-8 form at pagkatapos ay ang porte ng UTF-8 format (humingi ng tulong sa isang programmer) .
Halimbawa, &stationID&gt;="410004"
maging &stationID%3E=%2241004%22
Karaniwan nang kailangan ang percent calcation kapag mayroon kang makuhaERDDAPsa pamamagitan ng software maliban sa browser. Karaniwan nang pinangangasiwaan ng mga Browser ang pag - aayos ng mga porsiyento para sa iyo.
Sa ilang sitwasyon, kailangan mong bigyan ng porsiyento ang lahat ng karakter maliban sa A-Za-z0-9\\_-&#33; ' () \\*, ngunit hindi pa rin nai-record ang paunang '&' o ang pangunahin'='.
Ang mga wikang pamprograma ay may mga kasangkapan upang magawa ito (halimbawa, tingnanJava'[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
atJava[rip]encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) at mayroon
        [Mga website na pinag - aaralan ng porsiyento](https://www.url-encode-decode.com/).
    * Mula Noondatasets.xmlay isang XML file, ikaw MUST din &-encode all 'Bear', '&lt;', at '&gt;' sa URL bilang 'Lamp;', '&lt;', at 'ligt; pagkatapos ng porsyentong perpektibo.
    *   infoUrlay natatangi saERDDAP. Hindi ito mula sa anumang pamantayang metadata.
###### institusyon{#institution} 
*   [ **institusyon** ](#institution)  (mula sa[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)at[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Mga pamantayan ng metadata) ay isang kapani - paniwalang pangglobong katangian na may maikling bersiyon ng pangalan ng institusyon na siyang pinagmumulan ng impormasyong ito (karaniwan nang isang acronym, karaniwan na&lt;20 characters). Halimbawa,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Alinman sa pangglobong dataset[Pinagmulan](#global-attributes)o ang globo nito&lt;addAttributes&gt; MUST ang katangiang ito.
    *   ERDDAP™ang institusyon kailanma't nagtatanghal ito ng isang talaan ng mga datos. Kung ang pangalan ng isang institusyon dito ay mas mahaba sa 20 karakter, tanging ang unang 20 karakter ang makikita sa talaan ng mga datos (ngunit ang buong institusyon ay makikita sa pamamagitan ng paglalagay ng daga sa ibabaw ng katabing "?" icon) .
    * Kung idaragdag mo ang institusyon sa talaan ng&lt;categoryAttributes&gt; sa loobERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)file, madaling mahanap ng mga gumagamit ang mga datos mula sa parehong institusyon sa pamamagitan ngERDDAP'Sa paghahanap ng Datesets ni Category" sa home page.
###### Mga salitang susi{#keywords} 
*   [ **Mga salitang susi** ](#keywords)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang RECOMMENDED comma-weadd list ng mga salita at maikling parirala (Halimbawa,[GCMD Mga Susi sa Siyensiya](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) na naglalarawan sa dataset sa pangkalahatang paraan, at hindi nagsasagawa ng iba pang kaalaman sa dataset (Halimbawa nito ang karagatan) . Halimbawa,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Mula Noondatasets.xmlay isang dokumento ng XML, ang mga karakter &,&lt;, at &gt; sa isang attribute na parang susi (e.g., ang &gt; karakter sa siyensiya ng GCMD) kinakailangang i-install bilang &amp;,&lt;, at &gt; ayon sa pagkakasunod.
Kapag may datasetERDDAP,
    
    * Ang "Liham na Siyensiya &gt; " ay idinagdag sa pasimula ng anumang susing salita ng GCMD na wala nito.
    * Ang mga susing salita ng GCMD ay ginagawang Tittle Case (I.e., ang unang mga titik ay ginawang malalaking titik) .
    * Ang mga susing salita ay ginagawang sunud - sunod at inaalis ang anumang bagong titik.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang RECOMMENDED attribute: kung ikaw ay sumusunod sa isang alituntunin para sa mga salita/phrasses sa iyong keywords attribute (Halimbawa, GCMD Science Keywords) , ilagay dito ang pangalan ng panuntunang iyon. Halimbawa,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### lisensiya{#license} 
*   [ **lisensiya** ](#license)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang SONGY RECOMENDEND global attribute na may lisensiya at/o mga restriksiyon sa paggamit. Halimbawa,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Kung "\\[Pamantayan\\]" ay lumilitaw sa halaga ng attribute, ito ay hahalinhan ng pamantayanERDDAP™lisensiya mula sa&lt;Pamantayang&gt; tag saERDDAP'
        \\[tomcat\\]/webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml file.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)mula sa lipas na[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (na ipinakilalaMetadata\\_Conventionsbilang "UnidataDataset Discovery v1.0") Pamantayang metadata. Ang halaga ng attribute ay isang comma-published na talaan ng mga metadata convention na ginagamit ng dataset na ito.
Kung ang isang dataset ay gumagamit ng ACD 1.0, ang attribute na ito ay SSTROGLY RECOMMENDED, halimbawa,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
SubalitERDDAP™ang mungkahi ngayon ng ACDD-1.3. Kung mayroon ka[Binuksan ang inyong datasets upang gamitin ang ACDD-1.3](#switch-to-acdd-13), paggamit ngMetadata\\_Conventionsay NATATAGUMPAYAN: gamitin lamang&lt;Mga Kombensiyon&gt;] (Mga Karaniwan) sa halip.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang RECOMENDED na paglalarawan ng teksto sa pagpoproseso (Halimbawa,[Mga antas ng pagpoproseso ng data sa pamamagitan ng NASA](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), halimbawa, ang Level 3) o antas ng pagkontrol sa kalidad (Halimbawa, sa Siyensiya) ng datos. Halimbawa,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### proyekto{#project} 
*   [ **proyekto** ](#project)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang OPSYONAL na attribute upang matukoy ang proyekto na ang dataset ay bahagi ng. Halimbawa,
    ```
    <att name="project">GTSPP</att>  
    ```
Kung ang dataset ay hindi bahagi ng isang proyekto, huwag gamitin ang katangiang ito. Inihambing sa[creator\\_name](#creator_name), ito ay nakatuon sa proyekto (hindi isang tao o isang organisasyon, na maaaring kasangkot sa maraming proyekto) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang makilala ang tao, organisasyon, o proyekto na naglalathala ng dataset na ito. Halimbawa,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Halimbawa, ikaw ang mamamahayag kung ibang tao o grupo[Nilalang](#creator_name)ang dataset at ikaw ay re-serving lamang sa pamamagitan ngERDDAP. Kung ang "publisher" ay hindi talaga kumakapit sa isang dataset, alisin ang katangiang ito. Inihambing sa[creator\\_name](#creator_name), malamang na hindi gaanong binago o muling naiproseso ng mamamahayag ang impormasyon; ginagawa lamang ng mamamahayag ang impormasyon na makukuha sa isang bagong lugar.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang matukoy ang direksiyon ng email (Halimbawa, sa tamang anyo ay may kasamang john\\_smith January great.org) na naglalaan ng paraan upang makausap ang mamamahayag. Halimbawa,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Kung ang "publisher" ay hindi talaga kumakapit sa isang dataset, alisin ang katangiang ito.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ang RECOMMENDED na paraan upang makilala ang isang URL para sa organisasyon na naglathala ng dataset, o isang URL na may impormasyon ng tagapaglathala tungkol sa dataset na ito (ngunit iyan ang higit na layunin ng[infoUrl](#infourl)) . Halimbawa,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Kung ang "publisher" ay hindi talaga kumakapit sa isang dataset, alisin ang katangiang ito.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)ay isang pangglobong Katangian (hindi mula sa anumang pamantayan) Ipinakikita kung ito ay isang tunay na time dataset. Halimbawa,
    ```
    <att name="real\\_time">true</att>  
    ```
Kung ito ay mali (ang default) ,ERDDAP™ang mga tugon ng cache sa mga kahilingan para sa mga uri ng talaksan kung saan ang buong file ay dapat na likhain bago angERDDAP™ay maaaring magsimulang magpadala ng tugon sa gumagamit at muling gamitin ito sa loob ng 15 minuto (e.g.,.nc, .png) .
Kung ito ay sinasadya,ERDDAP™ay hindi kailanman magkokokomento ng mga talaksan ng tugon at laging magbabalik ng bagong gawang mga file.
###### sourceUrlattribute{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)ay isang pangglobong katangian ng URL ng pinagmulan ng datos. Halimbawa,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (ngunit ilagay ang lahat ng ito sa iisang linya) 
    *   ERDDAP™ay karaniwang lumilikha ng pangglobong katangiang ito nang kusa. Dalawang eksepsiyon ang Mapagkakatiwalaan Mula saHyraxFiles at EDDTable FromThreddsFiles.
    * Kung ang pinagmulan ay lokal na mga file at ang mga file ay nilikha ng inyong organisasyon, gamitin
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Kung ang pinagmulan ay lokal na database at ang data ay nilikha ng inyong organisasyon, gamitin
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlay mahalaga sapagkat pinahihintulutan nito ang mga kliyente na bumalik sa orihinal na pinagmumulan ng impormasyon.
    *   sourceUrlay natatangi saERDDAP. Hindi ito mula sa anumang pamantayang metadata.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (mula sa[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) ay isang RECOMENDED attribute upang makilala ang pangalan ng kontroladong bokabularyo kung saan iba - iba ang anyo[standard\\_name](#standard_name)mga s ang kinukuha. Halimbawa,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
para sa bersiyon 77 ng[Pamantayang talaan ng pangalan ng CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (para sa EDDTable datasets lamang) ay isang RECOMMENDE global attribute na nagpapahintulot sa iyo na magtakda ng isang comma-weadd list ng [&lt;dataVariable&gt;] (Nakatatawa)  [destinationName](#destinationname)s upang makilala ang mga variable na may limitadong bilang ng mga halaga (ang isa pang paraan: Ang mga pagkakaiba - iba na bawat isa sa mga pamantayan ay maraming kopya) . Halimbawa,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Kung ang katangiang ito ay naroroon, ang dataset ay magkakaroon ng isang *datasetID* .subset web page (at isang link dito sa bawat listahan ng dataset) na mabilis at madaling pumipili ng iba't ibang subset ng datos ang mga gumagamit nito.
    * Tuwing may dataset,ERDDAPat nag - iimbak sa disk ng isang mesa na may kakaibang hitsura () Mga kombinasyon ng subset Iba't iba ang pamantayan ni Variable.ERDDAP™mababasa iyansubsetVariablesmesa at ihanda ito nang napakabilis (lalo na kung ihahambing sa pagbabasa ng maraming data file o pagkuha ng impormasyon mula sa database o iba pang serbisyo sa labas) .
    * Nagpapahintulot iyanERDDAP™upang gawin ang 3 bagay:
        1. Nagpapahintulot itoERDDAP™upang maglagay ng listahan ng mga posibleng halaga sa isang dropdown list sa Data Access Form, Make A Graph web page, at .subset webclushs.
        2. Nagpapahintulot itoERDDAP™upang mag-alok ng .subset webpahina para sa dataset na iyon. Kawili - wili ang pahinang iyon sapagkat ginagawa nitong madaling makasumpong ng makatuwirang mga kombinasyon ng mga halaga ng mga variable na iyon, na para sa ilang dataset at ilang bagay na iba't iba ay napakahirap, napakahirap (halos imposible) . Pagkatapos, lahat ng gumagamit ay humihiling ng natatanging mga kahilingan () subset Mabilis na makukuha ang impormasyon.
        3. Kung may kahilingan ang gumagamit na tumutukoy lamang sa isang subset ng mga variable na iyon,ERDDAP™madaling basahin angsubsetVariableskumain, at tumugon sa kahilingan. Makatitipid iyan ng isang tonelada ng panahon at pagsisikap para saERDDAP.
    * Ang utosdestinationNameTalaan ng mga Nilalaman *datasetID* .subset web page, kaya karaniwan nang itatakda mo muna ang pinakamahalagang variables, pagkatapos ang hindi gaanong mahalaga. Halimbawa, para sa mga dataset na may time series para sa ilang istasyon, maaari mong gamitin, halimbawa,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
upang ang mga pamantayan ay mapagbukud - bukod sa pamamagitan ng istasyon na\\_id.
    * Maliwanag, ang iyong pagpili ang siyang nagkakaiba - iba upang ilakip sasubsetVariableslistahan, subalit ang iminumungkahing gamit ay:
        
Sa pangkalahatan, isama ang iba't ibang bagay na gusto moERDDAP™upang ipakita ang drop-down na listahan ng mga opsyon sa dataset's Daccess Form (.html) At Make-A-Graph (.grap) web pahina.
        
Sa pangkalahatan, isama ang mga variable na may impormasyon tungkol sa mga katangian ng dataset (ang mga istasyon, profile, at/o mga trajectory, lalo na mula sa[cdm\\_timeseries\\_variables](#cdm_timeseries_variables),[cdm\\_profile\\_variables](#cdm_profile_variables),[cdm\\_trajectory\\_variables](#cdm_trajectory_variables)) . Ilan lamang ang iba't ibang halaga para sa mga variable na ito kaya't mahusay ang kanilang paggawa sa mga drop-down list.
        
Huwag kailanman isama ang anumang data variable na nauugnay sa indibiduwal na mga obserbasyon (e.g., oras, temperatura, alat, bilis ng agos) sa loobsubsetVariableslistahan. Napakaraming iba't ibang halaga para sa mga variable na ito, kaya ang isang drop-down list ay magiging mabagal sa pagkarga at maging mahirap na pagtrabahuhin (o hindi nagtatrabaho) .
        
    * Kung ang bilang ng iba't ibang kombinasyon ng mga variable na ito ay mas marami pa sa halos 1,000,000, dapat mong isaalang - alang ang paghihigpit sasubsetVariablesna tinukoy mo upang bawasan ang bilang ng iba't ibang kombinasyon hanggang sa mababa sa 1,000,000; kung hindi, ang *datasetID* .subset web page ay maaaring malikha nang dahan-dahan. Sa sukdulang mga kaso, ang dataset ay maaaring hindi magkargaERDDAP™sapagkat ang paggawa ng talaan ng iba't ibang kombinasyon ay gumagamit ng labis na memorya. Kung gayon, aalisin mo ang ilang pagbabago sasubsetVariableslistahan.
    * Kung ang bilang ng magkakaibang halaga ng anumang isang subset variable ay mas marami kaysa sa halos 20,000, hindi mo dapat isaalang - alang ang pagkakaibang iyon sa talaan ng mga bagaysubsetVariables; kung hindi, matagal bago ilipat ang *datasetID* .subset, *datasetID* .graph, at *datasetID* .html web page. Gayundin, sa isang Mac, napakahirap gumawa ng mga pagpili mula sa isang pababang listahan na may mahigit sa 500 mga bagay dahil sa kakulangan ng isang tablang panlupa. Ang isang kompromiso ay: alisin ang mga variables mula sa listahan kapag ang mga gumagamit ay malamang na hindi pumili ng mga halaga mula sa isang drop down list.
    * Dapat mong subukin ang bawat dataset upang makita kung angsubsetVariablesOkay lang ang setting. Kung ang pinagkukunang data server ay mabagal at napakatagal (o bigo) upang makuha ang impormasyon, alinman sa bawasan ang bilang ng mga variable na binigay o alisin angsubsetVariablespangglobong katangian.
    * Ilubog Lubhang kapaki - pakinabang ang mga deriable. Kaya kung ang iyong dataset ay angkop, pakisuyong lumikha ng isangsubsetVariablesSabihin pa.
    * Maaasahan Mula saSOSkusang idagdag
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
kapag nilikha ang dataset.
        * Posibleng babala: kung gumagamit ng Internet *datasetID* .subset web page ay pumipili ng halaga na may championed return o newline character, *datasetID* .subset ay mabibigo.ERDDAP™Hindi malutas ang isyung ito dahil sa ilang detalye ng HTML. Sa paano man, halos sa tuwina'y isang mabuting ideya na alisin ang mga tauhan ng karwahe sa mga datos. Upang tulungan kang ayusin ang problema, kung ang EDDTable ay magagamit.subsetVariablesMadaling paraanERDDAPang mga data value na magiging sanhi ng problema, mag - e - e - mail ito ng babala na may listahan ng nakapipinsalang mga pamantayan sa email Lahat Sa mga email address na itinakda sa setup.xml. Sa gayong paraan, alam mo kung ano ang kailangang ayusin.
        *    **Pre-generated subset tables.** Karaniwan na, kapagERDDAP™naglalaman ng dataset, hinihiling nito ang pagkakaiba () subset variables data table mula sa source ng datos, sa pamamagitan lamang ng normal data request. Sa ilang mga kaso, ang datos na ito ay hindi makukuha mula sa pinagkunan ng datos o nakuha mula sa pinagkunan ng datos ay maaaring mahirap sa source server ng datos. Kung gayon, mapaglalaanan mo ang isang mesa ng impormasyon sa isang mesa.jsono .csv file na may pangalang *tomcat* /content/erddap/subset/ *datasetID* .json  (o .csv) . Kung naroroon,ERDDAP™ay babasahin ito minsan kapag ang dataset ay nakarga at ginagamit ito bilang pinagmulan ng subset data.
            * Kung may pagkakamali habang binabasa ito, hindi magkarga ang dataset.
            * Ito'y may parehong pangalan ng tudling (halimbawa, ang kaso ring iyon) gaya ng&lt;subsetVariables&gt;, ngunit ang mga haligi ay maaaring nasa anumang pagkakasunud - sunod.
            * Maaaring mayroon itong karagdagang mga haligi (Aalisin ang mga ito at aalisin ang bagong - daang hanay) .
            * Ang nawawalang mga pamantayan ay dapat na ang nawawalang mga pamantayan (hindi pekeng numero tulad ng -99) .
            *   .jsonAng mga file ay maaaring medyo mas mahirap likhain ngunit may kinalaman sa Unicode characters..jsonmadaling likhain ang mga file kung ito ay gagawin mo na kasama ngERDDAP.
            * Madaling gamitin ang mga talaksang .csv, ngunit angkop sa mga karakter lamang ng ISO 8859-1. .csv files Ang MUST ay may mga pangalan ng kolum sa unang hanay at datos sa mga kasunod na hanay.
        * Para sa malalaking dataset o kailan&lt;subsetVariables&gt; ay mali ang pagkakaayos, ang talaan ng mga kombinasyon ng mga halaga ay maaaring sapat na malaki upang maging sanhi ng mga pagkakamali ng Too Much Data o OutOfMemory. Ang solusyon ay alisin ang mga variable mula sa talaan ng&lt;subsetVariables&gt; na may malaking bilang ng mga halaga, o nag-aalis ng mga variables kung kinakailangan hanggang sa ang sukat ng mesang iyon ay makatuwiran. Anuman ang pagkakamali, ang mga bahagi ngERDDAP™na gumagamit ngsubsetVariableshindi gumagana nang mahusay ang sistema (e.g., mabagal ang pagkarga ng mga web page) gayong napakaraming hanay (e.g., mahigit na isang milyon) sa mesang iyon.
        *   subsetVariablesay walang kinalaman sa pagtatakda kung aling variables na mga gumagamit ay maaaring gumamit ng instraints, i.e., kung paano ang mga gumagamit ay maaaring humiling ng mga subset ng dataset.ERDDAP™ay laging nagpapahintulot sa mga pagbabawal na tukuyin ang alinman sa mga pagkakaiba - iba.
###### Mga Unit ng Panahon{#time-units} 
[Panahon at Pangyayari](#time-units)Ang mga haligi ay dapat na may ISO 8601:2004 (E) format: Mga kuwerdas na Z (Halimbawa, 1985-01-31T15:31:00Z) .
             
###### buod{#summary} 
*   [ **buod** ](#summary)  (mula sa[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)at[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Mga pamantayan ng metadata) ay isang kapani - paniwalang pangglobong katangian na may mahabang paglalarawan sa dataset (karaniwan na&lt;500 karakter). Halimbawa,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Alinman sa pangglobong dataset[Pinagmulan](#global-attributes)o ang globo nito&lt;addAttributes&gt; MUST ang katangiang ito.
    * Napakahalaga ng buod dahil nagpapahintulot ito sa mga kliyente na mabasa ang paglalarawan sa dataset na may higit na impormasyon kaysa sa pamagat at sa gayon ay mabilis na maunawaan kung ano ang dataset.
    * Payo: Pakisuyong isulat ang buod para mailarawan ang dataset sa isang taong di - sinasadya na nakilala mo sa lansangan o sa isang kasamahan. Tandaan na isama ang[Limang W's at isang H](https://en.wikipedia.org/wiki/Five_Ws): Sino ang lumikha ng dataset? Anong impormasyon ang natipon? Kailan natipon ang impormasyon? Saan ito tinipon? Bakit ito tinipon? Paano ito tinipon?
    *   ERDDAP™ang buod sa dataset's Date Access Form ( *datasetID* .html) , Gumawa ng A Graph web page ( *datasetID* .grap) , at iba pang mga web page.ERDDAP™gamitin ang buod kapag lumilikha ng mga dokumentong FGDC at ISO 19115.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (opsyonalERDDAP-specific global metadata attribute, hindi mula sa anumang pamantayan) Espesipiko, sa simpleng paraan, kapag ang datos para sa isang malapit-real-time na dataset ay itinuturing na out-of-date, itinakda bilangnow- *Mga Pag - aari* , halimbawa,now-Mga 2 araw para sa datos na karaniwang lumilitaw 24-48 oras pagkatapos ng halaga ng oras. Para sa mga datos sa paghula, gamitin ngayon **+**  *Mga Pag - aari* Halimbawa, ngayon ay+6 na araw para sa paghula ng impormasyon na, sa pinakamarami, ay 8 araw sa hinaharap. (Tingnan ang[now- *Mga Pag - aari* Iba't ibang paglalarawan](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Kung ang sukdulang halaga ng panahon para sa dataset ay mas kamakailan lamang kaysa sa itinakdang oras, ang dataset ay itinuturing na up-to-date. Kung ang sukdulang halaga ng oras ay mas matanda sa itinakdang oras, ang dataset ay itinuturing na up-to-date. Para sa mga out-of-date datasets, malamang na may problema sa pinagmulan ng datos, kayaERDDAP™ay hindi makuha ang impormasyon mula sa mga punto ng panahon kamakailan.
    
AngtestOutOfDateang halaga ay ipinakikita bilang isang tudling sa[allDatasetsdatos](#eddtablefromalldatasets)sa iyongERDDAP. Ginagamit din ito upang kalkulahin ang outOfDate index, na isa pang kolum sa loob ngallDatasetsdatos.
Kung ang indise ay&lt;1, ang dataset ay itinuturing na up-to-date.
Kung ang indise ay&lt;=1, ang dataset ay itinuturing na out-of-date.
Kung ang indise ay&lt;=2, ang dataset ay itinuturing na out-of-date.
    
AngtestOutOfDateAng halaga ay ginagamit din ngERDDAP™upang lumikha ng https://*yourDomain*/erddap/outOfDateDatasets.html web pahina ([halimbawa](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) na nagpapakita ng mga dataset na may&lt;testOutOfDate&gt; Mga tag, na may datos na inihanay sa pamamagitan ng kung gaano out-of-date ang mga ito. Kung babaguhin mo ang uri ng talaksan (mula .html hanggang .csv,.jsonlCSV,.nc,.tsv, ...) , makukuha mo ang impormasyong iyon sa iba't ibang format ng talaksan.
    
Kung maaari,[GenerateDatasetsXml](#generatedatasetsxml)sabi pa ng isangtestOutOfDateAyon sa panggloboaddAttributesng isang dataset. Ang halagang ito ay isang mungkahi batay sa impormasyong makukuha sa GenerateDatasetsXml. Kung ang halaga ay hindi angkop, baguhin ito.
    
"Out-of-date" dito ay lubhang iba sa [&lt;Muling pagkarga [[Talaksan] (Mga #reload offenminute) , na tumatalakay sa kung paano up-to-dateERDDAP'Ang kaalaman sa dataset ay. Ang&lt;testOutOfDate&gt; sistema ang nagpapalagay niyanERDDAPAng kaalaman ng dataset ay up-to-date. Ang tanong&lt;testOutOfDate&gt; ay: wari bang may mali sa pinagmulan ng impormasyon, nagpapangyari sa mas bagong impormasyon na hindi makuha ngERDDAP?
    
###### pamagat{#title} 
*   [ **pamagat** ](#title)  (mula sa[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)at[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Mga pamantayan ng metadata) ay isang kapani - paniwalang pangglobong katangian ng maikling paglalarawan sa dataset (karaniwan na&lt;=95 tauhan). Halimbawa,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Alinman sa pangglobong dataset[Pinagmulan](#global-attributes)o ang globo nito&lt;addAttributes&gt; MUST ang katangiang ito.
    * Mahalaga ang pamagat dahil bawat listahan ng mga datos na inihaharap ngERDDAP  (maliban sa mga resulta ng paghahanap) ay nagtatala ng mga dataset sa abakadang pagkakasunud - sunod, sa pamagat. Kaya kung nais mong tiyakin ang pagkakasunud - sunod ng mga dataset, o magkaroon ng ilang dataset na pinagsama - sama, kailangan mong lumikha ng mga titulo na nasa isip mo. Maraming listahan ng mga datos (Halimbawa, bilang tugon sa isang paghahanap ng kategorya) , ipakita ang isang subset ng buong listahan at sa ibang pagkakasunud-sunod. Kaya ang pamagat para sa bawat dataset ay dapat tumayo sa ganang sarili nito.
    * Kung ang pamagat ay naglalaman ng salitang "DEPRECAED". (lahat ng malalaking titik) , kung gayon ang dataset ay magkakaroon ng mas mababang ranggo sa mga pagsaliksik.
             
##### &lt;axisVariable;{#axisvariable} 
* [ ** &lt;axisVariable&gt; ** ] (Ang #axisvariable) ay ginagamit upang ilarawan ang isang dimensiyon (Tinatawag ding "axis") .
SapagkatEDDGridmga datos, isa o higit paaxisVariableAng mga tag ay REURED, at lahat ay[dataVariables](#datavariable)laging maghati/gamit ng lahat ng mga variable ng axis. ([Bakit?](#why-just-two-basic-data-structures) [Paano kung hindi nila gawin iyon?](#dimensions))   
Mayroong isang axis variable para sa bawat dimensiyon ng data variables.
Axis variables MUST ay itukoy ayon sa pagkakasunud-sunod na ang mga data variables ay gumagamit nito.
(Hindi maaaring gumamit ng mga datasets&lt;axisVariable&gt; mga tag.)
Ang isang halimbawa ay:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; ay sumusuporta sa sumusunod na mga subtag:
###### &lt;sourceName\\Talaksan;{#sourcename} 
* [&lt;sourceName\\&gt;] (#sourcename) -- pangalan ng pinagmulan ng datos para sa variable. Ito ang pangalan naERDDAP™ang gagamitin kapag humihiling ng impormasyon mula sa pinagmumulan ng impormasyon. Ito ang pangalan naERDDAP™ay hahanapin kapag ang datos ay ibinalik mula sa pinagkunan ng datos. Ito ang kasong sensitibo. Ito'y REHILS.
###### &lt;destinationName\\Talaksan;{#destinationname} 
* [&lt;destinationName\\&gt;] (#Shinationname) ang pangalan ng variable na ipapalabas at gagamitin ngERDDAP™gumagamit.
    * Ito ay OPSYONAL. Kung wala, angsourceNameay ginagamit.
    * Ito'y kapaki - pakinabang sapagkat pinangyayari nitong baguhin mo ang isang malabo o kakatwang bagaysourceName.
    *   destinationNameay sensitibo sa kaso.
    *   destinationNameSUST magsimula sa pamamagitan ng isang liham (A-Z, a-z) at Ang MUST ay susundan ng 0 o higit pang mga karakter (A-Z, a-z, 0-9, at \\_) . ('' ay pinahintulutan bagoERDDAP™bersyon 1.10.) Ang restriksiyong ito ay nagpapangyari sa axis na maging pare - pareho ang mga pangalan saERDDAP™, sa mga fection file, at sa lahat ng software kung saan gagamitin ang mga file na iyon, kasama na ang mga programming language (tulad ngPython,Matlab, atJavaScript) kung saan may katulad na mga paghihigpit sa iba't ibang pangalan.
    * Sa loobEDDGridmga datos, ang[longhitud, latitud, altitud, lalim, at panahon](#destinationname)Natatangi ang mga variable ng axis.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-datributes) bigyang - kahulugan ang OPSYONAL na mga katangian ( *Pangalan* = *halaga* ) na idinagdag sa mga katangian ng pinagmulan para sa isang pagbabago, upang gawin ang pinagsamang mga katangian para sa isang pagbabago.
Kung ang Iba't Iba'y[Pinagmulan](#variable-addattributes)o&lt;addAttributes&gt; isama[scale\\_factorat/oadd\\_offset](#scale_factor)Ipagpalagay na, ang kanilang mga pamantayan ay gagamitin upang ilabas ang impormasyon mula sa pinagmulan bago ipamahagi sa kliyente
     (resulta Halaga = pinagmumulan Halaga \\*scale\\_factor+add\\_offset) . Ang unpacked variable ay sa parehong data type (Halimbawa, lumutang) bilang angscale\\_factoratadd\\_offsetmga pamantayan.
         
##### &lt;dataVariable;{#datavariable} 
* [ ** &lt;dataVariable&gt; ** ] (Nakatatawa) ay REHILS (para sa halos lahat ng datos) tag sa loob ng&lt;dataset&gt; tag na ginagamit upang ilarawan ang isang data variable. May 1 o higit pang halimbawa ng tag na ito. Ang isang halimbawa ay:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; ay sumusuporta sa sumusunod na mga subtag:
###### &lt;sourceName;{#sourcename-1} 
* [&lt;sourceName&gt;] (#sourcename) -- pangalan ng pinagmulan ng datos para sa variable. Ito ang pangalan naERDDAP™ang gagamitin kapag humihiling ng impormasyon mula sa pinagmumulan ng impormasyon. Ito ang pangalan naERDDAP™ay hahanapin kapag ang datos ay ibinalik mula sa pinagkunan ng datos. Ito ang kasong sensitibo. Ito'y REHILS.
###### Mga grupo{#groups} 
Ang CF ay nagdagdag ng suporta para sa mga grupo na may CF v1.8. Nagsimula sa ~2020,NetCDFsinusuportahan ng mga kasangkapan ang paglalagay ng mga variable sa isang grupo.nctalaksan. Sa aktuwal, nangangahulugan lamang ito na ang mga variable ay may mahabang pangalan na nagpapakilala sa grupo (s) at ang variable na pangalan, halimbawa, group1a/group2c/varName ).ERDDAP™ang mga grupo sa pamamagitan ng pagkumberte sa "/"'s sa variable's&lt;sourceName&gt; sa "\\_"'s sa variable's&lt;destinationName&gt;, halimbawa, group1a\\_group2c\\_varName . (Kapag nakita mo iyan, dapat mong matanto na ang mga grupo ay hindi lamang basta isang magkasamang kombensiyon.) Kapag ang mga variable ay nakatalaERDDAP™, lahat ng pagkakaiba - iba sa isang grupo ay sama - samang lilitaw, tinutularan ang grupo sa ilalim.\\[KungERDDAP™, lalo na ang GenerateDatasets Xml, ay hindi na makapag-eensayo nang mahusay tulad ng magagawa nito sa mga source file na may grupo, pakisuyong mag-mail ng sampol na file kay Chris. Juan sa noaa.gov .\\]

Ang EDDTable FromFiles datasets ay maaaring gumamit ng ilang espesyal na-encoded, pseudosourceNameupang bigyang - kahulugan ang bagong mga pagkakaiba - iba ng impormasyon, e.g., upang itaguyod ang isang pangglobong katangian bilang isang pagkakaiba - iba ng impormasyon. Tingnan[ang dokumentong ito](#pseudo-sourcenames).
###### HDFMga Istraktura{#hdf-structures} 
Pasimula saERDDAP™v2.12,EDDGridMula sa mga Latian at mga LatianEDDGridMula sa mga Uso Nakabuklat ng datos mula sa "istruktura" sa.nc4 at.hdf4 files. Upang makilala ang isang pagkakaiba - iba na mula sa isang kayarian, ang&lt;sourceName&gt; kailangang gamitin ang format: *Buong StructureName* | *miyembrong Naname* , halimbawa group1/myStruct|ang akingMember .

###### Nakatakdang Halaga na mga Pinagmulan{#fixed-value-sourcenames} 
Sa isang EDDTable dataset, kung nais mong lumikha ng isang variable (na may iisa at permanenteng halaga) na wala sa source dataset, gamitin:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Ang unang equals sign ay nagsasabiERDDAP™na nagtatakda ng Ang kasunod na halaga ay.

* Para sa mga numerikong variable, ang itinakdang halaga ay dapat na isang nag-iisang takdang halaga o NaN (kasong walang pakiramdam, e.g., \\=NaNN) .
* Para sa String variables, ang itinakdang halaga ay dapat na walang asawa,[string ng JSON-style](https://www.json.org/json-en.html)  (na may pantanging mga karakter na nakaligtas na may \\ karakter) , e.g., \\="My \\"Special\" .
* Para sa isang timestamp variable, tiyakin ang itinakdang halaga bilang numero sa"seconds since 1970-01-01T00:00:00Z"at gamitin
mga yunit=seconds mula 1970-01-01T00:00:00Z .
    
Ang isa pang tag para sa&lt;dataVariable&gt; gumawa na para bang ito'y isang regular na pagbabago.
Halimbawa, upang lumikha ng iba't ibang tinatawag na altitud na may permanenteng halaga na 0.0 (Palutang) , gamitin:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Para sa pambihirang mga kalagayan, maaari mo pa ngang tiyakin ang isangactual\\_rangeIdagdag ang Attribute, na tatalo sa inaasahang halaga ng destinasyongMin at destinasyong Max (na katumbas ng itinakda Halaga) .
 
###### Script SourceNames/Derived Variables{#script-sourcenamesderived-variables} 
Pasimula saERDDAP™v2.10, sa isang[Mapagkakatiwalaan Mula sa mga Bakod](#eddtablefromfiles),[EDDTable Mula sa Didabasa](#eddtablefromdatabase), o[Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)datos, ang&lt;sourceName&gt; maaaring maging
isang ekspresyon (isang ekwasyon na sinusuri ang isang halaga) , gamit ang format
```
    <sourceName>=*expression*</sourceName>  
```
o isang iskrip (isang serye ng mga pangungusap na may iisang halaga) , gamit ang format
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™Umasa sa[Ang proyektong Apache](https://www.apache.org/) [JavaIpinahayag na Wika (HEXL) ](https://commons.apache.org/proper/commons-jexl/)  (lisensiya:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) upang suriin ang mga ekspresyon at patakbuhin ang mga iskrip.
Ang kalkulasyon para sa isang bagong variable ay ginagawa sa loob ng isang hanay ng mga resulta, paulit - ulit para sa lahat ng hanay.
Ang mga pananalita at iskrip ay gumagamit ng isangJava- atJavaIskript-tulad ng skrip at maaaring gamitin ang alinman sa
[Mga opereytor at pamamaraan na ginawa sa JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
Maaari ring gumamit ng mga pamamaraan ang mga script (mga gawain) mula sa mga klaseng ito:
*   [Kalendaryo2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), na isang pambalot para sa ilang mga static, time- at calendar-related na pamamaraan sa com.cohort.util.Calendar2 ([lisensiya](/acknowledgements#cohort-software)) . Halimbawa,
Kalendaryo2.parseTEpochSeconds ( *Pinagmulan, petsa Panahon ng Pagpapaliban - liban* ) i-parse ang pinagmulan Time string sa pamamagitan ng dateTimeFormat string at bumalik ng isang"seconds since 1970-01-01T00:00:00Z"  (Mga EpochSEcond) dobleng halaga.
*   [Math](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), na isang pambalot para sa halos lahat ng static, math-related na pamamaraan sa[java.lang. Math](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Halimbawa, ang Math.atan2 ( *y, x* ) sa parihabang mga coordinate (y, x) at nagbabalik sa mga coordinate ng polo (isang hanay ng mga doble na may\\[r, theta\\]) .
*   [Math2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), na isang pambalot para sa halos lahat ng mga static, math-related na pamamaraan sa com.cohort.util. Math2 ([lisensiya](/acknowledgements#cohort-software)) . Halimbawa,
Math2.roundTo ( *d, nPlaces* ) ang iikot d sa espesipikong bilang ng numero sa kanan ng punto ng numero.
* String, na nagbibigay sa iyo ng makukuhang lahat ng static, String-related na pamamaraan sa[java.lang. Pagpiga](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Pagtatalik ng mga bagayERDDAP™Maaaring gamitin ng mga ekspresyon at iskrip ang alinman sa mga kaugnay nitoJavaMga pamamaraan, gaya ng inilarawan sa java.lang. Pag - iimbak ng mga dokumento. Halimbawa, ang String. lisensya (d) ang dobleng halaga ng d upang maging isang String (Bagaman maaari mo ring gamitin ang "+d") .
*   [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), na isang pambalot para sa karamihan ng static, String- at array-related na pamamaraan sa com.cohort.util.String2. ([lisensiya](/acknowledgements#cohort-software)) . Halimbawa, ang String2.zeroPad ( *numero, nDigits* ) ay magdadagdag ng 0's sa kaliwa ng numerong String upang ang kabuuang bilang ng numero ay nDigits (e.g., String2.zeroPad ("6", 2) ay babalik "06") .
*   [hanay](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), na may mga hindi-statikong pamamaraan para sa pag-akses ng datos mula sa iba't ibang kolumna sa kasalukuyang hanay ng source data table. Halimbawa, hanay.columnString ("Taóng") ang halaga mula sa "year" column bilang isang String, samantala, hanay. Int ("Taóng") ang halaga mula sa "taon" column bilang isang integer.

Dahil sa seguridad, ang mga ekspresyon at iskrip ay hindi maaaring gumamit ng ibang klase maliban sa mga 6.ERDDAP™ay nagpapatupad ng limitasyong ito sa pamamagitan ng paglikha ng default blacklist (na inilista ang lahat ng klase) at pagkatapos ay isang whitelist (na espesipikong nagpapahintulot sa 6 na klase na inilarawan sa itaas) . Kung kailangan mo ng ibang pamamaraan at/o ibang klase upang gawin ang iyong trabaho, pakisuyong i-mail ang iyong mga kahilingan kay Chris. Juan sa noaa.gov .
    
###### Kakayahan
Para sa EDDTable FromFiles datasets, kakaunti lamang ang impormasyon (malamang na hindi napapansin) Mabagal para sa mga kahilingan para sa datos mula sa mga variable na ito. Para sa EDDTable FromDatabase, may malaking parusa sa bilis para sa mga kahilingan na kinabibilangan ng mga limitasyon sa mga variable na ito (hal.g., ([longitude0360&gt;30&longude03606060&lt;40) dahil sa ang mga stringt ay hindi maaaring ipasa sa database, kaya ang database ay kailangang bumalik ng mas maraming datos saERDDAP™  (na talagang umuubos ng panahon) upangERDDAP™ay maaaring lumikha ng bagong pabagu - bago at ikapit ang pagbabawal. Upang maiwasan ang pinakamasamang kaso (kung saan walang mga pagbabawal na ipinapasa sa database) ,ERDDAP™Itapon ang maling mensahe upang hindi na kailangang ibalik ng database ang buong nilalaman ng mesa. (Kung nais mong iwasan ito, magdagdag ng limitasyon sa isang hindi-script column na laging magiging totoo, e.g., &time&lt;3000-01-01.) Dahil dito, sa EDDTable FromDatabase, malamang na laging mas mabuting lumikha ng isang hinangong kolum sa database sa halip na gamitinsourceName= Sulat saERDDAP.

###### Pagtanaw sa Isang Kapahayagan (O Iskrip) Ginagamit:
Bilang tugon sa kahilingan ng gumagamit ng tabular data,ERDDAP™nakakakuha ng datos mula sa serye ng mga source file. Ang bawat source file ay lilikha ng isang mesa ng hilaw (Mula mismo sa pinagmumulan) datos.ERDDAP™Pagkatapos ay daraan sa talaan ng hilaw na impormasyon, magsagwan nang sunud - sunod, at susuriin ang ekspresyon o sulat nang minsanan para sa bawat hanay, upang lumikha ng isang bagong tudling na may gayong pananalita o sulat - kamaysourceName.
    
###### GenerateDatasetsXml
Pansinin na ang GenerateDatasets Ang Xml ay ganap na walang alam kapag may pangangailangan na lumikha ng isang pabagu - bagong bagay&lt;sourceName&gt;= *pananalita* &lt;/sourceName&gt;. Kailangan mong lumikha ng iba't ibang bagaydatasets.xmlsa pamamagitan ng kamay.

###### Mga Halimbawa:
Narito ang ilang kumpletong halimbawa ng mga variable ng datos na gumagamit ng ekspresyon upang lumikha ng bagong hanay ng datos. Inaasahan natin na ang mga halimbawang ito ay (at iba't ibang anyo ng mga ito) ay sasaklaw ng halos 95% ng paggamit ng lahat ng expression-derivedsourceNames.

###### Pagsasama ng magkahiwalay na "date" at"time"ay nagiging isang nagkakaisang pitak ng panahon:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
IyansourceNamebagong pananalita"time"konklusiyon sa pamamagitan ng pagkokodigo ng mga pagpapahalagang String mula sa "date" (yyyy-MM-dd) at"time"  (HH:m:ss) mga haligi sa bawat hanay ng source file, at sa pamamagitan ng paggawa sa kuwerdas na iyon na maging isang"seconds since 1970-01-01"  (Mga EpochSEcond) dobleng halaga.

O siyempre pa, kailangan mong baguhin ang time format string para malaman ang espesipikong format ng bawat source date at time column ng dataset, tingnan ang
[dokumentasyon ng oras](#string-time-units).

Sa teknikal na paraan, hindi mo kailangang gamitin Kalendaryo2.parseTEpochSeconds () upang gawing epochSeconds ang pinagsamang petsa+time. Maaari mo lamang ipasa ang petsa+time StringERDDAP™at magtakda ng format (hal.g.,
yyyy-MM-dd'T'H:mm:s'Z') sa pamamagitan ng attribute ng mga yunit. Subalit may mahalagang mga pakinabang sa pagkumberte sa epochSeconds-lalo na, ang EDDTable FromFiles ay kung gayon ay maaaring madaling mag-ingat ng mga saklaw ng mga halaga ng panahon sa bawat file at kaya ay mabilis na magpasiya kung titingin sa isang ibinigay na file kapag tumutugon sa isang kahilingan na may mga limitasyon sa oras.

Ang isang kaugnay na problema ay ang pangangailangan na lumikha ng isang nagkakaisang petsa+time column mula sa isang pinagmulan na may hiwalay na taon, buwan, petsa, oras, minuto, segundo. Magkatulad na katulad ang solusyon, ngunit kadalasan ay kakailanganin mong i- zero-pad ang marami sa mga field, kaya, halimbawa, buwan (1 - 12) at petsa (1 - 31) ay laging may 2 numero. Narito ang isang halimbawa ng taon, buwan, petsa:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Ang isang kaugnay na problema ay ang pangangailangang lumikha ng isang nagkakaisang kolumna ng latitud o longhitud sa pamamagitan ng pagsasama ng mga datos sa mga hiwalay na digri, minuto, at segundo ng pinagkunang mesa, na ang bawat isa ay nakaimbak bilang mga integer. Halimbawa,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Pagkumberte sa isang kolum na may pangalang "lon" na may mga halagang longhitúd mula 0 - 360° tungo sa isang kolum na pinanganlang "matagalan" na may mga pamantayan mula sa -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
IyansourceNameAng ekspresyon ay gumagawa ng isang bagong "mahabang" kolum sa pamamagitan ng pagkumberte ng dobleng halaga mula sa "lon" column sa bawat hanay ng source file (Malamang na may 0 - 360 pamantayan) , at sa pamamagitan ng paggawa niyan sa -180 tungo sa 180 dobleng halaga.

Kung sa halip ay nais mong baguhin ang pinagmulang longhitud ng -180 - 180° tungo sa 0 - 360°, gamitin
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Pag - abuso sa Dalawang Katagalugan:
Kung ang dataset ay may 2 pagbabago sa longhitud, inirerekomenda namin ang paggamit ngdestinationName= Panghabang panahon para sa -180 - 180° na magkakaiba atdestinationName= Habaang - Buhay0360 (at longName=\"Longude 0-360°".) para sa 0 - 360° variable. Mahalaga ito dahil kung minsan, ang mga gumagamit nito ay gumagamit ng Advanced Search para maghanap ng impormasyon sa loob ng isang espesipikong longhitud. Ang paghahanap na iyan ay mas mabisa kung ang longhitud ay may halagang -180 - 180° para sa lahat ng datasets. Gayundin, ang geospatial\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting at Eastern\\_Eastings ang pangglobong mga katangian ay saka ilalagay sa isang hindi nagbabagong paraan (na may halaga ng longhitud -180 hanggang 180°) ;
    
###### Pagkumberte sa isang kolum na pinanganlang "tempF" na may mga pamantayan sa temperatura sa degree\\_ Ang F sa isang kolum na may pangalang "tempC" na may mga temperatura sa digri\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
IyansourceNameAng ekspresyon ay gumagawa ng isang bagong "tempC" column sa pamamagitan ng pagkumberte sa bloom degree\\_ F na halaga mula sa "tempF" column sa bawat hanay ng source file sa isang floating degree\\_ C na halaga.

Pansinin na ang iyong dataset ay maaaring magkaroon ng kapuwa orihinal na temp Iba - iba ang kulay at ang bagong panahon Iba - iba sa pamamagitan ng pagkakaroon ng iba pang mga pagkakaiba
```
    <sourceName>tempF</sourceName>
```
###### Pagkumberte sa "speed" at "direction" na mga haligi sa dalawang kolum na may mga bahaging u,v
* Upang makagawa ng isang u variable, gamitin
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Upang makagawa ng v iba't ibang uri, gamitin
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
O, ibinigay u,v:
* Upang gumawa ng mabilis na pagbabago, gamitin
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Upang baguhin ang direksiyon, gamitin
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Halimbawa:
Narito ang isang halimbawa ng paggamit ng isang iskrip, hindi lamang isang ekspresyon, bilang isang salitasourceName. Inaasahan namin na ang mga iskrip, kung ihahambing sa mga pananalita, ay hindi na kakailanganin nang madalas. Sa kasong ito ang tunguhin ay ibalik ang hindi-NaN nawawalang halaga (-99) para sa mga halaga ng temperatura sa labas ng espesipikong antas. Pansinin na ang iskrip ay ang bahagi pagkatapos ng "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Matigas na Bandila
Kung babaguhin mo ang pananalita o iskrip na binigyang - kahulugan sa isang salitasourceName, dapat kang magtakda ng[matigas na watawat](/docs/server-admin/additional-information#hard-flag)para sa dataset kaya angERDDAP™Tinatanggal ang lahat ng nakuhang impormasyon para sa dataset at muling binabasa ang bawat talaksan ng datos (paggamit ng bagong pananalita o iskrip) sa susunod na pagbuhat nito sa dataset. Sa ibang paraan, magagamit mo[Mga Dasd](#dasdds)na katumbas ng paglalagay ng matigas na watawat.

###### Porsiyento
Bihira lamang itong may kaugnayan: Sapagkat ang mga pananalita at mga iskrip ay nakasulat sadatasets.xml, na isang dokumento ng XML, dapat na isaalang - alang mo ang anumang impormasyon&lt;, `&gt;, at & characters sa mga ekspresyon at iskrip bilang&lt;, &gt; at &amp; .

###### Karaniwang mga Problema
Ang karaniwang problema ay na ikaw ay lumilikha ng iba't ibang bagaysourceName= *pananalita* ngunit ang resultang hanay ng mga datos ay mayroon lamang nawawalang mga halaga. Sa alternatibong paraan, ang ilang hanay ng bagong hanay ay may nawawalang mga pamantayan at inaakala mong hindi dapat ang mga ito. Ang pangunahing problema ay na may mali sa ekspresyon atERDDAPang pagkakamaling iyon tungo sa nawawalang halaga. Upang lutasin ang problema,

* Tingnan ang ekspresyon upang makita kung ano ang maaaring maging problema.
* Tingnan[log.txt](/docs/server-admin/additional-information#log), na magpapakita ng unang maling mensahe na nalikha sa panahon ng paglikha ng bawat bagong kolum.

Ang karaniwang mga dahilan ay:

* Ginamit mo ang maling kaso. Ang mga kapahayagan at iskrip ay sensitibo sa kaso.
* Inalis ninyo ang pangalan ng klase. Halimbawa, dapat mong gamitin ang Math.abs () , hindi lang mga ab () .
* Hindi kayo gumagawa ng mga pagkumberte. Halimbawa, kung ang data type ng isang halagang parameter ay String at ikaw ay may dobleng halaga, kailangan mong baguhin ang isang doble upang maging isang String sa pamamagitan ng ""+d.
* Ang pangalan ng tudling sa pananalita ay hindi eksaktong katugma ng pangalan ng tudling sa talaksan (o maaaring iba ang pangalan sa ilang file) .
* May kaugnay na pagkakamali sa pananalita (e.g., isang nawawala o ekstra ') ').

Kung ikaw ay maipit o mangailangan ng tulong,
Pakisuyong isama ang mga detalye at tingnan ang ating[sa pagkuha ng karagdagang suporta](/docs/intro#support).
        
###### &lt;destinationName;{#destinationname-1} 
* [&lt;destinationName&gt;] (#Shinationname) - ang pangalan ng variable na ipapalabas at gagamitin ngERDDAP™gumagamit.
    * Ito ay OPSYONAL. Kung wala, ang[sourceName](#sourcename)ay ginagamit.
    * Ito'y kapaki - pakinabang sapagkat pinangyayari nitong baguhin mo ang isang malabo o kakatwang bagaysourceName.
    *   destinationNameay sensitibo sa kaso.
    *   destinationNameSUST magsimula sa pamamagitan ng isang liham (A-Z, a-z) at Ang MUST ay susundan ng 0 o higit pang mga karakter (A-Z, a-z, 0-9, at \\_) . ('' ay pinahintulutan bagoERDDAP™bersyon 1.10.) Ang restriksiyong ito ay nagpapahintulot sa mga pangalan ng datos na maging pareho saERDDAP™, sa mga fection file, at sa lahat ng software kung saan gagamitin ang mga file na iyon, kasama na ang mga programming language (tulad ngPython,Matlab, atJavaScript) kung saan may katulad na mga paghihigpit sa iba't ibang pangalan.
    * Sa EDDTable datasets,[longhitud, latitud, altitud (o lalim) , at panahon](#destinationname)espesyal ang mga variable ng datos.
             
###### &lt;datos Uring;{#datatype} 
* [&lt;dataType&gt;] (#datatype) -- Sabihin ang uri ng datos na nagmumula sa pinagmulan. (Halimbawa, sa ilang kaso, kapag nagbabasa ng impormasyon mula sa mga file ng ASCII, binabanggit nito kung paano dapat itago ang mga impormasyong galing sa pinagmumulan nito.) 
    * Ito'y REURURED sa pamamagitan ng ilang uri ng dataset at IGNORED ng iba. Mga uri ng datos na nangangailangan nito para sa kanilangdataVariableang mga ito:EDDGridMula saXxFiles, EDDTable FromXxFiles, EDDTTable FromMWFS, Kawili - wili Mula sa MGANO, Mapagkakatiwalaan Mula saSOS. Hindi pinapansin ng ibang uri ng dataset ang tag na ito dahil nakukuha nila ang impormasyon mula sa pinagmulan.
         
    * Ang makatuwirang mga pamantayan ay alinman sa pamantayan[ERDDAP™mga uri ng datos](#data-types)At ang booleum (Tingnan ang ibaba) . Ang mga pangalan ng dataType ay case-sensitive.
         
###### Mga datos ng bootation{#boolean-data} 
*   ["boolean"](#boolean-data)ay isang pantanging kaso.
    * Panloob,ERDDAP™ay hindi sumusuporta sa isang uri ng boolean dahil ang mga boolean ay hindi makapag - iimbak ng nawawalang mga halaga at ang karamihan ng mga uri ng talaksan ay hindi makasusuporta sa mga boolean. Gayundin,DAPay hindi sumusuporta sa mga boolean, kaya walang pamantayang paraan ngquery boolean variables.
    * Paglalarawan sa "boolean" para sa datos Uri sadatasets.xmlay magpapangyari sa mga pamantayang boolean na iimbak at kinakatawan bilang mga byte: 0=bulaan, 1=tunay, 127=missing\\_value.
    * Masasabi ng mga gumagamit nito ang mga limitasyon sa pamamagitan ng paggamit ng mga pamantayang numero (Halimbawa, "ay Mabuhay=1") .
    *   ERDDAP™Kung minsan ay kailangang gamitin ng mga administrador ang "boolean" data Uri sadatasets.xmlupang magsumbongERDDAP™kung paano makipag - ugnayan sa pinagmulang datos (e.g., upang basahin ang mga pamantayang boolean mula sa isang kaugnay na database at gawin itong 0, 1, o 127) .
         
* Kung nais mong baguhin ang isang data variable mula sa dataType sa source files (halimbawa, maikli) sa iba pang datos Uri sa dataset (Halimbawa, int) , huwag gamitin&lt;dataType&gt; upang tiyakin kung ano ang nais mo. (Ito ay gumagana para sa ilang mga uri ng datasets, ngunit hindi ang iba.) Sa halip:
    * Gamitin&lt;dataType&gt; upang tiyakin kung ano ang nasa mga file (halimbawa, maikli) .
    * Nasa&lt;addAttributes&gt; para sa variable, magdagdag ng a[scale\\_factor](#scale_factor)Isaalang - alang ang bagong datos Uri (Halimbawa, int) at 1, halimbawa,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt;addAttributes&gt;] (#variable-datributes) - bigyan ng kahulugan ang isang set ng mga katangian ( *Pangalan* = *halaga* ) na idinagdag sa mga katangian ng pinagmulan para sa isang pagbabago, upang gawin ang pinagsamang mga katangian para sa isang pagbabago. Ito ay OPSYONAL.
Kung ang Iba't Iba'y[Pinagmulan](#variable-addattributes)o&lt;addAttributes&gt; isama[scale\\_factorat/oadd\\_offset](#scale_factor)Ipagpalagay na, ang kanilang mga pamantayan ay gagamitin upang ilabas ang impormasyon mula sa pinagmulan bago ipamahagi sa kliyente. Ang unpacked variable ay sa parehong data type (Halimbawa, lumutang) bilang angscale\\_factoratadd\\_offsetmga pamantayan.
        
###### May pagkakaiba&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Kapani - paniwalang Attributes / Kapani - paniwala&lt;addAttributes&gt; ** ] (#variable-datributes) --&lt;addAttributes&gt; ay isang OPSYONAL na tag sa loob ng isang&lt;axisVariable&gt; o&lt;dataVariable&gt; tagong ginagamit upang baguhin ang mga katangian ng variable.
    
    *    ** Gumamit ng Kaibahan&lt;addAttributes&gt; baguhin ang iba't ibang katangian. ** ERDDAP™Pinagsasama ang mga katangian ng variable mula sa pinagkunan ng dataset (source)** Pinagmulan **) at ang variable'** addAttributes **kung ano ang kahulugan ngdatasets.xml  (na may priyoridad) upang gawin ang variable's "** Pinagsamang mga Attributes ** ", alin angERDDAP™ang tanong ng mga gumagamit. Sa gayon, magagamit moaddAttributesupang baguhin ang mga halaga ng pinagmumulang attributes, magdagdag ng bagong mga katangian, o alisin ang mga katangian.
    * Tingnan ang [ ** &lt;addAttributes&gt; **ng impormasyon... (#Adattributes) na kumakapit sa pangglobo at iba't ibang bagay** &lt;addAttributes&gt; ** .
    *   ERDDAP™Hanapin at gamitin ang marami sa mga katangiang ito sa iba't ibang paraan. Halimbawa, ang mga pamantayang colorBar ay hinihiling upang makagawa ng iba't ibang makukuha sa pamamagitan ngWMS, upang makagawa ng mga mapa na may hindi nagbabagong kulay na mgaBar.
    *   [Ang longhitud, latitud, altitud (o lalim) , at iba't iba ang oras](#destinationname)kumuha ng maraming angkop na metadata nang kusa (Halimbawa,[mga yunit](#units)) .
    * Isang sampol&lt;addAttributes&gt; para sa isang data variable ay:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Ang walang laman na numerong OfObservations na attribute ay sanhi ng source numberObservations na attribute (kung mayroon) na aalisin sa panghuli at pinagsamang talaan ng mga katangian.
    * Ang pagtutustos ng impormasyong ito ay nakatutulongERDDAP™gumawa ng mas mabuting trabaho at tulungan ang mga gumagamit nito na maunawaan ang mga dataset.
Ang mahusay na metadata ay gumagawa sa isang dataset na magagamit.
Ang insufficient metadata ay gumagawa sa isang dataset na walang silbi.
Pakisuyong maglaan ng panahon upang gumawa ng mabuting trabaho taglay ang metadata na mga katangian.
    
###### Mga komento tungkol sa iba't ibang katangian na natatangi saERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)ay isang RECOMMENDED variable attribute. Halimbawa,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Ang katangiang ito ay mula sa[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)at[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)pamantayan ng metadata.
* Kung kasalukuyan, ito MUST ay isang hanay ng dalawang halaga ng parehong uri ng datos gaya ng patutunguhang data na uri ng variable, na tinitiyak ang aktuwal na (hindi ang teoretikal o ang ipinahihintulot) Katamtaman at pinakamataas na halaga ng impormasyon para sa kakaibang bagay na iyan.
* Kung ang datos ay siksik[scale\\_factorat/oadd\\_offset](#scale_factor),actual\\_rangeay dapat na may nakabuklat na mga halaga at nasa katulad na uri ng datos na gaya ng hindi nabuklat na mga halaga.
* Para sa ilang mapagkukunan ng datos (Halimbawa, lahat ng EDDTable Mula sa... Mga talaksang datos) ,ERDDAP™magtakda ngactual\\_rangesa bawat bagay at itakda angactual\\_rangeSabihin pa. Kasama ang iba pang pinagmumulan ng datos (Halimbawa, mga database na may kaugnayan, Cassandra,DAPPER,Hyrax) , maaaring mahirap o mabigat para sa pinagmumulan na kalkulahin ang saklaw, kayaERDDAP™ay hindi humihiling nito. Sa kasong ito, pinakamabuti kung maitatakda moactual\\_range  (lalo na sa longhitud, latitud, altitud, lalim, at iba't ibang oras) sa pamamagitan ng pagdaragdag ngactual\\_range[[Talaksan]&lt;addAttributes&gt;] (#Adattributes) para sa dataset na ito sadatasets.xml, halimbawa,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Para sa numero[mga pagbabago sa oras at timestamp](#time-units), ang mga pamantayang binanggit ay dapat na siyang kaugnay na pinagmumulan (hindi destinasyon) Mga pamantayan sa numero. Halimbawa, kung ang pinagkunang mga halaga ng oras ay iniimbak bilang mga "araw mula 1985-01-01", pagkatapos ay angactual\\_rangedapat itukoy sa "mga araw mula 1985-01-01". At kung nais mong tukuyin ang NGAYON bilang ikalawang halaga para sa halos-real-time data na pana-panahong inaapruba, dapat mong gamitin ang NaN . Halimbawa, upang magtakda ng isang data range ng 1985-01-17 hanggang NGAYON, gamitin

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Kungactual\\_range( Alin ditoERDDAP™kalkulahin ito o sa pamamagitan ng pagdaragdag nito&lt;addAttributes&gt;),ERDDAP™sa gumagamit ng Date Access Form ( *datasetID* .html) at Gumawa ng isang Graph web page ( *datasetID* .grap) para sa dataset na iyon at gamitin ito kapag gumagawa ng FGDC at ISO 19115 metadata. Gayundin, ang huling 7 araw ng panahonactual\\_rangeay ginagamit bilang subset ng default time.
* Kungactual\\_rangekilala, magagamit ng mga gumagamit ang[Main () at max () mga gawain](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)sa mga kahilingan, na kadalasang lubhang kapaki - pakinabang.
* Para sa lahat ng EDDTTable... datasets, kungactual\\_rangekilala (alinman sa sa pamamagitan ng pagbibigay ng espesipikong katuturan nito o ngERDDAP™pagtantiya nito) ,ERDDAP™ay mabilis na tatanggihan ang anumang kahilingan para sa datos sa labas ng range na iyon. Halimbawa, kung ang pinakamababang halaga ng dataset ng oras ay katumbas ng 1985-01-17, kung gayon ang isang kahilingan para sa lahat ng datos mula 1985-01-01 hanggang 1985-01-16 ay agad na tatanggihan gamit ang maling mensahe na "Ang iyong query ay walang nagawang tugmang resulta." Ito ang gumagawaactual\\_rangeisang napakahalagang piraso ng metadata, yamang ito'y makapagliligtasERDDAP™malaking pagsisikap at pagtitipid ng maraming panahon sa gumagamit nito. At itinatampok nito na angactual\\_rangeAng mga halaga ay hindi dapat mas makitid kaysa aktuwal na lawak ng datos; kung hindi,ERDDAP™ay maaaring may kamaliang magsabi "Walang katugmang datos" kapag sa katunayan ay may kaugnay na datos.
* Kapag ang gumagamit ay pumipili ng isang subset ng datos at humihiling ng isang file type na kinabibilangan ng metadata (Halimbawa,.nc) ,ERDDAP™mga pagbabagoactual\\_rangesa talaksan ng pagtugon upang isalamin ang range ng subset.
* Tingnan din[data\\_minatdata\\_max](#data_min-and-data_max), na isang mapagpipiliang paraan upang tiyakin angactual\\_range. Gayunman, binabale - wala na ngayon ang mga itoactual\\_rangeay binibigyang - kahulugan ng CF 1.7+.
         
###### Kulay ng Bar Atributes{#color-bar-attributes} 
May ilang OPSYONAL na iba't ibang mga katangian na nagtatakda sa iminungkahing default na mga katangian para sa isang color bar (na ginagawang kulay ang mga data value sa mga imahen) para sa pagkakaibang ito.
* Kung kasalukuyan, ang impormasyong ito ay ginagamit bilang default na impormasyon sa pamamagitan ng griddap attabledapkailanma't humiling ka ng isang imahen na gumagamit ng isang color bar.
* Halimbawa, kapag ang mga datos na latitud-haba ang pagkakasunud-sunod ay binalak bilang isang coverage sa isang mapa, ang color bar ay nagsasaad kung paanong ang mga halaga ng datos ay ginagawang mga kulay.
* Ang pagkakaroon ng ganitong mga pamantayan ay nagpapahintulotERDDAP™upang lumikha ng mga imahe na gumagamit ng hindi nagbabagong kulay bar sa ibayo ng iba't ibang mga kahilingan, kahit na iba-iba ang oras o iba pang mga dimensiyonal na halaga.
* Ang mga pangalang attribute na ito ay nilikha para gamitinERDDAP. Hindi sila mula sa pamantayang metadata.
* Ang mga katangian na nauugnay sa color bar ay:
    *    **colorBarMinimum** Sabihin ang pinakamababang halaga sa colorBar. Halimbawa,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Kung ang datos ay siksik[scale\\_factorat/oadd\\_offset](#scale_factor), Itakda angcolorBarMinimumbilang isang hindi pa nakabuklat na halaga.
    * Mas mababa ang halaga ng impormasyon kaysacolorBarMinimumay kinakatawan ng katulad na kulay ngcolorBarMinimummga pamantayan.
    * Ang dapat na maging katangian ng[type= "doble"](#attributetype), anuman ang uri ng data variable.
    * Ang halaga ay karaniwang isang magandang bilog na numero.
    * Pinakamabuting mga kaugalian: Iminumungkahi namin ang halaga na bahagyang mas mataas kaysa pinakamababang halaga ng datos.
    * Walang default na halaga.
*    **colorBarMaximum** Sabihin ang pinakamalaking halaga sa colorBar. Halimbawa,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Kung ang datos ay siksik[scale\\_factorat/oadd\\_offset](#scale_factor), Itakda angcolorBarMinimumbilang isang hindi pa nakabuklat na halaga.
    * Mas mahalaga ang impormasyon kaysacolorBarMaximumay kinakatawan ng katulad na kulay ngcolorBarMaximummga pamantayan.
    * Ang dapat na maging katangian ng[type= "doble"](#attributetype), anuman ang uri ng data variable.
    * Ang halaga ay karaniwang isang magandang bilog na numero.
    * Pinakamabuting mga kaugalian: Iminumungkahi namin ang isang halaga na bahagyang mas mababa kaysa pinakamataas na halaga ng datos.
    * Walang default na halaga.
*    **kulay BarPalette** Sabihin ang paleta para sa colorBar. Halimbawa,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * LahatERDDAP™Sinusuporta ng mga instalasyon ang pamantayang mga paleta na ito: BlackBlue White, BlackRed White, Black White, Blue WhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, Red WhiteBlue, ReverseRainbow, Topography, TopographyDepth\\[idinagdag noong 0.74\\], WhiteBlack, WhiteBlueBlack, at WhiteRedBlack.
    * Kung naluklok ka na[Karagdagang mga Paleta](/docs/server-admin/additional-information#palettes), maaari mong tukuyin ang isa sa mga ito.
    * Kung wala ang attribute na ito, ang default ay Blue WhiteRed kung \\-1\\*colorBarMinimum=colorBarMaximum; kung hindi ang default ay Rainbow.
*    **" colorBarScale "** Sabihin ang sukat para sa colorBar. Halimbawa,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Ang mga mahahalagang pamantayan ay ang Linear at Log.
    * Kung ang halaga ay Log,colorBarMinimumay dapat na mas malaki kaysa 0.
    * Kung wala ang attribute na ito, ang default ay Linear.
*    **kulay Mabangis** Sabihin kung ang colorBar ay may patuloy na kulay, o kung baga ang colorBar ay may ilang kulay na discrete. Halimbawa,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Ang mga pamantayang moral ay tunay at mali.
    * Kung ang katangiang ito ay wala, ang default ay totoo.
*    **Mga Pag - uulat ng KulayBarN** Sabihin ang default na bilang ng mga seksiyon sa colorBar. Halimbawa,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Ang makatuwirang mga pamantayan ay positibong mga tagapag - ingat.
    * Kung wala ang attribute na ito, ang default ay \\-1, na nagsasabiERDDAP™upang piliin ang bilang ng mga bahagi batay sa saklaw ng kulayBar.
###### WMS {#wms} 
Ang pangunahing mga kahilingan upang ang isang variable ay makuha sa pamamagitan ngERDDAP'WMSAng server ay:
* Ang dataset ay dapat na maging isangEDDGrid... dataset.
* Ang data variable MUST ay isang grided variable.
* Ang data variable MUST ay may longhitud at latitud na axis variables. (Ang ibang mga variable ng axis ay OPSYONAL.) 
* Mayroong mga halagang longhitud sa pagitan ng -180 at 180.
* AngcolorBarMinimumatcolorBarMaximumMga katangiang MUST ay dapat tiyakin. (Ang iba pang katangian ng color bar ay OPSYONAL.) 

###### data\\_minatdata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** at **data\\_max** ](#data_min-and-data_max)-- Ang mga ito ay iba't ibang mga katangian na binigyang - kahulugan sa World Ocean Circulation Experiment (MALUNGKOT) paglalarawan ng metadata. Halimbawa,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Iminumungkahi namin na gamitin ninyo[actual\\_range](#actual_range), sa halip nadata\\_minatdata\\_max, dahilactual\\_rangeay binibigyang - katuturan ngayon ng CF speciation.
    * Kung kasalukuyan, ang mga ito ay dapat na katulad ng uring data ng patutunguhang datos ng variable, at tiyakin ang aktuwal na uri (hindi ang teoretikal o ang ipinahihintulot) Katamtaman at pinakamataas na halaga ng impormasyon para sa kakaibang bagay na iyan.
    * Kung ang datos ay siksik[scale\\_factorat/oadd\\_offset](#scale_factor),data\\_minatdata\\_maxay dapat na nakabuklat ng mga halaga gamit ang di-packed data type.
         
###### Iba - ibadrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- Ito ay isang OPSIYAL na variable attribute na ginagamit ngERDDAP™  (at walang pamantayan ng metadata) na nagsasaad ng default na halaga para sa "Love Land Mask" opsyon sa dataset's Make A Graph form ( *datasetID* .grap) at para sa &.land parameter sa isang URL na humihiling ng mapa ng datos. Halimbawa,
    ```
        <att name="drawLandMask">under</att>  
    ```
Tingnan ang[drawLandMaskIpaliwanag](#drawlandmask).
###### Pag - e - Encoding{#encoding} 
*   [ **\\_Encoding** ](#encoding)
    * Ang katangiang ito ay maaari lamang gamitin na may String variables .
    * Ang katangiang ito ay matinding inirerekomenda.
    * Ang katangiang ito ay mula sa[NetCDFPatnubay ng User (NIUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * PanloobERDDAP™, Strings ay isang pagkakasunod-sunod ng 2-byte na karakter na gumagamit ng[Unicode UCS-2 character set](https://en.wikipedia.org/wiki/UTF-16).
    * Maraming uri ng talaksan ang sumusuporta lamang sa 1-byte na mga karakter sa Strings at sa gayon ay kailangan ang katangiang ito upang matukoy ang isang kaugnay na katangian
        [Ipininta (AKA code page) ](https://en.wikipedia.org/wiki/Code_page)na nagbibigay ng kahulugan kung paano mapamapa ang 256 na posibleng mga pamantayan sa isang set ng 256 na mga karakter na hinango mula sa karakter na UCS-2 na itinakda at/o ang sistemang regulator, e.g.,[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (na nangangailangan ng 1 hanggang 4 na byte bawat karakter) .
    * Mga pamantayan para sa \\_Encoding ay case-insensitive.
    * Sa teoriya,ERDDAP™ay maaaring sumuporta sa \\_Encoding na mga taga-identifiers mula sa[ang talaang ito ng IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml), ngunit sa gawa,ERDDAP™kasalukuyang mga alalay lamang
        * ISO-8859-1 (Pansinin na ito ay may mga gatlang, hindi nagbibigay - diin) , na may kalamangan na ito ay katulad ng unang 256 na karakter ng Unicode, at
        * UTF-8.
    * Kapag nagbabasa ng source files, ang default na halaga ay ISO-8859-1, maliban sa netcdf-4 files, kung saan ang default ay UTF-8.
    * Ito ay isang patuloy na magulong isyu dahil maraming mga talaksan ng pinagmulan ay gumagamit ng mga charset o mga ekwasyon na iba sa ISO-8859-1, ngunit hindi matukoy ang charset o persepsiyon. Halimbawa, maraming mga source data files ay may ilang metadata na kinopya at nakaraang kinuha mula sa Microsoft Word sa Windows at sa gayon ay may mga magarang hyphen at mga apotrophe mula sa isang Windows-specific charset sa halip ng ASCI hyphen at mga apotrophes. Ang mga karakter na ito ay pagkatapos ay lumilitaw bilang mga kakaibang character o '?' inERDDAP.
         
###### fileAccessBaseUrl{#fileaccessbaseurl} 
*    **[fileAccessBaseUrl](#fileaccessbaseurl)at ang fileAccesSuffix** ay bihirang - bihirang gamiting mga katangian na hindi mula sa anumang pamantayan. Kung ang isang EDDTable column ay may mga file ng web canccess files (e.g., larawan, video, o audio files) , maaari mong idagdag
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
upang tiyakin ang himpilang URL (nagtatapos sa /) Kailangang gawing kumpletong URL ang mga files. Sa mga kakaibang kaso, tulad ng kapag ang isang kolum ay may mga reperensiya sa mga talaksang .png ngunit ang mga halaga ay kulang ".png", maaari mong idagdag ang .png
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(halimbawa,&lt;Hinango noong="fileAccesesSuffix"&gt;.png&lt;/a&gt;)
upang magtakda ng isang hulapi na idaragdag upang gawing kumpletong URL ang mga pangalan. Pagkatapos ay para sa.htmlTablesagot,ERDDAP™ay magpapakita ng pangalan bilang kawing sa buong URL (base Ang Url pati na ang pangalan at ang hulapi) .

Kung gusto moERDDAP™upang ihain ang mga kaugnay na file, gumawa ng hiwalay[Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)datos para sa mga file na iyon (ito ay maaaring isang pribadong dataset) .
    
###### Tagas ng talaksan Url{#fileaccessarchiveurl} 
*   [ **Tagas ng talaksan Url** ](#fileaccessarchiveurl)ay isang napakabihirang gamiting katangian na hindi mula sa anumang pamantayan. Kung ang isang EDDTable column ay may mga file ng web canccess files (e.g., larawan, video, o audio files) na makukuha sa pamamagitan ng arkibo (e.g.,.ziptalaksan) Makukuha sa pamamagitan ng URL, gamitin&lt;Pangalang= "fileAccessArchiveUrl"&gt; *NGURL* &lt;/att&gt; upang magtakda ng URL para sa arkibo.
    
Kung gusto moERDDAP™upang ihain ang arkibo, gumawa ng hiwalay[Mapagkakatiwalaan Mula sa mga Bilibini](#eddtablefromfilenames)datos para sa talaksang iyon (ito ay maaaring isang pribadong dataset) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- Ito ay isang pabagu - bagong katangian kung&lt;Ang variablesMust HaveIosCategory&gt; ay nakatakdang magkatotoo (ang default) sa loob[setup.xml](/docs/server-admin/deploy-install#setupxml); kung hindi, ito ay OPSYONAL.
Halimbawa,&lt;pangalan="ioos\\_category"&gt; Kasalidad&lt;/att&gt;
Ang mga kategorya ay mula sa[NOAAAng Sistema ng Obserbasyon sa Karagatan (MGA IOO) ](https://ioos.noaa.gov/).
    
    *    (Tungkol sa pagsulat nito) Hindi namin alam ang pormal na kahulugan ng mga pangalang ito.
    * Ang mga pangunahing pangalan ay mula sa Zdenka Willis' . ppt "Integrated Ocean Observing System (MGA IOO)  NOAA'Ang Paglapit sa Pagtatayo ng Unang Operating Capility" at mula sa paunang Operating[AMINNG IOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (pahina 1-5) .
    * Malamang na ang talaang ito ay babaguhin sa hinaharap. Kung may mga kahilingan ka, pakisuyong email Chris. John sa noaa.gov.
    *   ERDDAP™ay umaalalay sa mas malaking listahan ng mga kategorya kaysa sa IOOS sapagkat idinagdag ni Bob Simons ang karagdagang mga pangalan (Karamihan ay batay sa pangalan ng mga larangan ng siyensiya, halimbawa, Biology, Ecology, Meteorology, Statistics, Taxonomy) para sa ibang uri ng datos.
    * Ang kasalukuyang makatuwirang mga pamantayan saERDDAP™ay ang Bathymetry, Biology, Bottom Charact, CO2, Colored Organic Matter, Contaminants, Currents, Disolved Nutrients, Disolved O2, Ecology, Fish Profided, Fish Species, Heat Flux, Hytoplankology, Identifier, Local, Meteorology, Ocean Color, Official Properties, Other, Pathogens, Phytoplank Species, Pressience, Production, Salintivity, Estainteria, Estadistika, Surreacedom.
    * May ilang pagkakasanib at pagkakasalungatan sa pagitan ng iba't ibang termino - gawin mo ang iyong pinakamabuti.
    * Kung idaragdag moioos\\_categorysa listahan ng&lt;categoryAttributes&gt; sa loobERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)talaksan, madaling mahahanap ng mga gumagamit ang mga datos na may katulad na datos sa pamamagitan ngERDDAP'Sa paghahanap ng Datesets ni Category" sa home page.
        [Gamitinioos\\_categoryupang hanapin ang mga dataset ng interes.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Mayroon[isang talakayan tungkol saERDDAP™atioos\\_categorysa loobERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Baka matukso kang magtakda&lt;Ang mga variablesMust HaveIosCategory&gt; upang magsinungaling upang ang katangiang ito ay hindi kailangan. ("Pfft&#33; Ano ito sa akin?") Ang ilang dahilan upang iwan ito ay natupad (ang default) at gamitinioos\\_categoryay:
    
    * Kung setup.xml's&lt;Mga variableMust HaveIosCategory&gt; ay nakatakdang magkatotoo,[GenerateDatasetsXml](#generatedatasetsxml)laging lumilikha/nagpapahiwatig ng isangioos\\_categoryIsaalang - alang ang bawat pagkakaiba sa bawat bagong dataset. Kaya bakit hindi mo ito iwan?
    *   ERDDAP™ang mga gumagamit nito na naghahanap ng mga dataset ng interes ayon sa kategorya.ioos\\_categoryay isang lubhang kapaki - pakinabang na kategorya sa paghahanap sapagkat ang mga iioos\\_categories (Halimbawa, temperatura) ay malawak. Ito ang gumagawaioos\\_categorymas mabuti sa layuning ito kaysa, halimbawa, ang mas pinong-gulang na CFstandard\\_names (na hindi mabuti para sa layuning ito dahil sa lahat ng mga pagbabagu - bago at bahagyang mga pagkakaiba, halimbawa, ang dagat\\_surface\\_temperature versus dagat\\_water\\_temperature) .
(Paggamitioos\\_categorysapagkat ang layuning ito ay kontrolado ng&lt;categoryAttributes&gt; sa inyong setup.xml file.)
        [Gamitinioos\\_categoryupang hanapin ang mga dataset ng interes.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Ang mga kategoryang ito ay mula sa[NOAAAng Sistema ng Obserbasyon sa Karagatan (MGA IOO) ](https://ioos.noaa.gov/). Ang mga kategoryang ito ay pundamental sa paglalarawan ng IOOS sa misyon ng IOOS. Kung ikaw ay nasa loobNOAA, suportaioos\\_categoryay mabuti Isang-NOAAna dapat gawin. (Bantayan ito[IsaNOAAvideo](https://www.youtube.com/watch?v=nBnCsMYm2yQ)at maging kinasihan&#33;) Kung ikaw ay nasa iba pang ahensiya sa E.U. o internasyonal, o nagtatrabaho sa mga ahensiya ng pamahalaan, o nagtatrabaho sa iba pang Ocean Observing System, hindi ba isang mabuting ideya na makipagtulungan sa tanggapan ng IOS ng E.U.?
    * Sa malao't madali, baka gusto mo ng ibaERDDAP™upang maiugnay sa iyong datasets sa pamamagitan ng[EDDGridMula sa Erddap](#eddfromerddap)at[Mapagkakatiwalaang Mula sarddap](#eddfromerddap). Kung ang isa ayERDDAP™kailanganioos\\_category, ang iyong datasets ay dapat na mayioos\\_categorynararapatEDDGridMulaErddap at EDDTable MulaErddap hanggang sa paggawa.
    * Mas madaling isama sa sikolohikal na paraanioos\\_categorykapag lumilikha ka ng dataset (Ibang bagay lang iyonERDDAP™kailangan na idagdag ang datosERDDAP) , kaysa idagdag pagkatapos ng katotohanan (kung ipinasiya mong gamitin ito sa hinaharap) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)at[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Mga pamantayan ng metadata) ay isang RECOMMENDED variable attribute saERDDAP. Halimbawa,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™gamitin anglong\\_namepara sa pagbansag ng mga palakol sa mga grap.
    * Pinakamabuting mga kaugalian: Pagbutihin ang mga salita salong\\_namena para bang iyon ay isang titulo (Ginagamit ang unang salita at lahat ng mga salitang di-article) . Huwag isama ang mga yunit salong\\_name. Hindi dapat masyadong mahaba ang mahabang pangalan (karaniwan na&lt;20 tauhan), subalit dapat na higit na naglalarawan kaysa sa[destinationName](#destinationname), na kadalasang maikli ngunit malaman.
    * Kung "long\\_name" ay hindi binibigyang - kahulugan sa variable's[Pinagmulan](#variable-addattributes)o&lt;addAttributes&gt;,ERDDAP™lilikhain ito sa pamamagitan ng paglilinis ng[standard\\_name](#standard_name)  (kung naroroon) o angdestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)at **\\_Fill Halaga**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)at[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) ay iba't ibang katangian na naglalarawan sa isang bilang (Halimbawa, -999) na ginagamit upang kumatawan sa nawawalang halaga. Halimbawa,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Para sa String variables, ang default para sa pareho ay "" (ang walang laman na string) .
Para sa mga numerikong variable, ang default para sa dalawang ito ay ang NaN.
*   ERDDAP™kapuwa nakatutulongmissing\\_valueat \\_FillValue, yamang ang ilang pinagkukunan ng impormasyon ay nag - aatas ng bahagyang naiibang kahulugan sa mga ito.
* Kung kasalukuyan, ang mga ito ay dapat na katulad ng uring datos ng variable.
* Kung ang datos ay siksik[scale\\_factorat/oadd\\_offset](#scale_factor), angmissing\\_valueat \\ Ang mga pamantayan ay dapat ding siksikin. Sa katulad na paraan, para sa isang kolum na may String date/time values na gumagamit ng lokal[time\\_zone](#time_zone), angmissing\\_valueat \\_FillValue value dapat gamitin ang lokal na sona ng oras.
* Kung iba't ibang gamit ang pantanging mga pamantayang ito, angmissing\\_valueat/o \\_FillValue na mga katangian ay RERILS.
* Sapagkat[mga pagbabago sa oras at timestamp](#time-units)  (kung ang pinagmulan ay mga kuwerdas o numero) ,missing\\_valueAng s at \\_FillValues ay lumilitaw bilang "" (ang walang laman na string) kapag ang panahon ay isinulat bilang isang String at bilang NaN kapag ang panahon ay isinulat bilang isang doble. Ang pinagmumulan ng mga pamantayanmissing\\_valueat ang \\_FillValue ay hindi lilitaw sa metadata ng variable.
* Para sa mga Malaking Pagbabago,ERDDAP™laging kumokumbertemissing\\_values o \\_FillValue data values in "" (ang walang laman na string) . Ang pinagmumulan ng mga pamantayanmissing\\_valueat ang \\_FillValue ay hindi lilitaw sa metadata ng variable.
* Para sa mga pagkakaiba - iba ng numero:
Angmissing\\_valueat \\_FillValue ay lilitaw sa metadata ng variable.
Para sa ilang data format ng output,ERDDAP™ang pantanging mga numerong ito, e.g., makikita mo -999.
Para sa ibang data format (Partikular ang text-tulad ng format tulad ng .csv at.htmlTable) ,ERDDAP™ay papalit sa mga espesyal na numerong ito ng NaN o "".
* Ang ilang mga uri ng datos ay may katutubong nawawalang mga marker ng halaga na hindi kinakailangang malinaw na matukoy samissing\\_valueo \\_FillValue: Ang lumulutang at dobleng mga variable ay may NaNN (Hindi Bilang) , ginagamit ng String values ang walang laman na strando, at ang char na mga halaga ay may karakter\\uffff  (karakter #65535, na siyang halaga ng Unicode para sa Hindi Kagulangan) . Ang mga integer data type ay walang likas na nawawalang mga marker ng halaga.
* Kung ang isang integer variable ay may nawawalang halaga (Halimbawa, isang bakanteng posisyon sa isang talaksang .csv) ,ERDDAP™kung ano ang kahalagahan nitomissing\\_valueo \\_FillValue para sa ganitong bagay. Kung walang pagpapakahulugan,ERDDAP™ay magbibigay - kahulugan sa halaga bilang ang default na nawawalang halaga para sa uring iyon ng datos, na laging ang pinakamataas na halaga na maaaring hawakan ng uring iyon ng datos:
127 para sa mga byte variable, 32767 para sa maikli, 2147483647 para sa int, 9223372036854775807 mahaba,
255 para sa ubyte, 65535 para sa umikli, 4294967295 para sa uint, at 184467473709551615 para sa ulong.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
Sa bawat pagkakataonERDDAP™ng isang dataset, sinusuri nito kung ang mga variable na may integer source data type ay may katuturanmissing\\_valueo \\_FillValue attribute. Kung ang isang variable ay hindi, kung gayonERDDAP™naglilimbag ng mensahe sa log file (simula sa "Add \\_FillValue Attribute?".) Iminumungkahi na angERDDAP™Idinagdag ng administrador ang \\_Fill Mahalagang katangian sa pagkakaibang itodatasets.xml. Lubhang kapaki - pakinabang para sa bawat variable na magkaroon ng \\_FillValue omissing\\_valuesapagkat ang nawawalang mga halaga ay laging posible, e.g., kung ang isang ibinigay na file sa isang dataset ay walang ibinigay na variable,ERDDAP™ay kailangang iharap ang kakaibang bagay na iyan bilang taglay ang lahat ng nawawalang mga pamantayan para sa pagbabagong iyan. Kung ikaw ay magpasiya sa isang variable ay hindi dapat magkaroon ng \\_FillValue attribute, maaari mong idagdag ang
    &lt;Hinango mga pangalan="\\_FillValue"&gt;null&lt;/att&gt;, na siyang pipigil sa mensahe para diyandatasetID+ Kabihasnan sa hinaharap.
    
Sa bawat pagkakataonERDDAP™Sa simula, tinitipon nito ang lahat ng mga rekomendasyong iyon sa isang mensahe na nakasulat sa log file (pasimula "ADD \\_FillValue ATTRIBUTES?") , Nag-mailERDDAP™administrador, at sumulat sa isang CSV data file sa\\[Malaking Direktoryo\\]/logs/ directory. Kung nais mo, maaari mong gamitin ang programang GenerateDatasetsXml (at ang opsyon ng AddFillValue Attributes) upang ikapit ang lahat ng mungkahi sa CSV file sadatasets.xmltalaksan. Para sa alinman sa mga itodatasetID/ Mga kombinasyon sa talaksang iyon, kung ikaw ay magpasiyang hindi na kailangang idagdag pa ang ipinalalagay na sangkap, maaari mong baguhin ang katangian&lt;Hinango mga pangalan="\\_FillValue"&gt;null&lt;/att&gt; upang pigilin ang rekomendasyon para riyandatasetID+ Kabihasnan sa hinaharap.
    
Mahalaga ito&#33;
Gaya ng madalas sabihin ni Bob: ito'y masama (at nakakahiya) kung ang ilang katibayan ng pag - init ng globo ay dahil sa di - kilalang nawawalang mga pamantayan sa impormasyon (e.g., temperaturang 99 o 127 digri\\_ Ang C na dapat ay minarkahan bilang mga nawawalang pamantayan at sa gayon ay nagkokodigo ng mean at/o median statistics na mas mataas) .

* Ang \\_FillValue at ang \\missing\\_valueAng mga halaga para sa isang ibinigay na variable sa iba't ibang source file ay dapat na hindi pabagu - bago; kung hindi,ERDDAP™ay tatanggap ng mga files na may isang set ng mga halaga at tanggihan ang lahat ng iba pang files bilang "Bad Files". Upang lutasin ang problema,
    * Kung ang mga file ay nakatiklop.ncmga talaksan, magagamit mo[EDDGridMula sa mga Liwasang Hindi Nabuklat](#eddgridfromncfilesunpacked).
    * Kung ang mga file ay mga taskular data file, magagamit mo ang EDDTable From...Files '[Maging limitado Ano](#standardizewhat)upang magsumbongERDDAPupang gawing pamantayan ang mga source file habang ito ay binabasaERDDAP.
    * Para sa mas mabibigat na problema, magagamit mo[NcML](#ncml-files)o[NCO](#netcdf-operators-nco)upang lutasin ang problema.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (default = 1) at **add\\_offset**   (default = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)at[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) ang OPSYONAL variable attributes na naglalarawan ng data na naka-impake sa mas simpleng data type sa pamamagitan ng simpleng pagbabago.
    * Kung kasalukuyan, ang kanilang data type ay iba sa source data type at inilalarawan ang data type ng destinasyong entidad.
Halimbawa, ang isang pinagkukunan ng impormasyon ay maaaring nag - imbak ng lumulutang na mga data values na ang isang numero ng numero ay siksik bilang maiikling int (int16) , paggamitscale\\_factor= 0.1 atadd\\_offset= 0. Halimbawa,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

Sa halimbawang ito,ERDDAP™ang datos at ihaharap ito sa gumagamit bilang lumulutang na halaga ng datos.
    * Kung naroroon,ERDDAP™ay kukuha ng mga halaga mula sa mga katangiang ito, aalisin ang mga katangian, at kusang ibuklat ang impormasyon para sa gumagamit:
destinasyon Halaga = pinagmumulan Halaga \\*scale\\_factor+add\\_offset  
O, sabihin ang isa pang paraan:
na nakabuklat na Talaksan = siksik Halaga \\*scale\\_factor+add\\_offset
    * Angscale\\_factoratadd\\_offsetAng mga halaga para sa isang ibinigay na variable sa iba't ibang source file ay dapat na hindi pabagu - bago; kung hindi,ERDDAP™ay tatanggap ng mga files na may isang set ng mga halaga at tanggihan ang lahat ng iba pang files bilang "Bad Files". Upang lutasin ang problema,
        * Kung ang mga file ay nakatiklop.ncmga talaksan, magagamit mo[EDDGridMula sa mga Liwasang Hindi Nabuklat](#eddgridfromncfilesunpacked).
        * Kung ang mga file ay mga taskular data file, magagamit mo ang EDDTable From...Files '[Maging limitado Ano](#standardizewhat)upang magsumbongERDDAPupang gawing pamantayan ang mga source file habang ito ay binabasaERDDAP.
        * Para sa mas mabibigat na problema, magagamit mo[NcML](#ncml-files)o[NCO](#netcdf-operators-nco)upang lutasin ang problema.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (mula sa[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Pamantayang metadata) ay isang RECOMMENDED variable attribute saERDDAP. Pinananatili ng CF ang listahan ng ipinahihintulot[Mga karaniwang pangalan ng CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Halimbawa,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Kung idaragdag mostandard\\_namesa iba't ibang katangian at idagdagstandard\\_namesa listahan ng&lt;categoryAttributes&gt; sa loobERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)talaksan, madaling mahahanap ng mga gumagamit ang mga datos na may katulad na datos sa pamamagitan ngERDDAP'Sa paghahanap ng Datesets ni Category" sa home page.
    * Kung magbibigay ka ng CFstandard\\_namepara sa isang variable, ang mga units na attribute para sa variable ay hindi kailangang maging magkatulad sa Kanonical Units na tinukoy para sa pamantayang pangalan sa CF Standard Name table, ngunit ang mga unit na MUST ay makukumberte sa Kanonical Units. Halimbawa, lahat ng temperatura-related CFstandard\\_namemay "K" ang mga s (Kelvin) bilang ang Canonical Units. Kaya't isang variable na may isang temperature-relatedstandard\\_nameAng MUST ay may mga yunit ng K, degree\\_C, degree\\_F, o ilang UDUnits variant ng mga pangalang iyon, dahil ang lahat ng ito ay inter-convertible.
    * Pinakamabuting mga kaugalian: Bahagi ng kapangyarihan ng[kontroladong mga boltahe](https://en.wikipedia.org/wiki/Controlled_vocabulary)ay mula sa paggamit lamang ng mga termino sa talaan. Kaya inirerekomenda namin ang pananatili sa mga terminong binibigyang - kahulugan sa kontroladong bokabularyo, at inirerekomenda namin na huwag gumawa ng termino kung walang angkop na termino sa listahan. Kung kailangan mo ng karagdagang mga termino, tingnan kung idaragdag ito ng komite sa pamantayan sa kontroladong bokabularyo.
    *   standard\\_nameAng mga pagpapahalaga ang tanging mga pagpapahalaga ng CF na sensitibo sa kaso. Ang mga ito ay laging mas mababa. PasimulaERDDAP™v1.82, ang mga henerateDataset ay makukumberte ang mga itaas na cause letters sa mga mas mababang case letter. At kapag may datasetERDDAP, ang mga letra sa itaas ay tahimik na binabago tungo sa mas mababang mga letra.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionay isang OPSYONAL na katangian na ginagamit ngERDDAP™  (at walang pamantayan ng metadata) para sa[mga pagbabago sa oras at timestamp](#time-units), na maaaring nasa magkakaugnay na datasets o tabular datasets, at nasaaxisVariablemga s odataVariables. Halimbawa,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionSabihin kung kailan dapat gamitinERDDAP™Ang mga time value mula sa variable na iyon bilang mga kuwerdas sa mga web page, kasama na ang.htmlTableang tugon. Sa mga format ng talaksan kung saanERDDAP™Bumubuo ng mga panahon bilang mga kuwerdas (Halimbawa, .csv at.json) ,ERDDAP™gamitin lamang angtime\\_precision-specified format kung kasama rito ang mga praksiyonal na segundo; kung hindi,ERDDAP™gumagamit ng 1970-01-01T00:00:00 Z formation.
* Ang mga deficial values ay 1970-1,150 1970-01-01T00Z, 1970-01-01T00:00Z, 1970-01-01T00:00:00Z (ang default) , 1970-01-01T00:00.0Z, 1970-01-01T00:00.00Z, 1970-01-01T00:00.00.000Z.\\[Ang 1970 ay hindi opsyon sapagkat ito ay isang numero lamang, kayaERDDAP™hindi malaman kung ito ay isang anyong pares ng oras (isang taon) o kung ito ay ilang bilang ng segundo mula 1970-01-01T00:00:00Z.\\]
* Kungtime\\_precisionay hindi nakatakda o ang halaga ay hindi tugma, ang default na halaga ay gagamitin.
* Dito, gaya sa iba pang bahagi ngERDDAP™, anumang larangan ng anyo na hindi ipinakikita ay ipinalalagay na may pinakamababang halaga. Halimbawa, 1985-07, 1985-07-1, 1985-07-01T00Z, 1985-07-01T00:00Z, at 1985-07-01T00:00: Ang Z ay lahat itinuturing na katumbas, bagaman may iba't ibang antas ng prepektura na ipinahiwatig. Ito'y katugma ng[ISO 8601:2004"extended"Pahiwatig ng Oras](https://www.iso.org/iso/date_and_time_format).
*    **BABALA:** Dapat mo lamang gamitin ang isang limitadotime\\_precisionkung gayon **lahat** ng data values para sa variable ay mayroon lamang pinakamababang halaga para sa lahat ng mga field na nakatago.
    * Halimbawa, maaari kang gumamit ng isangtime\\_precisionng 1970-01-01 kung lahat ng mga halaga ng datos ay may oras na=0, minuto=0, at ikalawang=0 (Halimbawa 2005-03-04T00:00:00Z at 2005-03-05T00:00:00Z) .
    * Halimbawa, huwag gumamit ng isangtime\\_precisionng 1970-01-01 kung may hindi-0 oras, minuto, o segundong halaga, (halimbawa 2005-03-05T12:00:00Z) dahil ang hindi-default na halaga ng oras ay hindi maitatanghal. Kung hindi, kung ang isang user ay hihingi ng lahat ng datos na may oras=2005-03-05, ang kahilingan ay mabibigo ng hindi inaasahan.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneay isang OPSYONAL na katangian na ginagamit ngERDDAP™  (at walang pamantayan ng metadata) para sa[mga pagbabago sa oras at timestamp](#time-units), na maaaring nasa mga grided datasets o tabular datasets.
    * Ang default ay "Zulu" (na modernong time zone na bersyon ng GMT) .
    * Mga impormasyon sa likuran: "ang panahon ay nakabawi" (e.g., Pacific Standard Time, -08:00, GMT-8) ay nakatakda, espisipiko, mga offset depende saZulu  (GMT) . Sa kabaligtaran, ang "time zones" ay ang mas komplikadong mga bagay na apektado ng Daylight Saving (e.g., "US/Pacific") , na may iba't ibang mga alituntunin sa iba't ibang mga lugar sa iba't ibang panahon. Ang mga sona ng oras ay laging may mga pangalan yamang ang mga ito ay hindi maibubuod sa simpleng halagang offset (tingnan ang "TZ database na pangalan" na hanay sa mesa[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP'time\\_zoneattribute ay tumutulong sa iyo na harapin ang lokal na impormasyon tungkol sa oras mula sa ilang sona ng oras (e.g., 1987-03-25T17:32:05 Pasipiko Panahon) . Kung mayroon kang string o numerong time data na may datos (nakapirme) Time offset, dapat mo lamang i - adjust ang impormasyonZulu  (alin angERDDAP™nais) sa pamamagitan ng pagtatakda ng iba't ibang baseng oras sa mga yunit na attribute (e.g., "hours mula noong 1970-01-01T08:00:00Z", pansinin ang T08 upang tiyakin ang Time offset) , at laging suriin ang mga resulta upang matiyak na matatamo mo ang mga resulta na nais mo.
    * Para sa mga timestamp variable na may source data mula sa Strings, ang attribute na ito ay nagpapahintulot sa iyo na magtakda ng isang sona ng oras na patungo saERDDAP™upang makomberte ang lokal-time-zone source times (ang ilan sa karaniwang panahon, ang ilan sa Daylight Saving time) sa loobZulung mga panahon (na laging nasa Pamantayang panahon) . Ang talaan ng tanggap na mga pangalan ng sona ng oras ay malamang na katulad ng talaan sa hanay ng TZ sa[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Ang mga karaniwang sona ng oras ng US ay: US/Hawaii, US/Alaska, US/Pacific, US/Eastern, US/Arizona, US/Central, US/Eastern.
    * Para sa mga timestamp variable na may numeromeric source data, maaari mong tiyakin ang "time\\_zone" Aminin ninyo, ngunit ang halaga ay tiyak na "Zulu" o "UTC". Kung kailangan mo ng suporta para sa ibang sona ng oras, pakisuyong email Chris. Juan sa noaa.gov .
         
###### mga yunit{#units} 
*   [ **mga yunit** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html),[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)at[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Pamantayang metadata) bigyan ng kahulugan ang mga yunit ng mga halagang datos. Halimbawa,
    ```
        <att name="units">degree\\_C</att>
    ```
    * Ang "units" ay RE REURILE bilang isang source Attribute o isang admixtribute para sa"time"MGA variable at ay SSTROGLY RECOMMENDENDE para sa iba pang mga variables kailanma't angkop (na halos laging) .
    * Sa pangkalahatan, inirerekomenda namin[Mga UDUnit](https://www.unidata.ucar.edu/software/udunits/)\\-compatible units na kinakailangan ng[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)at[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Mga pamantayan.
    * Ang isa pang karaniwang pamantayan ay[UCUM](https://unitsofmeasure.org/ucum.html)- ang Unified Code for Units of Measures.[OGC](https://www.ogc.org/)serbisyo gaya ng[SOS](https://www.ogc.org/standards/sos),[WCS](https://www.ogc.org/standards/wcs), at[WMS](https://www.ogc.org/standards/wms)kailangan ng UCUM at kadalasang tinutukoy ang UCUM bilang UOM (Mga Unit ng Hakbang) .
    * Iminumungkahi namin na gumamit kayo ng isang yunit na pamantayan para sa lahat ng datasets sa inyoERDDAP. Dapat mong sabihinERDDAP™kung aling pamantayan ang ginagamit mo&lt;ang mga yunit na\\_stard&gt;, sa loob ng inyong[setup.xml](/docs/server-admin/deploy-install#setupxml)talaksan.
    * Ang mga yunit para sa isang ibinigay na variable sa iba't ibang source files ay dapat na hindi pabagu-bago. Kung mayroon kang koleksiyon ng mga data file kung saan ang isang subset ng mga file ay gumagamit ng iba't ibang mga unit na halaga kaysa isa o higit pang mga subset ng mga file (halimbawa,
"mga araw mula 1985-01-01" laban sa "mga araw mula noong 2000-01-01",
"degree\\_Celsius" versus "deg\\_C", o
"knots" laban sa "m/s") kailangan mong humanap ng paraan upang gawing pamantayan ang mga yunit, kung hindi,ERDDAP™ay magdadala lamang ng isang subset ng mga file. Pag-isipan ito: kung ang isang file ay may windSpeed units=knots at ang isa pa ay may windSpeed units=m/s, kung gayon ang mga halaga mula sa dalawang file ay hindi dapat isama sa parehong agregated dataset.
        * Kung ang mga file ay nakatiklop.ncsa maraming kalagayang magagamit mo[EDDGridMula sa mga Liwasang Hindi Nabuklat](#eddgridfromncfilesunpacked).
        * Kung ang mga file ay tabular data files, sa maraming sitwasyon ay magagamit mo ang EDDTable From...Files '[Maging limitado Ano](#standardizewhat)upang magsumbongERDDAPupang gawing pamantayan ang mga source file habang ito ay binabasaERDDAP.
        * Para sa mas mabibigat na problema, magagamit mo[NcML](#ncml-files)o[NCO](#netcdf-operators-nco)upang lutasin ang problema.
    * Ang CF standard section 8.1 ay nagsasabi na kung ang isang variable's data ay nakaimpake sa pamamagitan ng[scale\\_factorat/oadd\\_offset](#scale_factor), "Ang mga yunit ng isang variable ay dapat na maging kinatawan ng hindi nakabuklat na datos."
    *   [Para sa panahon at mga pagbabago sa timestamp,](#time-units)alinman sa mga variable[Pinagmulan](#variable-addattributes)o&lt;addAttributes&gt; (na nauuna) WALANG MUST[mga yunit](#units)alin ang
        
        * Sa loob ng panahon ang axis ay nagbabagu - bago o nagbabago ang impormasyon sa panahon na may numerikong impormasyon:[Mga UDUnit](https://www.unidata.ucar.edu/software/udunits/)\\-compatible na string (na may format *mga yunit* mula noon *saligang panahon* ) kung paano bibigyang - kahulugan ang pinagmumulan ng mga pamantayan sa panahon (Halimbawa, mga segundo mula noong 1970-01-01T00:00:00Z) .
            
         *mga yunit* ay maaaring maging isa sa:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Sa teknikal na paraan,ERDDAP™hindi sumusunod saUDUNITSpamantayan kapag nakukumberte"years since"at"months since"ng panahon"seconds since". AngUDUNITSBinibigyang kahulugan ng pamantayan ang isang taon bilang isang nakatakda, nag-iisang halaga: 3.155692597477 segundo. AtUDUNITSBinigyan ng kahulugan ang isang buwan bilang taon/12. Sa kasamaang palad, karamihan/lahat ng datasets na nakita namin ang paggamit na iyon"years since"o"months since"na ang mga pamantayan ay mga taon o buwan ng kalendaryo. Halimbawa, 3"months since 1970-01-01"ay karaniwang nilalayon upang mangahulugan 1970-04-01. Kaya,ERDDAP™pagpapaliwanag"years since"at"months since"bilang kalendaryo mga taon at mga buwan, at hindi mahigpit na sinusunod angUDUNITSPamantayan.
            
Ang *saligang panahon* kailangang maging ISO 8601:2004 (E) format ng time string (yyyy-MM-dd'T'H:mm:ssZ, halimbawa, 1970-01-01T00:00:00Z) , o iba pang uri niyan (Halimbawa, may mga bahaging nawawala sa dulo) .ERDDAP™ang sumusubok na gumana na may malawak na pagkakaiba-iba ng ideyal na format na iyon, halimbawa, ang "1970-1-1 0:0:0" ay suportado. Kung wala ang impormasyon tungkol sa sona ng panahon, ipinalalagay na ito ang panahonZulusona ng oras (AKA GMT) . Kahit na kung sa ibang panahon ay ititik,ERDDAP™Hindi kailanman gumagamit ng Daylight Saving Time. Kung gumagamit ng ibang format ang baseTime, kailangan mong gamitin&lt;addAttributes&gt; magtakda ng isang bagong unit string na gumagamit ng iba't ibang anyo ng ISO 8601:2004 (E) format (e.g., pagbabago ng mga araw simula Jan 1, 1985 tungo sa mga araw simula 1985-01-01.
        
Maaari mong subukinERDDAP' Kakayahang makitungo sa isang espesipikong bagay *mga yunit* mula noon *saligang panahon* kasamaERDDAP'[Tagapagkumberte ng Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Sana, marami kang maipupuslit (ang unang pagkakataon na halaga mula sa pinagkunan ng impormasyon?) at isang units string, pagpindot sa comber, atERDDAP™ay magagawa itong maging isang ISO 8601:2004 (E) naglalaman ng petsang string. Ibabalik ng converter ang maling mensahe kung ang tali ng mga yunit ay hindi makilala.

###### Pagtatag ng Panahon{#string-time-units} 
*   [Para sa mga yunit na nagpapalagay ng oras o timestamp data variables na may String data,](#string-time-units)kailangan niyong magtakda ng isang[java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)parisan (na karamihan ay katugma ng java.text. Simpleng Paalam) na naglalarawan kung paano bibigyang - kahulugan ang panahon ng kuwerdas.
    
Para sa karaniwang ginagamit na format ng panahon na iba't iba ng ISO 8601:2004 (E) Pamantayang format (Halimbawa, 2018-01-02T00:00:00Z) , maaari mong tiyakin ang mga pagkakaiba ngyyyy-MM-dd'T'H:mm:ssZ, halimbawa, gamitinyyyy-MM-ddkung ang string time ay mayroon lamang petsa. Para sa anumang format na nagsisimula sa yyy-M,ERDDAPay gumagamit ng isang pantanging parser na lubhang mapagpatawad sa maliliit na pagkakaiba sa format. Maaaring pangasiwaan ng parser ang mga sona ng oras sa format na 'Z', "UTC", "GMT", ±XX:XX, ±XXXXXX, at ±XXX formats. Kung ang mga bahagi ng petsa ay hindi nakatakda (halimbawa, mga minuto at segundo) ,ERDDAP™ang pinakamababang halaga sa larangang iyan (e.g., kung hindi tiyak ang mga segundo, mga segundo=0 ang ipinalalagay na) .
    
Para sa lahat ng iba pang mga strandong format ng oras, kailangan eksaktong magtakda ka ng isang DateTime Formatter-compatible time formation string. Katulad ngyyyy-MM-dd'T'H:mm:ssZ, ang mga strandong format na ito ay ginawa mula sa mga character na nagpapakilala ng isang espesipikong uri ng impormasyon mula sa strando ng oras, e.g., ang m ay nangangahulugang minuto-of-hour. Kung uulitin mo nang ilang ulit ang format ng karakter, nangangahulugan ito na ang halaga ay dapat na tiyakin ng 2 numero. AngJavaAng mga dokumento para sa DateTime Forrmatter ay isang di - malinaw na sumaryo at hindi nililinaw ang mga detalyeng ito. Kaya narito ang listahan ng mga pagkakaiba - iba ng karakter sa format at ang kahulugan ng mga ito sa loobERDDAP™  (na kung minsan ay bahagyang naiiba saJava‘ Petsang Tagapanguna) :
    
    |Mga Katangian|Mga Halimbawa|Kahulugan|
    |--|--|--|
    |u, y, Y|\\-4712, 0, 1, 10, 100, 2018|bilang ng taon, maraming numero.ERDDAP™y (taon-of-era) at Y (linggo-based-year, dahil ito ay madalas na maling ginagamit sa halip na y) bilang u, ang[astronomikal na bilang ng taon](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Ang mga taon ng astronomiya ay positibo o negatibong mga integer na hindi gumagamit ng BCE (BC) o CE (AD) Mga tagapagdisenyo ng panahon: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |uuuu, yay, KAGALAKAN|\\-4712, 0000, 001, 0010, 0100, 2018|numero 4 ng astronomikal na taon (Hindi pinapansin ang anumang nauna '-')  |
    |M|1,0, 12|numero ng isang buwan, anumang numero (1=Enero)  |
    |MM|0, 12|isang 2 numero (sero na sapin) numero ng buwan|
    |MMM|Jan, jan, JAN|isang 3 titik ng buwang Ingles na pangalan, kaso na walang pakiramdam|
    |MMM|Jan, jan, JAN, Enero, january, JANUARY|isang titik o buong Ingles na buwang pangalan, kaso na walang pakiramdam|
    |d|1,1, 31|isang day-of-month number, anumang bilang ng mga numero|
    |dd|0, 31|isang 2 numero (sero na sapin) araw-of-month. Ang unang 'digit' ay maaaring isang espasyo.|
    |D|1, 001, 366|day-of-year, anumang bilang ng mga numero, 001=Jan 1|
    |DDD|001, 366|araw-of-year, 3 digit, 001=Jan 1|
    |EEE|Thu, THU, Thu|isang 3 titik araw-of-week, ang halaga ay hindi pinapansin kapag parsing|
    |EEEE|Thu, THU, Thu, Thursday, THURS GhurS, Huwebes|isang 3 titik o buong Ingles na day-of-week, kaso walang pakiramdam, halaga ay hindi pinapansin kapag parsing|
    |H|0, 00, 23|H oras-of-araw (0-23) , anumang numero|
    |HH|00, 23|HH oras-of-day (00-23) , 2 digit. Ang unang 'digit' ay maaaring isang espasyo.|
    |a|ay, AM, pm, PM|AM o PM, case-insensitive|
    |h.|12, 1,1, 11|orasan-oras-of-am-pm (12, 1, 2, ... 11) , anumang numero|
    |hh|12,0, 11|orasan-oras-of-am-pm (12, 1, 2, ... 11) , 2 digit. Ang unang 'digit' ay maaaring isang espasyo.|
    |K|0, 1, 11|oras-of-am-pm (0, 1, ...11) , anumang numero|
    |KK|00, 0, 11|oras-of-am-pm, 2 digits|
    |m|0, 00, 59|minuto-of-hour, anumang bilang ng mga numero|
    |mm|00, 59|minuto-of-hour, 2 digit|
    |s|0, 00, 59|ikalawang-of-minuto, anumang bilang ng mga numero|
    |mga s|00, 59|ikalawang-of-minuto, 2 digit|
    |S|0, 000, 9, 999|praksiyong-of-second, na para bang sumusunod sa punto ng numero, anumang bilang ng mga numero|
    |SS|00, 99|Ikasandaang bahagi ng isang segundo, 2 numero|
    |MGA SS|000, 999|libu - libo sa isang segundo, 3 numero|
    |A|0, 0000, 8639999|millisecond-of-day, anumang bilang ng mga numero|
    |AAAAAAAAA|00000000, 8639999|millisecond-of-day, 8 digit|
    |N|0, 000000000000000000, 8639999999999999|Nanosecond-of-day, anumang bilang ng mga numero. Sa loobERDDAP™, ito ay nilalagyan ng nMillis.|
    |NNNNNNNNNNNNNN|000000000000000000, 8639999999999|Nanosecond-of-day, 14 digit. Sa loobERDDAP™Ito ay iniindorso sa nMillis.|
    |n|0, 00000000000, 5999999999|Nanosecond-of-second, anumang bilang ng mga numero. Sa loobERDDAP™Ito ay iniindorso sa nMillis.|
    |nnnnnn|00000000000, 5999999999|Nanosecond-of-second, 11 digit. Sa loobERDDAP™Ito ay iniindorso sa nMillis.|
    |XXX, ZZZZ|Z, -08:00, +01:00|sona ng oras na may format na 'Z' o ± (2 digit hour offset) : (2 digit mile offset) . Itong mga paggamot *kalawakan* bilang + (di-standard) . Ang ZZZZ supporting 'Z' ay non-standard ngunit nakikitungo sa isang karaniwang pagkakamali ng gumagamit.|
    |XX, ZZ|Z -0800, +0100|sona ng oras na may format na 'Z' o ± (2 digit hour offset) : (2 digit mile offset) . Itong mga paggamot *kalawakan* bilang + (di-standard) . ZZ support 'Z' ay non-standard ngunit ito ay may kinalaman sa isang karaniwang pagkakamali ng gumagamit.|
    |X, Z|Z, -08, +01|sona ng oras na may format na 'Z' o ± (2 digit hour offset) : (2 digit mile offset) . Itong mga paggamot *kalawakan* bilang + (di-standard) . Z support 'Z' ay non-standard ngunit ito ay may kinalaman sa isang karaniwang pagkakamali ng gumagamit.|
    |xxx|\\-08:00, +01:00|sona ng oras na may format na ± (2 digit hour offset) : (2 digit mile offset) . Itong mga paggamot *kalawakan* bilang + (di-standard) .|
    |xx|\\-0800, +0100|sona ng oras na may format na ± (2 digit hour offset)  (2 digit mile offset) . Itong mga paggamot *kalawakan* bilang + (di-standard) .|
    |x|\\-08, +01|sona ng oras na may format na ± (2 digit hour offset) . Itong mga paggamot *kalawakan* bilang + (di-standard) .|
    |'|'T', 'Z', 'GMT'|pasimula at katapusan ng isang serye ng literal na mga tauhan|
    |' ' (dalawang sinipi)  |' '|ang isang literal na pagsipi|
    | \\[\\] | \\[ \\] |simula ("\\[") at wakas ("\\]") ng bahaging opsyonal. Ang notasyong ito ay suportado lamang para sa mga literal na karakter at sa dulo ng strandong format.|
    |#, &#123;, &#125;|#, &#123;, &#125;|nakalaan para sa panghinaharap na gamit|
    |G,L,Q,e,c,V,z,O,p|     |Ang mga formating character na ito ay suportado ngJava'Ang DateTime Formatter, ngunit sa kasalukuyan ay hindi suportado ngERDDAP. Kung kailangan mo sila ng suporta, email Chris. Juan sa noaa.gov .|
    
Mga Paunawa:
    
    * Sa isang panahon ng petsa na may bantas, ang mga halaga ng numero ay maaaring may iba't ibang numero (e.g., sa US sliped date format "1/2/1985", ang buwan at ang petsa ay maaaring 1 o 2 digits) Kaya ang format ay dapat gumamit ng 1-letter na tokens, e.g., M/d/yyy, na tumatanggap ng anumang bilang ng mga numero sa buwan at petsa.
    * Kung ang bilang ng mga numero para sa isang bagay ay hindi nagbabago, e.g., 01/02/1985, pagkatapos ay itakda ang bilang ng mga numero sa format, e.g., MM/dd/yd/yyy para sa 2-digit na buwan, 2-digit na petsa, at 4 na digit na taon.
    * Ang mga format na ito ay mahirap gamitin. Ang isang ibinigay na format ay maaaring gumana para sa karamihan, ngunit hindi sa lahat, ng mga kuwerdas ng oras para sa isang ibinigay na variable. Laging tiyakin na ang format na sinasabi mo ay gumagana gaya ng inaasahanERDDAPsa lahat ng iba't ibang haba ng panahon.
    * Kapag posible, ang GenerateDatasetXml ay magmumungkahi ng mga strando ng time format.
    * Kung kailangan mo ng tulong sa paggawa ng isang format string, pakisuyong email Chris. Juan sa noaa.gov .

Ang pangunahing pagkakataon na ang data ay iba - iba (para sa mga tabular dataset) at ang pangunahing pagkakataon na ang axis ay nagbabagu - bago (para sa nakatiklop na mga datos) ay kinikilala ng[destinationName](#destinationname)panahon. Ang kanilang mga yunit na metadata ay dapat isang UDUnits-compatiable units string para sa mga numerikong halaga ng oras, e.g., "mga araw mula 1970-01-01". (para sa tabular o grid na mga dataset) , o[mga pisi](#string-time-units), e.g., "M/d/yay" (para sa mga tabular dataset) .

Iba't Ibang Pagkakaisa ng Panahon sa Iba't Ibang Giniling.ncFiles - Kung mayroon kang koleksiyon ng mga gridd.ncmga talaksan kung saan, para sa time variable, ang isang subset ng mga file ay gumagamit ng iba't ibang time units kaysa isa o higit pang mga subset ng files, magagamit mo[EDDGridMula sa mga Liwasang Hindi Nabuklat](#eddgridfromncfilesunpacked). Binabago nito ang mga pamantayang moral ng panahon"seconds since 1970-01-01T00:00:00Z"sa mas mababang antas, sa gayo'y itinatago ang mga pagkakaiba, upang makagawa ka ng isang dataset mula sa koleksiyon ng mga hterogeneous file.

###### Mga Pagbabago sa Oras{#timestamp-variables} 
[Mga Pagbabago sa Oras](#timestamp-variables)-- Anumang bagay na iba't iba (axisVariableodataVariable, nasa loob ng isangEDDGrido EDDTable dataset) ay maaaring maging isang timestamp variable. Ang mga timestamp variable ay mga variable na may time-related unit at time data, ngunit may isang&lt;destinationName&gt; bukod sa panahon. Ang timeStamp variables ay kumikilos na parang pangunahing time variable sa bagay na ginagawa nilang format ang oras ng source"seconds since 1970-01-01T00:00:00Z"at/o ISO 8601:2004 (E) format).ERDDAP™kumilala ng oras Mga "stamp variable"[mga yunit](#units)" metadata, na dapat na katugma ng regular na pananalitang ito "\\[a-za-Z\\]+ + Mula sa +\\[0-9\\].+" (para sa petsa ng numero Halimbawa, mga panahon"seconds since 1970-01-01T00:00:00Z") o maging isang petsa Time format string na naglalaman ng "uuuuu", "yayay" o "YYY" (halimbawa, "yyyy-MM-dd'T'H:mm:ssZ") . Subalit pakisuyong gamitin pa rin angdestinationName "time"para sa pangunahing petsa Iba - iba ang oras.

 **Laging suriin ang inyong trabaho upang matiyak na ang time data na nakikita saERDDAP™ang tamang time data.** Ang pagtatrabaho sa panahon ng impormasyon ay laging mapandaya at madaling magkamali.

Tingnan[higit pang impormasyon tungkol sa iba't ibang oras](#destinationname).
ERDDAP™may gamit sa[Pagkumberte sa Isang Numerikano Panahon na Upang/mula sa Pabagu - bagong Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Tingnan[PaanoERDDAP™Pakikitungo sa Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** , o **valid\\_min** at **valid\\_max** ](#valid_range)-- Ito ang iba't ibang katangian ng OPSYON[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)mga kombensiyon ng metadata. Halimbawa,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

o

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Kung sa kasalukuyan, ang mga ito ay dapat na nasa katulad na uri ng datos ng variable, at nagtatakda ng makatwirang minimum at sukdulang halaga ng datos para sa variable na iyon. Dapat isaalang - alang ng mga gumagamit ang mga pamantayan sa labas ng hanay na ito na maging walang bisa.
    *   ERDDAP™hindi ikinakapit angvalid\\_range. Sabi ng isa pang paraan:ERDDAP™ang mga data values sa labas ngvalid\\_rangesa \\_Fill Halaga omissing\\_value.ERDDAP™Dadaan lamang ang metadata na ito at iiwan sa iyo ang aplikasyon.
Bakit? Iyan ang layunin ng metadata na ito. Kung nais ng data provider, maaari sanang binago ng data provider ang mga halaga ng impormasyon sa labas ng datavalid\\_rangeupang maging \\_FillValues.ERDDAP™ay hindi pangalawang hula sa data provider. Mas ligtas ang pamamaraang ito: kung ipakikita sa dakong huli na ang pamamaraanvalid\\_rangeay napakakitid o kaya'y mali,ERDDAP™ay hindi mapapawi ang data.
    * Kung ang datos ay siksik[scale\\_factorat/oadd\\_offset](#scale_factor),valid\\_range,valid\\_minatvalid\\_maxdapat na ang siksik na uri at halaga ng datos. Mula NoonERDDAP™kapitscale\\_factoratadd\\_offsetkapag ito'y nag - uulat ng impormasyon,ERDDAP™ang buklat ngvalid\\_range,valid\\_minatvalid\\_maxMga pamantayan upang ang patutunguhan ay maging metadata (na ipinakikita sa mga gumagamit) ay magpahiwatig ng di-packed data type at range.
O, kung ang isang hindi pa nakabuklat na\\_valid\\_rangeAng attribute ay naroroon, ito ay muling tatawaginvalid\\_rangekapagERDDAP™ang laman ng dataset.
##### &lt;Itanggal angMVRows pgt;{#removemvrows} 
* [ ** &lt;tanggalin angMVRows&gt; ** ] (Mga #removemborrow) ay isang OPSYONAL na tag sa loob ng isang tagdatasets.xmlpara sa mga EDDTTable Mula sa mga Labi (pati na ang lahat ng subclass) datasets, bagaman ito ay ginagamit lamang para sa EDDTable FromMultidimNcFiles. Maaari itong magkaroon ng halaga na totoo o mali. Halimbawa, totoo
Inaalis nito ang anumang bloke ng mga hanay sa dulo ng isang grupo kung saan ang lahat ng mga pamantayanmissing\\_value,_FillValue, o ang CoHort ...Array katutubong nawawalang halaga (o char=#32 para sa mga CharArray) . Ito ay para sa CF DSG Multidimensional Array file type at mga katulad na file. Kung totoo, ito'y gumagawa ng wastong pagsubok at sa gayo'y laging pinapasan ang lahat ng max dim variables, kaya maaaring mangailangan ng ekstrang panahon.
Ang default na halaga ay mali.
Mungkahi -- Hangga't maaari para sa inyong dataset, inirerekomenda namin na ilagay sa huwad na lugar ang mga tinanggal na larawan. Ang pagtatakda ng mga pag-aalis na VRow sa totoo ay maaaring lubhang magpabagal sa mga kahilingan, bagaman maaaring kailanganin para sa ilang datasets.
