---
sidebar_position: 1
---

# Beállítás
Hogyan kell csinálni a kezdeti beállítástERDDAP™A szervered


ERDDAP™futhat bármely olyan szerveren, amely támogatjaJavaTomcat (más alkalmazásszerverek, mint a Jetty, de nem támogatjuk őket) ...ERDDAP™tesztelték a Linuxot (beleértve az Amazon AWS-t) Mac és Windows számítógépek.
*    **Docker** - Biztosítunk[ERDDAP™egy Docker konténerben](https://hub.docker.com/r/erddap/erddap)IOOS most kínál egy[Gyors indítási útmutatóERDDAP™egy Docker Container](https://ioos.github.io/erddap-gold-standard/index.html)...
Ez a szabványERDDAP™telepítés egy Docker konténerben.
Docker Könnyű módszereket biztosítunk a ssl és a monitorozás létrehozásához, többet olvasunk ki[Docker dokumentáció](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md)...
Ha már használja Docker, akkor valószínűleg inkább a Docker verzió.
Ha felhőszolgáltatásokat szeretne futtatni, valószínűleg inkább a Docker verziót fogja előnyben részesíteni.
*    **Amazon** - Ha telepítiERDDAP™az Amazon Web Services EC2 esetben lásd ezt[Amazon Web Services áttekintés](/docs/server-admin/additional-information#amazon)először.
*    **Linux és Macska** -ERDDAP™nagyszerűen működik a Linux és a Mac számítógépeken. Lásd az alábbi utasításokat.
*    **Windows Windows** - A Windows jó a teszteléshezERDDAP™és személyes használatra (lásd az alábbi utasításokat) , de nem javasoljuk, hogy használja a nyilvánosság számáraERDDAPS. RunningERDDAP™Windows-on problémák merülhetnek fel: nevezetesen,ERDDAP™Lehet, hogy nem tudja törölni és / vagy renesz fájlokat gyorsan. Ez valószínűleg a víruskereső szoftver miatt van (pl. McAfee és Norton) amely ellenőrzi a vírusok fájljait. Ha belefutsz erre a problémára (amelyet hibás üzenetek láthatnak a[Log.txt](/docs/server-admin/additional-information#log)olyan fájl, mint a "Lehetetlen törölni ...") A víruskereső szoftver beállításainak megváltoztatása részben enyhítheti a problémát. Vagy inkább egy Linux vagy Mac szerver használata.

 **A szabványERDDAP™telepítési utasítások Linux, Macs és Windows számítógépek:** 

0. Győződjön meg róla, hogy minden függőséget telepítenek. A nem Windows gépeken (Linux és Mac) csh.
## Java {#java} 
1.  [MertERDDAP™v2.19+, létrehozvaJava21.](#java)
Biztonsági okokból szinte mindig a legjobb, ha a legújabb verziót használjaJava21.
Kérjük, töltse le és telepítse a legújabb verziót
    [Adoptium OpenJDK (Temurin) 21. (LTS) ](https://adoptium.net/temurin/releases/?version=21)... A telepítés ellenőrzése, a "/_javaJreBinDirectory_/java -version" típus, például
/usr/local/jdk-21.0.3+9/jre/bin/java - Verzió
    
    ERDDAP™munkávalJavamás forrásokból, de javasoljuk az Adoptiumot, mert ez a fő, közösségi támogatott, ingyenes (mint a sör és a beszéd) verzióJava21, amely hosszú távú támogatást kínál (ingyenes frissítések sok éven át a kezdeti kiadás) ... Biztonsági okokból, kérjük, frissítse aERDDAP"A verzióJavarendszeresen, mint új verziókJava21 elérhetővé válik az Adoptiumtól.
    
    ERDDAP™Tesztelt és használt széles körben 21, nem más verziók. Különböző okokból nem tesztelünk, és nem támogatunk más verziókatJava...
     
## Tomcat{#tomcat} 
2.  [Beállítás](#tomcat) [Tomcat](https://tomcat.apache.org)...
Tomcat a legszélesebb körben használtJavaApplication Server, amelyJavaolyan szoftver, amely az operációs rendszer hálózati szolgáltatásai ésJavaszerver szoftver, mint példáulERDDAP™... Ez ingyenes és nyílt forráskódú szoftver (FOSS) ...
    
Használhat másikatJavaApplication Server (pl. Jetty) De csak teszteljük és támogatjuk a Tomcatot.
     
    
    * Tomcat letöltése és kicsomagolása a szerverén vagy a PC-n.
Biztonsági okokból szinte mindig a legjobb, ha a Tomcat 10 legújabb verzióját használja (a 9. és az alábbi verzió nem elfogadható) amelynek célja, hogy együtt dolgozzonJava21 vagy újabb. Az alábbiakban a Tomcat könyvtárat _tomcat_-nak nevezik.
        
Figyelmeztetés&#33; Ha már van egy Tomcat fut más webes alkalmazás (különösen a THREDDS) Javasoljuk, hogy telepítseERDDAP™benne[egy második Tomcat](/docs/server-admin/additional-information#second-tomcat)mertERDDAP™különböző Tomcat beállításokra van szüksége, és nem kell más memóriaalkalmazásokkal konfrontálni.
        
        * Linuxon,[Töltse le a "Core" "tar.gzTomcat elosztás](https://tomcat.apache.org/download-10.cgi)és kicsomagolja. Javasoljuk, hogy csomagolja ki /usr / helyi.
        * Egy Mac-en a Tomcat valószínűleg már telepített / Könyvtár / Tomcat, de frissítenie kell a Tomcat 10 legújabb verziójára.
Ha letölti,[Töltse le a "Core" "tar.gzTomcat elosztás](https://tomcat.apache.org/download-10.cgi)és kicsomagolja / Könyvtár / Tomcat.
        * Windows-on, akkor lehet[letölteni a "Core" "zip" Tomcat elosztást](https://tomcat.apache.org/download-10.cgi)  (amely nem zavarja a Windows-nyilvántartást, és amelyet egy DOS parancssorból irányít) és egy megfelelő könyvtárba csomagolja. (A fejlesztéshez használjuk a "Core" "zip" elosztást. Készítünk egy / programok könyvtárat és kicsomagoljuk ott.) Vagy letöltheti a "Core" "64 bites Windows zip" elosztást, amely több funkciót tartalmaz. Ha a disztribúció Windows telepítő, akkor valószínűleg a Tomcat-t helyezi, például /Program Files/apache-tomcat-10.0.23 .
             
### szerver.xml{#serverxml} 
*   [szerver.xml](#serverxml)- A _tomcat_/conf/server.xml fájlban két változást kell végrehajtania a kettőnek.&lt;Connector&gt; címkék - az egyik
```
        <Connector port="8080" 
```
és egy
```
        <Conector port="8443"
```
    1.   (Ajánlott) Növelje a kapcsolatotTimeout paraméter érték, talán 300000 (Milliseconds)   (5 perc) ...
    2.   (Ajánlott) Új paraméter hozzáadása: relaxedQueryChars="\\[\\]|"..." Ez opcionális és kissé kevésbé biztonságos, de eltávolítja a felhasználók szükségességét, hogy százalékosan kódolja ezeket a karaktereket, amikor a felhasználó kérésére URL paramétereiben fordulnak elő.
             
### tartalom.xml{#contentxml} 
* kontextus.xml -- Resources Cache - _tomcat_/conf/context.xml-ben, közvetlenül azelőtt&lt;/Context&gt; címke, változtassa meg az erőforrások címkéjét (vagy add hozzá, ha már nincs ott) beállítani a cache MaxSize paraméter 80000:
    &lt;források cachingAllowed="true" cacheMaxSize="80000" /&gt;
Ez számos figyelmeztetést elkerül a katalinában. ki, hogy minden kezdődik
FIGYELEM\\[fő fő\\]org.apache.catalina.webresources.Cache.getResource Képtelen hozzáadni az erőforrást\\[/WEB-INF/osztály/...]
         
### Apache Timeout{#apache-timeout} 
* A Linux számítógépeken változtassa meg az Apache-idő beállításokat, hogy az időigényes felhasználói kérések ne ütközzenek (ami gyakran úgy tűnik, mint egy "Proxy" vagy "Bad Gateway" hiba) ... Mint a gyökérfelhasználó:
    1. Módosítsa az Apachehttpd.conf fájl (általában /etc/httpd/conf/) :
Változtassa meg a meglévő&lt;Timeout & gt; beállítás (vagy adjon hozzá egyet a fájl végén) 3600-ig (másodpercek) Az alapértelmezett 60 vagy 120 másodperc helyett.
Változtassa meg a meglévő&lt;ProxyTimeout & gt; beállítás (vagy adjon hozzá egyet a fájl végén) 3600-ig (másodpercek) Az alapértelmezett 60 vagy 120 másodperc helyett.
    2. Restart Apache: /usr/sbin/apachectl - k kegyes (de néha más könyvtárban van) ...
             
    * Biztonsági ajánlás: Lásd[Ezek az utasítások](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)a Tomcat telepítésének biztonságának növelése, különösen a közkiszolgálók számára.
         
    * A nyilvánosság számáraERDDAP™telepítések Linux és Macs, a legjobb, hogy hozzon létre Tomcat (a program) mint a felhasználó "tomcat" (egy külön felhasználó korlátozott engedélyekkel, és amely[nincs jelszó](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) ... Így csak a szuper felhasználó válthat arra, hogy felhasználói tomcatként működjön. Ez lehetetlenné teszi a hackerek számára, hogy bejelentkezzenek a szerverre, mint felhasználói tomcat. És mindenesetre meg kell tennie, hogy a tomcat felhasználó nagyon korlátozott engedélyekkel rendelkezik a szerver fájlrendszerén (olvassa el a + írás + execute kiváltságokat az apache-tomcat könyvtár fájáról és&lt;bigParentDirectory & gt; és a könyvtárak számára kizárólag kiváltságok olyan adatokkal, amelyekERDDAP™hozzáférést igényel).
        * Hozhatja létre a Tomcat felhasználói fiókját (amelynek nincs jelszava) a parancs használatával
sudo felhasználói tomcat -s /bin/bash -p '\\* "..."
        * A felhasználói tomcatként dolgozhat a parancs használatával
sudo su - tomcat
             (Azt fogja kérni, hogy a szuperfelhasználó jelszava engedélyt, hogy ezt.) 
        * Megállíthatja a munkát felhasználói tomcatként a parancs használatával
Kilépés
        * Tedd a Tomcat többi részét, ésERDDAP™beállítási utasítások, mint felhasználó "tomcat". Később futtassa az induló.sh-t és a shutdown.sh-t, mint felhasználói "tomcat", hogy a Tomcat engedélyt kapjon a naplófájljaira.
        * Tomcat csomagolása után az apache-tomcat könyvtár szülőjétől:
            
            * Változtassa meg az apache-tomcat könyvtár tulajdonosát a tomcat felhasználó számára.
Chown - R tomcat apache-tomcat-_10.0.23_
                 (de helyettesítse a tomcat könyvtárának tényleges nevét) ...
            * Változtassa meg a "csoport" tomcat, a felhasználónév, vagy a neve egy kis csoport, amely magában foglalja a tomcat és az összes adminisztrátorok Tomcat /ERDDAPpl.:
Chgrp - R _your Felhasználónév_ apache-tomcat-_10.0.23_
            * Változtassa meg az engedélyeket, hogy a tomcat és a csoport olvassa, írja, végrehajtsa a kiváltságokat, például.
chmod - R ug+rwx apache-tomcat-_10.0.23_
            * Távolítsa el a "másik" felhasználó engedélyeit az olvasáshoz, íráshoz vagy végrehajtáshoz:
chmod - R o-rwx apache-tomcat-_10.0.23_
Ez fontos, mert megakadályozza, hogy más felhasználók olvassák esetleg érzékeny információkatERDDAP™beállítás fájlok.
            
              
### Memory{#memory} 
* Állítsa be Tomcat környezeti változóit
    
Linuxon és Mac-en:
Készítsen fájlt _tomcat_/bin/setenv.sh (vagy a Red Hat Enterprise Linuxban\\[RHEL\\]szerkesztés ~tomcat/conf/tomcat10.conf) a Tomcat környezeti változóinak beállítása. Ezt a fájlt _tomcat_/bin/startup.sh és shutdown.sh fogja használni. A fájlnak tartalmaznia kell valamit:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (de helyettesítse a könyvtár neveit a számítógépről) ...
 (Ha korábban beállította a JRE\\_HOME-t, ezt eltávolíthatja.)   
Macskán valószínűleg nem kell beállítania a JAVA\\_HOME-t.

Windows:
Hozzon létre egy fájlt _tomcat_\bin\\setenv.bat, hogy beállítsa a Tomcat környezeti változóit. Ezt a fájlt _tomcat_bin\\startup.bat ésshutdown.bat... A fájlnak tartalmaznia kell valamit:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (de helyettesítse a könyvtár neveit a számítógépről) ...
Ha ez csak a helyi tesztek, távolítsa el a "szervert".
 (Ha korábban beállította a JRE\\_HOME-t, ezt eltávolíthatja.) 

A -Xmx és -Xms memória beállításai fontosak, mertERDDAP™jobban működik több memóriával. Mindig állítsa be -Xms azonos értékű, mint -Xmx.

* 32 bites operációs rendszer és 32 bitJava:
64 bitJavasokkal jobb, mint 32 bitJava32 bitJavaaddig fog működni, amíg a szerver nem igazán elfoglalt. Minél több fizikai memória a szerverben jobb: 4+ GB nagyon jó, 2 GB rendben van, kevésbé ajánlott. 32 bitJavaMég bőséges fizikai memóriával, Tomcattal ésJavanem fog futni, ha megpróbálja beállítani - Xmx felett 1500M (1200M néhány számítógépen) ... Ha a szerver kevesebb, mint 2 GB memória, csökkenti a -Xmx értéket (M'egaBytes) a számítógép fizikai memóriájának 1/2.
* 64 bites operációs rendszer és 64 bitJava:
64 bitJavacsak egy 64 bites operációs rendszeren fog működni.
    
    * EzzelJava8, hozzá kell adnia \\-d64-et a Tomcat CATALINA\\_OPTS paraméterhez a setenv.batban
    * EzzelJava21, 64 bitet választaszJavaha letölt egy verziótJavajelzett "64 bit".
    
64 bitJavaTomcat ésJavaHasználhat nagyon magas -Xmx és -Xms beállításokat. Minél több fizikai memória a szerverben jobb. Egy egyszerű javaslatként: javasoljuk, hogy állítsa be -Xmx és -Xms (M'egaBytes) 1/2 (vagy kevesebb) a számítógép fizikai memóriája. Láthatja, hogy Tomcat,JavaésERDDAP™valóban 64 bites módban fut, ha "harcot" keresünkERDDAPDaily Report e-mail vagy a _bigParentDirectory_/logs/[Log.txt](/docs/server-admin/additional-information#log)fájl (_bigParentDirectory_ meg van határozva[setup.xml](#setupxml)) ...
#### Garbage Collection{#garbage-collection} 
* InkábbERDDAP™A[Log.txt](/docs/server-admin/additional-information#log)fájl, látni fogja sok "GC (Elosztási hiba) Üzenetek.
Ez általában nem probléma. Ez egy gyakori üzenet egy normális működésbőlJavaazt mondta, hogy csak befejezte a kis szemet gyűjtését, mert Edenben kifutott a szobából (a szakasz aJavanagyon fiatal objektumokért) ... Általában az üzenet megmutatja _memoryUseBefore_\\-&gt;_memoryUseAfter_. Ha ez a két szám közel van egymáshoz, az azt jelenti, hogy a szemétgyűjtemény nem produktív. Az üzenet csak a baj jele, ha nagyon gyakori (néhány másodpercenként) nem termelő, és a számok nagyok és nem növekszik, ami együtt jelzi, hogyJavaTöbb memóriára van szükség, küzd a memória felszabadítására, és képtelen felszabadítani a memóriát. Ez stresszes idő alatt megtörténhet, majd elmúlhat. De ha továbbra is fennáll, ez a baj jele.
* Ha látja a java.lang.OutOfMemoryError inERDDAP™A[Log.txt](/docs/server-admin/additional-information#log)fájl, lásd[OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror)tippek a problémák diagnosztizálására és megoldására.
         
### Engedélyek{#permissions} 
*   [A Linuxon és a Mac-eken megváltoztatja az engedélyeket](#permissions)minden\\*.shfájlok _tomcat_/bin/ végrehajtható a tulajdonos, például, a
```
    chmod +x \\*.sh  
```
### Fonts{#fonts} 
*   [Fonts for images:](#fonts)Erősen előnyben részesítjük a szabad[DejaVu betűk](https://dejavu-fonts.github.io/)a másikJavaBetűtípusok. Ezeket a betűtípusokat erősen ajánlott, de nem szükséges.
    
Ha úgy dönt, hogy nem használja a DejaVu betűtípusokat, meg kell változtatnia a betűtípust Családi beállítás beállítás a setup.xml-ben&lt;Family & Gt;SansSerif&lt;/fontFamily&gt; amely mindennel elérhetőJavaelosztás. Ha betűtípus Családot hoz létre egy olyan betűtípus nevét, amely nem áll rendelkezésre,ERDDAP™Nem fog betölteni, és kinyomtatja a rendelkezésre álló betűk listáját a log.txt fájlban. Használnia kell az egyik ilyen betűtípust.
    
Ha úgy dönt, hogy használja a DejaVu betűk, kérjük, győződjön meg róla, hogy a betűcsalád beállítása setup.xml&lt;Betűtípus Family & gt;DejaVu Sans&lt;/fontFamily&gt;
    
A DejaVu betűk telepítéséhez kérjük, töltse le[DejaVuFonts.zip](/DejaVuFonts.zip)  (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FEF42) és zip a betűtípus fájlokat egy ideiglenes könyvtárba.
    
    * Linuxon:
        * Linux AdoptiumJavaelosztás, lásd[Ezek az utasítások](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/)...
        * MásokkalJavaelosztás: Mint a Tomcat felhasználó, másolja a betűtípus fájlokat a _JAVA\\_HOME_/lib/fonts ígyJavamegtalálhatja a betűket. Ne feledje: ha később frissítesz egy újabb verzióraJavaújra kell telepíteni ezeket a betűtípusokat.
    * Macskákon: minden betűtípushoz kettős kattintson rá, majd kattintson az Install Fontra.
    * Windows 7 és 10: a Windows Explorerben válassza ki az összes betűkészletet. Jobb kattintson. Kattintson az Installra.
             
### Tomcat teszt{#test-tomcat} 
* Tesztelje meg a Tomcat telepítését.
    * Linux:
        * Mint felhasználó "tomcat", futtassa _tomcat_/bin/startup.sh
        * Nézd meg az URL + ":8080/" böngésződben (pl.:[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) ...
        * Látnia kell a Tomcat "Congratulálok" oldalát.
Ha baj van, lásd a Tomcat log fájlt _tomcat_/logs/catalina.out.
    * Mac (Tomcat mint rendszer adminisztrátor felhasználó) :
        * Run _tomcat_/bin/startup.sh
        * Nézd meg az URL + ":8080/" böngésződben (pl.:[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) ... Ne feledje, hogy alapértelmezetten a Tomcat csak Ön számára hozzáférhető. Nem nyilvánosan hozzáférhető.
        * Látnia kell a Tomcat "Congratulálok" oldalát.
Ha baj van, lásd a Tomcat log fájlt _tomcat_/logs/catalina.out.
    * Windows helyihost:
        
        * Jobb kattintson a Tomcat ikonra a rendszer tálcájában, és válassza a "Start szolgáltatást".
        * Megtekintés[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)vagy talán[ http://localhost:8080/ ](http://localhost:8080/), a böngészőben. Ne feledje, hogy alapértelmezetten a Tomcat csak Ön számára hozzáférhető. Nem nyilvánosan hozzáférhető.
        * Látnia kell a Tomcat "Congratulálok" oldalát.
Ha baj van, lásd a Tomcat log fájlt _tomcat_/logs/catalina.out.
            
### Hiba a Tomcat telepítéssel?{#troubles-with-the-tomcat-installation} 
* Linuxon és Mac-en, ha nem éri el a Tomcatot vagyERDDAP™  (vagy talán nem érheti el őket egy számítógépről a tűzfalán kívül) , akkor tesztelheti, ha a Tomcat 8080-as portot hallgat, ha beírja (mint gyökér) a szerver parancssorán:
```  
    netstat -tuplen | grep 8080  
```
Ez vissza kell térnie egy sorba valami hasonlóval:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (ahol "#" van néhány számjegy) , jelezve, hogy egy "java" folyamat (feltehetően Tomcat) "8080" port hallgat a "tcp" forgalomra. Ha nem került sor, ha a vonal visszatért jelentősen más, vagy ha két vagy több vonalat hoztak vissza, akkor problémát jelenthet a kikötőbeállításokkal.
* Lásd a Tomcat log fájlt _tomcat_/logs/catalina.out. Tomcat problémák és néhányERDDAP™Az induló problémák szinte mindig ott vannak. Ez gyakori, amikor először felállítottákERDDAP™...
* Lásd:[Tomcat](https://tomcat.apache.org/)weboldal vagy keresse meg az internetet segítségért, de kérjük, ismerje meg a problémákat, amiket talált.
* Lásd:[rész további támogatás megszerzéséről](/docs/intro#support)...
             
### ERDDAP™Tartalom{#erddap-content} 
3.  [Állj fel_tomcat_/content/erddapkonfigurációs fájlok.](#erddap-content)  
Linux, Mac és Windows, letöltés[erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 2024-10-14) és zipogd be _tomcat_, teremtés_tomcat_/content/erddap...

    \\[Néhány korábbi verzió is elérhető:
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16)   
    [2.21.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19 810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19 810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19 810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, 2023-02-27) 
és zipogd be _tomcat_, teremtés_tomcat_/content/erddap...\\]
    
#### Egyéb könyvtár{#other-directory} 
A Red Hat Enterprise Linux (RHEL) vagy más helyzetekben, ahol nem lehet módosítani a Tomcat könyvtárat, vagy ahol akarja / szükséges, hogy tegye aERDDAP™tartalom könyvtár egy másik helyen valamilyen más okból (Például, ha a Jetty-t használja a Tomcat helyett) , Zip erddapContent.zipa kívánt könyvtárba (amelyhez csak a felhasználó=tomcat hozzáfér) és állítsa beerddapContentDirectoryRendszertulajdon (pl.:erddapContentDirectory=~tomcat/content/erddap) ígyERDDAP™megtalálhatja ezt az új tartalomjegyzéket.
    
### setup.xml{#setupxml} 
*   [Olvassa el a megjegyzéseket_tomcat_/content/erddap/ **setup.xml** ](#setupxml)és a kért változásokat. setup.xml a fájl az összes olyan beállítással, amely meghatározza, hogy aERDDAP™viselkedik.
Az eredeti beállításhoz legalább megváltoztathatja ezeket a beállításokat:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Amikor létrehozod a bigParentDirectory-t, a BigParentDirectory szülői könyvtárából:
    
    * Készítsen felhasználót / Tomcat a BigParentDirectory tulajdonosa, pl.
```
        chown -R tomcat _bigParentDirectory_
```
    * Változtassa meg a "csoport" tomcat, a felhasználónév, vagy a neve egy kis csoport, amely magában foglalja a tomcat és az összes adminisztrátorok Tomcat /ERDDAPpl.:
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Változtassa meg az engedélyeket, hogy a tomcat és a csoport olvassa, írja, végrehajtsa a kiváltságokat, például.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Távolítsa el a "másik" felhasználó engedélyeit az olvasáshoz, íráshoz vagy végrehajtáshoz. Ez fontos, hogy megakadályozzák az olvasást esetleg érzékeny információkERDDAP™naplófájlok és fájlok a magánadatok adatairól.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Környezeti lehetőségek{#environment-variables} 
KezdőlapERDDAP™v2.13,ERDDAP™Az adminisztrátorok felülírhatnak bármilyen értéket a setup.xml-ben egy környezeti változó meghatározásávalERDDAP\\__értékName_ futás előttERDDAP™... Például használjonERDDAP\\_baseUrl felülírja&lt;alapUrl&gt; érték. Ez hasznos lehet a telepítés soránERDDAP™egy olyan konténerrel, mint a Docker, mivel szabványos beállításokat lehet beállítani a setup.xml-be, majd speciális beállításokat kínálhat környezeti változókon keresztül. Ha titkos információkat nyújtERDDAP™ezen a módszeren keresztül győződjön meg róla, hogy az információ titokban marad.ERDDAP™csak a környezeti változókat olvassa el az induláskor, az első második indításban, így az egyik módja annak, hogy ezt használja: a környezeti változók beállítása, az indulásERDDAPVárjon, amígERDDAP™Elkezdődik, majd beállítja a környezet változóit.
    
### datasets.xml {#datasetsxml} 
* Olvassa el a megjegyzéseket[ **Együttműködésdatasets.xmlFile** ](/docs/server-admin/datasets)... Később, miután megkapodERDDAP™futás az első alkalommal (általában csak az alapértelmezett adatkészletekkel) Ön módosítja az XML-t_tomcat_/content/erddap/ **datasets.xml** megadni az összes adatkészletet, amit akarszERDDAP™szolgálni. Ez az, ahol eltölti az idejét, miközben felállítjaERDDAP™később, miközben fenntartja aERDDAP™...

Láthat egy példát[datasets.xmlGitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)...
     
*    (Valószínűleg) Most vagy (kissé valószínűbb) a jövőben, ha módosítani szeretné az erddap CSS fájlját, készítsen másolatot_tomcat_/content/erddap/images/erddapStart2.css néven erddap2.css, majd változtatni. Az erddap2.css változásai csak akkor lépnek hatályba, haERDDAP™újraindításra kerül, és gyakran megköveteli a felhasználótól, hogy törölje a böngésző csésze fájljait.
     
ERDDAP™nem működik megfelelően, ha a setup.xml vagydatasets.xmlA fájl nem egy jól kialakított XML fájl. Tehát, miután szerkesztette ezeket a fájlokat, ez egy jó ötlet, hogy ellenőrizze, hogy az eredmény jól formált XML az XML szöveg beillesztése egy XML ellenőrző, mint például[xmlvalidáció](https://www.xmlvalidation.com/)...
     
### Telepítse az erddap.war fájlt{#install-the-erddapwar-file} 
4. Linux, Mac és Windows, letöltés[erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)_tomcat_/webapps .
     (2.27.0, 620,554,403 bytees, MD5=3b2086c659eee4145ca2dff447bf4ef7, dátumozott 06-11-2025) 
    
A .war fájl nagy, mert magas állásfoglalási partvonalat, határt és emelési adatokat tartalmaz a térképek létrehozásához.
    
    \\[Néhány korábbi verzió is elérhető.
    [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 byte, MD5=461325E97E7577EC671D50246CCFB8B, 2022-02-23)   
    [2.21.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 bytes, MD5=F2CF805893146E932E498FDBD519B6, 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, 2024-11-07) 
    [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)  (607,404,032 byte, MD5=99a725108b37708e5420986c16a119, 2025-03-31) 
    \\]
    
#### ProxyPass{#proxypass} 
5. Használja Proxy Pass így a felhasználók nem kell a portszámot, pl.:8080, az URL-ben.
Linux számítógépeken, ha a Tomcat az Apache-ban fut, kérjük, módosítsa az Apache-thttpd.conf fájl (általában /etc/httpd/conf/) engedélyezni a HTTP forgalmat / aERDDAP™anélkül, hogy a portszámot, pl.:8080, az URL-ben. Mint a gyökérfelhasználó:
    1. A meglévő módosítás&lt;VirtualHost & gt; címke (ha van egy) , vagy adjon hozzá egyet a fájl végén:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Ezután indítsa el az Apache-t: /usr/sbin/apachectl - k kegyes (de néha más könyvtárban van) ...
         
### NGINX{#nginx} 
 (UgyeNCOMMON) Ha használja[NGINX](https://www.nginx.com/)  (webkiszolgáló és terhelési egyensúlyozó) :
annak érdekében, hogy NGINX ésERDDAP™megfelelően működikhttps, meg kell tenni a következő snippet belül Tomcat szerver.xml&lt;Host&gt; blokk:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
És a nginx konfigurációs fájlban meg kell határoznia ezeket a fejléceket:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Kyle Wilcoxnak köszönhetően.)   
     
### Kezdőlap Tomcat{#start-tomcat} 
*    (Nem ajánlom a Tomcat Web Application Manager használatát. Ha nem zárja le és indítsa el a Tomcatot, előbb vagy utóbb PermGen memóriaproblémái lesznek.)   
     
*    (Linuxban vagy Mac OS-ban, ha létrehozott egy speciális felhasználót, hogy futtassa a Tomcat-ot, például tomcat-ot, ne felejtse el a következő lépéseket, mint a felhasználó.)   
     
* Ha Tomcat már fut, zárja le Tomcat (Linux vagy Mac OS) _tomcat_/bin/shutdown.sh
vagy (Windows-ban) _tomcat_\\ binshutdown.bat
    
Linuxon használjon ps -ef|grep tomcat előtt és után shutdown.sh, hogy megbizonyosodjon arról, hogy a tomcat folyamat megállt. A folyamatot a leállítás előtt kell felsorolni, és végül nem szerepel a leállítás után. Lehet, hogy egy-két percet vesz igénybeERDDAP™teljesen leállni. Légy türelmes&#33; Vagy ha úgy néz ki, mintha nem hagyja abba a sajátját, használja:
gyilkosság -9 _processID_
    
* Start Tomcat (Linux vagy Mac OS) _tomcat_/bin/startup.sh
vagy (Windows-ban) _tomcat_\bin\\startup.bat

## AzERDDAP™futás?{#is-erddap-running} 
Használjon egy böngészőt, hogy megpróbálja megtekinteni http://_www.YourServer.org_/erddap/status.html   
ERDDAP™elkezdődik minden adatkészlet betöltése nélkül. Az adatkészleteket háttér szálba helyezik, így elérhetővé válik egy-egy.

### Hibaelhárítás{#troubleshooting} 
* Amikor egy felhasználó kérése érkezik, az Apache-ba megy (Linux és Mac OS számítógépeken) Aztán Tomcat, akkorERDDAP™...
* Láthatja, mi jön az Apache-hoz (és kapcsolódó hibák) az Apache log fájlokban.
*   [Te vagy](/docs/server-admin/additional-information#tomcat-logs)Láthatja, mi jön Tomcat (és kapcsolódó hibák) a Tomcat log fájlokban (_tomcat_/logs/catalina.out és más fájlok ebben a könyvtárban) ...
*   [Te vagy](/docs/server-admin/additional-information#log)Látni, mi jönERDDAPdiagnosztikai üzenetekERDDAPés hibaüzenetek aERDDAP, aERDDAP™ &lt;bigParentDirectory & gt;logs/log.txt fájl.
* Tomcat nem indulERDDAP™amíg Tomcat kérelmet kapERDDAP™... Tehát a Tomcat logfájljaiban látható, ha elkezdődöttERDDAP™vagy ha van egy hibaüzenet, amely ehhez a kísérlethez kapcsolódik.
* MikorERDDAP™kezdődik, újranevezi a régitERDDAP™log.txt fájl (logArchivedAt_CurrentTime_.txt) és létrehoz egy új log.txt fájlt. Tehát, ha a log. txt fájl régi, ez egy jel, hogyERDDAP™Nem nemrégiben újraindult.ERDDAP™logisztikai információt ír egy puffernek, és csak a puffert írja a logisztikai fájlba, de kényszeríthetiERDDAP™írja a puffert a naplófájlba látogatva .../erddap/status.html...

### Trouble: Régi verzióJava {#trouble-old-version-of-java} 
Ha egy verziót használJavatúl öreg ahhoz, hogyERDDAP,ERDDAP™Nem fog futni, és hibaüzenetet fog látni Tomcat logfájljában, mint
Kivétel a szálban "fő" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported fő.minor verzió _ SomeNumber_
A megoldás az, hogy frissítsük a legújabb verziójátJavaés győződjön meg róla, hogy a Tomcat használja.

### Hiba: Lassú indítás első alkalommal{#trouble-slow-startup-first-time} 
A Tomcatnak sok munkát kell végeznie az első alkalommal, amikor egy olyan alkalmazást kell végeznie, mintERDDAP™Elkezdődik; nevezetesen ki kell csomagolnia az erddapot. háborús fájl (olyan, mint egy.zipfájl) ... Egyes szervereken az első kísérlet, hogy megtekintseERDDAP™Hátrányok (30 másodperc?) amíg ez a munka befejeződik. Más szervereken az első kísérlet azonnal kudarcot vall. De ha 30 másodpercet vársz, és próbálj újra, akkor sikerül, haERDDAP™megfelelően telepítették.
Nincs javítás erre. Ez egyszerűen így működik Tomcat. De csak akkor fordul elő, amikor telepít egy új verziótERDDAP™...

## Shut lefelé és újraindítva{#shut-down-and-restart} 
A jövőben leállni (újraindítás)  ERDDAPlásd[Hogyan kell leülni és újraindítani TomcatotERDDAP](/docs/server-admin/additional-information#shut-down-and-restart)...
## Hiba?{#trouble} 
Tomcat vagyERDDAP? Lásd:[rész további támogatás megszerzéséről](/docs/intro#support)...
## E-mail értesítés az új verziókrólERDDAP {#email-notification-of-new-versions-of-erddap} 
Ha e-mailt szeretne kapni, amikor egy új változataERDDAP™elérhető vagy egyéb fontosERDDAP™bejelentések, csatlakozhatszERDDAP™Bejelentési lista[itt](https://groups.google.com/g/erddap-announce)... Ez a lista nagyjából egy e-mail három hónaponként.
## Testreszabás{#customize} 
[TestreszabjaERDDAP™Kiemelni a szervezetet (nemNOAA ERD) ...](#customize)
    * Változtassa meg a bannert, amely minden tetején megjelenikERDDAP™.html oldalak szerkesztésével&lt;startBodyHtml5 & gt; címke adatasets.xmlfájl. (Ha nincs egy, másolja az alapértelmezettetERDDAPA
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml fájlbadatasets.xmlszerkeszteni.) Például:
        * Használjon más képet (azaz a szervezet logója) ...
        * Változtassa meg a háttér színét.
        * Változás "ERDDAP"YourOrganization_'sERDDAP"..."
        * A "Könnyebb hozzáférés a tudományos adatokhoz" a "Könnyebb hozzáférés a _YourOrganization_ adataihoz".
        * Változtassa meg a "Brought to you" linkeket, amelyek kapcsolódnak a szervezetéhez és finanszírozási forrásokhoz.
    * Változtassa meg az információt a honlap bal oldaláról a szerkesztés révén&lt;TheShortDescriptionHtml & gt; címke adatasets.xmlfájl. (Ha nincs egy, másolja az alapértelmezettetERDDAPA
        \\[Tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml fájlbadatasets.xmlszerkeszteni.) Például:
        * Írja le, mit csinál a szervezet és/vagy csoport.
        * Írja le, hogy milyen adat ezERDDAP™van.
    * Ahhoz, hogy megváltoztassa az ikont, amely megjelenik a böngésző lapokon, helyezze a szervezet tanácsát. ico in_tomcat_/content/erddap/images/... Lásd[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon)...
