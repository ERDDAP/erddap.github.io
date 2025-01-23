---
title: "EDDTableFromEML" 
---
# Ang EDDTable MulaEML at EDDTable MulaEMLBatch Mga Mapagpipilian sa GenerateDatasets Xml

\\[Ang pahinang web na ito ay magiging kawili - wili lamang saERDDAP™Mga administrador na nagtatrabaho sa mga talaksang EML.
Ang dokumentong ito ay orihinal na nilikha noong 2016. Ito ay huling edition noong 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)ay isang data server na nagbibigay sa mga gumagamit ng simple, hindi pabagu-bago na paraan upang mag-download ng mga subset ng grid at tabular na siyentipikong datasets sa karaniwang format ng talaksan at gumawa ng mga graph at mapa.ERDDAP™ay gumagana sa isang ibinigay na dataset bilang alinman sa isang grupo ng multidimensional na mga variable (e.g., satelayt o modelong datos) o bilang isang database-tulad na mesa (na may pitak para sa bawat uri ng impormasyon at isang hanay para sa bawat pagmamasid) .ERDDAP™ay Free and Open Software, kaya magagawa ito ng sinuman[download at i-installERDDAP™](/docs/server-admin/deploy-install)upang ihain ang kanilang data.

Upang magdagdag ng datos sa isang datasetERDDAP™pagluklok, angERDDAP™Ang administrador ay dapat magdagdag ng isang tipak ng XML na inilalarawan ang dataset sa isang file na tinatawag nadatasets.xml. (Mayroon[Buong dokumentasyon para sadatasets.xml](/docs/server-admin/datasets).) Bagaman posible na lumikha ng malaking tipak ng XML para sadatasets.xmlSa pamamagitan lamang ng kamay,ERDDAP™na may kagamitang tinatawag na[ **GenerateDatasetsXml** ](/docs/server-admin/datasets#tools)na maaaring lumikha ng magaspang na draft ng XML na kailangan para sa isang ibinigay na dataset batay sa ilang mapagkukunan ng impormasyon tungkol sa dataset.

Ang unang bagay na GenerateDatasets Xml kung anong uri ng dataset ang nais mong likhain. Mga GenerateDataset May pantanging mapagpipilian ang Xml, **MAHIRAP SA ELEML** , na gumagamit ng impormasyon sa isang[Ekolohikal na Wikang Metadata (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)Ang XML file upang lumikha ng tipak ng XML para sadatasets.xmlupang lumikha ng isang[Mapagkakatiwalaan Buhat sa mga AsiciiFile](/docs/server-admin/datasets#eddtablefromasciifiles)datos mula sa bawat talaan ng datos sa isang talaksang EML. Ito ay mahusay na gumagana para sa karamihan ng mga talaksang EML, karamihan dahil ang mga talaksang EML ay gumagawa ng mahusay na trabaho ng pag-iimbak ng lahat ng kinakailangang metadata para sa isang dataset sa isang madaling-to-work-with format. Ang impormasyon na kinakailangan ng GenerateDatasetsXml upang lumikha ng mga datasets ay nasa talaksang EML, kabilang ang URL para sa data file, na i-download ng GenerateDatasetsXml, parse, at inihahambing sa paglalarawan sa talaksang EML. (Maraming grupo ang makabubuting bumaling sa EML, na isang malaking sistema para sa pagtatala ng anumang taskular na siyentipikong dataset, hindi lamang sa ekolohikal na impormasyon. At maraming grupo na lumilikha ng XML schemas ay makabubuting gamitin ang EML bilang isang case study para sa XML schema na malinaw, hanggang sa punto, hindi sobrang lalim (I.e., napakaraming antas) , at madali para sa mga tao at mga computer na gumawang kasama nila.) 

## Mga Tanong{#questions} 

Narito ang lahat ng tanong na GenerateDatasets Xml, na may mga komento kung paano ka dapat sumagot kung nais mong gumawa ng isa lamang talaksang EML o isang talaksan ng mga talaksang EML:

* Aling EDDType?
Kung nais mong gumawa ng isa lamang talaksan, sagot: EDDTable FromEML
Kung nais mong magproseso ng isang grupo ng mga file, sumagot: EDDTable FromEMLBatch
* Direktoryo na mag - imbak ng mga file?
Ipasok ang pangalan ng directory na gagamitin upang mag-imbak ng downloaded EML at/o data files.
Kung ang directory ay hindi umiiral, ito ay lilikhain.
*    (Para sa EDDTTE Mula SA EL yaon lamang) EML URL o lokal na fileName?
Ipasok ang URL o lokal na talaksan ng EML.
*    (Para sa EDDTTable Mula sa ELBatch lamang) EML dir (URL o lokal) ?
Ipasok ang pangalan ng directory na may mga talaksang EML (isang URL o isang lokal na dir) .
Halimbawa: http://sbc.lternet.edu/data/eml/files/
 
*    (Para sa EDDTTable Mula sa ELBatch lamang) Pangalan ng File
Ipasok ang regular na ekspresyon na gagamitin upang matukoy ang ninanais na mga file ng EML sa EML directory.
Halimbawa: knb-lter-sbc\\d+
* Gamitin ang lokal na mga file kung naroroon (totoo|bulaan) ?
Ipasok ang totoo upang gamitin ang umiiral na lokal na mga files ng EML at data files, kung ito ay umiiral.
Ipasok ang mali upang laging muling-download ang mga talaksang EML at/o data files.
* Makukuha Sa?
Kung nais mong ang mga bagong dataset ay maging pribadong datasets saERDDAP, Sabihin ang pangalan ng grupo (s) na pahihintulutang makapasok.
Inimungkahi para sa mga grupo ng LTER: pagsamahin ang "ller" pati na ang grupo, e.g., lter Sbc .
Kung papasok ka sa "null", hindi magkakaroon ng&lt;Makukuha Togt; tag sa output.
Tingnan[Makukuha Patungo sa](/docs/server-admin/datasets#accessibleto).
* lokal OrasZone (e.g., US/Pacific) ?
Kung ipinakikita ng iba't ibang panahon na ito ay may lokal na mga halaga ng panahon, ang sona ng oras na ito ay aatasan.
Ito ay dapat na maging isang halaga mula sa[TZ hanay listahan ng mga pangalan ng sona ng oras](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Pansinin ang lahat ng mga madaling-to-use na "US/..." na pangalan sa dulo ng talaan.
Kung masumpungan mong mali ito sa dakong huli, mababago mo ang kalagayantime\\_zonesa gitna ngdatasets.xml.

EML plusERDDAP™ay isang malaking kombinasyon, yamangERDDAP™ay maaaring magbigay sa mga gumagamit ng mas tuwirang pagkuha sa kayamanan ng[Knowledge Network for Biocomplexity (KNB) ](https://knb.ecoinformatics.org/)at[Mahabang Pananaliksik sa Ekolohiya (LUGAR) ](https://lternet.edu/)at tulungan ang mga proyektong iyon na magtagpo sa pamahalaan ng Estados Unidos[Resulta ng Pangmadlang Pag - aaral (HANDA) mga kahilingan](https://nosc.noaa.gov/EDMC/PD.DSP.php)sa pamamagitan ng paggawa ng data na makukuha sa pamamagitan ng isang web service. Gayundin, EML plusERDDAP™ay tila isang malaking tulay sa pagitan ng mga siyentipiko sa akademiko / NSF-founded na sakop at mga siyentipiko sa pederal na ahensiya (NOAA, NASA, USGS) saklaw.

Tingnan ang[sa pagkuha ng karagdagang suporta](/docs/intro#support).
 
## Mga Detalye sa Disenyo{#design-details} 

Narito ang mga detalye ng disenyo ng EDDTable FromEML opsiyon sa GenerateDatasetsXml.
Ang ilan ay nauugnay sa mga pagkakaiba sa kung paano ang EML at ang EMLERDDAP™gawin ang mga bagay - bagay at kung paano ginagawa ng mga GenerateDatasett Xml ang mga problemang ito.

### Naging Isa ang Isang ImpormasyonERDDAP™Talaan ng mga Nilalaman{#one-datatable-becomes-one-erddap-dataset} 
Ang isang talaksang EML ay maaaring may multiple&lt;datos Mga Tablet.ERDDAP™gumagawa ng isaERDDAP™datos sa bawat EML dataTable. AngdatasetIDpara sa datos ay
 *EMLName* \\_t *Tuloy*   (kapag ang EMLname ay teksto) o
 *system\\EMLName* \\_t *Tuloy*   (kapag ang EMLname ay isang numero) .
Halimbawa, ang mesa #1 sa file knb-lter-sbc.28, ay nagigingERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML laban sa CF+ACDD{#eml-versus-cfacdd} 
Halos lahat ng metadata sa mga talaksan ng EML ay pumapasokERDDAP, ngunit sa ibang format.ERDDAP™gamitin ang[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)at[ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)pamantayan ng metadata. Ang mga ito ay mga complementary metadata system na gumagamit ng key=halagang pares para sa global metadata at para sa bawat metadata ng variable.
Oo, ang representasyon ng EML ng metadata ay mas maganda kaysa sa representasyon ng CF+ACDD. Hindi ko iminumungkahing gamitin ang representasyon ng CF+ACDD bilang kapalit ng EML. Pakisuyong isipin ang CF+ACDDD bilang bahagi ng tulay mula sa daigdig ng EML hanggang saOPeNDAP/CF/ACDD daigdig.
     
### Maliliit na Pagbabago{#small-changes} 
ERDDAP™ay gumagawa ng maraming maliliit na pagbabago. Halimbawa,ERDDAP™gumagamit ng EML non-DOIPalitan Identifier at ang isang dataTable number bilang angERDDAP™ datasetID, ngunit bahagyang nagbabago Identifier upang gawin itong isang tanggap na variable na pangalan sa karamihan ng mga wika ng kompyuter, e.g., knb-lter-sbc.33 data Talaan #1 ay nagiging knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
Ang EML ay gumagamit ng sistemang markup ng DocBook upang magbigay ng istraktura sa mga bloke ng teksto sa mga talaksang EML. Ang CF at ACDD ay humihiling na ang metadata ay payak na teksto. Kaya ang GenerateDatasets Binabago ni Xml ang minarkahang teksto upang maging payak na teksto na parang kalakip na bersiyon ng teksto. Ang mga inline tag ay dinidilig ng mga square bracket, e.g.,\\[idiniin\\], at iniwan sa simpleng teksto.
     
### Mga Sawi ng Data{#data-files} 
Yamang kasama sa EML dataTable ang URL ng aktuwal na data file, ang GenerateDatasets Xml:
1. I-download ang data file.
2. Itago ito sa iisang directory ng talaksang EML.
3. Basahin ang impormasyon.
4. Ihambing ang paglalarawan ng datos sa EML sa aktuwal na datos sa file.
5. Kung mga GenerateDataset Ang Xml ay nakasusumpong ng mga pagkakaiba, nakikitungo ito sa kanila, o nagtatanong sa operator kung ang mga pagkakaiba ay okay, o nagbabalik ng maling mensahe. Ang mga detalye ay nasa iba't ibang bagay sa ibaba.
         
### .zip'd Data Files{#zipd-data-files} 
Kung ang tinutukoy na talaksang datos ay isang.zipfile, ito ay dapat maglaman lamang ng isang file. Ang talaksang iyon ay gagamitin para saERDDAP™datos. Kung may higit sa 1 talaksan.ERDDAP™ang dataset na iyon. Kung kinakailangan, ito ay maaaring baguhin. (Sa pagsasagawa, ang lahat ng mga file ng SBC LTER zip ay may isa lamang data file.)   
     
### StorageType{#storagetype} 
Kung ang isang kolum ay mag - iimbak Hindi espesipikong uri,ERDDAP™ginagamit ang pinakamahusay na hula nito batay sa datos sa data file. Mabisa ito.
     
### Mga Unit{#units} 
ERDDAP™gumamit[UDUNITSPagbuo ng mga yunit](https://www.unidata.ucar.edu/software/udunits/). Mga GenerateDataset Nakukumberte ni Xml ang mga yunit ng EMLUDUNITSMalinis na halos 95% ng panahon. Ang natitirang 5% ay nagbubunga sa isang nababasang paglalarawan ng mga yunit, e.g., "biomassDensidad UnitPerAbundanceUnit" sa EML ay nagiging "biomass density unit kada yunit ng kasaganaan" sa EMLERDDAP. Hindi ito ipinahihintulot sa teknikal na paraan. Sa palagay ko'y hindi naman ito napakasama sa ilalim ng gayong mga kalagayan.\\[Kung kinakailangan, mga yunit na hindi maaaring gawinUDUNITSAng tugmaan ay maaaring mailipat sa pang-uri ng variety.\\]  
     
### EML bersyon 2.1.1{#eml-version-211} 
Ang suportang ito para sa EML v2.1.1 files ay idinagdag sa GenerateDatasets Xml noong 2016 na may pag-asang magkakaroon ng ilang uptake sa komunidad ng EML. Noong 2020, hindi pa iyan nangyari. AngERDDAP™Malulugod ang mga developer na magdagdag ng suporta para sa mas bagong mga bersyon ng EML, ngunit tangi lamang kung ang mga bagong katangian ay aktuwal na gagamitin. Pakisuyong mag - emailerd.data at noaa.govkung nais mo ng suporta para sa mas bagong mga bersiyon ng EML at aktuwal na gagamitin ang bahaging ito.
     

## Mga Isyu sa EML Files{#issues-with-the-eml-files} 

May ilang mga isyu/problems na may mga talaksang EML na nagdudulot ng mga problema kapag ang isang kliyenteng software (tulad ng EDDTable FromEML opsyon sa GenerateDatasetsXML) sinusubukang bigyang kahulugan/proseso ang mga talaksang EML.

* Bagaman may ilang mga isyu na nakatala rito, ang karamihan sa mga ito ay maliliit, mga problemang maaaring lutasin. Sa pangkalahatan, ang EML ay isang dakilang sistema at naging kasiyahan ko na gumawang kasama nito.
* Ang mga ito ay bahagyang inuuri mula sa pinakamasama / pinakakaraniwan hanggang sa hindi gaanong masama / hindi gaanong pangkaraniwan.
* Karamihan ay nauugnay sa maliliit na problema sa espesipikong mga talaksan ng EML (na hindi kasalanan ni EML) .
* Ang karamihan ay maaaring ayusin sa pamamagitan ng simpleng mga pagbabago sa talaksang EML o data file.
* Dahil sa ang mga taga - LTER ay nagtatayo ng isang tseke sa EML upang subukin ang pagiging totoo ng mga salansan ng EML, ako'y nagdagdag ng ilang mungkahi sa ibaba tungkol sa mga bahagi na maaaring idagdag sa tagasuri.

Narito ang mga isyu:

### Hiwalay na Petsa at Panahon{#separate-date-and-time-columns} 
Ang ilang mga data file ay may hiwalay na mga hanay para sa petsa at para sa panahon, ngunit walang nagkakaisang petsa+time column. Sa kasalukuyan, ang GenerateDatasets Ang Xml ay lumilikha ng dataset na may hiwalay na mga hanay na ito, subalit hindi ito huwaran sapagkat:

* Pinakamabuti kung may datasets saERDDAP™may pinagsamang petsa+time column na tinatawag na"time".
* Kadalasan ang dataset ay hindi ma-loadERDDAP™sapagkat ang"time"ay walang petsa+time data.

May dalawang posibleng solusyon:
1. Baguhin ang source data file upang magdagdag ng bagong hanay sa datafile (at inilalarawan ito sa EML) kung saan ang petsa at mga hanay ng oras ay pinagsasama sa isang tudling. Pagkatapos ay pataying muli ang GenerateDatasets Xml upang mahanap nito ang bagong kolum.
2. Gamitin ang[Debotive Variables](/docs/server-admin/datasets#script-sourcenamesderived-variables)bahagi saERDDAP™upang bigyang - kahulugan ang isang bagong pagkakaiba - ibadatasets.xmlna nalilikha sa pamamagitan ng pagdurugtong sa petsa at sa mga tudling ng panahon. Ang isa sa mga halimbawa ay espesipikong tumatalakay sa situwasyong ito.
         
### Di - nagbabagong mga Pangalan{#inconsistent-column-names} 
Ang mga talaksang EML ay nagtatala ng mga hanay ng datos at ng kanilang mga pangalan. Sa kasamaang palad, ang mga ito ay kadalasang iba sa mga pangalan ng kolum sa aktuwal na data file. Karaniwan na, ang kaayusan ng hanay sa talaksang EML ay katulad ng hanay ng impormasyon, kahit na ang mga pangalan ay bahagyang nagkakaiba, subalit hindi laging iba. Mga GenerateDataset Sinisikap ni Xml na itugma ang mga pangalan ng tudling. Kapag hindi ito magawa (na karaniwan) , ito ay hihinto, ipakikita sa iyo ang EML/data na talaksang pares, at tatanungin kung ang mga ito ay tama ang pagkakahanay. Kung papasok ka 's' upang mag-alsa sa isang mesa, si GeneratedDatasetsXml ay maglilimbag ng maling mensahe at pupunta sa susunod na mesa.
Ang solusyon ay palitan ang maling mga pangalan ng kolum sa talaksang EML upang itugma ang mga pangalan ng kolum sa data file.
     
### Naiibang Kaayusan ng mga Columno{#different-column-order} 
May ilang mga kaso kung saan tinukoy ng EML ang mga hanay sa ibang pagkakasunud-sunod kaysa sa pag-iral nito sa data file. Mga GenerateDataset Ang Xml ay titigil at magtatanong sa operator kung ang mga adaptasyon ay okay o kung ang dataset ay dapat na i-crash. Kung ito'y puputulin, magkakaroon ng maling mensahe sa talaksan ng resulta, e.g.,:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Ang solusyon ay ayusin ang column order sa mga talaksang ito ng EML upang maitugma ang mga ito sa pagkakasunud-sunod sa mga data files.

Magiging maganda kung susuriin ng tagapagsiyasat ng EML na ang mga haligi at kolumn order sa source file ay tumutugma sa mga column at column order sa talaksang EML.
    
### Di - wastong mga numHaderLine{#incorrect-numheaderlines} 
Ilang datos Talaan ng mga hindi tumpak na estado numHeaderLines=1, e.g., ...sbc.4011. Ito ang mga sanhiERDDAP™upang basahin ang unang linya ng datos bilang mga pangalan ng tudling. Sinikap kong pag - aralan nang manu - mano ang lahat ng mga dataTable na ito. Ang mga ito ay maliwanag dahil ang walang katulad na pinagmulang mga pangalan ng col ay lahat ng mga halaga ng datos. At kung may mga file na maling may numHeaderLines=0, hindi ito nakikita ng aking sistema. Narito ang isang halimbawa mula sa talaksang SBC LTER na bigo:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Kaya ang pagkakamali ay maaaring lumitaw na parang GenerateDatasets Xml na ang unang linya na may datos sa file (e.g., may 2008-10-01T00:00 atbp.) ang linya na may mga pangalan ng tudling (na para bang ang 2008-10-01T00:00 ay isang pangalan ng kolum) .

Magiging maganda kung susuriin ng tagasuri ng EML ang halaga ng numHeaderLines.
    
### numHaderLines = 0{#numheaderlines--0} 
Ang ilang talaksang source ay walang mga pangalan ng kolum.ERDDAP™Tanggapin na kung ang EML ay naglalarawan ng parehong bilang ng mga kolumna.

Sa palagay ko: ito'y waring napakapanganib. Maaaring may mga haligi sa ibang pagkakasunud - sunod o may iba't ibang yunit (Tingnan ang ibaba) at walang paraan upang masumpungan ang mga problemang iyon. Mas mabuti kung lahat ng mga talaksang datos ng ASCII ay may hanay na may mga pangalan ng kolum.
    
### Mga Himagas sa Petsa{#datetime-format-strings} 
Ang EML ay may pamantayang paraan upang ilarawan ang mga format ng oras ng petsa. ngunit may malaking pagkakaiba sa paggamit nito sa mga talaksang EML. (Dati ay mali ako tungkol dito. Nakikita ko ang dokumento ng EML para sa formatString na waring katugma ng[JavaPagpapakahulugan sa Petsa](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), ngunit kulang sa mga mahahalagang panuntunan tungkol sa paggamit nito, na may resulta na ang formatString ay madalas/karaniwang hindi wastong ginagamit.) May ilang mga pagkakataon na may di-tamang kaso, at/o maling duplication ng isang titik, at/o non-standard formating. Iyan ay naglalagay ng di - makatuwirang pabigat sa mga kliyente, lalo na sa mga kliyenteng software gaya ng GenerateDatasetsXml. Mga GenerateDataset Sinisikap ni Xml na baguhin ang maling ibinigay na format sa mga file ng EML
[petsa/time format naERDDAP™kailangan](/docs/server-admin/datasets#string-time-units), na halos katulad ng saJava/Joda ang oras ay nagbubuo ng detalye, subalit ito ay bahagyang mas mapagpatawad.

Mabuti sana kung ang tseke ng EML ay humihiling ng mahigpit na pagsunod saJava/Joda/ERDDAPang mga yunit ng oras at tiniyak na ang mga halaga ng petsa sa talaan ng impormasyon ay maaaring iayon nang wasto sa espesipikong format.
    
### Panahon ng Petsa Ngunit Walang Dako ng Panahon{#datetime-but-no-time-zone} 
Mga GenerateDataset Xml ay naghahanap ng kolum na may petsa Panahon at espesipikong sona ng oras (alin saZulu: mula sa mga yunit ng panahon na nagtatapos sa 'Z' o isang kolum na pangalan o depinisyon ng attribute na kinabibilangan ng "gmt" o "utc", o lokal: mula sa "lokal" sa katawagang kolumna o depinisyong attribute) . Katanggap-tanggap din ang isang file na may date column ngunit walang time column. Ang rin ay isang file na walang petsa o time information.

Mga GenerateDataset Ang Xml ay tinatrato ang lahat ng mga "local" na panahon bilang mula sa sona ng oras na maaari mong magtakda para sa isang ibinigay na talaksan, e.g., para sa SBC LTER, gamitin ang US/Pacific. Kung minsan ang impormasyon ay nasa mga komento, subalit hindi sa isang anyo na madaling maunawaan ng isang programa sa computer.

Ang mga talaksan na hindi nakatutugon sa pamantayang ito ay tinatanggihan ng mensaheng " WALANG MABUTING PETSA (PANAHON) VARIABLE". Ang karaniwang mga problema ay:

* May kolum na may mga petsa at pitak na may mga panahon, subalit hindi petsa Isang kolum para sa panahon.
* May mga yunit ng oras, ngunit hindi nakatakda ang sona ng oras.

Iba pang komento:
Kung may magandang petsa+ panahon na may time zone column, ang kolum na iyon ay tatawagin"time"sa loobERDDAP.ERDDAP™kailangan na ang time column data ay maunawaan/maliwanagZulu/UTC/GMT time zone dateTimes.\\[Ang paniniwala ko ay: paggamit ng lokal na panahon at iba't ibang date/time format (2-digit na mga taon&#33; mm/dd/yyy vs dd/mm/yyy vs ...) sa mga data files ay pumupuwersa sa gumagamit nito na gumawa ng masalimuot na mga pagbabagoZuluoras upang ihambing ang datos mula sa isang dataset sa datos mula sa iba. KayaERDDAP™Mga pamantayan sa lahat ng datos ng panahon: Para sa mga panahon ng kuwerdas,ERDDAP™laging gamitin ang ISO 8601:2004 (E) Pamantayang format, halimbawa, 1985-01-02T00:00:00Z. Para sa panahon ng pagbilang,ERDDAP™Laging gamitin"seconds since 1970-01-01T00:00:00Z".ERDDAP™laging gamitin angZulu  (UTC, GMT) sona ng oras upang alisin ang mga problema ng paggawa sa iba't ibang sona ng oras at pamantayang oras laban sa liwanag ng araw na nakatitipid ng panahon. Kaya ang GenerateDatasets Xml ay naghahanap ng isang EML dataTable column na may petsa+timeZulu. Ito ay mahirap dahil ang EML ay hindi gumagamit ng pormal na bokabularyo/sistema (tulad ng[Java/ Magandang format ng oras](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) para sa pagtatakda ng datos Oras:
Kung may col na may mga halaga ng panahon na numeriko (e.g.,Matlabng mga panahon) atZuluOraszone (o mga petsa lamang, na walang mga haligi ng panahon) , ginagamit ito bilang ,"time".
Kung may col na may petsa at time data, gamit angZulusona ng oras, ginagamit ito bilang"time"at anumang iba pang petsa o pitak ng panahon ay inaalis.
Else kung masumpungan ang isang col na may basta impormasyon tungkol sa petsa, ginagamit ito bilang ang"time"Iba - iba (walang sona ng oras) .
Kung merong data column at time column at walang pinagsamang petsa Time column, ang dataset ay REJECTED — subalit ang dataset ay maaaring gawing magagamit sa pamamagitan ng pagdaragdag ng pinagsamang petsa Bahagi ng panahon (Mas mabuti,Zulusona ng oras) sa datafile at dagdag ang paglalarawan nito sa talaksang EML.
LARAWAN mula sa SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)datos #2.

Maganda sana kung ang EML/LTER ay humihiling na isama ang isang kolum saZulu  (UTC, GMT) oras ng zone sa lahat ng mga kaugnay na source data files. Ang susunod na pinakamabuti ay idagdag ang isang sistema sa EML upang magtakda ng isangtime\\_zoneGamitin ang karaniwang pangalan (mula sa[Bahagi ng TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Nawawalamissing\\_value {#missing-missing_value} 
Ang ilang haligi ay gumagamit ng isangmissing\\_valuengunit huwag itong ilista sa EML metadata, e.g., presipitasyon\\_mm sa knb-lter-sbc.5011 ay gumagamit ng -999. Kung walang nawawalang halaga ang tinukoy sa EML, ang GenerateDatasetsXml ay awtomatikong naghahanap ng karaniwang nawawalang mga halaga (e.g., 99,99, 999, 999, 999, 999, -999, atbp) at lumilikha ng metadata. Subalit may ibang nawawalamissing\\_valueHindi nahuhuli ang mga s.

Maganda sana kung hanapin ng EL checker ang nawawalamissing\\_values.
    
### Maliliit na Problema{#small-problems} 
Maraming maliliit na problema (baybay, bantas) na malamang ay masusumpungan lamang sa pamamagitan ng pagsusuri ng tao sa bawat dataset.

Magiging maganda sana kung hanapin ng isang tagasuri ng EML ang pagbaybay at kamalian sa balarila. Ito'y isang mahirap na problema sapagkat ang mga salita sa siyensiya ay kadalasang nababasehan ng mga checker ng engkanto. Malamang na kailangan ang pagsasaayos ng tao.
    
### Hindi tanggap na mga Katangiang Walang Pangalan{#invalid-unicode-characters} 
Ang ilan sa nilalamang EML ay naglalaman ng hindi tanggap na mga karakter na Unicode. Ang mga ito ay malamang na mga karakter mula sa charset ng Windows na maling kinopya at inilagay sa mga file ng UTF-8 EML. Mga GenerateDataset Xml sanitisa ang mga karakter na ito sa e.g.,\\[#128\\], kaya madali silang hanapinERDDAP™ datasets.xmltalaksan.

Maganda sana kung suriin ito ng tagapagsuri ng EML. Madali itong makita at madaling ayusin.
    
### Iba't Ibang Unit ng Column] (#Ibang mga Pag - uusap)  {#different-column-unitsdifferentcolumnunits} 
Ang ilang mga dataTable ng EML ay nagbibigay ng kahulugan sa mga kolumna na hindi kasuwato ng mga kolumna sa data file, partikular na dahil sa ang mga ito ay may iba't ibang unit. Mga GenerateDataset Ang mga ito ay may mga bandilang Xml. Nasa operator na ang pagpapasiya kung ang pagkakaiba ay okay o hindi. Ang mga ito ay lumilitaw sa talaksang kabiguan bilang "SKIPED" dataTables. LARAWAN sa talaksang LTER ng SBC:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Maganda sana kung ang mga yunit ng EML ay suriing magtugma ang mga ito. Sa kasamaang palad, ito ay malamang na imposibleng mahuli at pagkatapos ay imposibleng malutas nang hindi nakikipag-ugnayan sa tagalikha ng dataset, ibinigay na ang pinagmulang file ay hindi kinabibilangan ng mga yunit. Ang pagkakaiba sa halimbawa sa itaas ay kapansin - pansin lamang sapagkat ang mga yunit ay isinama sa pinagkunang pangalan ng tudling at sa pangalan ng tudling ng EML. Ilan pang mga dataTable ang may ganitong problema ngunit hindi matutukoy?
    
### Iba't Ibang Bersiyon ng EML{#different-versions-of-eml} 
Mga GenerateDataset Xml ay dinisenyo upang gumana kasama ng EML 2.1.1. Ang ibang mga bersyon ng EML ay gagana sa lawak na ang mga ito ay tumutugma sa 2.1.1 o kaya ang GenerateDatasetsXml ay may espesyal na code upang harapin ito. Pambihirang problema ito. Kapag nangyari ito, ang solusyon ay ikumberte ang iyong mga file sa EML 2.1.1, o ipadala ang talaksang EML upang i-publish ang iyong mga fileerd.data at noaa.gov, para makagawa ako ng mga pagbabago sa GenerateDatasets Xml upang harapin ang mga pagkakaiba.

Si Bob ay nagdagdag ng suporta para sa mga file ng EML sa GenerateDatasets Xml noong 2016 na may pag-asang magkakaroon ng ilang uptake sa komunidad ng EML. Noong 2020, hindi pa iyan nangyari. Nalulugod si Bob na magdagdag ng suporta para sa mas bagong mga bersiyon ng EML, ngunit tangi lamang kung ang mga bagong katangian ay aktuwal na gagamitin. Pakisuyong mag - emailerd.data at noaa.govkung nais mo ng suporta para sa mas bagong mga bersiyon ng EML at aktuwal na gagamitin ang bahaging ito.
    
### Suliranin sa Pag - aalis ng Date File{#trouble-parsing-the-data-file} 
Bihira, ang isang dataTable ay maaaring tanggihan sa pamamagitan ng pagkakamali "di inaasahang bilang ng mga bagay sa linya #120 (sabi=52, inasahan=50) " Ang maling mensahe na tulad nito ay nangangahulugan na ang isang linya sa datafile ay may ibang bilang ng mga halaga kaysa sa ibang linya. Maaaring problema itoERDDAP™  (e.g., hindi paayon nang tama ang talaksan) o nasa talaksan. LARAWAN mula sa SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)Mayroong datos #3, tingnan ang datos nafile=LTER\\_monthly\\_botleta\\_Register\\_statations\\_20140429.txtx
