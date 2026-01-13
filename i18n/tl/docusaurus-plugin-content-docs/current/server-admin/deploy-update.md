---
sidebar_position: 2
---
# Update
Kung Paano Gagawin ang Isang Update ng Pag - iral ERDDAP™ sa Iyong Server

## Mga pagbabago{#changes} 
1. Gawin ang mga pagbabagong nakatala sa [Mga pagbabago](/changes) sa seksiyong pinamagatang "Mga Bagay na Mahalaga ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador" para sa lahat ng mga ERDDAP™ na mula pa noong bersyong ginagamit mo.
     
##  Java  {#java} 
2. Kung ikaw ay lumalayo ERDDAP™ bersyon 2.18 o sa ibaba, kailangan mong lumipat Java 25 (o mas bago) at ang kaugnay na Tomcat 10. Tingnan ang regular ERDDAP™ maglagay ng mga tagubilin para sa [ Java ](/docs/server-admin/deploy-install#java) at [Tomcat](/docs/server-admin/deploy-install#tomcat) . Kailangan mo ring kopyahin ang iyong _tomcat_/content/erddap directory mula sa iyong lumang instalasyon ng Tomcat sa iyong bagong instalasyon ng Tomcat.

## Ibaba{#download} 
3. Ibaba [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) sa _tomcat_/webapps .
     (bersyong 2.29.0, 706,788,135 bytes, MD5=A5ED0DCC8D46CA27640FFEB8CE48560, may petsang 12-15-2025) 
     
## .xml{#messagesxml} 
4. 
    * Karaniwan: Kung ikaw ay lumalayo ERDDAP™ bersyon 1.46 (o sa itaas) at gagamitin mo lamang ang pamantayang mga mensahe, ang bagong pamantayang mga mensahe.xml ay kusang iluluklok (kabilang ang mga talaksang .class sa pamamagitan ng erddap. digmaan) .
         
    * Pambihira: Kung ikaw ay lumalayo ERDDAP™ bersyon 1.44 (o sa ibaba) ,
Kayo ang mag - aalis ng lumang mga mensahe.
         _tomcat_/content/erddap /messages.xml .
Ang mga bagong pamantayang mensahe.xml ay awtomatikong iluluklok (kabilang ang mga talaksang .class sa pamamagitan ng erddap. digmaan) .
         
    * Pambihira: Kung lagi kang gumagawa ng mga pagbabago sa pamantayang mga mensahe. (kahalili) ,
kailangan mong gawin ang mga pagbabagong iyon sa bagong mga mensahe.
WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml pagkatapos ng erddap.war ay decompressed sa pamamagitan ng Tomcat).
         
    * Pambihira: Kung ikaw ay may dalang mensahe ng kaugalian. _tomcat_/content/erddap /,
kailangan mong malaman (sa pamamagitan ng diff) kung anong mga pagbabago ang ginawa sa mga default na mensahe.xml (na nasa bagong erddap. digmaan bilang
WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml) at baguhin ang iyong mga mensaheng pang-ugali.xml file alinsunod dito.
         
## Iluklok{#install} 
5. Iluklok ang bago ERDDAP™ sa Tomcat:
\\* Huwag gamitin si Tomcat Maler. Sa malao't madali ay magkakaroon ng mga isyu sa memorya sa PermGen. Mas mabuti na aktuwal na alisin at simulan ang Tomcat.
\\* Palitan ang mga reperensiya sa _tomcat_ sa ibaba ng aktuwal na Tomcat directory sa iyong computer.
     
### Linux at Macs{#linux-and-macs} 
1. Shutdown Tomcat: Mula sa command line, gamitin: _Tomcat_/bin/shutdown.sh
At gumamit ng ps -ef | Mag-rep tomcat upang tingnan kung/kapag nahinto na ang proseso. (Maaaring kumuha ng isa o dalawang minuto.) 
2. Alisin ang decompressed ERDDAP™ pagluklok: Sa _tomcat_/webapps, gamitin
erddap ng rm -rf
3. Tanggalin ang lumang erddap. talaksang pandigma: Sa _tomcat_/webapps, gamitin ang rm erddap. digmaan
4. Kopyahin ang bagong erddap. Ang talaksang pandigma mula sa pansamantalang directory hanggang sa _tomcat_/webapps
5. Restart Tomcat at ERDDAP : gamitin ang _tomcat_/bin/startup.sh
6. Pangmalas ERDDAP™ sa inyong browser upang tiyakin na ang natitirang bahagi ay nagtagumpay.
     (Kadalasan, kailangan mong subukan nang ilang beses at maghintay ng isang minuto bago mo makita ERDDAP™ .)   
             
### Windows{#windows} 
1. Shutdown Tomcat: Mula sa command line, gamitin ang: _Tomcat_\bin\\ shutdown.bat 
2. Alisin ang decompressed ERDDAP™ pagluklok: Sa _tomcat_/webapps, gamitin
del /S/Q erddap
3. Tanggalin ang lumang erddap. talaksang pandigma: Sa _tomcat_\\webapps, gumamit ng del erddap. digmaan
4. Kopyahin ang bagong erddap. talaksang pandigma mula sa pansamantalang directory hanggang sa _tomcat_\\webapps
5. Restart Tomcat at ERDDAP : gamitin ang _tomcat_\bin\\startup.bat
6. Pangmalas ERDDAP™ sa inyong browser upang tiyakin na ang natitirang bahagi ay nagtagumpay.
     (Kadalasan, kailangan mong subukan nang ilang beses at maghintay ng isang minuto bago mo makita ERDDAP™ .) 

Ang mga Suliranin ay Nagdudulot ng Problema ERDDAP ? Tingnan ang [sa pagkuha ng karagdagang suporta](/docs/intro#support) .
