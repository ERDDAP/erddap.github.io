---
sidebar_position: 2
---

# Patnubay ng Programmer

Ang mga bagay na ito ay isa lamang tagaprograma na balak gumawang kasama niya ERDDAP ' Java kailangang malaman.

###  **Pagkuha ng Kodigong Pinagmumulan**  {#getting-the-source-code} 
   

  - Ang Kodigo ng Pinagmulan ng Via sa GitHub
Ang source code para sa kamakailang mga pampublikong bersyon at in-development na bersyon ay makukuha rin sa pamamagitan ng [GitHub](https://github.com/ERDDAP) . Pakisuyong basahin ang [Wiki](https://github.com/ERDDAP/erddap/wiki) para sa proyektong iyon. Kung gusto mong baguhin ang source code (at malamang na isinama sa pamantayan ang mga pagbabago ERDDAP™ pamamahagi) , ito ang iminungkahing paraan.

###  ** ERDDAP™ Mga dependensiya**  {#erddap-dependencies} 
 ERDDAP™ gumagamit ang Maven upang magkarga ng code dependencies gayundin ng ilang static reference files (WEB-INF/ref) . Ito'y ginagawa upang maiwasan ang pag - iimbak ng maraming malalaking file sa imbakan.
Maaari mong gamitin `mvn Tinipon` at iyan ay kukuha ng mga dependencies at ref files. Maaari mo ring gamitin `mvn pakete` upang lumikha ng isang talaksang pandigma.
Maaari mong i - download nang manu - mano ang mga talaksan ng ref:

  -  [etopo1\\_ice\\_g\\_i2 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) at i-unzip ito sa /WEB-INF/ref/ .

  -  [ref\\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) at i-unzip ito sa /WEB-INF/ref/ .

  -  [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (bersyon 1.0.0.0, 20333 bytes, MD5=2B8D2A5ED73E42B529C168C60B5, may petsang 2024-10-14) at itapon ito sa _tomcat_, na lumilikha _tomcat_/content/erddap .

TANE: Sa default Maven, ang cache static reference at test data archive ay mag-download at kukunin lamang ang mga ito kapag nadownload ang isang bagong bersyon. Upang lubusang maka - download, maaari mong itakda ang `Paglukso sa ResourceDownload` at/o `Pinakamaliit na ResourceDownload` Mga Katangian ng Maven (e.g. `Mvn -DskipResourceDownload pakete` ) . Upang puwersahin ang pagkuha, magtakda `-Ddownload.unpack=tunay` at `-Ddownload.unpack WhenChanged= false` .

-  ERDDAP™ At ang mga subcomponent nito ay may napakaliberal, bukas-oras [mga lisensiya](/license) , upang magamit at mabago mo ang source code sa anumang layunin, for-profit o hindi-for-profit. Pansinin na ERDDAP™ at maraming subcomponent ang may lisensiya na humihiling na kilalanin mo ang pinagmumulan ng kodigo na iyong ginagamit. Tingnan [Mga Papuri](/credits) . Kahilingan man o hindi, mabuting anyo lamang na kilalanin ang lahat ng mga abuloy na ito.
  

-  **Gamitin ang Kodigo sa Ibang Proyekto** 

Samantalang ikaw ay tinatanggap na gamitin ang mga bahagi ng mga ito ERDDAP™ kodigo para sa ibang proyekto, dapat babalaan na ang kodigo ay maaari at magbabago. Hindi tayo nangangakong susuportahan natin ang ibang gamit ng ating kodigo. Git at GitHub ang magiging pangunahing solusyon mo sa pagharap dito -- pinahihintulutan ka ni Git na pagsamahin ang ating mga pagbabago sa iyong mga pagbabago.
   **Para sa maraming situwasyon kung saan maaari kang matuksong gamitin ang ilang bahagi ng katawan ERDDAP™ sa inyong proyekto, sa palagay namin ay magiging mas madali para sa iyo na magkabit at gumamit ERDDAP™ sa ngayon,** at saka isulat ang iba pang serbisyo na ginagamit ERDDAP ' Mga serbisyo. Maaari kang magtayo ng iyong sariling bahay ERDDAP™ Ikabit ng bastos sa loob ng isa o dalawang oras. Maaari kang magtayo ng iyong sariling bahay ERDDAP™ naka-install sa pinakintab na paraan sa loob ng ilang araw (depende sa bilang at kasalimuutan ng iyong datasets) . Subalit ang pag - aalis ng mga bahagi ng katawan ERDDAP™ para sa iyong sariling proyekto ay malamang na tumagal ng ilang linggo (at mga buwan upang mahuli ang mga tusong bagay) at mawawalan ka ng kakayahang ilakip ang mga pagbabago at mga bug fix mula sa susunod ERDDAP™ ang inilabas. Kami (Maliwanag) isipin na maraming pakinabang sa paggamit ERDDAP™ at gawin ang iyong sarili ERDDAP™ pagluluklok sa publiko na madaling makuha. Gayunman, sa ilang kalagayan, baka ayaw mong gawin ang iyong ERDDAP™ pagluluklok sa publiko na madaling makuha. Pagkatapos, ang iyong paglilingkod ay maaaring pumasok at gamitin ang iyong pribadong paglilingkod ERDDAP™ at hindi kailangang malaman ng iyong mga kliyente ang tungkol sa ERDDAP™ .

  ####  **Kalahati** 

O, may isa pang paraan na maaaring masumpungan mong kapaki - pakinabang na nasa pagitan ng pag - aaral ERDDAP ' kodigo at paggamit ERDDAP™ bilang isang stand-alone web service: Sa klase ng EDD, may static method na nagpapangyari sa iyo na gumawa ng isang halimbawa ng isang dataset (batay sa paliwanag datasets.xml ) :
`one Mula sa Dataset Xml (String tDatasetID) 
` Ito ay nagbabalik ng isang halimbawa ng isang EDDTable o EDDGrid datos. Kung isasaalang - alang ang halimbawang iyan, maaari kang tumawag ng\\
`MakeNewFileForDapQuery (String userDapQuery, String dir, String fileName, String file " TypeName ") 
`to ay nagsasabi sa pagkakataon na gumawa ng isang data file, ng isang espisipikong fileType, na may mga resulta mula sa isang user query. Kaya, ito ay isang simpleng paraan ng paggamit ERDDAP 'Ang mga paraan upang humiling ng datos at kumuha ng file bilang tugon, kung paanong gagamitin ng kliyente ang ERDDAP™ web application. Subalit ang paraang ito ay gumagana sa loob mo Java programa at nilalampasan ang pangangailangan para sa application server tulad ng Tomcat. Ginagamit namin ang pamamaraang ito para sa maraming pagsubok sa yunit ng EDDTable at EDDGrid Mga subclass, upang makita mo ang mga halimbawa nito sa source code para sa lahat ng mga klaseng iyon.

###  **Pag - unlad ng Kapaligiran**  {#development-environment} 

  - May mga kaayusan para sa [Pangit](https://github.com/ERDDAP/erddap/blob/main/development/jetty) at [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) sa GitHub, bagaman inaasahang tatakbo ang mga release sa Tomcat.

  -  **Mapagpipilian** : Nagtayo ERDDAP™ sa Tomcat\\
Mula Noon ERDDAP™ ay pangunahin nang nilayon upang maging isang servlet na tumatakbo sa Tomcat, mahigpit naming inirerekomenda na sundin mo ang pamantayan [maglagay ng mga tagubilin](/docs/server-admin/deploy-install) upang i-install ang Tomcat, at i-install ERDDAP™ sa webapps directory ni Tomcat. Kabilang sa iba pang mga bagay, ERDDAP™ ay dinisenyo upang i-install sa directory struct ng Tomcat at inaasahan Tomcat na magbigay ng mga ilang .jar files.

  -  ERDDAP™ ay hindi nangangailangan ng espisipikong IDE (Pangunahing ginagamit ni Chris ang Visual Studio Code, ginamit ni Bob ang EditPlus) . Hindi natin ginagamit ang Eclipse, Ant, atbp.; ni nag-aalok man tayo ERDDAP - kaugnay na suporta para sa kanila. Ang proyekto ay talagang gumagamit ng Maven.

  - Gumagamit kami ng talaksan na nag - aalis ng lahat ng .class files sa punong pinagmulan upang matiyak na mayroon kaming malinis na koleksiyon (kasama ng javac) .

  - Kasalukuyan naming ginagamit ang javac jdk-25.0.1+8 upang tipunin ang gov.noaa.pfeg.coastwatch.Test All (ito ay may mga link sa ilang klase na hindi iipon kung hindi) at tapusin ang mga pagsubok. Para sa seguridad, halos laging pinakamabuting gamitin ang pinakabagong mga bersiyon ng Java 25 at Tomcat 10.

    - Kapag nagpapatakbo tayo ng javac o java, ang kasalukuyang directory ay _tomcat_/webapps/erddap/WEB-INF .

    - Ang aming javac at java classpath ay
       `mga klase;././lib/servlet-api.jar; lib/*` 

    - Kaya ang iyong javac command line ay magiging gaya ng\\
       `javac-encoding UTF-8-cp classs;./././lib/servlet-api.jar; lib/* klase/gov/noa/pfel/coastwatch/Test All.java` 

    - At ang iyong juva command line ay magiging gaya ng\\
`java -cp klases;./././lib/servlet-api.jar; lib/* -Xmx4000M -Xms4000M -Xms4000 mga klase/gov/noa/pfel/coastwatch/Test All
       `Optional: puwede mong idagdag` -verbose:gc`, na nagsasabi Java upang mag - imprenta ng estadistika ng pangongolekta ng basura.

    - Kung Subukin Lahat ay nagtitipon, lahat ay ERDDAP™ ang mga pangangailangan. May ilang klase na hindi naman kailangan para sa ERDDAP™ . Kung ang Pagtitipon ng Test All ay magtatagumpay ngunit hindi nakatipon ng ilang klase, ang klaseng iyon ay hindi na kailangan. (May ilang mga hindi tapos/unusadong klase.) 

  - Sa ilang kaso, gumagamit kami ng 3rd party source code sa halip na .jar files (Partikular na para sa DODS ) at bahagyang binago ang mga ito upang maiwasan ang mga problema sa pagtitipon Java 25. (Partikular na sa DODS ) sa iba pang mga dahilan.

  - Karamihan sa mga klase ay may mga paraan ng pagsubok sa kanilang kaugnay na talaksang src/test. Maaari mong patakbuhin ang JUnit tests sa pamamagitan ng `mvn test` Iutos. Ito ay mag-download ng ilang mga talaksan ng zip ng datos na ang mga pagsubok ay umaasa mula sa pinakabagong release ng [ ERDDAP /erddap Pagsubok](https://github.com/ERDDAP/erddapTest/releases/) .\\
     
TANO: Naka - download ang mga cache ng Maven pero hindi pa nai - download ang naka - download na mga arkibo sa bawat pagpatay, na nangangailangan ng panahon. Para maka - download
at kung hindi ka babasa ng test data archive, maaari mong tiyakin ang `Pinakamaliit na ResourceDownload` pag - aari ni Maven (e.g. `Mvn -DskipTestResourceDownload pakete` ) .

###   **Mahahalagang Klase**  {#important-classes} 

Kung nais mong tingnan ang pinagmulang kodigo at alamin kung paano ERDDAP™ ay gumagana, pakisuyong gawin.

  - Ang kodigo ay may Java Doc ay nagkokomento, subalit ang Java Hindi pa nalilikha ang mga doc. Malayang likhain ang mga ito.

  - Ang pinakamahalagang mga klase (pati na ang mga binanggit sa ibaba) ay nasa loob ng gov/noa/pfel/erddap.

  - Ang ERDDAP™ Ang klase ang may pinakamataas na pamamaraan. Umaabot ito ng httpServlet.

  -  ERDDAP™ ang mga kahilingan sa mga kalagayan ng mga subklase ng EDDGrid o EDDTable, na kumakatawan sa indibiduwal na mga dataset.

  - Ang EDStetic ang karamihan sa static na impormasyon at mga setting (e.g., mula sa setup.xml at mga mensahe.xml files) at nag - aalok ng static services (e.g., nagpapadala ng email) .

  -  EDDGrid at EDDTable subclass i-parse ang kahilingan, kumuha ng datos mula sa mga subclass-specific na pamamaraan, pagkatapos ay buuin ang data para sa tugon.

  -  EDDGrid Ang mga subclass ay nagtutulak ng mga datos sa GridDataAccesor (ang panloob na lalagyan ng datos para sa nakatiklop na datos) .

  - Ang EDDTable subclass ay nagtutulak ng datos sa Table Writer subclass, na nagsusulat ng datos sa isang espesipikong file type sa-the-fly.

  - Iba pang klase (e.g., mababang klase) ay mahalaga rin, subalit malamang na hindi mo ito mababago.
     

###  **Pag - aabuloy ng Kodigo**  {#code-contributions} 

- Mga Isyu Tungkol sa GitHub
Kung gusto mong mag - abuloy pero wala kang proyekto, tingnan ang listahan ng mga [Mga Isyu Tungkol sa GitHub](https://github.com/ERDDAP/erddap/issues) , marami sa mga ito ay mga proyektong maaari mong gawin. Kung nais mong lutasin ang isang isyu, pakisuyong atasan mo ang iyong sarili na ipahiwatig ito sa iba na ginagawa mo. Ang isyu ng GitHub ang pinakamagandang lugar para pag - usapan ang anumang tanong kung paano gagawin ang isyung iyon.

- Kung ang pagbabagong nais mong gawin ay isa sa mga karaniwang kaso sa ibaba, pakisuyong lumikha ng isang pagbabago [Isyu Tungkol sa GitHub](https://github.com/ERDDAP/erddap/issues) Nagpapahiwatig ng pagbabagong binabalak mong gawin. Pagkatapos, kapag natapos na ang pagbabago, hilingin ang pagsasama. Kasali sa karaniwang mga pagbabago ang:

  - Nais mong sumulat ng isa pang subclass ng EDDGrid o EDDTE upang pangasiwaan ang ibang uri ng impormasyon. Kung gayon, iminumungkahi namin na hanapin mo ang pinakamalapit na umiiral na mga subclass at gamitin ang kodigong iyon bilang pasimula.

  - Nais mong sumulat ng isa pang paraan ng pag - iingat na AS_FileType_. Kung oo, iminumungkahi namin na hanapin mo ang pinakamalapit na umiiral na paraan ng pagliligtas na As_FileType_ EDDGrid o EDDTable at gamitin ang kodigong iyon bilang pasimula.

Ang mga sitwasyong iyon ay may kalamangan na ang kodigong isinusulat mo ay self-contained. Hindi mo na kailangang malaman ang lahat ng detalye ng ERDDAP ' Mga panloob. At magiging madali para sa atin na ilakip ang iyong kodigo ERDDAP . Pansinin na kung ikaw ay maghuhulog ng kodigo, ang lisensiya ay mangangailangang sumang - ayon sa kodigo ERDDAP™   [lisensiya](/license)   (e.g., [Apache](https://www.apache.org/licenses/) , [BSD](https://www.opensource.org/licenses/bsd-license.php) , o [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Itatala namin ang inyong kontribusyon sa [Mga kredito](/credits) .

- Kung mayroon kang isang bahagi na hindi sinasaklaw sa itaas na nais mong idagdag ERDDAP , iminumungkahi na gumawa muna ng isang sinulid sa talakayan [Mga Talakayan Tungkol sa GitHub](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . Para sa mga mahahalagang katangian/pagbabago sa Technical Board ay tatalakayin ang mga ito at magpapasiya kung sasang-ayon sa pagdaragdag nito ERDDAP™ .

###  **Paghatol sa Iyong mga Iniabuloy na Kodigo**  {#judging-your-code-contributions} 
Kung gusto mong magsumite ng code o iba pang pagbabago ERDDAP , maganda iyan. Kailangang matugunan ng inyong abuloy ang ilang pamantayan upang tanggapin. Kung susundin mo ang mga tuntunin sa ibaba, malaki ang posibilidad na tanggapin ang iyong kontribusyon.
   

  - Ang ERDDAP™ Ang proyekto ay pinangangasiwaan ng NATD ( NOAA Hinirang na Technical Director) na may input mula sa isang Technical Board.
Mula 2007 (pasimula ng ERDDAP ) hanggang 2022, iyon ay si Bob Simons (Ang Tagapagtatag-Leader din) . Simula noong Enero 2023, iyon ay si Chris John. Pangunahin na, ang NATD ang may pananagutan sa NATD ERDDAP , kaya ang s/siya ang may huling salita sa mga desisyon tungkol sa ERDDAP™ Ang kodigo, lalo na tungkol sa disenyo at kung tatanggapin o hindi ang isang ibinigay na kahilingan ng hila. Kailangang maging ganito ang isang bahagi para sa mahusay na mga dahilan (Mabisa ito para sa Linus Torvalds at Linux) at ang isang dahilan ay: Kailangang may magsabi sa IT seguridad ng mga tao na ang s/siya ang may pananagutan sa seguridad at integridad ng kodigo.
     

  - Ang NATD ay hindi gumagarantiya na ang s/siya ay tatanggap ng iyong kodigo.
Kung ang isang proyekto ay basta hindi gumagana na gaya ng inaasahan namin at kung hindi ito masasagip, hindi isasama ng NATD ang proyekto sa ERDDAP™ pamamahagi. Pakisuyong huwag kang malungkot. Kung minsan ang mga proyekto ay hindi gumagana na gaya ng inaasahan. Nangyayari ito sa lahat ng mga developer ng software. Kung susundin mo ang mga tagubilin sa ibaba, mas malaki ang tsansa mong magtagumpay.
     

  - Pinakamabuti kung ang mga pagbabago ay pawang kawili - wili at kapaki - pakinabang.
Kung ang kodigo ay espesipiko sa iyong organisasyon, malamang na pinakamabuting panatilihin ang isang hiwalay na sangay ng ERDDAP™ para sa inyong gamit. Ginagawa ito ni Axiom. Mabuti na lamang, madaling gawin ito ni Git. Nais ng NATD na mapanatili ang isang hindi nagbabagong paningin para sa ERDDAP , huwag hayaang ito ay maging isang proyekto ng lababo sa kusina kung saan ang lahat ay nagdaragdag ng isang kaugalian na tampok para sa kanilang proyekto.
     

  - Sundan ang Java Mga Kombensiyon ng Kodigo.
Sa pangkalahatan, ang iyong kodigo ay dapat na maging mabuting katangian at dapat sundin ang orihinal [ Java Mga Kombensiyon ng Kodigo](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : maglagay ng mga talaksang .class sa tamang lugar sa istraktura ng directory, bigyan ng angkop na pangalan ang mga talaksang .class, isama ang angkop na pangalan Java Doc comments, isama ang //comments sa simula ng bawat parapo ng code, indent sa 4 na espasyo (hindi tab) , iwasan ang mga linya &gt;80 karakter, atbp. Ang mga kombensiyon ay nagbabago at ang kodigo ng pinagmulan ay laging lubusang nagbabago hanggang sa kasalukuyan. Kapag nag - aalinlangan, itugma ang kodigo sa mga kombensiyon at hindi ang umiiral na kodigo.

- Gumamit ng uring naglalarawan, pamamaraan at iba't ibang pangalan.
Kaya naman mas madaling basahin ang kodigo.
   

- Iwasan ang mamahaling kodigo.
Sa dakong huli, ikaw o ang ibang tao ay kailangang magsuri ng kodigo upang mapanatili ito. Kaya pakisuyong gumamit ng simpleng mga pamamaraan sa pag - aalaga ng baka na mas madali para sa iba (kasama ka sa hinaharap) upang malaman. Maliwanag, kung may tunay na bentaha sa paggamit ng isang guniguni Java Ang programming feature, gamitin ito, ngunit malawak na dokumento kung ano ang ginawa mo, bakit, at kung paano ito gumagana.
   

- Makipagtulungan sa Technical Board bago ka magsimula.
Kung gusto mong baguhin ang iyong code ERDDAP™ , Tiyak na nanaisin ng The Technical Board na pag - usapan kung ano ang gagawin mo at kung paano mo gagawin ito bago ka gumawa ng anumang pagbabago sa kodigo. Sa gayon, maiiwasan ka naming gumawa ng mga pagbabago na hindi tinatanggap ng NATD. Kapag ginagawa mo ang gawain, ang NATD at Technical Board ay handang sumagot sa mga tanong upang tulungan kang maunawaan ang umiiral na kodigo at ang Technical Board (sa kabuuan) kung paano gagawin ang iyong proyekto.
   

- Gumawang mag - isa (hangga't maaari) pagkatapos mong magsimula.
Kabaligtaran ng nabanggit sa itaas na "Magsikap sa Technical Board", pagkatapos mong simulan ang proyekto, hinihimok ka ng NATD na gumawa nang independiyente hangga't maaari. Kung sasabihin sa iyo ng NATD ang halos lahat ng bagay at sasagutin ang maraming tanong (lalo na yaong maaari mong nasagot sa pamamagitan ng pagbabasa ng dokumento o ng kodigo) , kung gayon ang iyong mga pagsisikap ay hindi isang panahon ng pagtitipid para sa NATD at s/siya ay maaaring mahusay na gawin ang trabaho ito sa sarili. Ito ang [Ang Haka - hakang Tao](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problema. Mangyari pa, dapat pa rin tayong makipagtalastasan. Makabubuting sa pana - panahon ay makita ang inyong gawain na isinasagawa upang matiyak na ang proyekto ay nasa direksiyon. Subalit mientras ikaw ay makagagawa nang mag - isa (pagkatapos sumang - ayon ang Technical Board sa kasalukuyang atas at sa pangkalahatang pamamaraan) , mas mabuti.
   

- Iwasan ang mga insekto.
Kung ang isang bug ay hindi mahuli bago ilabas, ito ay nagdudulot ng mga problema sa mga gumagamit nito (pinakamabuti) , ibalik ang maling impormasyon (pinakamasama) , ay isang dungis sa ERDDAP 'Kakilalahan, at mananatili sa out-of-date ERDDAP™ mga instalasyon sa loob ng mga taon. Magsikap nang husto upang maiwasan ang mga insekto. Bahagi nito ang pagsulat ng malinis na kodigo (kaya mas madaling makita ang mga problema) . Bahagi nito ang mga pagsubok sa unit ng pagsusulat. Bahagi nito ang palaging pag - iwas sa insekto kapag sumusulat ka ng kodigo. Huwag mong panghihinayangan ang NATD sa pagdaragdag ng iyong kodigo ERDDAP™ .
   

- Sumulat ng isang unit test o tests.
Para sa bagong kodigo, dapat mong isulat ang JUnit tests sa isang test file.
Pakisuyong sumulat ng kahit isang indibiduwal na paraan ng pagsubok na lubusang sumusubok sa kodigo na iyong isinusulat at idagdag ito sa JUnit test file ng klase upang ito ay kusang mapatakbo. Pagkakaisa (at nauugnay) Ang mga pagsubok ay isa sa pinakamabuting paraan upang mahuli ang mga insekto, sa simula, at sa kalaunan (habang nagbabago ang ibang bagay ERDDAP™ ) . Gaya ng sinabi ni Bob, "Unit tests ang dahilan kung bakit ako natutulog sa gabi."
   

- Gawing madali para sa NATD na maunawaan at tanggapin ang mga pagbabago sa iyong hiling.
Ang bahagi niyan ay ang pagsulat ng isang unit test method (s) . Bahagi nito ang pagtatakda ng iyong mga pagbabago sa isang bahagi ng kodigo (o isang klase) kung maaari. Hindi tatanggapin ng NATD ang anumang kahilingan sa paghila na may daan-daang pagbabago sa buong kodigo. Ang NATD ay nagsasabi sa IT seguridad ng mga tao na ang s/he ay kumukuha ng responsibilidad sa seguridad at integridad ng kodigo. Kung napakaraming pagbabago o napakahirap unawain ang mga ito, napakahirap matiyak ang mga pagbabago ay tama at huwag maglagay ng mga bug o mga isyu sa seguridad.
   

- Panatilihin itong simple.
Ang isang mabuting pangkalahatang tema para sa iyong kodigo ay: Panatilihin itong simple. Ang simpleng kodigo ay madali para sa iba (kasama ka sa hinaharap) upang basahin at mapanatili. Madaling maunawaan at sa gayon ay tanggapin ng NATD.
   

- Isipin ang pangmatagalang pananagutan sa iyong kodigo.
Sa dakong huli, pinakamabuti kung aakuin mo ang patuloy na pananagutan na panatilihin ang iyong kodigo at sagutin ang mga tanong tungkol dito (e.g., nasa ERDDAP™ Grupong Google) . Gaya ng binabanggit ng ilang awtor, ang kodigo ay isang pananagutan at isang bagay na mahalaga. Kung matuklasan ang isang bug sa hinaharap, pinakamabuti kung aayusin mo ito sapagkat walang sinuman ang higit na nakaaalam ng iyong kodigo kaysa iyo (Upang magkaroon din ng pangganyak na iwasan ang mga insekto) . Ang NATD ay hindi humihingi ng matatag na pangako na maglaan ng patuloy na pagpapanatili. Sinasabi lamang ng NATD na ang paggawa ng mantensiyon ay lubhang pahahalagahan.
