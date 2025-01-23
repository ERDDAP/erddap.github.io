---
title: "NCCSV 1.00"
---

# NCSV -
ANetCDF-Compatiable ASCII CSV File speciation,
Bersiyong 1.00

Sina Bob Simons at Steve Hankin
"NCCSV" nina Bob Simons at Steve Hankin ay lisensiyado sa ilalim ng ilalim[CC NG 4.0](https://creativecommons.org/licenses/by/4.0/)

## [Introduksiyon](#introduction) {#introduction} 

Binabanggit ng dokumentong ito ang ASCII CSV text file format na maaaring maglaman ng lahat ng impormasyon (metadata at datos) na masusumpungan sa isangNetCDF .ncfile na naglalaman ng CSV-file-tulad ng mesa ng datos. Ang file extension para sa isang ASCI CSV text file na sumusunod sa detalyeng ito ay dapat .csv upang ito ay madaling mabasa at tama sa mga programa ng disheet tulad ng Excel at Google Sheets. Magsusulat si Bob Simons ng software upang gawing isang talaksang NCCSVNetCDF-3 (at marahil ay isa ringNetCDF-4)  .ncang talaksan, at ang baligtad, na walang nawawalang impormasyon. Nagbago na si Bob Simons[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)upang suportahan ang pagbasa at pagsulat ng ganitong uri ng talaksan.

Dinisenyo ang NCCSV format upang mapalaganap ang mga software na pang-sheet tulad ng Excel at Google Sheets ay makapag-aangkat ng isang talaksang NCCSV bilang isang talaksang csv, na ang lahat ng impormasyon sa mga selula ng direksyon ay handa na para sa pagsasaayos. O, ang isang diffesheet ay maaaring malikha mula sa gasgas kasunod ng mga kombensiyon ng NCCSV. Anuman ang pinagmulan ng diverseet, kung ito ay iluluwas bilang isang .csv file, ito ay aalinsunod sa NCCSV ekwasyon at walang nawawalang impormasyon. Ang tanging pagkakaiba sa pagitan ng mga talaksang NCSV at ng mga talaksang analogous disheet na kasunod ng mga kombensiyong ito ay:

* Ang mga talaksang NCCSV ay may mga halaga sa isang linya na pinaghihiwalay ng mga comma.
Ang mga kumakalat ay may mga halaga sa isang linya sa katabing mga selula.
* Ang mga tali sa mga talaksang NCCSV ay kadalasang napaliligiran ng mga dobleng quote.
Ang mga tali sa mga disheet ay hindi kailanman napaliligiran ng dobleng mga sinipi.
* Internasyunal na dobleng mga sinipi (") sa Strings sa NCCSV files ay lumilitaw bilang 2 double quotes.
Ang panloob na dobleng mga sinipi sa mga disheet ay lumilitaw bilang 1 double quote.

Tingnan ang[Pagpapalaganap](#spreadsheets)na nasa ibaba para sa higit pang impormasyon.

### Kahiya - hiya{#streamable} 
Tulad ng CSV files sa pangkalahatan, ang NCCSV files ay streetable. Kaya, kung ang isang NCSV ay nalilikha sa-the-fly sa pamamagitan ng isang server ng datos gaya ng[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html), ang server ay maaaring magsimula ng paghahatid ng datos sa request bago ang lahat ng datos ay matipon. Ito ay isang kapaki - pakinabang at kanais - nais na bahagi.NetCDFSa kabaligtaran, ang mga talaksan ay hindi maaaring pagurin.

### ERDDAP™ {#erddap} 
Ang detalyeng ito ay dinisenyo upang ang NCCSV files at ang.ncAng mga talaksan na maaaring likhain mula sa mga ito ay maaaring gamitin ng isang[ERDDAP™server ng datos](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (sa pamamagitan ng[Nakasusuyang mga Latian](/docs/server-admin/datasets#eddtablefromnccsvfiles)at[Mapagkakatiwalaan Mula sa mga Latian](/docs/server-admin/datasets#eddtablefromncfiles)mga uri ng datos) , ngunit ang detalyeng ito ay panlabas saERDDAP.ERDDAP™ay nangangailangan ng pangglobong mga katangian at marami ang nagrekomenda ng pangglobo at iba't ibang katangian, karamihan ay batay sa CF at mga katangiang ACD (tingnan ang mga katangiang CF at ACD
[/docs/server-admin/datasets#global-attributes](/docs/server-admin/datasets#global-attributes)).

### Pagiging Timbang{#balance} 
Ang disenyo ng NCSV format ay isang balanse ng ilang mga kahilingan:

* Ang mga file ay dapat maglaman ng lahat ng data at metadata na nasa isang tabularNetCDFtalaksan, kasama ang mga espesipikong uri ng datos.
* Ang mga talaksan ay dapat na mabasa at pagkatapos ay isulat mula sa isang disheet na walang nawawalang impormasyon.
* Ang mga salansan ay dapat na madaling likhain, ayusin, basahin, at unawain ng mga tao.
* Ang mga file ay dapat malinaw na nai-record ng mga computer programs.

Kung ang ilang kahilingan sa dokumentong ito ay waring kakatwa o mahirap, malamang na kailangang maabot ang isa sa mga kahilingang ito.

### Iba Pang Espesipikong mga Larawan{#other-specifications} 
Ang detalyeng ito ay tumutukoy sa iba pang mga detalye at mga aklatan na dinisenyo upang gamitin, subalit ang detalyeng ito ay hindi bahagi ng alinman sa mga ibang detalyeng iyon, ni nangangailangan man ito ng anumang pagbabago sa mga ito, ni ito man ay salungat sa mga ito. Kung ang detalyeng may kaugnayan sa isa sa mga pamantayang ito ay hindi binanggit dito, tingnan ang kaugnay na detalye. Kapansin - pansin, kalakip dito ang:

* Ang Attribute Convention for Dataset Discovery (ACDD) Pamantayan ng metadata:
    [ https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3 ](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3).
* Ang Klima at Hula (CF) Pamantayan ng metadata:
    [ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html).
* AngNetCDFPatnubay ng User (NIUG) :
    [ https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
* AngNetCDFTalaan ng mga software na aklatan tulad ngNetCDF-java atNetCDF-c:
    [ https://www.unidata.ucar.edu/software/netcdf/ ](https://www.unidata.ucar.edu/software/netcdf/). Hindi mabasa ng mga aklatan na ito ang mga talaksang NCCSV, ngunit mababasa nila.ncna nilikha mula sa mga talaksang NCCSV.
* JSON:[ https://www.json.org/ ](https://www.json.org/)

### Pagbibigay - Pansin{#notation} 
Sa detalyeng ito, mga bracket,\\[ \\], ay nagpapahiwatig ng opsyonal na mga bagay.

## [Pagbuo ng File](#file-structure) {#file-structure} 

Ang isang kumpletong talaksang NCCSV ay binubuo ng dalawang bahagi: ang bahaging metadata, na sinusundan ng bahaging datos.

Ang NCCSV files ay dapat na naglalaman lamang ng 7-bit ASCII karakter. Dahil dito, ang karakter na itinakda o insignasyon na ginagamit sa pagsusulat at pagbasa ng talaksan ay maaaring kahit anong character set o composition na tumutugma sa karakter na 7-bit ASCII set, e.g., ISO-8859-1.ERDDAP™basahin at isulat ang NCCSV files kasama ang ISO-8859-1 charset.

Ang mga talaksang NCSV ay maaaring gumamit ng alinmang newline (\\n)   (na karaniwan sa mga computer sa Linux at Mac OS X) o Sakay ng karwahe (\\r\\n)   (na karaniwan sa mga Windows computer) bilang mga end-of-line marker, ngunit hindi pareho.

### .nccsvMetadata{#nccsvmetadata} 
Kapag inaasahan ito kapuwa ng maylikha at ng mambabasa, posible at kung minsan ay kapaki - pakinabang na gumawa ng iba't ibang anyo ng isang talaksan ng NCCSV na naglalaman lamang ng bahaging metadata (kasali na ang\\*ALAS\\_METATA\\*linya) . Ang resulta ay nagbibigay ng kumpletong paglalarawan ng mga katangian ng talaksan, iba't ibang mga pangalan, at mga uri ng datos, sa gayon ay nagsisilbi sa parehong layunin ng .das pluss mga tugon mula sa isang addsOPeNDAPserver.ERDDAP™ibabalik ang pagkakaibang ito kung ikaw ay hihingi ng talaksan Type=.nccsvMetadata mula sa isangERDDAP™datos.

## [Ang Bahagi ng Metadata](#the-metadata-section) {#the-metadata-section} 

Sa isang talaksang NCSV, ang bawat linya ng bahaging metadata ay gumagamit ng format
[Iba - iba Pangalan](#variablename),[attribute Pangalan](#attributename),[halaga1](#value)\\[, Halaga2\\]\\[, Halaga3\\]\\[, Halaga4\\]\\[...\\]  
Ang mga espasyo bago o pagkatapos ng mga bagay ay hindi pinapayagan dahil ang mga ito ay nagdudulot ng mga problema kapag nag-aangkat ng file sa mga programang disheet.

### Mga Kombensiyon{#conventions} 
Ang unang linya ng isang talaksang NCSV ay ang unang linya ng bahaging metadata at dapat mayroong isang[\\*GLOBYA\\*](#global)Ang mga kombensiyon ay nagtatala ng lahat ng kombensiyon na ginamit sa file bilang isang String na naglalaman ng isang talaan ng CSV, halimbawa:
\\*GLOBYA\\*, Mga Kombinatorika,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0".
Isa sa mga kumbensiyong nakatala ay ang NCCSV-1.0, na tumutukoy sa kasalukuyang bersyon ng konsekrasyong ito.

### Itigil ANG_METATA{#end_metadata} 
Ang dulo ng bahaging metadata ng isang talaksang NCSV ay dapat na ipahiwatig sa pamamagitan ng isang linya na may tanging linya
\\*ALAS\\_METATA\\*

Inirerekomenda ngunit hindi hinihiling na ang lahat ng mga katangian para sa isang ibinigay na variable ay lumitaw sa mga katabing linya ng bahaging metadata. Kung ang isang talaksang NCSV ay gagawing isangNetCDFfile, ang order na unang lumitaw ang variableNames sa metadata segment ay magiging order ng mga variables saNetCDFtalaksan.

Pinapahintulutan ang mga linyang blanko sa bahaging metadata matapos ang kinakailangang unang linya[\\*GLOBYA\\*](#global) [Mga Kombensiyon](#conventions)impormasyon (Tingnan ang ibaba) at bago ang hinihiling na huling taludtod\\*ALAS\\_METATA\\*.

Kung ang isang explacesheet ay nilikha mula sa isang talaksang NCCSV, ang metadata data section ay lilitaw na may iba't ibang pangalan sa hanay A, attribute mga pangalan sa hanay B, at mga halaga sa hanay C.

Kung ang isang explacesheet kasunod ng mga kumbensiyong ito ay natitipid bilang isang CSV file, kadalasang magkakaroon ng mga ekstrang komma sa dulo ng mga linya sa bahaging metadata. Ang software na gumagawa sa mga file ng NCCSV.ncang karagdagang mga komma.

### [Iba - iba Pangalan](#variablename) {#variablename} 

 *Iba - iba Pangalan* ang case-sensitive na pangalan ng isang variable sa data file. Ang lahat ng mga iba't ibang pangalan ay dapat magsimula sa isang 7-bit na titik ASCII o bigyang diin at binubuo ng 7-bit na mga titik ASCII, diin, at 7-bit ASCI digits.
#### GLOBYA{#global} 
Ang pantanging variableName[\\*GLOBYA\\*](#global)ay ginagamit upang tumukoy sa pangglobong metadata.

### [attribute Pangalan](#attributename) {#attributename} 

 *attribute Pangalan* ang case-sensitive na pangalan ng isang attribute na may kaugnayan sa isang variable o[\\*GLOBYA\\*](#global). Ang lahat ng mga pangalang attribute ay dapat magsimula sa isang 7-bit na titik ASCII o bigyang diin at binubuo ng 7-bit na mga titik ASCII, diin, at 7-bit ASCII digits.

#### SCALAR{#scalar} 
Ang pantanging katangian Pangalan\\*SCALAR\\*ay maaaring gamitin upang lumikha ng isang scalar data variable at bigyan ng kahulugan ang halaga nito. Ang data na uri ng\\*SCALAR\\*bigyan ng kahulugan ang uri ng datos para sa variable, kaya huwag magtakda ng a\\*DATA\\_TYPE\\*Ilagay sa scalar variables. Pansinin na hindi dapat magkaroon ng datos para sa scalar variable sa Data Seksiyon ng talaksang NCCSV.

Halimbawa, upang lumikha ng isang scalar variable na pinangalanang "ship" na may halagang "Okeanos Explorer" at isang cf\\_role attribute, gamitin:
barko,\\*SCALAR\\*,"Okeanos Explorer"
barko,cf\\_role,trajectory\\_id
Kapag ang isang scalar data variable ay binasa saERDDAP™, ang halaga ng scalar ay ginagawang kolum sa data table na may parehong halaga sa bawat hanay.

### [halaga](#value) {#value} 

 *halaga* ay ang halaga ng metadata attribute at dapat ay array na may isa o higit pa ng alinman sa isang byte, maikli, int, mahaba, lumulutang, doble, String, o char. Walang ibang data type ang suportado. Ang mga attributes na walang halaga ay ipagwawalang bahala. Kung may higit sa isang sub-halaga, ang mga sub-halaga ay dapat lahat sa parehong data type at pinaghihiwalay ng mga comma, halimbawa:
sst,actual\\_range,0.17f,23.58f
Kung maraming halaga ang String, gumamit ng iisang String\\n  (newline) ang mga tauhang naghihiwalay sa mga tali sa ilalim.

Ang mga kahulugan ng mga uri ng attribute data ay:

#### byte{#byte} 
* byte attribute mga pagpapahalaga (8-bit, nilagdaan) dapat isulat gamit ang hulaping 'b', e.g., -7b, 0b, 7b . Ang saklaw ng mga lehitimong pagpapahalagang byte ay -128 hanggang 127. Isang bilang na mukhang byte ngunit hindi tanggap (e.g., 128b) ay lilikha ng maling mensahe.
     
#### maikli{#short} 
* maikling mga pamantayan ng attribute (16-bit, nilagdaan) dapat isulat gamit ang hulaping 's', e.g., -300s, 0s, 30000s. Ang saklaw ng mga lehitimong maikling halaga ay -32768 hanggang 32767. Isang bilang na mukhang maikli ngunit walang bisa (e.g., 32768s) ay lilikha ng maling mensahe.
     
#### int{#int} 
* mga pamantayan sa attribute (32-bit, nilagdaan) ay dapat isulat bilang JSON ints na walang puntos o exponent, ngunit may hulaping suffix 'i', e.g., -12067978i, 0i, 12067978i. Ang saklaw ng mga lehitimong int na halaga ay -21474833648 hanggang 2147483647. Isang bilang na mukhang int ngunit hindi tanggap (e.g., 2147483648i) ay lilikha ng maling mensahe.
     
#### mahaba{#long} 
* matagal na mga pagpapahalaga sa attribute (64-bit, kinumpirma, kasalukuyang suportado ng NUG atERDDAP™ngunit hindi suportado ng CF) ay kailangang isulat na walang puntong-pampaaralan at kasama ang hulaping 'L', e.g., -2345678987654321L, 0L, 123456787654321L . Kung gagamitin mo ang binagong software upang ikumberte ang isang file ng NCCSV na may mahabang halagaNetCDF-3 file, anumang mahabang halaga ay gagawing dobleng halaga. Ang saklaw ng makatwirang mahabang halaga ay -9223372036854775808 hanggang 92233720368547807. Isang bilang na mukhang mahaba ngunit walang bisa (e.g., 9223372036854775808L) ay lilikha ng maling mensahe.
     
#### Palutang{#float} 
* Palutangin ang mga pagpapahalaga sa attribute (32-bit) ay dapat isulat gamit ang hulaping fexi 'f' at maaaring may puntos na analogo at/o exponent, e.g., 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f. Gamitin ang NaNf sa Paglutang ng NaN (kulang) halaga. Ang saklaw ng mga palutang ay humigit-kumulang +/-3.40282347E+38f. (EX7 mahahalagang numero ng numero) . Isang bilang na mukhang lumulutang ngunit walang bisa (e.g., 1.0e39f) ay lilikha ng maling mensahe.
     
#### doble{#double} 
* Dalawang bagay na mahalaga (64-bit) ay kailangang isulat gamit ang hulaping seffix 'd' at maaaring may puntos na analogo at/o eksponente, e.g., 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d. Gamitin ang NaNd Para sa Dalawang NAN (kulang) halaga. Ang saklaw ng doubles ay humigit-kumulang +/7.9769313486231570E+308d (~15 mahalagang mga numerong ~) . Ang bilang na mukhang doble ngunit hindi tanggap (e.g., 1.0e309d) ay lilikha ng maling mensahe.
     
#### Pagpiga{#string} 
* Ang String attribute values ay isang pagkakasunod-sunod ng mga karakter ng UCS-2 (I.e., 2-byte Unicode characters, tulad ng saJava) , na dapat isulat bilang 7-bit ASCII, JSON-tulad ng mga kuwerdas upang matukoy ang mga karakter na hindi-ASCI.
    * Dalawang - uring pagsipi (") ay kailangang i-install bilang dalawang dobleng quote ("") . Iyan ang kinakailangan ng mga programa ng disheet kapag nagbabasa ng .csv files. Iyan ang isinusulat ng mga programang disheet kapag nasagip mo ang isang diffesheet bilang isang .csv file.
    * Ang espesyal na JSON backslash-encoded na mga character ay dapat na i-recorded bilang sa JSON (na kapansin-pansin\\n(newline), ngunit gayundin ang \\ (backslash), \\f (pormal), \\ (tab), \\ (carriage return) o kasama ng \\ (tab), \\ (carriage return)[\\u *hhhh* ](#uhhhh)Makipag - usap. Sa isang diverseet, huwag gumamit ng Alt Enter upang magtakda ng bagong linya sa loob ng isang selula ng teksto; sa halip, gamitin ang\\n  (2 tauhan: backslash at 'n ') upang ipahiwatig ang isang bagong linya.
##### \\uhhhh.{#uhhhh} 
    * Ang lahat ng karakter na wala pang character #32 o mas malaki kaysa sa karakter #126, at kung hindi man ay naka-signed, ay dapat i-record na kasama ang \\u *hhhh* , kung saan ang hhhh ay ang 4-digit na hexadecimal na bilang ng karakter, e.g., ang Euro sign ay \\u20AC. Tingnan ang mga pahina ng kodigo na binabanggit sa[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode)upang mahanap ang mga numerong hexadecimal na nauugnay sa espesipikong mga karakter na Unicode, o gumamit ng isang aklatan ng software.
    * Kung ang String ay may puwang sa simula o dulo, o kasama " (dobleng pagsipi) o isang komma, o naglalaman ng mga pamantayan na kung hindi ay bibigyang - kahulugan bilang iba pang uri ng datos (e.g., isang int) , o kaya ay ang salitang "null", ang buong String ay dapat na nakapaloob sa mga dobleng quote; kung hindi, hindi tulad ng JSON, ang paglalakip ng mga dobleng quote ay opsyonal. Iminumungkahi namin: kapag nag - aalinlangan, ilakip ang buong String sa dalawang sinipi. Ang mga espasyo sa simula o dulo ng isang String ay matinding nasisiraan ng loob.
    * Sa ngayon, nasisiraan ng loob ang paggamit ng mga karakter na mas malaki sa #255. Sinusuportahan sila ng NCSV.ERDDAP™ay umaalalay sa kanila sa loob. Ang ilang uri ng output ay sumusuporta sa kanila (e.g.,.jsonat.nccsv) . Subalit maraming uri ng output file ay hindi sumusuporta sa mga ito. Halimbawa,NetCDF-3 files ay hindi sumusuporta sa gayong mga karakter dahilNetCDFang mga talaksan ay gumagamit ng 1-byte na karakter at ang CF sa kasalukuyan ay walang sistema para sa pagtatakda kung paanong ang mga karakter ng Unicode ay naka-signed saNetCDFMga Hagdan (e.g., UTF-8) . Malamang na bubuti ito sa paglipas ng panahon.
         
#### char{#char} 
* Ang char attribute values ay isang solong karakter ng UCS-2 (I.e., 2-byte Unicode characters, tulad ng saJava) , na dapat isulat bilang 7-bit ASCII, JSON-like characters upang ang ibang mga character ay matiyak (Tingnan ang pagpapakahulugan sa String sa itaas para sa pag - uugnay ng pantanging mga tauhan, na may dagdag na isang sinipi bilang \\ ') . Ang mga pamantayan ng attribute ay dapat na ilakip sa isahang mga sinipi (panloob na mga sinipi) at dobleng mga pagsipi (ang panlabas na mga sinipi) , e.g., "'a'", "'"' (dalawahang quote karakter) , "'\'" (isang tauhan sa pagsipi) , "'\t'" (isang tab) , "'\\u20AC'" (Isang Euro character) . Ang sistemang ito ng paggamit ng isahan at dobleng mga sinipi ay kakatwa at mahirap, subalit isang paraan ito upang makilala ang mga halaga ng char mula sa Strings sa paraan na gumagana sa mga disheet. Ang isang halaga na mukhang char ngunit walang bisa ay lilikha ng maling mensahe. Katulad ng sa Strings, ang paggamit ng mga karakter na mas malaki sa #255 ay kasalukuyang nasisiraan ng loob.

### Sapat na{#suffix} 
Pansinin na sa mga katangiang bahagi ng isang talaksang NCSV, ang lahat ng mga halaga ng numerikong attribute ay dapat na may hulaping titik (e.g., 'b') upang matukoy ang uri ng numero (e.g., byte) . Subalit sa seksyon ng datos ng isang talaksang NCSV, ang mga halagang numerikong datos ay hindi dapat magkaroon ng mga titik na ito na hulapi (maliban sa 'L' sa mahabang integers) — ang uri ng datos ay tinitiyak ng\\*DATA\\_TYPE\\*Isaalang - alang ang pagkakaiba.

#### DATA_TYPE{#data_type} 
Ang data type para sa bawat non-[scalar](#scalar)Ang mga pagbabago ay dapat na tiyakin ng isang\\*DATA\\_TYPE\\*attribute na maaaring magkaroon ng halaga ng byte, maikli, int, mahaba, lumulutang, doble, String, o char (kasong walang pakiramdam) . Halimbawa,
qc\\_flag,\\*DATA\\_TYPE\\*,byte
BABALA: Ituring ang tama\\*DATA\\_TYPE\\*ang iyong pananagutan. Pagtukoy sa maling uri ng datos (e.g., sibuyas kung kailan dapat na mayroon kang tiyak na lumulutang) ay hindi lilikha ng maling mensahe at maaaring maging sanhi ng pagkawala ng impormasyon (e.g., ang lulutang na mga halaga ay mabilog hanggang sa mga int) kapag ang talaksang NCSV ay binasa ngERDDAP™o ginagawang isangNetCDFtalaksan.

### Nasiraan ng Loob si Char{#char-discouraged} 
Ang paggamit ng char data values ay hindi hinihimok dahil ang mga ito ay hindi malawak na suportado sa ibang mga uri ng file. Ang mga char value ay maaaring isulat sa seksyon ng datos bilang isahang karakter o bilang Strings (Lalo na, kung kailangan mong sumulat ng isang pantanging karakter) . Kapag natagpuan ang isang String, ang unang karakter ng String ay gagamitin bilang halaga ng char. Ang Zero long Strings at nawawalang mga halaga ay i-publish sa karakter na \\FFF. Pansinin naNetCDFAng mga talaksan ay sumusuporta lamang sa isahang byte chars, kaya ang anumang chars na mas malaki sa char #255 ay makukumberte sa '?' kapag nagsusulat.NetCDFmga file. Maliban sa isang charset attribute ay ginagamit upang magtakda ng ibang charset para sa isang char variable, ang ISO-8859-1 charset ay gagamitin.

### Matagal Nang Nasiraan ng Loob{#long-discouraged} 
Bagaman maraming uri ng talaksan (e.g.,NetCDF-4 at json) atERDDAP™sumusuporta sa mga mahahabang data values, ang paggamit ng mahabang data values sa NCCSV files ay kasalukuyang nasisiraan ng loob dahil ang mga ito ay kasalukuyang hindi suportado ng Excel, CF at CFNetCDF-3 files. Kung nais mong tiyakin ang mahabang halaga ng datos sa isang talaksang NCCSV (o sa katumbas na Excel disheet) , dapat mong gamitin ang hulaping 'L' upang hindi itrato ng Excel ang mga numero bilang lumulutang na mga point number na may mas mababang prekwensiya. Sa kasalukuyan, kung ang isang NCSV files ay gagawing isangNetCDF-3.ncfile, ang mahabang data values ay gagawing dobleng halaga, na nagiging sanhi ng pagkawala ng prekwensiya para sa napakalaking halaga (wala pang -2^53 o mas malaki pa sa 2^53) .

### CF, ACDD, atERDDAP™Metadata{#cf-acdd-and-erddap-metadata} 
Yamang nakikini - kinita na ang karamihan ng mga file ng NCCSV, o ang.ncmga talaksan na nilikha mula sa mga ito, ay babasahinERDDAP, mariing iminumungkahi na isama sa mga talaksang NCCSV ang mga katangiang metadata na kinakailangan o inirerekomenda ng mgaERDDAP™( Tingnan
[/docs/server-admin/datasets#global-attributes](/docs/server-admin/datasets#global-attributes)). Ang mga katangian ay halos lahat mula sa mga pamantayan ng CF at ACDD metadata at nagsisilbi upang wastong ilarawan ang dataset (na, ano, kailan, saan, bakit, paano) sa isa na walang kaalam - alam tungkol sa dataset. Lalo nang mahalaga, halos lahat ng mga variable sa numero ay dapat na may isang yunit na kabilang sa isangUDUNITS- kaugnay na halaga, e.g.,
sst,units,degree\\_C

Mainam na isama ang karagdagang mga katangian na hindi mula sa mga pamantayan ng CF o ACDD o mula sa mga pamantayan ng CFERDDAP.

## [Ang Bahagi ng Data](#the-data-section) {#the-data-section} 

### [Pag - iingat](#structure) {#structure} 

Ang unang linya ng seksyon ng datos ay dapat may isang case-sensitive, comma-weadd list ng mga variable na pangalan. Lahat ng mga variable sa talaang ito ay dapat ilarawan sa bahaging metadata, at bise versa (maliban sa iba[\\*GLOBYA\\*](#global)mga katangian at katangian[\\*SCALAR\\*](#scalar)Iba - iba) .

Ang ikalawa sa pamamagitan ng penultimate na mga linya ng seksyon ng datos ay dapat may komma-based na talaan ng mga halaga. Ang bawat hanay ng mga datos ay dapat na may parehong bilang ng mga halaga gaya ng comma-based na talaan ng mga iba't ibang pangalan. Ang mga espasyo bago o pagkatapos ng mga pagpapahalaga ay hindi pinapayagan dahil ang mga ito ay nagdudulot ng mga problema kapag nag-aangkat ng file sa mga programang disheet. Ang bawat tudling sa bahaging ito ay dapat na naglalaman lamang ng mga pamantayan ng\\*DATA\\_TYPE\\*na itinakda ng\\*DATA\\_TYPE\\*Sabihin ang pagkakaibang iyan. Hindi tulad sa sekwensiya ng mga katangian, ang mga numerikong halaga sa seksyon ng datos ay dapat walang suffix na mga titik upang ipahiwatig ang tipo ng datos. Hindi tulad sa seksiyon ng mga katangian, ang mga char value sa seksyon ng datos ay maaaring mag-alis ng paglalakip ng isahang mga sinipi kung ang mga ito ay hindi kailangan para sa disambiguation (sa gayon, '' at '\' ay dapat sipiin gaya ng ipinakikita rito) . Maaaring may anumang bilang ng mga hanay ng datos na ito sa isang talaksang NCCSV, ngunit sa kasalukuyan,ERDDAP™ay mababasa lamang ang mga talaksang NCCSV na may humigit-kumulang 2 bilyong hanay. Sa pangkalahatan, iminumungkahi na hatiin mo ang malalaking datasets sa multiple NCCSV data files na wala pang 1 milyong hanay ang bawat isa.

#### Wakas ng Data{#end-data} 
Ang dulo ng seksyon ng datos ay dapat na magpahiwatig sa pamamagitan ng isang linya na may lamang linya
\\*ALAS\\_DA\\*

Kung may karagdagang nilalaman sa talaksang NCSV pagkatapos ng\\*ALAS\\_DA\\*line, ito ay ibalewala kapag ang NCCSV file ay ginawang isang.nctalaksan. Kaya ang gayong nilalaman ay nasisiraan ng loob.

Sa isang explacesheet kasunod ng mga kombensiyong ito, ang iba't ibang pangalan at data values ay magiging maramihan. Tingnan ang halimbawa sa ibaba.

### [Nawawalang mga Pamantayan](#missing-values) {#missing-values} 

Ang Numerikong nawawalang mga halaga ay maaaring isulat bilang isang halaga ng numero na nakikilala ng isangmissing\\_valueo \\_FillValue attribute para sa variable na iyon. Halimbawa, tingnan ang ikalawang halaga sa hanay na ito ng datos:
Bell M. Shimada,99,123.4
Ito ang iminungkahing paraan upang pangasiwaan ang nawawalang mga pamantayan para sa byte, short, int, at long variables.

Maaaring isulat bilang NaN. Halimbawa, tingnan ang ikalawang halaga sa hanay na ito ng datos:
Bell M. Shimada,NaN,123.4

Maaaring ipahiwatig ng isang walang - laman na larangan ang mga pagpapahalagang walang laman at numero. Halimbawa, tingnan ang ikalawang halaga sa hanay na ito ng datos:
Bell M. Shimada,123.4

Para sa byte, short, int, at long variables, ang NCCSV converter intelektwal at angERDDAP™ang isang bakanteng field tungo sa sukdulang halaga para sa data type na iyon (e.g., 127 para sa byte) . Kung gagawin mo ito, tiyaking magdagdagmissing\\_valueo \\_FillValue attribute para sa variable na iyon upang makilala ang halagang ito, e.g.,
 *Iba - iba Pangalan* ,\\_FillValue,127b
Para sa mga lumulutang at dobleng variable, ang isang walang laman na field ay gagawing NaN.

### [Mga Pamantayan sa Petsa](#datetime-values) {#datetime-values} 

Mga Pamantayan sa Petsa (kasama ang mga pamantayan sa petsa na walang bahagi ng panahon) ay maaaring ikatawan bilang numero o bilang Strings sa NCCSV files. Ang isang ibinigay na dateTime variable ay maaari lamang magkaroon ng mga halagang String o tanging mga numerikong halaga, hindi pareho. Gagawing petsa ng NCCSV software ang String dateTimes Mga pamantayan sa panahon kapag lumilikha.ncmga talaksan (na hinihiling ng CF) . Ang mahahalagang pamantayan sa petsa ay may bentaha na madaling basahin ng mga tao.

Ang mga pamantayan sa petsa na kinakatawan ng mga halaga ng numero ay dapat na may isang yunit na nagsasabi kung alin ang " *mga yunit* mula noon *petsa Panahon* " ayon sa kahilingan ng CF at espesipikong sinabi ngUDUNITS, e.g.,
Oras,units, seconds mula 1970-01-01T00:00:00Z

Ang mga pamantayan sa petsa na kinakatawan bilang String na mga pamantayan ay dapat na may String\\*DATA\\_TYPE\\*Ang attribute at ang isang yunit ay may palagay kung alin ang nagsasabi ng petsa Oras na huwaran ayon sa pagkakatukoyJavaAng klase sa Petsa na Formatter
 ([ https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html ](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)) . Halimbawa,
oras,units,yyyy-MM-dd'T'H:mm:ssZ
Ang lahat ng mga halagang dateTim para sa isang ibinigay na data variable ay dapat gumamit ng parehong format.
Sa karamihan ng mga kaso, ang huwaran ng petsa na kailangan mo para sa mga yunit na binanggit ay iba't ibang anyo ng mga format na ito:

*   yyyy-MM-dd'T'H:mm:ss. SSSZ — na siyang ISO 8601:2004 (E) petsa Time format. Baka kailanganin mo ang pinaikling bersiyon nito, e.g.,yyyy-MM-dd'T'H:mm:ssZ (ang tanging iminungkahing format) oyyyy-MM-dd. Kung binabago mo ang format ng mga pamantayan ng iyong dateTime, inirerekomenda ng NCSV na lumipat ka sa format na ito (marahil ay pinaikli) . Ito ang format naERDDAP™ay gagamitin kapag ito ay nagsulat ng mga talaksang NCCSV.
* yyyyMddHHHms.SSS — na siyang siksik na bersiyon ng ISO 8601:2004 date Time format. Maaaring kailanganin mo ang pinaikling bersyon nito, e.g., yyyMMd.
* M/d/yay H:mm:s. SSS — na humahawak ng mga petsang US-style at mga petsang "3/23/2017 16:22:03.000". Maaaring kailanganin mo ang pinaikling bersyon nito, e.g., M/d/yyy .
* yyyyDDDHmsSSS — na taon din bukod sa zero-padded na araw ng taon (e.g, 001 = Jan 1, 365 = Dis 31 sa isang non-leap year; ito kung minsan ay may kamaliang tinatawag na Julian date) . Maaaring kailanganin mo ang pinaikling bersyon nito, e.g., yyyDDDD .

#### Pag - iingat{#precision} 
Kapag kinumberte ng isang aklatan ng software ang isang.nctalaksang NCSV, lahat ng petsa Ang mga halaga ng panahon ay isusulat bilang Strings na may ISO 8601:2004 (E) petsa Time format, e.g., 1970-01-01T00:00:00Z . Maaari mong kontrolin ang katumpakan nitoERDDAP-specific attributetime\\_precision. Tingnan
[/docs/server-admin/datasets#time\\_precision](/docs/server-admin/datasets#time_precision).

#### Oras Zone{#time-zone} 
Ang default time zone para sa petsa Ang mga pamantayan ng panahon ang siyangZulu  (o GMT) sona ng oras, na walang pang - araw - araw na pagtitipid ng panahon. Kung ang dateTime variable ay may mga pamantayan sa petsa sa oras mula sa ibang sona ng oras, dapat mong tiyakin ito saERDDAP-specific attributetime\\_zone. Ito ay isang kahilingan para saERDDAP™( Tingnan
[/docs/server-admin/datasets#time\\_zone](/docs/server-admin/datasets#time_zone)).

### [Itakwil ang mga Pamantayan](#degree-values) {#degree-values} 

Gaya ng hinihiling ng CF, lahat ng mga pamantayan sa antas (e.g., para sa longhitud at latitud) ay dapat na i-degreyd bilang-degree dobleng halaga, hindi bilang isang degree[min'sec" String o bilang hiwalay na variables para sa mga digri, minuto, segundo. Ang mga tagadisenyo ng direksiyon na N, S, E, at W ay hindi pinapayagan. Gumamit ng negatibong mga pamantayan para sa West longitude at para sa South latitud.

## [DSG Mga Uri ng Katangian](#dsg-feature-types) {#dsg-feature-types} 

Ang isang talaksang NCSV ay maaaring maglaman ng CF Discrete Sampling Geometry
 ([ https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) datos. Ito ang mga katangian na gumagawa sa gawaing ito:

1. Gaya ng kahilingan ng CF, dapat isama sa talaksang NCSV ang isang linya sa bahaging metadata na nagpapakilala sa bahaging metadata[\\*GLOBYA\\*](#global) featureTypeHalimbawa, e.g.,
    \\*GLOBYA\\*,featureType,trajectory
2. Para magamitERDDAP™, dapat isama sa talaksang NCCSV ang isang linya o linya sa bahaging metadata na nagpapakilala sa f_role=...\\_id variables, e.g.,
barko,cf\\_role,trajectory\\_id
Ito ay opsyonal para sa CF, ngunit kinakailangan sa NCCSV.
3. Para magamitERDDAP™, dapat isama sa talaksang NCCSV ang isang linya o linya sa bahaging metadata na nagpapakilala kung aling mga variables ang nauugnay sa bawat timeSeries, trajectory, o profile ayon sa kinakailangan ng mga variablesERDDAP™( Tingnan
    [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)), e.g.,
    \\*GLOBYA\\*,cdm\\_trajectory\\_variables,"ship".
o
    \\*GLOBYA\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon".

## [Bulaang Sample](#sample-file) {#sample-file} 

Narito ang isang sampol na talaksan na nagpapakita ng marami sa mga tampok ng isang talaksang NCCSV:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.0"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.00
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testLong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-9223372036854775808L,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,-1234567890123456L,
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",0L,10.7
Bell M. Shimada,2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",1234567890123456L,99
Bell M. Shimada,2017-03-23T21:45:00Z,28.0003,-132.0014,\\u00fc,9223372036854775806L,10.0
Bell M. Shimada,2017-03-23T23:45:00Z,28.0002,-132.1591,,NaN
```
Mga Paunawa:

* Kabilang sa talaksang sampol na ito ang maraming mahihirap na kaso (e.g., char at mahabang variables at mahirap String mga halaga) . Karamihan sa mga talaksang NCSV ay magiging mas simple.
* Ang linya ng lisensiya ay nahahati sa dalawang linya dito, ngunit isa lamang linya sa sampol na talaksan.
* Ang \\u20AC ay ang  encoding ng karakter sa Euro at ang \\u00FC ay ang \\ ü.
* Marami Ang mga sting sa halimbawa ay nakapaloob sa pamamagitan ng mga dobleng quote bagaman ang mga ito ay hindi kailangang maging, e.g., maraming mga katangiang global kabilang ang pamagat, ang mga lon units na attribute, at ang ika-3 linya ng datos.)
* Magiging mas maliwanag at mas mabuti kung ang mga yunit na kabilang sa testLong variable ay isinulat sa dobleng mga sinipi na nagpapahiwatig na ito ay isang halagang String. Subalit ang kasalukuyang representasyon (1, walang mga sinipi) ay bibigyan ng tamang kahulugan bilang isang String, hindi isang integer, dahil walang 'i' hulapi.
* Di - tulad ng ibang uri ng datos na numeriko, ang mahahabang halaga sa bahaging datos ay may hulapi ('L') na nagpapakilala sa kanilang uri ng datos na numero. Ito ay kinakailangan upang maiwasan ang mga disheet mula sa pagpapakahulugan ng mga halaga bilang lumulutang na mga numero ng punto at sa gayon ay mawalan ng prekwensiya.

## [Paglaganap ng mga "Sheet "](#spreadsheets) {#spreadsheets} 

Sa isang diffesheet, gaya sa isang talaksang NCSV:

* Isulat ang mga halaga ng numeric attribute ayon sa pagkakasunud - sunod ng NCCSV files (e.g., na may hulaping titik, e.g., 'f', upang makilala ang data type ng attribute) .
* Sa Strings, isulat ang lahat ng karakter na mas mababa sa ASCII character #32 o mas malaki sa character #126 bilang alinman sa isang JSON-tulad ng backsladed character (e.g.,\\npara sa newline) o bilang numero ng karakter na hexadecimal Unicode (kasong walang pakiramdam) sa pamamagitan ng pagdurugtong[\\u *hhhh* ](#uhhhh)  (e.g., \\u20AC para sa Euro sign) . Gamitin\\n  (2 tauhan: backslash at 'n ') upang ipahiwatig ang isang bagong linya, hindi ang Alt Enter.

Ang tanging pagkakaiba sa pagitan ng mga talaksang NCSV at ng analogous disheet na kasunod ng mga kombensiyong ito ay:

* Ang mga talaksang NCCSV ay may mga halaga sa isang linya na pinaghihiwalay ng mga comma.
Ang mga kumakalat ay may mga halaga sa isang linya sa katabing mga selula.
* Ang mga tali sa mga talaksang NCCSV ay kadalasang napaliligiran ng mga dobleng quote.
Ang mga tali sa mga disheet ay hindi kailanman napaliligiran ng dobleng mga sinipi.
* Internasyunal na dobleng mga sinipi (") sa Strings sa NCCSV files ay lumilitaw bilang 2 double quotes.
Ang panloob na dobleng mga sinipi sa mga disheet ay lumilitaw bilang 1 double quote.

Kung ang isang explacesheet kasunod ng mga kumbensiyong ito ay natitipid bilang isang CSV file, kadalasang magkakaroon ng mga ekstrang komma sa dulo ng marami sa mga linya. Ang software na gumagawa sa mga file ng NCCSV.ncang karagdagang mga komma.

### [Excel](#excel) {#excel} 

Upang mag-angkat ng isang talaksang NCSV sa Excel:

1. Pumili ng talaksan : Buksan .
2. Palitan ang file type sa Text Files (\\*.prn;\\*.txt; \\*.csv) .
3. Hanapin ang mga direktoryo at pindot sa talaksang NCCSV .csv.
4. Click Open .

Upang lumikha ng isang talaksang NCSV mula sa isang excel disheet:

1. Piliin ang talaksan : Iligtas Bilang .
2. Palitan ang Save bilang tipo: upang maging CSV (Pinagbibidahan)   (\\*.csv) .
3. Bilang tugon sa babala ng compatibility, tuldik Oo .
4. Ang nasabing talaksang .csv ay magkakaroon ng ekstrang mga komma sa dulo ng lahat ng mga hanay maliban sa mga hanay ng CSV. Maaari mong ipagwalang - bahala ang mga ito.

Sa Excel, ang sampol na talaksang NCSV sa itaas ay lumilitaw gaya ng makikita

![sampolExcel.png](/img/sampleExcel.png)

### [Google Sheets](#google-sheets) {#google-sheets} 

Upang mag-angkat ng isang talaksang NCSV sa Google Sheets:

1. Pumili ng talaksan : Buksan .
2. Pumili na i-upload ang isang file at i-upload ang isang file mula sa iyong computer . Pumili ng file, pagkatapos ay i- click Open .
      
O, piliin ang My Drive at palitan ang file type drop down selection sa All file types . Pumili ng file, pagkatapos ay i- click Open .

Upang lumikha ng isang talaksang NCSV mula sa isang Google Sheetsheet:

1. Piliin ang talaksan : Iligtas Bilang .
2. Palitan ang Save bilang tipo: upang maging CSV (Pinagbibidahan)   (\\*.csv) .
3. Bilang tugon sa babala ng compatibility, tuldik Oo .
4. Ang nasabing talaksang .csv ay magkakaroon ng ekstrang mga komma sa dulo ng lahat ng mga hanay maliban sa mga hanay ng CSV. Huwag silang pansinin.

## [Mga Problema/Babala](#problemswarnings) {#problemswarnings} 

* Kung lumilikha ka ng isang file ng NCCSV na may editor ng teksto o kung lumilikha ka ng isang analogous disheet sa isang programa ng diffsheet, ang editor ng teksto o ang programa ng disheet ay hindi susuri na tama ang pagsunod mo sa mga kombensiyong ito. Nasasa - iyo na ang sumunod nang wasto sa mga kombensiyong ito.
* Ang pagbabago ng isang disheet kasunod ng kombensiyong ito tungo sa isang talaksang csv (Kaya, isang talaksang NCSV) ay hahantong sa karagdagang mga komma sa dulo ng lahat ng hanay maliban sa mga hanay ng datos ng CSV. Huwag silang pansinin. Pagkatapos ay ginagawang NCCSV files ang software.ncipagwawalang - bahala ito ng mga talaksan.
* Kung ang isang talaksan ng NCCSV ay may labis na mga comma sa dulo ng mga hanay, maaari mo itong alisin sa pamamagitan ng pagkumberte sa talaksang NCCSV upang maging isangNetCDFtalaksan at pagkatapos ay binabago angNetCDFilagay muli sa talaksang NCCSV.
* Kapag sinisikap mong gawing isang talaksang NCSVNetCDFfile, ang ilang pagkakamali ay mapapansin ng software at lilikha ng mga maling mensahe, na nagiging sanhi ng pagkabigo ng konbersiyon. Ang ibang mga problema ay mahirap o imposibleng mahuli at hindi lilikha ng mga maling mensahe o babala. Iba pang problema (e.g., sobrang mga komma sa dulo ng mga hanay) ay ipagwawalang - bahala. Hindi gaanong susuriin ng file converter ang pagiging tama ng resultaNetCDFe.g., kung tungkol sa pagsunod ng CF. Pananagutan ng tagalikha ng file at file user na suriin na ang mga resulta ng konbersiyon ay ayon sa nais at tama. Ang dalawang paraan ng pagsusuri ay:
    * Ilimbag ang nilalaman ng.nctalaksang may ncdump
         ([ https://linux.die.net/man/1/ncdump ](https://linux.die.net/man/1/ncdump) ) .
    * Tingnan ang nilalaman ng datos saERDDAP.
