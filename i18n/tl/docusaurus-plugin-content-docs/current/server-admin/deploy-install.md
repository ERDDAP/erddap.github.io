---
sidebar_position: 1
---

# Iluklok
Kung Paano Gagawin ang Unang Seksyon ERDDAP™ sa Iyong Server

 ERDDAP™ ay maaaring tumakbo sa anumang server na sumusuporta Java at ang Tomcat (at iba pang aplikasyon na gaya ni Jetty, pero hindi namin sila sinusuportahan) .
 ERDDAP™ ay sinubok sa Linux (kasama ang AWS ng Amazon) , Mac, at Windows computers.

*  **Docker** -- Nagbibigay tayo [ ERDDAP™ sa isang Docker container](https://hub.docker.com/r/erddap/erddap) 
at si IOOS ngayon ay nag - aalok ng isang [Mabilis na Patnubay sa Pasimula ERDDAP™ sa Isang Docker Conter](https://ioos.github.io/erddap-gold-standard/index.html) .
Ito ang pamantayan ERDDAP™ pag-install, sa isang Docker container.
Sa Pamamagitan ng Docker Compose ay naglalaan kami ng madaling mga paraan upang gumawa ng sstl at pagsubaybay, magbasa pa nang higit [Docker dokumentasyon](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Kung gumagamit ka na ng Docker, malamang na mas gugustuhin mo ang bersiyong Docker.
Kung nais mong tumakbo sa mga serbisyo ng ulap malamang na mas gusto mo ang bersiyong Docker.
*  **Amazon** -- Kung naka-install ka ERDDAP™ sa isang Web Services EC2 halimbawa, tingnan ito [Sobrang Obserbasyon ng Web Services ng Amazon](/docs/server-admin/additional-information#amazon) Una.
*  **Linux at Macs** -- ERDDAP™ sa Linux at Mac na mga computer. Tingnan ang mga tagubilin sa ibaba.
*  **Windows** -- Mainam ang Windows para sa pagsubok ERDDAP™ at para sa personal na gamit (tingnan ang mga tagubilin sa ibaba) ,
ngunit hindi namin inirerekomenda ang paggamit nito para sa publiko ERDDAP™ Paglalagay. Pagtakbo ERDDAP™ sa Windows ay maaaring may mga problema:
Kapansin - pansin, ERDDAP™ ay maaaring hindi matanggal ang mga talaksang delete at/o ang mga talaksang may maling pangalan nang mabilis. Ito marahil ay dahil sa antivirus software
   (e.g., mula sa McAfee at Norton) na sumusuri sa mga file para sa mga virus. Kung mapaharap ka sa problemang ito
(na makikita sa maling mga mensahe sa [log.txt](/docs/server-admin/additional-information#log) talaksang tulad ng
"Unang mag-delete ..."), ang pagbabago ng mga setting ng antivirus software ay maaaring bahagyang maibsan ang problema. O sa halip ay isaalang - alang ang paggamit ng isang Linux o Mac server.

 **Ang pamantayan ERDDAP™ Ang mga instruksiyon para sa mga computer sa Linux, Macs, at Windows ay:** 

0. Tiyakin na ang anumang dependensiya ay naka-install. Sa mga makinang di-Windows (Linux at Mac) , kailangan mo ng csh.

##  Java  {#java} 

1.  [Sapagkat ERDDAP™ v2.19+, itinayo Java 21.](#java) 
Para sa seguridad, halos laging pinakamabuting gamitin ang pinakabagong bersiyon ng Java 21.
Paki-download at i-install ang pinakabagong bersyon ng
    [Ang OpenJDK ng Pag - aampon (Temurin) 21 (MGA LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Upang matiyak ang instalasyon, patakbuhin ang `/javaJreBin Direktory/java - Conversion`, halimbawa,
`/usr/local/jdk-21.0.3+9/jre/bin/java - Paglipat`.

    ERDDAP™ gumagawang kasama ng Java mula sa ibang pinagmulan, ngunit inirerekomenda namin ang Ampon dahil ito ang pangunahin, pampamayanang-suporta,
malaya (gaya ng sa serbesa at pagsasalita) bersyon ng Java 21 na nagbibigay ng Pangmatagalang Suporta (malayang mga upgrade sa loob ng maraming taon pagkatapos ng panimulang paglabas) .
Para sa seguridad, pakisuyong i-update ang iyong ERDDAP 'Ang bersiyon ng Java Sa pana - panahon bilang bagong mga bersiyon ng Java 21 ang makukuha mula sa Repsium.

    ERDDAP™ ay sinubok at malawakang ginamit na may 21, hindi ang ibang bersiyon. Sa iba't ibang kadahilanan, hindi natin sinusubok ni sinusuportahan man ang ibang bersiyon ng Java .
     
## Tomcat{#tomcat} 

2.  [Magtakda](#tomcat)   [Tomcat](https://tomcat.apache.org) . Ang Tomcat ang pinakamalawak na ginagamit Java Tagapagsilbi,
alin ang Java software na nakatayo sa pagitan ng mga serbisyong network ng operating system at Java software na server tulad ng ERDDAP™ .
Ito ay Malaya at Open Software (MGA FOS) .

Maaari mong gamitin ang isa pa Java Tagapagsilbi (e.g., Jetty) , ngunit sinusubok lamang namin at sinusuportahan si Tomcat.

   * I-download Tomcat at i-track ito sa iyong server o PC.
Para sa mga kadahilanang panseguridad, halos laging pinakamabuting gamitin ang pinakabagong bersiyon ng Tomcat 10 (bersyon 9 at sa ibaba ay hindi tanggap) 
na dinisenyo upang gumawang kasama ng Java 21 o mas bago. Sa ibaba, ang Tomcat directory ay tatawaging `tomcat`.

_Warning&#33;____ Kung mayroon ka nang Tomcat na nagpapatakbo ng iba pang aplikasyon sa web (lalo nang MGA THEDD) , inirerekomenda namin na maglagay kayo ERDDAP™ sa loob
      [ikalawang Tomcat](/docs/server-admin/additional-information#second-tomcat) , dahil ERDDAP™ kailangan ng iba't ibang Tomcat setting
at hindi dapat na makipagtalo sa iba pang aplikasyon para sa memorya.

     * Sa Linux, [I-download ang "Core" "tar" .gz " Pamamahagi ng Tomcat](https://tomcat.apache.org/download-10.cgi) at binuksan ito.
Iminumungkahi namin ang pagbuklat nito sa `/usr/local`.
     * Sa isang Mac, si Tomcat ay malamang na naka-install na sa `/Library/Tomcat`, ngunit dapat i-update ito sa pinakabagong bersyon ng Tomcat 10.
Kung kukunin mo ito, [I-download ang "Core" "tar" .gz " Pamamahagi ng Tomcat](https://tomcat.apache.org/download-10.cgi) at i-unlock ito sa `/Library/Tomcat`.
     * Sa Windows, maaari mong gawin [I-download ang "Core" "zip" Tomcat distribution](https://tomcat.apache.org/download-10.cgi) 
        (Na hindi nakakaabala sa Windows register at na kontrolado mo sa isang DOS command line) at binuksan ito sa isang angkop na directory.
        (Para sa pag-unlad, ginagamit natin ang "Core" na "zip" na pamamahagi. Gumagawa kami ng `/programs` directory at binubuksan ito roon.) 
O maaari mong i-download ang "Core" "64-bit Windows zip" distribution, na kinabibilangan ng higit pang mga katangian.
Kung ang distribusyon ay isang Windows installer, malamang na ilagay nito ang Tomcat, halimbawa, `/Program Files/apache-tomat-10.0.23`.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - Sa talaksang `tomcat/conf/server.xml`, may dalawang pagbabago na dapat mong gawin sa bawat isa sa dalawang ` <Connector> ` tags
   (isa para sa `&lt;Connector port="8080"` at isa para sa `&lt;Conector port="8443"`) .
   1.  (Inirerekomenda) Dagdagan ang `connectionTimeout` parameter, marahil hanggang 300000 (Mga millisecond, na 5 minuto) .
   2.  (Inirerekomenda) Magdagdag ng bagong parameter: `relaxedQueryChars="[] | "`. Ito ay opsyonal at bahagyang hindi matatag,
ngunit inaalis ang pangangailangan para sa mga tagagamit na maging porsyento-encode ang mga karakter na ito kapag nangyari ito sa parameter ng kahilingan ng tagagamit na URL.
             
### nilalaman.xml{#contentxml} 

* konteksto.xml -- Yaman Cache - In `tomcat/conf/context.xml`, sa mismong harap ng `Tomcat/conf/context.xml`, sa mismong harapan ng ` </Context> ` tag, palitan ang tag ng Yaman
   (o idagdag kung wala na ito) upang ayusin ang cache MaxSize parameter hanggang 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Iniiwasan nito ang maraming babala sa catalina. na ang lahat ay magsimula sa
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Panahon ng Apache{#apache-timeout} 

* Sa mga computer na Linux, baguhin ang mga timeout setting ng Apache upang ang time-consumting user requests ay huwag mag-timeout
   (na kadalasang lumilitaw bilang isang "Proxy" o "Bad Gateway" error) . Bilang tagagamit ng ugat:
  * Pasimplehin ang Apache ` http d.conf` file (karaniwang nasa `/etc/ http d/conf/ `) :
    * Palitan ang umiiral na ` <Timeout> ` setting (o magdagdag ng isa sa dulo ng talaksan) hanggang 3600 (mga segundo) , sa halip ng default 60 o 120 segundo.
    * Palitan ang umiiral na ` <ProxyTimeout> ` setting (o magdagdag ng isa sa dulo ng talaksan) hanggang 3600 (mga segundo) , sa halip ng default 60 o 120 segundo.
  * Restart Apache: `/usr/sbin/apachectl -k Maganda ` (ngunit kung minsan ito ay nasa ibang directory) .

### Katiwasayan{#security} 
         
* Mungkahing panseguridad: Tingnan [Ang mga tagubiling ito](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) upang dagdagan ang seguridad ng
ang iyong instalasyon ng Tomcat, lalo na para sa mga pampublikong server.
         
* Para sa publiko ERDDAP™ Mga instalasyon sa Linux at Macs, pinakamabuting itayo ang Tomcat (ang programa) kabilang sa gumagamit ng `tomcat `
   (isang hiwalay na tagagamit na may limitadong pahintulot at alin ang [walang password](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Kaya, tanging ang super user lamang ang maaaring bumaling sa pag-arte bilang user `tomcat`. Ginagawa nitong imposible para sa mga hacker na pumasok sa inyong server bilang gumagamit ng `tomcat`.
At sa anumang kaso, dapat mong gawin ito upang ang gumagamit ng `tomcat` ay may napakalimitadong mga pahintulot sa sistema ng talaksan ng server (basahin ang+write+execute na mga pribilehiyo
para sa punong `apache-tomcat` directory at ` <bigParentDirectory> ` at basahin-lamang na mga pribilehiyo para sa mga direktoryo na may datos na ERDDAP™ kailangan i-access).
  * Maaari mong likhain ang `tomcat` user account (na walang password) sa pamamagitan ng paggamit sa utos:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Maaari kang lumipat sa trabaho bilang gumagamit ng `tomcat` sa pamamagitan ng paggamit ng utos
    ```
    sudo su - tomcat
    ```
     (Hihingi ka nito ng superuser password para sa pahintulot na gawin ito.) 
    * Maaari mong ihinto ang paggawa bilang gumagamit ng tomcat sa paggamit ng utos
    ```
    exit
    ````
    * Gawin ang karamihan sa natitirang bahagi ng Tomcat at ERDDAP™ Nag-setup ng mga instruksiyon bilang user `tomcat`. Pagkaraan, patakbuhin ang `startup.sh` at `shutdown.sh` scripts bilang user `tomcat `
kung kaya't may pahintulot si Tomcat na isulat ang mga log files nito.
    * Pagkatapos magbuklat ng Tomcat, mula sa magulang ng `apache-tomcat` directory:
      * Palitan ang pagmamay-ari ng puno ng apache-tomcat directory sa tomacat user.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (ngunit palitan ang aktuwal na pangalan ng iyong tomcat directory) .
      * Palitan ang "grupo" upang maging tomacat, ang inyong username, o ang pangalan ng isang maliit na grupo na kinabibilangan ng tomcat at lahat ng administrador ng Tomcat/ ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Ang pagbabago ay nagpapahintulot upang ang tomcat at ang grupo ay makabasa, sumulat, maggawad ng mga pribilehiyo:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Tanggalin ang "iba pang" pahintulot ng gumagamit na bumasa, sumulat, o pumatay:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Mahalaga ito, sapagkat hinahadlangan nito ang ibang gumagamit na magbasa ng posibleng sensitibong impormasyon ERDDAP™ Mga setup file.

### Alaala{#memory} 

Itakda ang Kaibahang Kapaligiran ni Tomcat

* Sa Linux at Macs:
Gumawa ng talaksang `tomcat/bin/setenv.sh ` (o sa Red Hat Enterprise Linux \\[ RHEL \\] , ayusin ang `ifimcat/conf/tomcat10.confff. `) na magpabago sa kapaligiran ni Tomcat.
Ang talaksang ito ay gagamitin ng `tomcat/bin/startup.sh` at `shutdown.sh`. Ang talaksan ay dapat na naglalaman ng gaya ng:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (ngunit ihalili ang mga pangalan ng directory mula sa iyong computer) .
   (Kung dati mong itinakda ang `JRE_HOME`, maaari mong alisin iyan.) 
Sa Macs, malamang na hindi mo na kailangang mag-set ng `JAVA_HOME`.

* Sa Windows:
Gumawa ng talaksang `tomcat\bin\\setenv.bat` upang itakda ang mga variables ng kapaligiran ni Tomcat.
Ang talaksang ito ay gagamitin ng `tomcat\bin\\startup.bat` at `Tut` shutdown.bat `.
Ang talaksan ay dapat na naglalaman ng gaya ng:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (ngunit ihalili ang mga pangalan ng directory mula sa iyong computer) .
Kung ito ay para lamang sa lokal na pagsubok, tanggalin ang "-server".
   (Kung dati mong itinakda ang `JRE_HOME`, maaari mong alisin iyan.) 

Ang `-Xmx` at `-Xms` memory settings ay mahalaga dahil ang `-Xms` memory settings ay mahalaga dahil ERDDAP™ ay mas mahusay sa pag - alaala.
Laging itakda ang `-Xms` sa parehong halaga ng `-Xmx`.

* Para sa 32 bit Operating Systems at 32 bit Java :
64 bit Java ay mas mabuti kaysa 32 bit Java , ngunit 32 bit Java ay magtatrabaho hangga't ang server ay hindi talagang abala.
Mientras mas mahusay ang pisikal na memorya sa server, mas mabuti: 4+ Ang GB ay talagang mabuti, 2 GB ay okay, mas kaunti ay hindi inirerekomenda.
May 32 bit Java , kahit na may saganang pisikal na memorya, Tomcat at Java ay hindi tatakbo kung ikaw ay magtatakda ng `-Xmx` na mas mataas sa 1500M (1200M sa ilang computer) .
Kung ang iyong server ay wala pang 2GB ng memorya, bawasan ang halaga ng `-Xmx` (sa 'M'ega Byte) sa 1/2 ng pisikal na memorya ng kompyuter.

* Sa 64 bit Operating Systems at 64 bit Java :
64 bit Java ay magtatrabaho lamang sa 64 na bit operating system.
  * Kasama Java 8, kailangan niyong idagdag ang `-d64` sa Tomcat `CATALINA_OPTS` parameter sa `setenv.bat`.
  * Kasama Java 21, pinili mo ang 64 bit Java kapag nag-download ka ng bersyon ng Java Minarkahan ng "64 bit".

May 64 bit Java , Tomcat at Java ay maaaring gumamit ng napakataas na `-Xmx` at `-Xms` settings. Mientras mas mahusay ang pisikal na memorya sa server.
Bilang isang simpleng mungkahi: inirerekomenda namin sa inyo ang `-Xmx` at `-Xms` to (sa 'M'ega Byte) 1/2 (o mas mababa) ng pisikal na memorya ng computer.
Makikita mo kung Tomcat, Java , at ERDDAP™ ay tunay na tumatakbo sa 64 bit mode sa pamamagitan ng paghahanap ng " bit," sa ERDDAP ' Araw - Araw na Report email
o sa `bigParent Directory/logs/ [log.txt](/docs/server-admin/additional-information#log) talaksang ` (Ang `bigParent Direktory` ay nakatakda sa [setup.xml](#setupxml) ) .

#### Koleksiyon ng Basura{#garbage-collection} 

* Nasa ERDDAP™ ' [log.txt](/docs/server-admin/additional-information#log) talaksan, makikita mo ang maraming "GC (Pagkabigo ng Pananakop) " mga mensahe.
Karaniwan nang hindi ito problema. Ito ay isang madalas na mensahe mula sa isang normal na operasyon Java na katatapos lamang nito ng isang maliit na basura
nalikom dahil wala itong silid sa Eden (bahagi ng Java magbunton para sa napakabatang mga bagay) . Karaniwan nang ipinakikita sa iyo ng mensahe
`memoryUse Bago-&gt;memoryUse Pagkatapos ng`. Kung ang dalawang bilang na iyon ay magkalapit, nangangahulugan ito na ang koleksiyon ng basura ay hindi mabunga.
Ang mensahe ay tanda lamang ng problema kung ito ay napakadalas (bawat ilang segundo) , hindi mabunga, at ang bilang ay malaki at hindi lumalaki,
na magkasamang nagpapakita na Java Kailangan ang higit pang memorya, ang pakikipagpunyagi upang maalis ang memorya, at hindi kayang alisin ang memorya.
Ito'y maaaring mangyari sa isang maigting na panahon, pagkatapos ay umalis. Subalit kung ito'y magpapatuloy, iyan ay isang tanda ng problema.
* Kung makikita mo ang `java.lang.OOOOOOfMemoryError`s in ERDDAP™ ' [log.txt](/docs/server-admin/additional-information#log) talaksan,
tingnan [Labas ng MemoryErdor](/docs/server-admin/additional-information#outofmemoryerror) kung paano susuriin at lulutasin ang mga problema.
         
### Mga Pagpapahintulot{#permissions} 

*  [Sa Linux at Macs, baguhin ang mga pahintulot](#permissions) ng lahat ng `*.sh` files in `tomcat/bin/` upang i-executable ng may-ari:
  ```
  chmod +x *.sh
  ```

### Mga Patak{#fonts} 

*  [Mga larawan:](#fonts) Mas gusto namin ang malaya [Mga font ng DejaVu](https://dejavu-fonts.github.io/) sa isa pa Java Mga font.
Ang paggamit ng mga font na ito ay mahigpit na inirerekomenda ngunit hindi kinakailangan.

Kung hindi mo gagamitin ang mga font ng DejaVu, kailangan mong palitan ang font familyfamily setting sa setup.xml hanggang ` <fontFamily> Sassirif </fontFamily> `,
na makukuha ng lahat Java distribusyon. Kung itatakda mo ang ` <fontFamily> ` sa pangalan ng font na hindi magagamit, ERDDAP™ ay hindi magkakarga
at maglilimbag ng listahan ng magagamit na mga font sa talaksang `log.txt`. Dapat mong gamitin ang isa sa mga font na iyon.

Kung pipiliin mong gamitin ang mga font ng DejaVu, pakisuyong tiyakin ang ` <fontFamily> `paglalagay sa setup.xml ay ` <fontFamily> Mga San ng DejaVu </fontFamily> `.

Upang mailuklok ang mga font ng DejaVu, pakisuyong download [Mga DejaVuFont .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5=33E61FAB6A547851ED308B4FFFF42) 
at buksan ang font files sa isang temporary directory.

  * Sa Linux:
    * Para sa Linux Pag - aampon Java distribusyon, tingnan [Ang mga tagubiling ito](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Kasama ng iba Java mga pamamahagi: Bilang gumagamit ng `tomcat`, kopyahin ang font files sa `$JAVA_HOME/lib/fonts` kaya Java ay mahahanap ang fonts.
Tandaan: kung/kapag nag-upgrade ka mamaya sa mas bagong bersyon ng Java , kailangan mong ilagay muli ang mga font na ito.
  * Sa Macs: sa bawat font file, dobleng klik dito at pagkatapos ay i-install ang Font.
  * Sa Windows 7 at 10: sa Windows Explorer, piliin ang lahat ng font files. Klik. Click na naka-install.
             
### Pagsubok sa Tomcat{#test-tomcat} 

* Subukin ang iyong instalasyon ng Tomcat.
  * Linux:
    * Bilang user "tomcat", patakbuhin ang `tomcat/bin/startup.sh`.
    * Tingnan ang iyong URL + ":8080/" sa iyong browser (e.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (ay tumatakbo upang maging ang tagapangasiwa ng sistema) :
    * Itakbo ang `tomcat/bin/startup.sh`.
    * Tingnan ang iyong URL + ":8080/" sa iyong browser (e.g., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Pansinin na sa hindi pagtupad, ang iyong Tomcat ay mararating mo lamang. Hindi ito maaaring puntahan ng publiko.
  * Windows localhost:
    * Kanang pindot sa imaheng Tomcat sa traysikel ng sistema, at pumili ng "Start service".
    * Pangmalas [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , o marahil [http://localhost:8080/](http://localhost:8080/) , sa iyong browser. Pansinin na sa hindi pagtupad, ang iyong Tomcat ay mararating mo lamang. Hindi ito maaaring puntahan ng publiko.

Dapat mong tingnan ang Tomcat na "Criise" page.

Kung may gulo, tingnan ang log file ng Tomcat sa `tomcat/logs/catalina.out`.

### Mga problema sa instalasyon ng Tomcat?{#troubles-with-the-tomcat-installation} 

* Sa Linux at Mac, kung hindi mo maabot ang Tomcat o ang Mac ERDDAP™   (o marahil ay hindi mo sila maaabot mula sa isang computer sa labas ng iyong firewall) ,
maaari mong subukin kung nakikinig si Tomcat sa daungan 8080, sa pamamagitan ng pagmamakinilya (bilang ugat) sa isang command line ng server:

  ```
  netstat -tuplen | grep 8080
  ```

Iyan ay dapat na bumalik sa isang linya na may katulad na:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (kung saan ang `#` ay numero) , nagpapahiwatig na isang prosesong `java` (Malamang na Tomcat) ay nakikinig sa port "8080" para sa "tcp" traffic.
Kung walang ibinalik na mga linya, kung ang linya ay bumalik ay lubhang magkaiba, o kung ang dalawa o higit pang mga linya ay ibabalik, kung gayon ay maaaring magkaroon ng problema sa mga setting ng daungan.

* Tingnan ang Tomcat log file `tomcat/logs/catalina.out`. Mga problema sa paggamot at ilan ERDDAP™ Ang mga problema sa simula ay halos laging ipinakikita roon.
Karaniwan na ito kapag una kang nagtayo ERDDAP™ .

* Tingnan ang [Tomcat](https://tomcat.apache.org/) website o maghanap ng tulong sa web, pero pakisuyong ipaalam sa amin ang mga problema ninyo at ang mga solusyong nakita ninyo.

* Tingnan ang [sa pagkuha ng karagdagang suporta](/docs/intro#support) .
             
###  ERDDAP™ Nasisiyahan{#erddap-content} 
3.   [Iayos ang `tomcat/content/erddap`confix files.](#erddap-content) 
Sa Linux, Mac, at Windows, download [ErddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
at unzip ito sa `tomcat` directory, na lumilikha ng `tomcat/content/erddap`.

__Version 1.0.0, 20333 bytes, MD5=2B8D2A5ED73E342B529C168C60B5, na may petsang 442B529C168 2024-10-14__

Mayroon ding ilang naunang bersyon:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEF2DF0F4BB34BB34AD7C, may petsang 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEF2DF0F4BB34BB34AD7C, may petsang 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, na may petsang 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, na may petsang 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5=1E26F62E7A06191EE68C40B9A29362, na may petsang 2023-02-27) 

#### Iba Pang Direktoryo{#other-directory} 

Para sa Red Hat Enterprise Linux (RHEL) o para sa ibang mga sitwasyon kung saan hindi ka pinapayagang baguhin ang Tomcat directory o kung saan mo nais/kailangan
upang ilagay ang ERDDAP™ directory sa ibang lugar sa ibang kadahilanan (Halimbawa, kung gumagamit ka ng Jetty sa halip na Tomcat) ,
dizip `erddapCont .zip ` sa nais na directory (na tanging ang gumagamit ng `tomcat` ang may access) at inilagay ang ` erddapContentDirectory ` system property
 (e.g. ` erddapContentDirectory  =~tomcat/content/erddap `) gayo'y ERDDAP™ ay makasusumpong ng bagong talaang ito ng nilalaman.

### setup.xml{#setupxml} 

*  [Basahin ang mga komento sa `tomcat/content/erddap/setup.xml `](#setupxml) at gawin ang hiniling na mga pagbabago. Ang setup.xml ay ang file na may lahat ng settings na nagtatakda kung paano mo ito gagawin ERDDAP™ ay gumagawi.

Para sa panimulang setup, baguhin mo sa paano man ang mga tagpong ito:
      * ` <bigParentDirectory> `
      * ` <emailEverythingTo> `
      * ` <baseUrl> `
      * ` <email...> `Mga setting
      * ` <admin...> `Mga setting
      * ` <baseHttpsUrl> ` (kapag ikaw ay nagtayo https ) 

Kapag nilikha mo ang malaking Direktoryo ng Party, mula sa magulang na directory ng BigParent Direktory:

    * Gawin ang `tomcat` user ang may-ari ng `bigParent Directory`:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Palitan ang "grupo" upang maging tomacat, ang inyong username, o ang pangalan ng isang maliit na grupo na kinabibilangan ng tomcat at lahat ng administrador ng Tomcat/ ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Ang pagbabago ay nagpapahintulot upang ang tomcat at ang grupo ay makabasa, sumulat, maggawad ng mga pribilehiyo:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Tanggalin ang "iba pang" pahintulot ng gumagamit na bumasa, sumulat, o pumatay. Mahalaga ito upang maiwasan ang posibleng sensitibong impormasyon
sa loob ERDDAP™ Mga log file at file na may impormasyon tungkol sa mga pribadong dataset.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Kakaibang Kapaligiran{#environment-variables} 

Pasimula sa ERDDAP™ v2.13, ERDDAP™ Maaaring pawalang-bisa ng mga administrador ang anumang halaga sa setup.xml sa pamamagitan ng pagtatakda ng isang kapaligirang variable
pangalan ng ` ERDDAP _KahalagahangName` bago tumakbo ERDDAP™ . Halimbawa, gamitin ang ` ERDDAP Nilulupig ni _baseUrl` ang ` <baseUrl> `halaga.
Ito'y maaaring makatulong kapag naglalagay ERDDAP™ na may lalagyang gaya ng Docker, yamang maaari mong ilagay ang karaniwang setting sa setup.xml
at saka maglaan ng pantanging mga tanawin sa pamamagitan ng iba't ibang kapaligiran. Kung magbibigay ka ng lihim na impormasyon sa ERDDAP™ sa pamamagitan ng paraang ito,
tiyakin na ang impormasyon ay mananatiling lihim. ERDDAP™ basahin lamang ang kapaligiran na pabagu - bago minsan sa bawat simula,
sa unang segundo ng startup, kaya ang isang paraan upang gamitin ito ay: itakda ang iba't ibang kapaligiran, magsimula ERDDAP ,
maghintay hanggang sa ERDDAP™ ay sinisimulan, pagkatapos ay hindi pa kumpleto ang kapaligiran.

###  datasets.xml  {#datasetsxml} 

* Basahin ang mga komento sa [ **Paggawang kasama ng mga kapatid datasets.xml Sawi ang paglikha ng talaksan** ](/docs/server-admin/datasets) . Sa dakong huli, pagdating mo ERDDAP™ tumatakbo
sa unang pagkakataon (karaniwang kasama lamang ang default datasets) , babaguhin mo ang XML sa `tomcat/content/erddap/ datasets.xml `
upang tiyakin ang lahat ng datos na gusto mo ERDDAP™ upang maglingkod. Dito mo gugugulin ang malaking bahagi ng iyong panahon
habang nagtatayo ERDDAP™ at mamaya habang pinananatili ang iyong ERDDAP™ .

Makikita mo ang isang halimbawa [ datasets.xml tungkol sa GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Di - inaasahan) Ngayon o (bahagyang malamang) sa hinaharap, kung nais mong baguhin ang talaksan ng CSS, kopya
`tomcat/content/erddap/images/erddapStart2.cs` to `tomcat/content/erddap/images/erddap2.cs` at pagkatapos ay gumawa ng mga pagbabago rito.
Ang mga pagbabago sa `erddap2.css` ay nangyayari lamang kapag ang ERDDAP™ ay muling naka-tart at kadalasang nangangailangan din ang gumagamit na alisin ang mga screw na file ng browser.
     
 ERDDAP™ hindi gagana nang tama kung ang setup.xml o datasets.xml Ang talaksan ay hindi isang body-pormal na talaksang XML. Kaya, pagkatapos mong ayusin ang mga file na ito,
Isa itong mabuting ideya upang tiyakin na ang resulta ay mahusay ang pagkakaanyo na XML sa pamamagitan ng pagpasa ng tekstong XML sa isang XML checker tulad ng XML [Paglaganap ng xmlvalid](https://www.xmlvalidation.com/) .
     
### Iluklok ang erddap. talaksang digmaan{#install-the-erddapwar-file} 

4. Sa Linux, Mac, at Windows, _download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) __ sa `tomcat/webapps`:

__Version 2.28.0, 620,824,288 bytes, MD5=f948b2ba603f65a83ac67af43a9c2, na may petsang 2025-08-29__

Ang .war file ay malaki dahil ito ay naglalaman ng mataas na resolution baybayin, hangganan, at taas ng mga datos na kailangan upang lumikha ng mga mapa.

May ilang naunang bersyon din na makukuha.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42EAB9591F773EA848D, na may petsang 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CFB8B, may petsang 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CFFF805893146E932E498FDBD19B6, na may petsang 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AF4DCF4DA6D0, na may petsang 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCA8FD5F, na may petsang 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b807756eecbc898e, na may petsang 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5=652AF9D1421F00B5F789DA2C4732D4C, na may petsang 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, may petsang 2025-03-31) 
   *  [2.27.0.](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659e4145ca2dff447bf4ef7, na may petsang 2025-06-11) 

### Configure proxy (Espesipikong paggamit)  {#proxy} 

 ERDDAP™ ay karaniwang ginagamit sa likod ng isang webserver reverse proxy upang pahintulutan itong ihain sa karaniwang mga daungan ng HTTP (80 at 443) .
Ang pagtatapos ng SSL/TLS ay kadalasang binabaklas din sa webserver proxy layer. Ang espesipikong mga detalye ay depende sa mga kahilingan ng bawat paglalagay.

#### Apache{#apache} 

1. Tiyakin na ang `mod_proxy` at `mod_proxy_ http Nakakarga ang `:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Bigyang - diin ang umiiral na ` <VirtualHost> ` tag (kung may isa) , o magdagdag ng isa sa dulo ng talaksan:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Kung ERDDAP™ ay sinisilbi sa isang landas maliban sa `/erddap`, itinakda rin ang `X-Forwarded-Prefix` header sa `X-Forwarded-Prefix` header
Bahagi ng landas _bago ang_ `/erddap`. Ang tagpong ito ay angkop para sa isang ERDDAP™ hain
`/subpath/erdap`:

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Pagkatapos ay restart Apache: `/usr/sbin/apachectl -k Maganda ` (ngunit kung minsan ito ay nasa ibang directory) .
         
#### GAINX{#nginx} 

Sa talaksang pag-aayos ng nginx, ilagay ang mga header na ito:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Kung ERDDAP™ ay sinisilbi sa isang landas maliban sa `/erddap`, itinakda rin ang `X-Forwarded-Prefix` header sa `X-Forwarded-Prefix` header
Bahagi ng landas _bago ang_ `/erddap`. Ang tagpong ito ay angkop para sa isang ERDDAP™ hain
`/subpath/erdap`:

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Upang makakuha ng NGINX at ERDDAP™ gumagawa nang tama https , kailangan mong ilagay ang sumusunod na snippet sa loob ng Tomcat server.xml ` <Host> ` block:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Magsimula sa Tomcat{#start-tomcat} 

*  (Hindi ko inirerekomenda ang paggamit ng Tomcat Web Appling Manler. Kung hindi mo lubusang aalisin at sisimulan ang Tomcat, sa malao't madali ay magkakaroon ka ng mga isyu sa memorya ng PermGen.) 
*  (Sa Linux o Mac OS, kung nakalikha ka na ng isang pantanging tagagamit upang patakbuhin ang Tomcat, e.g., tomcat, tandaan na gawin ang sumusunod na mga hakbang gaya ng gumagamit na iyon.) 
* Kung tumatakbo na si Tomcat, isara ang Tomcat kasama si Tomcat (sa Linux o Mac OS) `tomcat/bin/shutdown.sh`
o (sa Windows) `Tomcat\bin\\ shutdown.bat `

Sa Linux, gumamit ng `ps -ef | Ang grep tomcat` bago at pagkatapos ng `shutdown.sh` upang matiyak ang proseso ng tomcat ay tumigil na.
Ang proseso ay dapat na itala bago ang paghinto at sa wakas ay hindi itala pagkatapos ng paghinto.
Maaaring kumuha ng isa o dalawang minuto ERDDAP™ upang lubusang magsara. Maging matiyaga. O kung para bang hindi ito hihinto sa ganang sarili, gamitin ito:
`kill -9 <processID> `
* Magsimula Ka sa Tomcat (sa Linux o Mac OS) `tomcat/bin/startup.sh` o (sa Windows) `tomcat\bin\\startup.bat `

## Ay ERDDAP™ tumatakbo?{#is-erddap-running} 

Gumamit ng browser upang tuminginhttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ ay nagsisimula nang walang anumang datasets na punô. Ang mga Datesets ay nakakarga sa isang background sinulid kaya't nagiging magagamit na one-by-one.

### Pagputok ng Problema{#troubleshooting} 

* Kapag may dumating na kahilingan mula sa gumagamit, nagtutungo ito sa Apache (sa mga computer ng Linux at Mac OS) , pagkatapos Tomcat, pagkatapos ERDDAP™ .
* Makikita mo kung ano ang nangyayari sa Apache (at kaugnay na mga pagkakamali) sa mga log file ng Apache.
*    [Ikaw](/docs/server-admin/additional-information#tomcat-logs) kung ano ang nangyayari kay Tomcat (at kaugnay na mga pagkakamali) 
sa mga log file ng Tomcat (`tomcat/logs/catalina.out` at iba pang files sa directory na iyon) .
*    [Ikaw](/docs/server-admin/additional-information#log) kung ano ang nangyayari ERDDAP , suriin ang mga mensahe mula sa ERDDAP ,
at maling mga mensahe mula sa ERDDAP , nasa ERDDAP™ ` <bigParentDirectory> /logs/log.txt` file.
* Hindi nagsisimula si Tomcat ERDDAP™ hanggang sa makuha ni Tomcat ang kahilingan ERDDAP™ . Kaya makikita mo sa Tomcat log files kung ito ay
nagsimula ERDDAP™ o kung may maling mensahe na nauugnay sa pagtatangkang iyon.
* Kailan ERDDAP™ Nagsisimula, binabago nito ang pangalan ng matanda ERDDAP™ log.txt file (`logArchived Nasa <CurrentTime> .txt`) at lumilikha ng bagong log.txt file.
Kaya kung ang `log.txt` file ay luma na, ito ay tanda na ERDDAP™ ay hindi na muling nag - aral kamakailan. ERDDAP™ Sumulat ng log info sa isang neutral
at isulat mo lamang paminsan - minsan ang buffer sa log file, subalit maaari kang pilitin ERDDAP™ sa pamamagitan ng pagdalaw
` /erddap/status.html `.

### Suliranin: Lumang Aklat ng Java  {#trouble-old-version-of-java} 

Kung gumagamit ka ng bersiyon ng Java na napakatanda na para sa ERDDAP , ERDDAP™ hindi tatakbo at makikita mo ang maling mensahe sa log file ni Tomcat na gaya ng

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Ang solusyon ay i - update ang pinakabagong bersiyon ng Java at tiyakin na ginagamit ito ni Tomcat.

### Suliranin: Mabagal na Unang Pagsisimula{#trouble-slow-startup-first-time} 

Kailangang magtrabaho nang marami si Tomcat sa unang pagkakataon ng aplikasyong gaya ng ERDDAP™ ay sinisimulan; lalo na, kailangang buksan nito ang `erddap.war` file
 (na parang .zip talaksan) . Sa ilang server, ang unang pagtatangka na magmasid ERDDAP™ mga puwesto (30 segundo?) hanggang sa matapos ang gawaing ito.
Sa ibang server, ang unang pagtatangka ay mabibigo agad. Subalit kung maghihintay ka ng 30 segundo at sisikaping muli, magtatagumpay ito kung ERDDAP™ ay tamang ikinabit.

Walang solusyon dito. Ganito nga gumagana si Tomcat. Subalit ito'y nangyayari lamang sa unang pagkakataon pagkatapos mong magluklok ng isang bagong bersiyon ng ERDDAP™ .

## Ibagsak at ulitin{#shut-down-and-restart} 

Sa hinaharap, para magsara (at muling pag - uusap)   ERDDAP™ , tingnan [Kung Paano Patatahimikin at Ipahinga ang Tomcat at ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Suliranin?{#trouble} 

Mga Suliraning Nakakabit ng Tomcat o ERDDAP™ ? Tingnan ang [sa pagkuha ng karagdagang suporta](/docs/intro#support) .

## Email Notification of New Versions of ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Kung nais mong tumanggap ng email kailanma't may bagong bersiyon ng ERDDAP™ o iba pang mahahalagang bagay ERDDAP™ mga patalastas,
maaari kang sumali ERDDAP™ listahan ng mga patalastas [dito](https://groups.google.com/g/erddap-announce) . Ang talaang ito ay may katamtamang bilang na humigit - kumulang isang email tuwing ikatlong buwan.

## Kaugalian{#customize} 

*  [Gawing pangkaraniwan ang iyong ERDDAP™ upang itampok ang inyong organisasyon (hindi NOAA   ERD ) .](#customize) 
* Palitan ang baner na nasa itaas ng lahat ERDDAP™ .html page sa pamamagitan ng pag-aayos ng ` <startBodyHtml5> ` tag sa iyong ` datasets.xml ` file.
( Kung walang isa man, kopyahin ang default mula sa ERDDAP™ ''s `tomcat/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/mesages.xml` talaksan
sa ` datasets.xml ` at ayusin ito.) Halimbawa, maaari mong sabihin:
  * Gumamit ng ibang larawan (I.e., logo ng inyong organisasyon) .
  * Palitan ang kulay sa likuran.
  * Pagbabago " ERDDAP™ " to "_Youganization_'s ERDDAP™ "
  * Palitan ang "Easier access sa siyentipikong datos" sa "Easier access to _Organization_'s data".
  * Palitan ang "Brought to you sa pamamagitan ng" links upang maging links sa iyong organisasyon at mga mapagkukunan ng pondo.
* Palitan ang impormasyon sa kaliwang bahagi ng home page sa pamamagitan ng pag-aayos ng ` <theShortDescriptionHtml> ` tag sa iyong ` datasets.xml ` file.
( Kung walang isa man, kopyahin ang default mula sa ERDDAP™ ''s `tomcat/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/mesages.xml` talaksan
sa ` datasets.xml ` at ayusin ito.) Halimbawa, maaari mong sabihin:
  * Ilarawan kung ano ang ginagawa ng iyong organisasyon at/o grupo.
  * Ilarawan kung anong uri ng datos ito ERDDAP™ ay nakatulong.
  * Upang baguhin ang larawan na makikita sa mga buslo, ilagay ang favicon ng inyong organisasyon. ico sa `tomcat/content/erdap/images/`.
Tingnanhttps://en.wikipedia.org/wiki/Favicon.
