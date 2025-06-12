---
sidebar_position: 1
---

# Iluklok
Kung Paano Gagawin ang Unang SeksyonERDDAP™sa Iyong Server


ERDDAP™ay maaaring tumakbo sa anumang server na sumusuportaJavaat ang Tomcat (at iba pang aplikasyon na gaya ni Jetty, pero hindi namin sila sinusuportahan) .ERDDAP™ay sinubok sa Linux (kasama ang AWS ng Amazon) , Mac, at Windows computers.

*    **Amazon** -- Kung naka-install kaERDDAP™sa isang Web Services EC2 halimbawa, tingnan ito[Overviewed ang Web Services ng Amazon](/docs/server-admin/additional-information#amazon)Una.
*    **Docker** -- Ang Axiom ngayon ay nag - aalok[ERDDAP™sa isang Docker container](https://hub.docker.com/u/axiom/)at si IOOS ngayon ay nag - aalok ng isang[Mabilis na Patnubay sa PasimulaERDDAP™sa Isang Docker Conter](https://ioos.github.io/erddap-gold-standard/index.html).
Ito ang pamantayanERDDAP™Pagluluklok, subalit inilagay ito ni Axiom sa isang lalagyan ng mga piyer.
Kung gumagamit ka na ng Docker, malamang na mas gugustuhin mo ang bersiyong Docker.
Kung hindi mo na ginagamit ang Docker, karaniwan nang hindi namin inirerekomenda ito.
Kung pipiliin mong magluklokERDDAP™Sa pamamagitan ni Docker, hindi kami nag - aalok ng anumang suporta para sa proseso ng instalasyon.
Hindi pa kami gumagawang kasama ni Docker. Kung gagawin mo ito, pakisuyong ipadala sa amin ang iyong mga komento.
*    **Linux at Macs** --ERDDAP™ay napakahusay sa Linux at Mac na mga computer. Tingnan ang mga tagubilin sa ibaba.
*    **Windows** -- Mainam ang Windows para sa pagsubokERDDAP™at para sa personal na gamit (tingnan ang mga tagubilin sa ibaba) , ngunit hindi namin inirerekomenda ang paggamit nito para sa publikoERDDAPs. PagtakboERDDAP™sa Windows ay maaaring may mga problema: lalo na,ERDDAP™ay maaaring hindi matanggal ang mga talaksang delete at/o magkaroon ng maling pangalan nang mabilis. Ito marahil ay dahil sa antivirus software (e.g., mula sa McAfee at Norton) na sumusuri sa mga file para sa mga virus. Kung mapaharap ka sa problemang ito (na makikita sa maling mga mensahe sa[log.txt](/docs/server-admin/additional-information#log)talaksang tulad ng "Hindi Kayang tanggalin ...") , ang pagbabago ng settings ng antivirus software ay maaaring bahagyang maibsan ang problema. O sa halip ay isaalang - alang ang paggamit ng isang Linux o Mac server.

 **Ang pamantayanERDDAP™Ang mga instruksiyon para sa mga computer ng Linux, Macs, at Windows ay:** 

0. Tiyakin na ang anumang dependensiya ay naka-install. Sa mga makinang non-Windows (Linux at Mac) , kailangan mo ng csh.
## Java {#java} 
1.  [SapagkatERDDAP™v2.19+, itinayoJava21.](#java)
Para sa seguridad, halos laging pinakamabuting gamitin ang pinakabagong bersiyon ngJava21.
Paki-download at i-install ang pinakabagong bersyon ng
    [Ang OpenJDK ng Pag - aampon (Temurin) 21 (MGA LTS) ](https://adoptium.net/temurin/releases/?version=21). Upang matiyak ang instalasyon, tipo "/_javaJreBin Direktory_/java - Conversion", halimbawa,
/usr/local/jdk-21.0.3+9/jre/bin/java - Pagkumberte
    
    ERDDAP™ay gumagawang kasama ngJavamula sa ibang pinagmulan, ngunit inirerekomenda namin ang Ampon dahil ito ang pangunahin, pangkomunidad, malaya, (gaya ng sa serbesa at pagsasalita) bersyon ngJava21 na nagbibigay ng Pangmatagalang Suporta (libreng mga upgrade sa loob ng maraming taon pagkatapos ng panimulang paglabas) . Para sa mga kadahilanang panseguridad, pakisuyong i-update ang iyongERDDAP'Ang bersiyon ngJavaSa pana - panahon bilang mga bagong bersiyon ngJava21 ang makukuha mula sa Repsium.
    
    ERDDAP™ay sinubok at malawakang ginamit na may 21, hindi ang ibang bersiyon. Sa iba't ibang kadahilanan, hindi natin sinusubok ni sinusuportahan man ang ibang bersiyon ngJava.
     
## Tomcat{#tomcat} 
2.  [Nagtayo](#tomcat) [Tomcat](https://tomcat.apache.org).
Ang Tomcat ang pinakamalawak na ginagamitJavaPagkakapit ng Server, na ito ayJavasoftware na nakatayo sa pagitan ng mga serbisyong network ng operating system atJavasoftware na server tulad ngERDDAP™. Ito ay Malaya at Open Software (MGA FOS) .
    
Maaari mong gamitin ang ibaJavaTagapagsilbi (e.g., Jetty) , ngunit sinusubok lamang namin at sinusuportahan si Tomcat.
     
    
    * I-download Tomcat at i-track ito sa iyong server o PC.
Para sa mga kadahilanang panseguridad, halos laging pinakamabuting gamitin ang pinakabagong bersiyon ng Tomcat 10 (bersyon 9 at sa ibaba ay hindi tanggap) na dinisenyo upang gumawang kasama ngJava21 o mas bago. Sa ibaba, ang Tomcat directory ay tatawaging _tomcat_.
        
Babala&#33; Kung mayroon ka nang Tomcat na nagpapatakbo ng iba pang aplikasyon sa web (lalo nang MGA THEDD) , inirerekomenda namin na maglagay kayoERDDAP™sa loob[ikalawang Tomcat](/docs/server-admin/additional-information#second-tomcat), dahilERDDAP™Kailangan ang iba't ibang Tomcat settings at hindi dapat makipag-away sa ibang aplikasyon para sa memorya.
        
        * Sa Linux,[I-download ang "Core" "tar".gz" Pamamahagi ng Tomcat](https://tomcat.apache.org/download-10.cgi)at binuksan ito. Iminumungkahi namin ang pagbuklat nito sa /usr/local.
        * Sa isang Mac, ang Tomcat ay malamang na naka-install na sa /Library/Tomcat, ngunit dapat i-update ito sa pinakabagong bersyon ng Tomcat 10.
Kung kukunin mo ito,[I-download ang "Core" "tar".gz" Pamamahagi ng Tomcat](https://tomcat.apache.org/download-10.cgi)at ibinuksan ito sa /Library/Tomcat.
        * Sa Windows, maaari mong gawin[I-download ang "Core" "zip" Tomcat distribution](https://tomcat.apache.org/download-10.cgi)  (Na hindi nakakaabala sa Windows register at na kontrolado mo sa isang DOS command line) at binuksan ito sa isang angkop na directory. (Para sa pag-unlad, ginagamit natin ang "Core" na "zip" na pamamahagi. Gumagawa kami ng isang /programs directory at binubuksan ito roon.) O maaari mong i-download ang "Core" na "64-bit Windows szill" distribution, na kinabibilangan ng higit pang mga katangian. Kung ang distribusyon ay isang Windows installer, malamang na ilagay nito ang Tomcat, halimbawa, /Program Files/apache-tomat-10.0.23 .
             
### server.xml{#serverxml} 
*   [server.xml](#serverxml)- Sa _tomcat_/conf/server.xml file, may dalawang pagbabago na dapat mong gawin sa bawat isa sa dalawang ito&lt;Mga tag-ugnay para sa
```
        <Connector port="8080" 
```
at isa pa
```
        <Conector port="8443"
```
    1.   (Inirerekomenda) Palakihin ang connectionTimout parameter, marahil hanggang 300000 (Mga millisecond)   (5 minuto) .
    2.   (Inirerekomenda) Magdagdag ng bagong parameter: relaks naQueryChars="\\[\\]|" Ito ay opsyonal at bahagyang hindi matatag, ngunit inaalis ang pangangailangan para sa mga tagagamit na maging porsyento-encode ang mga karakter na ito kapag nangyari ito sa mga parameter ng kahilingan ng tagagamit na URL.
             
### nilalaman.xml{#contentxml} 
* konteksto.xml -- Kayamanan ng Cach - Sa _tomcat_/conf/context.xml, sa mismong harap ng&lt;/Context&gt; tag, palitan ang tag ng Yaman (o idagdag ito kung wala na ito) upang ayusin ang cache MaxSize parameter hanggang 80000:
    &lt;Yaman caching Alowed="tunay" cacheMaxSize="80000" /&gt;
Iniiwasan nito ang maraming babala sa catalina. na ang lahat ay magsimula sa
" PAGHAHANDA\\[pangunahing\\]org.apache.catalina.webresources.Cache.getResource Hindi kayang idagdag ang yaman\\[/WEB-INF/class/...]"
         
### Panahon ng Apache{#apache-timeout} 
* Sa mga computer na Linux, baguhin ang mga timeout setting ng Apache upang ang time-consumting user requests ay huwag mag-oras (na kadalasang lumilitaw bilang isang "Proxy" o "Bad Gateway" error) . Bilang tagagamit ng ugat:
    1. Pagpapain sa Apachehttpd.conf file (Karaniwan sa /etc/httpd/conf/) :
Palitan ang umiiral&lt;Oras. (o magdagdag ng isa sa dulo ng talaksan) hanggang 3600 (mga segundo) , sa halip ng default 60 o 120 segundo.
Palitan ang umiiral&lt;Magandang kalagayan (o magdagdag ng isa sa dulo ng talaksan) hanggang 3600 (mga segundo) , sa halip ng default 60 o 120 segundo.
    2. Restarty Apache: /usr/sbin/apachectl -k Maganda (ngunit kung minsan ito ay nasa ibang directory) .
             
    * Mungkahing panseguridad: Tingnan[Ang mga tagubiling ito](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)upang dagdagan ang seguridad ng iyong instalasyong Tomcat, lalo na para sa mga tagapagsilbing pampubliko.
         
    * Para sa publikoERDDAP™Mga instalasyon sa Linux at Macs, pinakamabuting itayo ang Tomcat (ang programa) bilang kabilang sa gumagamit ng "tomcat" (isang hiwalay na gumagamit na may limitadong pahintulot at alin ang[walang password](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) . Sa gayon, tanging ang super user ang maaaring bumaling sa pag-arte bilang user tomcat. Ginagawa nitong imposible para sa mga hacker na mag - log in sa inyong server bilang user tomcat. At sa anumang kaso, dapat mong gawin ito upang ang gumagamit ng tomat ay magkaroon ng napakalimitadong mga pahintulot sa sistema ng talaksan ng server (basahin ang+write+execute na mga pribilehiyo para sa punong apache-tomat directory at&lt;Malaking Direktorygt; at bumasa-lamang na mga pribilehiyo para sa mga direktoryo na may datos naERDDAP™kailangan i-access).
        * Maaari mong likhain ang tomcat user account (na walang password) sa pamamagitan ng paggamit ng utos
sudo user added tomcat -s /bin/bash -p '\\* '
        * Maaari kang bumaling sa trabaho bilang gumagamit ng tomcat sa paggamit ng utos
sudo su - tomcat
             (Hihingi ka nito ng superuser password para sa pahintulot na gawin ito.) 
        * Maaari mong ihinto ang paggawa bilang gumagamit ng tomcat sa paggamit ng utos
labasan
        * Gawin ang karamihan ng natitirang bahagi ng Tomcat atERDDAP™Mga instruksiyon sa setup bilang user "tomcat". Kalaunan, patakbuhin ang start-up.sh at i-sh scripts bilang user "tomcat" upang may pahintulot si Tomcat na isulat sa mga log file nito.
        * Pagkatapos magbuklat ng Tomcat, mula sa magulang ng apache-tomcat directory:
            
            * Palitan ang pagmamay-ari ng puno ng apache-tomcat directory sa tomacat user.
Shown -R tomcat apache-tomcat-_10.0.23_
                 (kundi palitan ang aktuwal na pangalan ng iyong tomcat directory) .
            * Palitan ang "grupo" upang maging tomcat, ang inyong username, o ang pangalan ng isang maliit na grupo na kinabibilangan ng tomcat at lahat ng mga administrador ng Tomcat/ERDDAP, e.g.,
ch ch UserName_ apache-tomcat-_10.0.23_
            * Pagbabago ng pahintulot upang ang tomcat at ang grupo ay makabasa, makasulat, makapaggawad ng mga pribilehiyo, e.g,.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Tanggalin ang "iba pang" pahintulot ng gumagamit na bumasa, sumulat, o magsulat:
chmod -R o-rwx apache-tomcat-_10.0.23_
Mahalaga ito, sapagkat hinahadlangan nito ang ibang gumagamit na magbasa ng posibleng sensitibong impormasyonERDDAP™Mga setup file.
            
              
### Alaala{#memory} 
* Itakda ang Kaibahang Kapaligiran ni Tomcat
    
Sa Linux at Macs:
Gumawa ng talaksang _tomcat_/bin/setenv.sh (o sa Red Hat Enterprise Linux\\[RHEL\\], ayusin ang ~tomcat/conf/tomcat10.conff.) na magpabago sa kapaligiran ni Tomcat. Ang talaksang ito ay gagamitin ng _tomcat_/bin/startup.sh at sh.sh. Ang talaksan ay dapat na naglalaman ng gaya ng:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (ngunit ihalili ang mga pangalan ng directory mula sa iyong computer) .
 (Kung inilagay mo dati ang JRE\\_HOME, maaari mo itong alisin.)   
Sa Macs, marahil ay hindi mo na kailangang itakda ang JAVA\\_HOME.

Sa Windows:
Gumawa ng talaksang _tomcat_\bin\\setenv.bat upang itakda ang mga variables ng kapaligiran ni Tomcat. Ang talaksang ito ay gagamitin ng _Tomcat_\bin\\startup.bat atshutdown.bat. Ang talaksan ay dapat na naglalaman ng gaya ng:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (ngunit ihalili ang mga pangalan ng directory mula sa iyong computer) .
Kung ito ay para lamang sa lokal na pagsubok, tanggalin ang "-server".
 (Kung inilagay mo dati ang JRE\\_HOME, maaari mo itong alisin.) 

Mahalaga ang mga setting ng memorya na -Xmx at -Xms dahilERDDAP™ay mas mahusay sa pag - alaala. Laging magtakda ng mga -Xm sa parehong halaga ng -Xmx.

* Para sa 32 bit Operating Systems at 32 bitJava:
64 bitJavaay mas mabuti kaysa 32 bitJava, ngunit 32 bitJavaay magtatrabaho hangga't ang server ay hindi talagang abala. Mientras mas maganda ang pisikal na memorya sa server, mas mabuti: 4+ Ang GB ay talagang mabuti, 2 GB ay okay, mas kaunti ay hindi inirerekomenda. May 32 bitJava, kahit na may saganang pisikal na memorya, Tomcat atJavaay hindi tatakbo kung ikaw ay magtatakda ng -Xmx na higit sa 1500M (1200M sa ilang computer) . Kung ang iyong server ay wala pang 2GB ng memorya, bawasan ang halaga ng -Xmx (sa 'M'ega Byte) sa 1/2 ng pisikal na memorya ng kompyuter.
* Sa 64 bit Operating Systems at 64 bitJava:
64 bitJavaay magtatrabaho lamang sa 64 na bit operating system.
    
    * KasamaJava8, kailangan niyong idagdag ang `-d64 sa Tomcat CATALINA\\_OPTS parameter sa setenv.bat
    * KasamaJava21, pinili mo ang 64 bitJavakapag nag-download ka ng bersyon ngJavaMinarkahan ng "64 bit".
    
May 64 bitJava, Tomcat atJavaay maaaring gumamit ng napaka-Xmx at -Xms settings. Mientras mas mahusay ang pisikal na memorya sa server. Bilang simpleng mungkahi: Iminumungkahi namin sa inyo ang set -Xmx at -Xms (sa 'M'ega Byte) sa 1/2 (o mas mababa) ng pisikal na memorya ng computer. Makikita mo kung Tomcat,Java, atERDDAP™ay tunay na tumatakbo sa 64 bit mode sa pamamagitan ng paghahanap ng "bakit," saERDDAP'Ang Daily Report email o sa _bigParent Directory_/logs/[log.txt](/docs/server-admin/additional-information#log)talaksan (_Gugpong Direktory_ ay itinakda sa[setup.xml](#setupxml)) .
#### Koleksiyon ng Basura{#garbage-collection} 
* Sa loobERDDAP™'[log.txt](/docs/server-admin/additional-information#log)talaksan, makikita mo ang maraming "GC (Pagkabigo ng Pananakop) " mga mensahe.
Karaniwan nang hindi ito problema. Ito ang madalas na mensahe mula sa isang normal na operasyonJavana nagsasabing katatapos lamang nito ng isang maliit na koleksiyon ng basura sapagkat wala itong silid sa Eden (bahagi ngJavamagbunton para sa napakabatang mga bagay) . Karaniwan nang ipinakikita sa iyo ng mensahe ang __memoryUse Bago ang_\\-ligt;_memoryUse Pagkatapos ng_. Kung ang dalawang numerong iyon ay magkalapit, nangangahulugan ito na ang koleksiyon ng basura ay hindi mabunga. Ang mensahe ay tanda lamang ng problema kung ito ay napakadalas (bawat ilang segundo) , hindi mabunga, at ang bilang ay malaki at hindi lumalaki, na sama - samang nagpapahiwatig naJavaKailangan ang higit pang memorya, ang pagsisikap na alisin ang memorya, at hindi kayang alisin ang memorya. Ito ay maaaring mangyari sa isang maigting na panahon, pagkatapos ay umalis. Subalit kung ito ay magpapatuloy, iyan ay isang tanda ng problema.
* Kung makita mo ang java.lang.OOOOOOFMemoryEror's inERDDAP™'[log.txt](/docs/server-admin/additional-information#log)talaksan, tingnan[Labas ng MemoryError](/docs/server-admin/additional-information#outofmemoryerror)kung paano susuriin at lulutasin ang mga problema.
         
### Mga Pagpapahintulot{#permissions} 
*   [Sa Linux at Macs, baguhin ang mga pahintulot](#permissions)sa lahat\\*.shmga talaksan sa _tomcat_/bin/ upang i-executable ng may-ari, e.g., kasama ang
```
    chmod +x \\*.sh  
```
### Mga Patak{#fonts} 
*   [Mga larawan:](#fonts)Mas gusto namin ang libre[Mga font ng DejaVu](https://dejavu-fonts.github.io/)sa isa paJavaMga font. Ang paggamit ng mga font na ito ay mahigpit na inirerekomenda ngunit hindi kinakailangan.
    
Kung hindi mo gagamitin ang mga font ng DejaVu, kailangan mong palitan ang font familyfamily setting sa setup.xml&lt;font Camily&gt;Serif&lt;/fontfamily glit; na makukuha ng lahatJavadistribusyon. Kung maglalagay ka ng fontfamily sa pangalan ng font na hindi magagamit,ERDDAP™ay hindi magkakarga at maglilimbag ng listahan ng magagamit na fonts sa log.txt file. Dapat mong gamitin ang isa sa mga font na iyon.
    
Kung pipiliin mong gamitin ang mga font ng DejaVu, pakisuyong tiyakin na ang font familyfamily setting sa setup.xml ay&lt;Butil Pamilya;DeijaVu Sans&lt;/font Camily gt;.
    
Upang mailuklok ang mga font ng DejaVu, pakisuyong download[Mga DejaVuFont.zip](/DejaVuFonts.zip)  (5,522,795 bytes, MD5=33E61FAB6A547851ED308B4FFFF42) at itapon ang font files sa isang temporary directory.
    
    * Sa Linux:
        * Para sa Linux Pag - aamponJavamga distribusyon, tingnan[Ang mga tagubiling ito](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/).
        * Kasama ng ibaJavamga distribusyon: Bilang gumagamit ng Tomcat, kopyahin ang font files sa _JAVA\\_HOME_/lib/fontsJavaay mahahanap ang fonts. Tandaan: kung/kapag nag-upgrade ka mamaya sa mas bagong bersyon ngJava, kailangan mong ilagay muli ang mga font na ito.
    * Sa Macs: sa bawat font file, dobleng klik dito at pagkatapos ay i-install ang Font.
    * Sa Windows 7 at 10: sa Windows Explorer, piliin ang lahat ng font files. Klik. Click na naka-install.
             
### Pagsubok sa Tomcat{#test-tomcat} 
* Subukin ang iyong instalasyon ng Tomcat.
    * Linux:
        * Bilang tagagamit na "tomcat", patakbuhin ang _tomcat_/bin/startup.sh
        * Tingnan ang iyong URL + ":8080/" sa iyong browser (e.g.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) .
        * Dapat mong tingnan ang Tomcat "Criise" page.
Kung may problema, tingnan ang Tomcat log file _tomcat_/logs/catalina.out.
    * Mac (ay tumatakbo upang maging ang tagapangasiwa ng sistema) :
        * Takbo _tomcat_/bin/startup.sh
        * Tingnan ang iyong URL + ":8080/" sa iyong browser (e.g.,[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) . Pansinin na sa hindi pagtupad, ang iyong Tomcat ay mararating mo lamang. Hindi ito maaaring puntahan ng publiko.
        * Dapat mong tingnan ang Tomcat "Criise" page.
Kung may problema, tingnan ang Tomcat log file _tomcat_/logs/catalina.out.
    * Windows localhost:
        
        * Hango sa Tomcat icon sa system tray, at pumili ng "Start service".
        * Pangmalas[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/), o marahil[ http://localhost:8080/ ](http://localhost:8080/), sa iyong browser. Pansinin na sa hindi pagtupad, ang iyong Tomcat ay mararating mo lamang. Hindi ito maaaring puntahan ng publiko.
        * Dapat mong tingnan ang Tomcat "Criise" page.
Kung may problema, tingnan ang Tomcat log file _tomcat_/logs/catalina.out.
            
### Mga problema sa instalasyon ng Tomcat?{#troubles-with-the-tomcat-installation} 
* Sa Linux at Mac, kung hindi mo maabot ang Tomcat o ang MacERDDAP™  (o marahil ay hindi mo sila maaabot mula sa isang computer sa labas ng iyong firewall) , maaari mong subukin kung si Tomcat ay nakikinig sa daungan 8080, sa pamamagitan ng pagmamakinilya (bilang ugat) sa isang command line ng server:
```  
    netstat -tuplen | grep 8080  
```
Iyan ay dapat na bumalik sa isang linya na may katulad na:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (kung saan ang '#' ay numero) , na nagpapahiwatig na isang prosesong "java" (Malamang na Tomcat) ay nakikinig sa port "8080" para sa "tcp" traffic. Kung walang ibinalik na mga linya, kung ang linya ay bumalik ay lubhang magkaiba, o kung ang dalawa o higit pang mga linya ay ibabalik, kung gayon maaaring magkaroon ng problema sa mga setting ng daungan.
* Tingnan ang Tomcat log file _tomcat_/logs/catalina.out. Mga problema sa paggamot at ilanERDDAP™Ang mga problema sa simula ay halos laging ipinakikita roon. Karaniwan na ito kapag una kang nagtayoERDDAP™.
* Tingnan ang[Tomcat](https://tomcat.apache.org/)website o maghanap ng tulong sa web, pero pakisuyong ipaalam sa amin ang mga problema ninyo at ang mga solusyong nakita ninyo.
* Tingnan ang[sa pagkuha ng karagdagang suporta](/docs/intro#support).
             
### ERDDAP™Nasisiyahan{#erddap-content} 
3.  [Itakda ang_tomcat_/content/erddapIayos ang mga file.](#erddap-content)  
Sa Linux, Mac, at Windows, download[ErddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (bersyon 1.0.0.0, 20333 bytes, MD5=2B8D2A5ED73E42B529C168C60B5, may petsang 2024-10-14) at itapon ito sa _tomcat_, na lumilikha_tomcat_/content/erddap.

    \\[May ilang naunang bersyon din:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEF2DF0F4BB34B34AD7C, na may petsang 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEF2DF0F4BB34B34AD7C, na may petsang 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, na may petsang 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, na may petsang 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE68C40B9A29362, na may petsang 2023-02-27) 
at itapon ito sa _tomcat_, na lumilikha_tomcat_/content/erddap.\\]
    
#### Iba Pang Direktoryo{#other-directory} 
Para sa Red Hat Enterprise Linux (RHEL) o para sa ibang mga sitwasyon kung saan hindi ka pinapayagang baguhin ang Tomcat directory o kung saan mo nais/kailangan na ilagay angERDDAP™directory sa ibang lugar sa ibang kadahilanan (Halimbawa, kung gumagamit ka ng Jetty sa halip na Tomcat) , dizip erddapCont.zipsa nais na directory (na ang tanging gumagamit ay=tomcat) at itinakda angerddapContentDirectorypag - aari ng sistema (e.g.,erddapContentDirectory=~tomcat/content/erddap) gayo'yERDDAP™ay makasusumpong ng bagong talaang ito ng nilalaman.
    
### setup.xml{#setupxml} 
*   [Basahin ang mga komento sa_tomcat_/content/erddap/ **setup.xml** ](#setupxml)at gawin ang hiniling na mga pagbabago. Ang setup.xml ay ang file na may lahat ng settings na nagtatakda kung paano ang iyongERDDAP™ay gumagawi.
Para sa panimulang setup, baguhin mo sa paano man ang mga tagpong ito:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Kapag nililikha mo ang malaking Direktoryo ng Party, mula sa magulang na directory ng BigParent Direktory:
    
    * Make user=tomcat ang may-ari ng malaking Direktoryo ng Party, e.g.,
```
        chown -R tomcat _bigParentDirectory_
```
    * Palitan ang "grupo" upang maging tomcat, ang inyong username, o ang pangalan ng isang maliit na grupo na kinabibilangan ng tomcat at lahat ng mga administrador ng Tomcat/ERDDAP, e.g.,
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Pagbabago ng pahintulot upang ang tomcat at ang grupo ay makabasa, makasulat, makapaggawad ng mga pribilehiyo, e.g,.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Tanggalin ang "iba pang" pahintulot ng gumagamit na bumasa, sumulat, o pumatay. Mahalaga ito upang maiwasan ang posibleng sensitibong impormasyon sa pagbabasaERDDAP™Mga file at file na may impormasyon tungkol sa mga pribadong dataset.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Kakaibang Kapaligiran{#environment-variables} 
Pasimula saERDDAP™v2.13,ERDDAP™Maaaring maagaw ng mga administrador ang anumang halaga sa setup.xml sa pamamagitan ng pagtatakda sa isang kapaligiran na iba - iba ang pangalanERDDAP\\__halaga Naname_ bago tumakboERDDAP™. Halimbawa, gamitinERDDAP\\_baseUrl ang nangingibabaw sa&lt;halaga ng base-Urlgt. Ito'y maaaring magamit kapag naglalagayERDDAP™na may lalagyan na gaya ng Docker, yamang maaari mong ilagay ang mga pamantayang setting sa setup.xml at pagkatapos ay magtustos ng pantanging mga setting sa pamamagitan ng iba't ibang kapaligiran. Kung magbibigay ka ng lihim na impormasyonERDDAP™Sa pamamagitan ng paraang ito, tiyakin na ang impormasyon ay mananatiling lihim.ERDDAP™basahin lamang ang kapaligiran na pabagu - bago minsan sa bawat startup, sa unang segundo ng startup, kaya ang isang paraan upang gamitin ito ay: itakda ang iba't ibang kapaligiran, magsimulaERDDAP, maghintay hanggang saERDDAP™ay sinisimulan, pagkatapos ay hindi pa naitatakda ang iba't ibang kapaligiran.
    
### datasets.xml {#datasetsxml} 
* Basahin ang mga komento sa[ **Paggawang kasama ng mga kapatiddatasets.xmlLarawan** ](/docs/server-admin/datasets). Sa kalaunan, pagdating moERDDAP™tumatakbo sa unang pagkakataon (karaniwang kasama lamang ang default datasets) , babaguhin mo ang XML sa_tomcat_/content/erddap/ **datasets.xml** upang tiyakin ang lahat ng datos na gusto moERDDAP™upang maglingkod. Dito mo gugugulin ang malaking bahagi ng iyong panahon habang nagtatayoERDDAP™at mamaya habang pinananatili ang iyongERDDAP™.

Makikita mo ang isang halimbawa[datasets.xmltungkol sa GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml).
     
*    (Di - inaasahan) Ngayon o (bahagyang malamang) sa hinaharap, kung nais mong baguhin ang talaksang CSS ng erddap, gumawa ng isang kopya ng_tomcat_/content/erddap/images/erddapStart2.cs na tinatawag na erddap2.cs at pagkatapos ay gumagawa ng mga pagbabago rito. Ang mga pagbabago tungo sa erddap2.cs ay nangyayari lamang kapagERDDAP™ay muling naka-arte at kadalasan ay nangangailangan din ang gumagamit na alisin ang mga screw na file ng browser.
     
ERDDAP™hindi gagana nang wasto kung ang setup.xml odatasets.xmlAng talaksan ay hindi isang mahusay-pormal na talaksang XML. Kaya, pagkatapos na ayusin mo ang mga file na ito, isang mabuting ideya upang matiyak na ang resulta ay maayos na XML sa pamamagitan ng paglalagay ng XML text sa isang XML checker tulad ng XML[Paglaganap ng xmlvalid](https://www.xmlvalidation.com/).
     
### Iluklok ang erddap.war file{#install-the-erddapwar-file} 
4. Sa Linux, Mac, at Windows, download[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)sa _tomcat_/webapps .
     (bersyon 2.27.0, 620,554,403 bytes, MD5=3b2086c659eee4145ca2dff447bf4ef7, pinetsahang petsa 06-11-2025) 
    
Ang talaksang .war ay malaki dahil ito ay naglalaman ng mataas na resolution baybayin, hangganan, at taas na mga datos na kinakailangan upang lumikha ng mga mapa.
    
    \\[May ilang naunang bersyon din na makukuha.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42EB9591F773EA848D, na may petsang 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 bytes, MD5=461325E97E7577EC671DD50246CB8B, na may petsang 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CFF805893146E932E498FDBD19B6, na may petsang 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bytes, MD5=2B33354F633294213AE2AF4DCF4DA6D0, na may petsang 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCA8FD5F, na may petsang 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b807756eecbc898e, na may petsang 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 bytes, MD5=652AFC9D1421F00B5F789DA2C4732D4C, na may petsang 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 bytes, MD5=99a725108b37708e5420986c16a119, na may petsang 2025-03-31) 
    \\]
    
#### MGA DUGO{#proxypass} 
5. Gumamit ng EXPO Hindi na kailangang ilagay ng mga gumagamit nito ang port number, e.g., :8080, sa URL.
Sa mga computer na Linux, kung ang Tomcat ay tumatakbo sa Apache, pakisuyong baguhin ang Apachehttpd.conf file (Karaniwan sa /etc/httpd/conf/) upang payagan ang trapiko ng HTTP sa/mulaERDDAP™nang hindi nangangailangan ng port number, e.g., :8080, sa URL. Bilang tagagamit ng ugat:
    1. Bigyang - diin ang umiiral&lt;HalosHostgt; tag (kung may isa) , o magdagdag ng isa sa dulo ng talaksan:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Pagkatapos ay restart Apache: /usr/sbin/apachectl -k Maganda (ngunit kung minsan ito ay nasa ibang directory) .
         
### GAINX{#nginx} 
 (UNCOMMON) Kung ginagamit mo[GAINX](https://www.nginx.com/)  (isang web server at tagabalanse ng karga) :
upang makakuha ng NGINX atERDDAP™gumagawa nang tamahttps, kailangan mong ilagay ang sumusunod na snippet sa loob ng Tomcat server.xml&lt;Hadlang:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
At sa talaksang pag-aayos ng nginx, kailangan mong ilagay ang mga header na ito:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Salamat kay Kyle Wilcox.)   
     
### Magsimulang Tomcat{#start-tomcat} 
*    (Hindi ko inirerekomenda ang paggamit ng Tomcat Web Application Manler. Kung hindi mo lubusang aalisin at sisimulan ang Tomcat, sa malao't madali ay magkakaroon ka ng mga isyu sa memorya ng PermGen.)   
     
*    (Sa Linux o Mac OS, kung nakalikha ka na ng isang pantanging tagagamit upang patakbuhin ang Tomcat, e.g., tomcat, tandaan na gawin ang sumusunod na mga hakbang gaya ng gumagamit na iyon.)   
     
* Kung tumatakbo na si Tomcat, isara ang Tomcat kasama si Tomcat (sa Linux o Mac OS) _Tomcat_/bin/shutdown.sh
o (sa Windows) _Tomcat_\\bin\\shutdown.bat
    
Sa Linux, gumamit ng ps -ef|Trep tomcat bago at pagkatapos ng pag - alis.sh upang matiyak na ang proseso ng tomcat ay huminto na. Ang proseso ay dapat na itala bago ang paghinto at sa wakas ay hindi itala pagkatapos ng paghinto. Maaaring kumuha ng isa o dalawang minuto para ritoERDDAP™upang lubusang magsara. Maging matiyaga. O kung parang hindi ito hihinto sa ganang sarili, gamitin ito:
pagpatay -9 _processID_
    
* Magsimula Ka sa Tomcat (sa Linux o Mac OS) _Tomcat_/bin/startup.sh
o (sa Windows) _Tomcat_\bin\\startup.bat

## AyERDDAP™tumatakbo?{#is-erddap-running} 
Gumamit ng browser para makita http://_www.YourServer.org_/erddap/status.html   
ERDDAP™ay nagsisimula nang walang anumang datasets na nakakarga. Nakakarga ang mga Data sa isang sinulid sa likuran kaya't nagiging makukuhang one-by-one.

### Pagputok ng Problema{#troubleshooting} 
* Kapag may dumating na kahilingan mula sa gumagamit, nagtutungo ito sa Apache (sa mga computer ng Linux at Mac OS) , pagkatapos Tomcat, pagkataposERDDAP™.
* Makikita mo kung ano ang nangyayari sa Apache (at kaugnay na mga pagkakamali) sa mga log file ng Apache.
*   [Ikaw](/docs/server-admin/additional-information#tomcat-logs)kung ano ang nangyayari kay Tomcat (at kaugnay na mga pagkakamali) sa mga log file ng Tomcat (_Tomcat_/logs/catalina.out at iba pang files sa directory na iyon) .
*   [Ikaw](/docs/server-admin/additional-information#log)kung ano ang nangyayariERDDAP, suriin ang mga mensahe mula saERDDAP, at maling mga mensahe mula saERDDAP, sa loobERDDAP™ &lt;Malaking Direktorygt;log/log.txt file.
* Hindi nagsisimula si TomcatERDDAP™hanggang sa makuha ni Tomcat ang kahilinganERDDAP™. Kaya makikita mo sa Tomcat log files kung ito ay magsisimulaERDDAP™o kung may maling mensahe na nauugnay sa pagtatangkang iyon.
* KailanERDDAP™Nagsisimula, binabago nito ang pangalan ng matandaERDDAP™log.txt file (logArchived At_CurrentTime_.txt) at lumilikha ng bagong log.txt file. Kaya kung ang logo. Ang talaksang txt ay luma na, ito ay tanda naERDDAP™ay hindi na muling nag - aral kamakailan.ERDDAP™Sumulat ng log info sa isang neutral at isinusulat lamang paminsan - minsan ang buffer sa log file, subalit maaari kang pilitinERDDAP™.../erddap/status.html.

### Suliranin: Lumang Aklat ngJava {#trouble-old-version-of-java} 
Kung gumagamit ka ng bersiyon ngJavana napakatanda na para saERDDAP,ERDDAP™hindi tatakbo at makikita mo ang maling mensahe sa log file ni Tomcat na gaya ng
Maliban sa sinulid na "main" juva.lang.Un supportedClassVersionError:
_Iba/class/name_: Hindi suportado ang major.minor version _SomeNumber_
Ang solusyon ay i - update ang pinakabagong bersiyon ngJavaat tiyakin na ginagamit ito ni Tomcat.

### Suliranin: Mabagal na Unang Pagsisimula{#trouble-slow-startup-first-time} 
Kailangang magtrabaho nang husto si Tomcat sa unang pagkakataon ng aplikasyon na gaya ngERDDAP™ay sinisimulan; lalo na, kailangang buksan nito ang erddap. talaksang digmaan (na parang.ziptalaksan) . Sa ilang server, ang unang pagtatangkang magmasidERDDAP™mga puwesto (30 segundo?) hanggang sa matapos ang gawaing ito. Sa ibang server, ang unang pagtatangka ay mabibigo agad. Subalit kung maghihintay ka ng 30 segundo at sisikaping muli, magtatagumpay ito kungERDDAP™ay tamang ikinabit.
Walang solusyon dito. Ganito lamang gumagana ang Tomcat. Subalit ito'y nangyayari lamang sa unang pagkakataon pagkatapos mong maglagay ng isang bagong bersiyon ngERDDAP™.

## Ibagsak at ulitin{#shut-down-and-restart} 
Sa hinaharap, upang magsara (at muling pag - uusap)  ERDDAP, tingnan[Kung Paano Patatahimikin at Ipahinga ang Tomcat atERDDAP](/docs/server-admin/additional-information#shut-down-and-restart).
## Suliranin?{#trouble} 
Mga Suliranin sa pagkabit ng Tomcat oERDDAP? Tingnan ang[sa pagkuha ng karagdagang suporta](/docs/intro#support).
## Email Notification of New Versions ofERDDAP {#email-notification-of-new-versions-of-erddap} 
Kung nais mong tumanggap ng email kailanma't may bagong bersiyon ngERDDAP™o iba pang mahalagaERDDAP™Mga patalastas, maaari kang sumali saERDDAP™listahan ng mga patalastas[dito](https://groups.google.com/g/erddap-announce). Ang talaang ito ay may katamtamang bilang na humigit - kumulang isang email tuwing ikatlong buwan.
## Kaugalian{#customize} 
[Gawing kaugalian ang iyongERDDAP™upang itampok ang inyong organisasyon (hindiNOAA ERD) .](#customize)
    * Palitan ang baner na nasa itaas ng lahatERDDAP™.html pahina sa pamamagitan ng pag - aayos ng mga pahina&lt;SimulaBodyHtml5 gt; tag sa iyongdatasets.xmltalaksan. ( Kung walang isa man, kopyahin ang default mula saERDDAP'
        \\[tomcat\\]/webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml file intodatasets.xmlat ayusin ito.) Halimbawa, maaari mong sabihin:
        * Gumamit ng ibang larawan (I.e., logo ng inyong organisasyon) .
        * Palitan ang kulay sa likuran.
        * Pagbabago "ERDDAP" to "_Youganization_'sERDDAP"
        * Palitan ang "Easier access sa datos ng agham" sa "Easier access of _Organization_'s data".
        * Palitan ang "Brought to you sa pamamagitan ng" links upang maging links sa iyong organisasyon at mga mapagkukunan ng pondo.
    * Palitan ang impormasyon sa kaliwang bahagi ng home page sa pamamagitan ng pagsasaayos ng&lt;Ang ShortDescriptionHtml&gt; tag sa iyong pangalandatasets.xmltalaksan. ( Kung walang isa man, kopyahin ang default mula saERDDAP'
        \\[tomcat\\]/webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml file intodatasets.xmlat ayusin ito.) Halimbawa, maaari mong sabihin:
        * Ilarawan kung ano ang ginagawa ng iyong organisasyon at/o grupo.
        * Ilarawan kung anong uri ng datos itoERDDAP™na ngayon.
    * Upang baguhin ang larawan na lumilitaw sa mga buslo, ilagay ang favicon ng inyong organisasyon. Ico sa_tomcat_/content/erddap/ Mga larawan/ . Tingnan[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon).
