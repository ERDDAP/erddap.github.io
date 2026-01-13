---
sidebar_position: 1
---

# Beállítás
Hogyan kell csinálni a kezdeti beállítást ERDDAP™ A szervered

 ERDDAP™ futhat bármely olyan szerveren, amely támogatja Java Tomcat (más alkalmazásszerverek, mint a Jetty, de nem támogatjuk őket) ...
 ERDDAP™ tesztelték a Linuxot (beleértve az Amazon AWS-t) Mac és Windows számítógépek.

*  **Docker** - Biztosítunk [ ERDDAP™ egy Docker konténerben](https://hub.docker.com/r/erddap/erddap) 
IOOS most kínál egy [Gyors indítási útmutató ERDDAP™ egy Docker Container](https://ioos.github.io/erddap-gold-standard/index.html) ...
Ez a szabvány ERDDAP™ telepítés egy Docker konténerben.
Docker Könnyű módszereket biztosítunk a ssl és a monitorozás létrehozásához, többet olvasunk ki [Docker dokumentáció](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) ...
Ha már használja Docker, akkor valószínűleg inkább a Docker verzió.
Ha felhőszolgáltatásokat szeretne futtatni, valószínűleg inkább a Docker verziót fogja előnyben részesíteni.
*  **Amazon** - Ha telepíti ERDDAP™ az Amazon Web Services EC2 esetben lásd ezt [Amazon Web Services áttekintés](/docs/server-admin/additional-information#amazon) először.
*  **Linux és Macska** - ERDDAP™ nagyszerűen működik a Linux és a Mac számítógépeken. Lásd az alábbi utasításokat.
*  **Windows Windows** - A Windows jó a teszteléshez ERDDAP™ és személyes használatra (lásd az alábbi utasításokat) ,
de nem javasoljuk, hogy használja a nyilvánosság számára ERDDAP™ telepítések. Running ERDDAP™ Windows-on problémák merülhetnek fel:
nevezetesen, ERDDAP™ Lehet, hogy nem tudja törölni és / vagy renesz fájlokat gyorsan. Ez valószínűleg a víruskereső szoftver miatt van
   (pl. McAfee és Norton) amely ellenőrzi a vírusok fájljait. Ha belefutsz erre a problémára
(amelyet hibaüzenetek láthat a [Log.txt](/docs/server-admin/additional-information#log) fájl, mint
"Lehetetlen törölni..."), a víruskereső szoftver beállításainak megváltoztatása részben enyhítheti a problémát. Vagy inkább egy Linux vagy Mac szerver használata.

 **A szabvány ERDDAP™ telepítési utasítások Linux, Macs és Windows számítógépek:** 

0. Győződjön meg róla, hogy minden függőséget telepítenek. A nem Windows gépeken (Linux és Mac) csh.

##  Java  {#java} 

1.  [Mert ERDDAP™ v2.29.0+, létrehozva Java 25.](#java) 
Biztonsági okokból szinte mindig a legjobb, ha a legújabb verziót használja Java 25.
Kérjük, töltse le és telepítse a legújabb verziót
    [Adoptium OpenJDK (Temurin) 25. (LTS) ](https://adoptium.net/temurin/releases/?version=25) ...
A telepítés ellenőrzése, futás `/javaJreBinDirectory/java - Verzió` Például
    `/usr/local/jdk-25.0.1+8/jre/bin/java - Verzió` ...

    ERDDAP™ munkával Java más forrásokból, de javasoljuk az Adoptiumot, mert ez a fő, közösségi támogatott,
szabad (mint a sör és a beszéd) verzió Java 25, amely hosszú távú támogatást kínál (ingyenes frissítések sok éven át a kezdeti kiadás) ...
Biztonsági okokból, kérjük, frissítse a ERDDAP "A verzió Java rendszeresen, mint új verziók Java 25 elérhetővé válik az Adoptiumtól.

    ERDDAP™ tesztelték és széles körben használták 25, nem pedig más verziókat. Különböző okokból nem tesztelünk, és nem támogatunk más verziókat Java ...
     
## Tomcat{#tomcat} 

2.  [Beállítás](#tomcat)   [Tomcat](https://tomcat.apache.org) ... Tomcat a legszélesebb körben használt Java Application Server,
ami Java olyan szoftver, amely az operációs rendszer hálózati szolgáltatásai és Java szerver szoftver, mint például ERDDAP™ ...
Ez ingyenes és nyílt forráskódú szoftver (FOSS) ...

Használhat másikat Java Application Server (pl. Jetty) De csak teszteljük és támogatjuk a Tomcatot.

   * Tomcat letöltése és kicsomagolása a szerverén vagy a PC-n.
Biztonsági okokból szinte mindig a legjobb, ha a Tomcat 10 legújabb verzióját használja (a 9. és az alábbi verzió nem elfogadható) 
amelynek célja, hogy együtt dolgozzon Java 25 vagy újabb. Az alábbiakban a Tomcat könyvtárat úgy fogják említeni, mint `Tomcat` ...

__Warning&#33;__ Ha már van egy Tomcat fut más webes alkalmazás (különösen a THREDDS) Javasoljuk, hogy telepítse ERDDAP™ benne
      [egy második Tomcat](/docs/server-admin/additional-information#second-tomcat) mert ERDDAP™ különböző Tomcat beállításokra van szüksége
és nem kell más memóriaalkalmazásokkal folytatni.

     * Linuxon, [Töltse le a "Core" "tar .gz Tomcat elosztás](https://tomcat.apache.org/download-10.cgi) és kicsomagolja.
Javasoljuk, hogy csomagolja be `/usr/local` ...
     * Egy Mac-en a Tomcat valószínűleg már telepítve van `/ Könyvtár / Tomcat` De frissítenie kell a Tomcat 10 legújabb verziójára.
Ha letölti, [Töltse le a "Core" "tar .gz Tomcat elosztás](https://tomcat.apache.org/download-10.cgi) és kicsomagolja `/ Könyvtár / Tomcat` ...
     * Windows-on, akkor lehet [letölteni a "Core" "zip" Tomcat elosztást](https://tomcat.apache.org/download-10.cgi) 
        (amely nem zavarja a Windows-nyilvántartást, és amelyet egy DOS parancssorból irányít) és egy megfelelő könyvtárba csomagolja.
        (A fejlesztéshez használjuk a "Core" "zip" elosztást. Készítünk `/programok` rendező és kicsomagolja ott.) 
Vagy letöltheti a "Core" "64 bites Windows zip" elosztást, amely több funkciót tartalmaz.
Ha a disztribúció Windows-berendezés, akkor valószínűleg a Tomcat-ot fogja bevezetni, például, `/Program Files/apache-tomcat-10.0.23` ...
             
### szerver.xml{#serverxml} 

*  [szerver.xml](#serverxml) - A `tomcat/conf/server.xml` fájl, van két változás, hogy meg kell tennie az egyes két ` <Connector> ` Tagok
   (Egy `&lt;Connector port="8080"` és egy `&lt;Conector port="8443"` ) ...
   1.  (Ajánlott) Növelje a `kapcsolat Időzítés` paraméterérték, talán 300000 (milliseconds, ami 5 perc) ...
   2.  (Ajánlott) Adjon hozzá egy új paramétert: `relaxálóQueryChars="[] | "..."` ... Ez opcionális és kissé kevésbé biztonságos,
de eltávolítja a felhasználók szükségességét, hogy százalékban kódolja ezeket a karaktereket, amikor a felhasználó kérésére URL paramétereiben fordulnak elő.
             
### tartalom.xml{#contentxml} 

* kontextus.xml - Resources Cache - In `tomcat/conf/context.xml` Jobb, mielőtt ` </Context> ` tag, változtassa meg az erőforrások címkéjét
   (vagy add hozzá, ha már nincs ott) beállítani a cache MaxSize paraméter 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Ez számos figyelmeztetést elkerül a katalinában. ki, hogy minden kezdődik
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* A Linux számítógépeken változtassa meg az Apache-idő beállításokat, hogy az időigényes felhasználói kérések ne ütközzenek
   (ami gyakran úgy tűnik, mint egy "Proxy" vagy "Bad Gateway" hiba) ... Mint a gyökérfelhasználó:
  * Módosítsa az Apache ` http d.conf` fájl (általában `/etc/ http d/conf/` ) :
    * Változtassa meg a meglévő ` <Timeout> ` beállítás (vagy adjon hozzá egyet a fájl végén) 3600-ig (másodpercek) Az alapértelmezett 60 vagy 120 másodperc helyett.
    * Változtassa meg a meglévő ` <ProxyTimeout> ` beállítás (vagy adjon hozzá egyet a fájl végén) 3600-ig (másodpercek) Az alapértelmezett 60 vagy 120 másodperc helyett.
  * Restart Apache: `/usr/sbin/apachectl - k kegyes`   (de néha más könyvtárban van) ...

### biztonság{#security} 
         
* Biztonsági ajánlás: Lásd [Ezek az utasítások](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) a biztonság növelése
a Tomcat telepítése, különösen a nyilvános szerverek számára.
         
* A nyilvánosság számára ERDDAP™ telepítések Linux és Macs, a legjobb, hogy hozzon létre Tomcat (a program) a felhasználóhoz tartozás `Tomcat` 
   (egy külön felhasználó korlátozott engedélyekkel, és amely [nincs jelszó](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) ...
Így csak a szuper felhasználó válthat arra, hogy felhasználóként cselekedjen `Tomcat` ... Ez lehetetlenné teszi a hackerek számára, hogy bejelentkezzenek a szerverre, mint felhasználó `Tomcat` ...
És mindenesetre meg kell tennie, hogy a `Tomcat` A felhasználónak nagyon korlátozott engedélyei vannak a szerver fájlrendszerén (read+write+execute kiváltságok
Mert `Apache-tomcat` rendező fa és ` <bigParentDirectory> ` és kizárólag kiváltságok a könyvtárak számára olyan adatokkal, amelyek ERDDAP™ hozzáférést igényel).
  * Létrehozhatja a `Tomcat` felhasználói fiók (amelynek nincs jelszava) a parancs használatával:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * A felhasználóként dolgozhat `Tomcat` a parancs használatával
    ```
    sudo su - tomcat
    ```
     (Azt fogja kérni, hogy a szuperfelhasználó jelszava engedélyt, hogy ezt.) 
    * Megállíthatja a munkát felhasználói tomcatként a parancs használatával
    ```
    exit
    ````
    * Tedd a Tomcat többi részét, és ERDDAP™ beállítási utasítások felhasználóként `Tomcat` ... Később futtassa a `startup.sh` és `leállítás. Árnyék` Szövegek felhasználóként `Tomcat` 
hogy a Tomcat engedélyt kapjon a naplófájljainak írására.
    * Tomcat kicsomagolása után, a szülőtől `Apache-tomcat` Rendező:
      * Változtassa meg az apache-tomcat könyvtár tulajdonosát a tomcat felhasználó számára.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (de helyettesítse a tomcat könyvtárának tényleges nevét) ...
      * Változtassa meg a "csoport" tomcat, a felhasználónév, vagy a neve egy kis csoport, amely magában foglalja a tomcat és az összes adminisztrátorok Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Változtassa meg az engedélyeket, hogy a tomcat és a csoport olvassa, írja, végrehajtsa a kiváltságokat:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Távolítsa el a "másik" felhasználó engedélyeit az olvasáshoz, íráshoz vagy végrehajtáshoz:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Ez fontos, mert megakadályozza, hogy más felhasználók olvassák esetleg érzékeny információkat ERDDAP™ beállítás fájlok.

### Memory{#memory} 

Állítsa be Tomcat környezeti változóit

* Linuxon és Mac-en:
Készítsen fájlt `Tomcat/bin/setenv.sh`   (vagy a Red Hat Enterprise Linuxban \\[ RHEL \\] szerkesztés `Tomcat/conf/tomcat10.conf` ) a Tomcat környezeti változóinak beállítása.
Ezt a fájlt használjuk `Tomcat/bin/startup.sh` és `leállítás. Árnyék` ... A fájlnak tartalmaznia kell valamit:
  ```
  export JAVA_HOME=/usr/local/jdk-25.0.1+8
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (de helyettesítse a könyvtár neveit a számítógépről) ...
   (Ha korábban `JRE_HOME` Ezt eltávolíthatja.) 
Macskákon valószínűleg nem kell beállítani `JAVA_HOME` ...

* Windows:
Készítsen fájlt `Tomcat\bin\\setenv.bat` a Tomcat környezeti változóinak beállítása.
Ezt a fájlt használjuk `Tomcat\bin\\startup.bat` és ` shutdown.bat ` ...
A fájlnak tartalmaznia kell valamit:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-25.0.1+8"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (de helyettesítse a könyvtár neveit a számítógépről) ...
Ha ez csak a helyi tesztek, távolítsa el a "szervert".
   (Ha korábban `JRE_HOME` Ezt eltávolíthatja.) 

A `-Xmx` és `-Xms` a memória beállításai fontosak, mert ERDDAP™ jobban működik több memóriával.
Mindig beállítás `-Xms` ugyanazzal az értékkel, mint `-Xmx` ...

* 32 bites operációs rendszer és 32 bit Java :
64 bit Java sokkal jobb, mint 32 bit Java 32 bit Java addig fog működni, amíg a szerver nem igazán elfoglalt.
Minél több fizikai memória a szerverben jobb: 4+ GB nagyon jó, 2 GB rendben van, kevésbé ajánlott.
32 bit Java Még bőséges fizikai memóriával, Tomcattal és Java Nem fog futni, ha megpróbálja beállítani `-Xmx` sokkal több, mint 1500M (1200M néhány számítógépen) ...
Ha a szerver kevesebb, mint 2 GB memória, csökkenti a `-Xmx` érték (M'egaBytes) a számítógép fizikai memóriájának 1/2.

* 64 bites operációs rendszer és 64 bit Java :
64 bit Java csak egy 64 bites operációs rendszeren fog működni.
  * Ezzel Java 8, hozzá kell adnia `-d64` a Tomcat `CATALINA_OPTS` paraméter `setenv.bat` ...
  * Ezzel Java 21, 64 bitet választasz Java ha letölt egy verziót Java jelzett "64 bit".

64 bit Java Tomcat és Java Használhat nagyon magas `-Xmx` és `-Xms` beállítások. Minél több fizikai memória a szerverben jobb.
Egyszerű javaslatként: javasoljuk, hogy állítsa be `-Xmx` és `-Xms` a (M'egaBytes) 1/2 (vagy kevesebb) a számítógép fizikai memóriája.
Láthatja, hogy Tomcat, Java és ERDDAP™ valóban 64 bites módban fut, ha "harcot" keresünk ERDDAP Daily jelentés e-mail
vagy a `bigParentDirectory/logs/ [Log.txt](/docs/server-admin/additional-information#log) ` fájl ( `bigParentDirectory[szerkesztés]` meg van határozva [setup.xml](#setupxml) ) ...

#### Garbage Collection{#garbage-collection} 

* Inkább ERDDAP™ A [Log.txt](/docs/server-admin/additional-information#log) fájl, látni fogja sok "GC (Elosztási hiba) Üzenetek.
Ez általában nem probléma. Ez egy gyakori üzenet egy normális működésből Java azt mondta, hogy csak befejezte a kis szemetet
gyűjtemény, mert kifutott a szobából Edenben (a szakasz a Java nagyon fiatal objektumokért) ... Általában az üzenet megmutatja neked
   `memóriaUseBefore-&gt; memóriaUseAfter` ... Ha ez a két szám közel van egymáshoz, az azt jelenti, hogy a szemétgyűjtemény nem produktív.
Az üzenet csak a baj jele, ha nagyon gyakori (néhány másodpercenként) nem termelő, és a számok nagyok és nem növekszik,
ami együtt jelzi, hogy Java Több memóriára van szükség, küzd a memória felszabadítására, és képtelen felszabadítani a memóriát.
Ez stresszes idő alatt megtörténhet, majd elmész. De ha továbbra is fennáll, ez a baj jele.
* Ha látod `java.lang.OutOfMemoryError` S. ERDDAP™ A [Log.txt](/docs/server-admin/additional-information#log) fájl,
lásd: [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) tippek a problémák diagnosztizálására és megoldására.
         
### Engedélyek{#permissions} 

*  [A Linuxon és a Mac-eken megváltoztatja az engedélyeket](#permissions) minden `*.sh` fájlok `Tomcat/bin/` végrehajtható a tulajdonos:
  ```
  chmod +x *.sh
  ```

### Fonts{#fonts} 

*  [Fonts for images:](#fonts) Erősen előnyben részesítjük a szabad [DejaVu betűk](https://dejavu-fonts.github.io/) a másik Java betűk.
Ezeket a betűtípusokat erősen ajánlott, de nem szükséges.

Ha úgy dönt, hogy nem használja a DejaVu betűtípusokat, meg kell változtatnia a betűtípust Családi beállítás beállítás a setup.xml-ben ` <fontFamily> SansSerif </fontFamily> ` ,
amely mindennel elérhető Java elosztás. Ha beállítás ` <fontFamily> ` egy olyan betűtípus neve, amely nem áll rendelkezésre, ERDDAP™ Nem tölt
és kinyomtatja a rendelkezésre álló betűk listáját a `Log.txt` fájl. Használnia kell az egyik ilyen betűtípust.

Ha úgy dönt, hogy használja a DejaVu betűk, kérjük, győződjön meg róla, hogy ` <fontFamily> ` beállítás a setup.xml ` <fontFamily> DejaVu Sans </fontFamily> ` ...

A DejaVu betűk telepítéséhez kérjük, töltse le [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bytes, MD5=33E1E61FAB06A547851ED308B4FEF42) 
és zip a betűtípus fájlokat egy ideiglenes könyvtárba.

  * Linuxon:
    * Linux Adoptium Java elosztás, lásd [Ezek az utasítások](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) ...
    * Másokkal Java elosztás: Mint a `Tomcat` felhasználó, másolja a betű fájlokat `JAVA_HOME/lib/fonts` így Java megtalálhatja a betűket.
Ne feledje: ha később frissítesz egy újabb verzióra Java újra kell telepíteni ezeket a betűtípusokat.
  * Macskákon: minden betűtípushoz kettős kattintson rá, majd kattintson az Install Fontra.
  * Windows 7 és 10: a Windows Explorerben válassza ki az összes betűkészletet. Jobb kattintson. Kattintson az Installra.
             
### Tomcat teszt{#test-tomcat} 

* Tesztelje meg a Tomcat telepítését.
  * Linux:
    * Mint felhasználó "tomcat", futás `Tomcat/bin/startup.sh` ...
    * Nézd meg az URL + ":8080/" böngésződben (pl.: [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) ...
  * Mac (Tomcat mint rendszer adminisztrátor felhasználó) :
    * Run `Tomcat/bin/startup.sh` ...
    * Nézd meg az URL + ":8080/" böngésződben (pl.: [ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/) ) ...
Ne feledje, hogy alapértelmezetten a Tomcat csak Ön számára hozzáférhető. Nem nyilvánosan hozzáférhető.
  * Windows helyihost:
    * Jobb kattintson a Tomcat ikonra a rendszer tálcájában, és válassza a "Start szolgáltatást".
    * Megtekintés [ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/) vagy talán [ http://localhost:8080/ ](http://localhost:8080/) , a böngészőben. Ne feledje, hogy alapértelmezetten a Tomcat csak Ön számára hozzáférhető. Nem nyilvánosan hozzáférhető.

Látnia kell a Tomcat "Congratulálok" oldalát.

Ha baj van, lásd a Tomcat logfájlt `tomcat/logs/catalina.out` ...

### Hiba a Tomcat telepítéssel?{#troubles-with-the-tomcat-installation} 

* Linuxon és Mac-en, ha nem éri el a Tomcatot vagy ERDDAP™   (vagy talán nem érheti el őket egy számítógépről a tűzfalán kívül) ,
tesztelheti, ha a Tomcat a 8080-as portot hallgatja, ha beírja (mint gyökér) a szerver parancssorán:

  ```
  netstat -tuplen | grep 8080
  ```

Ez vissza kell térnie egy sorba valami hasonlóval:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (ahol `#` Egyes számjegy) jelzi, hogy egy `java` folyamat (feltehetően Tomcat) "8080" port hallgat a "tcp" forgalomra.
Ha nem került sor, ha a vonal visszatért jelentősen más, vagy ha két vagy több vonalat hoztak vissza, akkor problémát jelenthet a kikötőbeállításokkal.

* Lásd a Tomcat log fájlt `tomcat/logs/catalina.out` ... Tomcat problémák és néhány ERDDAP™ Az induló problémák szinte mindig ott vannak.
Ez gyakori, amikor először felállították ERDDAP™ ...

* Lásd: [Tomcat](https://tomcat.apache.org/) weboldal vagy keresse meg az internetet segítségért, de kérjük, ismerje meg a problémákat, amiket talált.

* Lásd: [rész további támogatás megszerzéséről](/docs/intro#support) ...
             
###  ERDDAP™ Tartalom{#erddap-content} 
3.   [Állj fel `tomcat/content/erddap` konfigurációs fájlok.](#erddap-content) 
Linux, Mac és Windows, letöltés [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip) 
és bezárja azt `Tomcat` rendező, létrehozás `tomcat/content/erddap` ...

__Version 1.0.1, 20683 byte, MD5=98a8099e7e674da59fe35e9c96efa7b5, 2025-06-02_

Néhány korábbi verzió is elérhető:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, 2022-02-16) 
    *  [2.21.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19 810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19 810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19 810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, 2023-02-27) 

#### Egyéb könyvtár{#other-directory} 

A Red Hat Enterprise Linux (RHEL) vagy más helyzetekben, ahol nem lehet módosítani a Tomcat könyvtárat, vagy ahol akarja / szükséges
tegyük fel ERDDAP™ tartalom könyvtár egy másik helyen valamilyen más okból (Például, ha a Jetty-t használja a Tomcat helyett) ,
Zip `erddapContent .zip ` a kívánt könyvtárba (amely csak `Tomcat` felhasználó hozzáféréssel rendelkezik) és állítsa be ` erddapContentDirectory ` Rendszertulajdon
 (pl. ` erddapContentDirectory  =~tomcat/content/erddap ` ) így ERDDAP™ megtalálhatja ezt az új tartalomjegyzéket.

### setup.xml{#setupxml} 

*  [Olvassa el a megjegyzéseket `tomcat/content/erddap/setup.xml` ](#setupxml) és a kért változásokat. setup.xml a fájl az összes olyan beállítással, amely meghatározza, hogy a ERDDAP™ viselkedik.

Az eredeti beállításhoz legalább megváltoztathatja ezeket a beállításokat:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` beállítások
      *  ` <admin...> ` beállítások
      *  ` <baseHttpsUrl> `   (Amikor létrehoztál https ) 

Amikor létrehozod a bigParentDirectory-t, a BigParentDirectory szülői könyvtárából:

    * Készítsd el `Tomcat` felhasználó a tulajdonos a `bigParentDirectory[szerkesztés]` :
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Változtassa meg a "csoport" tomcat, a felhasználónév, vagy a neve egy kis csoport, amely magában foglalja a tomcat és az összes adminisztrátorok Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Változtassa meg az engedélyeket, hogy a tomcat és a csoport olvassa, írja, végrehajtsa a kiváltságokat:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Távolítsa el a "másik" felhasználó engedélyeit az olvasáshoz, íráshoz vagy végrehajtáshoz. Ez fontos megelőzni az olvasást esetleg érzékeny információ
benne ERDDAP™ naplófájlok és fájlok a magán adatkészletekről szóló információkkal.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Környezeti lehetőségek{#environment-variables} 

Kezdőlap ERDDAP™ v2.13, ERDDAP™ Az adminisztrátorok felülírhatnak bármilyen értéket a setup.xml-ben a környezet változó meghatározásával
neve ` ERDDAP _valueName` futás ERDDAP™ ... Például használjon ` ERDDAP _baseUrl` felülírja ` <baseUrl> ` érték.
Ez hasznos lehet a telepítés során ERDDAP™ konténerrel, mint a Docker, mivel standard beállításokat lehet beállítani a setup.xml-be
majd speciális beállításokat kínál a környezeti változókon keresztül. Ha titkos információkat nyújt ERDDAP™ ezen módszeren keresztül,
győződjön meg róla, hogy az információ titokban marad. ERDDAP™ csak a környezeti változókat olvassa el az induláskor,
az indulás első második szakaszában, így az egyik módja annak, hogy ezt használja: a környezet változóit állítsa be, kezdje el ERDDAP ,
Várjon ERDDAP™ Elkezdődik, majd beállítja a környezet változóit.

###  datasets.xml  {#datasetsxml} 

* Olvassa el a megjegyzéseket [ **Együttműködés datasets.xml File** ](/docs/server-admin/datasets) ... Később, miután megkapod ERDDAP™ futás
első alkalommal (általában csak az alapértelmezett adatkészletekkel) Ön módosítja az XML-t `tomcat/content/erddap/ datasets.xml ` 
megadni az összes adatkészletet, amit akarsz ERDDAP™ szolgálni. Ez az, ahol eltölti az idejétek tömegét
beállítás közben ERDDAP™ később, miközben fenntartja a ERDDAP™ ...

Láthat egy példát [ datasets.xml GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) ...
     
*  (Valószínűleg) Most vagy (kissé valószínűbb) a jövőben, ha szeretné módosítani az erddap CSS fájlt, másolat
   `tomcat/content/erddap/images/erddapStart2.css` a `tomcat/content/erddap/images/erddap2.css` és aztán változtatni.
Változások `erddap2.css` csak akkor léphet hatályba, ha ERDDAP™ újraindításra kerül, és gyakran megköveteli a felhasználótól, hogy törölje a böngésző csésze fájljait.
     
 ERDDAP™ nem működik megfelelően, ha a setup.xml vagy datasets.xml A fájl nem egy jól kialakított XML fájl. Tehát, miután szerkesztette ezeket a fájlokat,
jó ötlet, hogy ellenőrizze, hogy az eredmény jól formált XML az XML szöveg beillesztése egy XML ellenőrző, mint például [xmlvalidáció](https://www.xmlvalidation.com/) ...
     
### Telepítse az erddapot. háborús fájl{#install-the-erddapwar-file} 

4. Linux, Mac és Windows, __download [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.29.0/erddap.war) Belépés `Tomcat/webapps` :

__Version 2.29.0, 706.788.135 bytes, MD5=A5ED0DCC8D46CA27640FEB8CE4A8560, dátumozott 12-15-2025__

A .war fájl nagy, mert magas állásfoglalási partvonalat, határt és emelési adatokat tartalmaz a térképek létrehozásához.

Néhány korábbi verzió is elérhető.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bytes, MD5=5FEA912B5D42E50EAB9591F773EA848D, 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 byte, MD5=461325E97E7577EC671D50246CCFB8B, 2022-02-23) 
   *  [2.21.](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bytes, MD5=F2CF805893146E932E498FDBD519B6, 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bytes, MD5=2B33354F633294213AE2AFDDCF4DA6D0, 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bytes, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bytes, MD5=970fbee172e28b0b8a07756eecbc898e, 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 byte, MD5=99a725108b37708e5420986c16a119, 2025-03-31) 
   *  [2.27.0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bytes, MD5=3b2086c659ee4145ca2dff447bf4ef7, 2025-06-11) 
   *  [2.28.1](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war)   (622,676,238 byte, MD5=48b4226045f950c8a8f9521b9bc9, 2025-09-05) 

### Configure proxy (speciális telepítés)  {#proxy} 

 ERDDAP™ jellemzően egy webszerver fordított proxy mögött van telepítve, amely lehetővé teszi, hogy szabványos HTTP portokon szolgáljon (80 és 443) ...
Az SSL/TLS felmondást gyakran a webszerver proxy rétegben is megkötik. A specifikusok az egyes telepítések követelményeitől függnek.

#### Apache{#apache} 

1. Győződjön meg róla `mod_proxy` és `mod_proxy_ http ` betöltve:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. A meglévő módosítás ` <VirtualHost> ` tag (ha van egy) , vagy adjon hozzá egyet a fájl végén:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Ha ERDDAP™ más úton szolgálnak, mint `/erddap` is állítsa be `X-Forwarded Profix` fejléc a
útszegmens _before_ `/erddap` ... Ez a beállítás megfelelő lenne egy ERDDAP™ szolgáljon
 `/Subpath/erddap` :

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Ezután indítsa el az Apache-t: `/usr/sbin/apachectl - k kegyes`   (de néha más könyvtárban van) ...
         
#### NGINX{#nginx} 

A nginx konfigurációs fájlban állítsa be ezeket a fejléceket:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Ha ERDDAP™ más úton szolgálnak, mint `/erddap` is állítsa be `X-Forwarded Profix` fejléc a
útszegmens _before_ `/erddap` ... Ez a beállítás megfelelő lenne egy ERDDAP™ szolgáljon
 `/Subpath/erddap` :

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Annak érdekében, hogy NGINX és ERDDAP™ megfelelően működik https , meg kell tenni a következő snippet belül Tomcat szerver.xml ` <Host> ` blokk:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Kezdőlap Tomcat{#start-tomcat} 

*  (Nem ajánlom a Tomcat Web Application Manager használatát. Ha nem zárja le és indítsa el a Tomcatot, előbb vagy utóbb PermGen memóriaproblémái lesznek.) 
*  (Linuxban vagy Mac OS-ban, ha létrehozott egy speciális felhasználót, hogy futtassa a Tomcat-ot, például tomcat-ot, ne felejtse el a következő lépéseket, mint a felhasználó.) 
* Ha Tomcat már fut, zárja le Tomcat (Linux vagy Mac OS)   `Tomcat/bin/shutdown.sh` 
vagy (Windows-ban)   `Tomcat\bin\\ shutdown.bat ` 

Linuxon, használja `ps -ef | grep tomcat` előtte és utána `leállítás. Árnyék` annak biztosítása érdekében, hogy a tomcat folyamat leálljon.
A folyamatot a leállítás előtt kell felsorolni, és végül nem szerepel a leállítás után.
Lehet, hogy egy-két percet vesz igénybe ERDDAP™ teljesen leállni. Légy türelmes&#33; Vagy ha úgy néz ki, mintha nem hagyja abba a sajátját, használja:
   `gyilkosság -9 <processID> ` 
* Start Tomcat (Linux vagy Mac OS)   `Tomcat/bin/startup.sh` vagy (Windows-ban)   `Tomcat\bin\\startup.bat` 

## Az ERDDAP™ futás?{#is-erddap-running} 

Használjon egy böngészőt, hogy megpróbálja megtekinteni http://www.YourServer.org/erddap/status.html.
 
 ERDDAP™ elkezdődik minden adatkészlet betöltése nélkül. Az adatkészleteket háttér szálba helyezik, így elérhetővé válik egy-egy.

### Hibaelhárítás{#troubleshooting} 

* Amikor egy felhasználó kérése érkezik, az Apache-ba megy (Linux és Mac OS számítógépeken) Aztán Tomcat, akkor ERDDAP™ ...
* Láthatja, mi jön az Apache-hoz (és kapcsolódó hibák) az Apache log fájlokban.
*    [Te vagy](/docs/server-admin/additional-information#tomcat-logs) Láthatja, mi jön Tomcat (és kapcsolódó hibák) 
a Tomcat log fájlokban ( `tomcat/logs/catalina.out` más fájlok ebben a könyvtárban) ...
*    [Te vagy](/docs/server-admin/additional-information#log) Látni, mi jön ERDDAP diagnosztikai üzenetek ERDDAP ,
hibaüzenetek ERDDAP , a ERDDAP™   ` <bigParentDirectory> /log/log.txt` fájl.
* Tomcat nem indul ERDDAP™ amíg Tomcat kérelmet kap ERDDAP™ ... Tehát a Tomcat logfájljaiban látható, ha
kezdődött ERDDAP™ vagy ha van egy hibaüzenet, amely ehhez a kísérlethez kapcsolódik.
* Mikor ERDDAP™ kezdődik, újranevezi a régit ERDDAP™ log.txt fájl ( `LogArchivedA <CurrentTime> .txt` ) és létrehoz egy új log.txt fájlt.
Tehát, ha `Log.txt` fájl régi, ez egy jel, hogy ERDDAP™ Nem nemrégiben újraindult. ERDDAP™ logisztikai információt ír egy puffernek
és csak rendszeresen írja a puffert a naplófájlhoz, de kényszerítheti ERDDAP™ írni a puffert a naplófájlba látogatva
     ` /erddap/status.html ` ...

### Trouble: Régi verzió Java  {#trouble-old-version-of-java} 

Ha egy verziót használ Java túl öreg ahhoz, hogy ERDDAP , ERDDAP™ Nem fog futni, és hibaüzenetet fog látni Tomcat logfájljában, mint

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

A megoldás az, hogy frissítsük a legújabb verzióját Java és győződjön meg róla, hogy a Tomcat használja.

### Hiba: Lassú indítás első alkalommal{#trouble-slow-startup-first-time} 

A Tomcatnak sok munkát kell végeznie az első alkalommal, amikor egy olyan alkalmazást kell végeznie, mint ERDDAP™ kezdődnek; nevezetesen, ki kell csomagolnia `erddap.war` fájl
 (olyan, mint egy .zip fájl) ... Egyes szervereken az első kísérlet, hogy megtekintse ERDDAP™ Hátrányok (30 másodperc?) amíg ez a munka befejeződik.
Más szervereken az első kísérlet azonnal kudarcot vall. De ha 30 másodpercet vársz, és próbálj újra, akkor sikerül, ha ERDDAP™ megfelelően telepítették.

Nincs javítás erre. Ez egyszerűen így működik Tomcat. De csak akkor fordul elő, amikor telepít egy új verziót ERDDAP™ ...

## Shut lefelé és újraindítva{#shut-down-and-restart} 

A jövőben leállni (újraindítás)   ERDDAP™ lásd [Hogyan kell leülni és újraindítani Tomcatot ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) ...

## Hiba?{#trouble} 

Tomcat vagy ERDDAP™ ? Lásd: [rész további támogatás megszerzéséről](/docs/intro#support) ...

## E-mail értesítés az új verziókról ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Ha e-mailt szeretne kapni, amikor egy új változata ERDDAP™ elérhető vagy egyéb fontos ERDDAP™ bejelentések,
csatlakozhatsz ERDDAP™ Bejelentési lista [itt](https://groups.google.com/g/erddap-announce) ... Ez a lista nagyjából egy e-mail három hónaponként.

## Testreszabás{#customize} 

*  [Testreszabja ERDDAP™ Kiemelni a szervezetet (nem NOAA   ERD ) ...](#customize) 
* Változtassa meg a bannert, amely minden tetején megjelenik ERDDAP™ .html oldalak szerkesztésével ` <startBodyHtml5> ` címke ` datasets.xml ` fájl.
(Ha nincs egy, másolja az alapértelmezettet ERDDAP™ A `tomcat/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml` fájl
a ` datasets.xml ` szerkeszteni.) Például:
  * Használjon más képet (azaz a szervezet logója) ...
  * Változtassa meg a háttér színét.
  * Változás " ERDDAP™ "YourOrganization_'s ERDDAP™ "..."
  * A "Könnyebb hozzáférés a tudományos adatokhoz" a "Könnyebb hozzáférés a _YourOrganization_ adataihoz".
  * Változtassa meg a "Brought to you" linkeket, amelyek kapcsolódnak a szervezetéhez és finanszírozási forrásokhoz.
* Változtassa meg az információt a honlap bal oldaláról a szerkesztés révén ` <theShortDescriptionHtml> ` címke ` datasets.xml ` fájl.
(Ha nincs egy, másolja az alapértelmezettet ERDDAP™ A `tomcat/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml` fájl
a ` datasets.xml ` szerkeszteni.) Például:
  * Írja le, mit csinál a szervezet és/vagy csoport.
  * Írja le, hogy milyen adat ez ERDDAP™ van.
  * Ahhoz, hogy megváltoztassa az ikont, amely megjelenik a böngésző lapokon, helyezze a szervezet tanácsát. ico in `tomcat/content/erddap/images/` ...
Lásd https://en.wikipedia.org/wiki/Favicon.
 
