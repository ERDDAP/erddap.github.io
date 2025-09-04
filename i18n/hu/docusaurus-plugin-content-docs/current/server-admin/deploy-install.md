---
sidebar_position: 1
---

# Telepítés
Hogyan kell elvégezni a kezdeti beállítás ERDDAP™ A kiszolgáló

 ERDDAP™ bármely támogató kiszolgálón futhat Java és Tomcat (és más alkalmazás szerverek, mint a Jetty, de nem támogatjuk őket) .
 ERDDAP™ tesztelt Linux (A LuxOpCo-nak a LuxOpCo-nak a LuxSCS-hez való csatlakozásával kapcsolatos, a LuxSCS által a LuxSCS-nek nyújtott, a LuxSCS-nek a LuxSCS-nek a LuxSCS-re történő átruházásával kapcsolatos, a LuxSCS-nek a LuxSCS-nek a LuxSCS-re történő átruházásával kapcsolatos, a LuxSCS-nek a LuxSCS-re történő átruházása.) Mac és Windows számítógépek.

*  **Docker** -- Mi biztosítjuk [ ERDDAP™ Docker tartályban](https://hub.docker.com/r/erddap/erddap) 
és IOOS most kínál [Gyorsindító útmutató ERDDAP™ Dokkoló konténerben](https://ioos.github.io/erddap-gold-standard/index.html) .
Ez a szabvány. ERDDAP™ beépítés, dokkoló konténerbe.
Docker A kompozit egyszerű módokat kínálunk az SSL és a monitoring felállításához, többet olvashatunk ki [Dokkoló dokumentáció](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Ha már használja Docker, akkor valószínűleg inkább a Docker verzió.
Ha felhőalapú szolgáltatásokat szeretne igénybe venni, valószínűleg a Docker verziót fogja előnyben részesíteni.
*  **Amazon** -- Ha telepít ERDDAP™ az Amazon Web Services EC2 esetről, lásd ezt: [Amazon Web Services Overview](/docs/server-admin/additional-information#amazon) Először.
*  **Linux és Macs** -- ERDDAP™ Jól működik Linux és Mac számítógépeken. Lásd az alábbi utasításokat.
*  **Windows** -- A Windows jó a teszteléshez. ERDDAP™ és személyes használatra (lásd az alábbi utasításokat) ,
De mi nem javasoljuk, hogy nyilvánosan használjuk. ERDDAP™ Bevetések. Futtatás ERDDAP™ Windows lehet problémák:
különösen, ERDDAP™ nem lehet gyorsan törölni és / vagy átnevezni a fájlokat. Ez valószínűleg az antivírus szoftver miatt van.
   (például, a McAfee és Norton) ami a vírusokra vonatkozó fájlokat ellenőrzi. Ha belefutsz ebbe a problémába
(amely látható hibaüzenetek a [log.txt](/docs/server-admin/additional-information#log) fájl
"Nem sikerült törölni"...), az antivírus szoftver beállításainak megváltoztatása részben enyhítheti a problémát. Vagy inkább Linux vagy Mac szerver.

 **A szabvány ERDDAP™ Linux, Macs és Windows számítógépek telepítési utasításai:** 

0. Győződjön meg róla, hogy a függések vannak telepítve. Nem-Windows gépeken (Linux és Mac) Css-re van szükséged.

##  Java  {#java} 

1.  [A ERDDAP™ v2.19 +, beállítás Java 21.](#java) 
Biztonsági okokból, szinte mindig a legjobb használni a legújabb változata Java 21.
Kérjük, töltse le és telepítse a legújabb verzióját a
    [Adoptium 's OpenJDK (Temurin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
A telepítés ellenőrzéséhez futtasd a '/ javaJreBinDirectory / java -verziót', például
"/ usr / local / jdk- 21.0.3 + 9 / jre / bin / java -verzió".

    ERDDAP™ együtt Java más forrásokból, de javasoljuk Adoptium, mert ez a fő, közösség által támogatott,
ingyenes (mint a sör és a beszéd) változat Java 21, amely hosszú távú támogatást nyújt (ingyenes frissítések sok évvel az első kiadás után) .
Biztonsági okokból kérjük, frissítse a ERDDAP a Java rendszeres időközönként, mint új verziók Java 21 az Adoptiumtól legyen elérhető.

    ERDDAP™ 21-gyel tesztelték és használták, nem más változattal. Különböző okok miatt, nem teszteljük és nem támogatjuk más verziók Java .
     
## Tomcat{#tomcat} 

2.  [Felszerelés](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat a leggyakrabban használt Java Alkalmazási kiszolgáló,
amely Java az operációs rendszer hálózati szolgáltatásai és Java szerver szoftver, mint ERDDAP™ .
Ez a szabad és nyílt forráskódú szoftver (FOSS) .

Használhatsz még egyet. Java Alkalmazási kiszolgáló (például, Jetty) De csak Tomcat-tal tesztelünk.

   * Töltse le a Tomcat-ot és csomagolja ki a szerverére vagy a számítógépére.
Biztonsági okokból szinte mindig a legjobb a Tomcat 10 legújabb verzióját használni (változat nem elfogadható) 
amelyet arra terveztek, hogy Java 21 vagy újabb. Az alábbiakban a Tomcat könyvtárra "tomcat" néven hivatkozunk.

Figyelem&#33; Ha már van egy Tomcat futó más webes alkalmazás (Különösen a THREDDS) , javasoljuk, hogy telepítse ERDDAP™ in
      [egy második Tomcat](/docs/server-admin/additional-information#second-tomcat) , mert ERDDAP™ szüksége van különböző Tomcat beállítások
és nem kellene más memóriaalkalmazásokkal küzdenie.

     * A Linux-on [a "Core" tar letöltése .gz "Tomcat disztribúció](https://tomcat.apache.org/download-10.cgi) és kicsomagolja.
A '/ usr / local' -ban javasoljuk kicsomagolni.
     * A Mac, Tomcat valószínűleg már telepített '/ Library / Tomcat', de frissíteni kell a legújabb változata Tomcat 10.
Ha letöltöd, [a "Core" tar letöltése .gz "Tomcat disztribúció](https://tomcat.apache.org/download-10.cgi) és kicsomagolja a '/ Library / Tomcat' -ban.
     * A Windows, akkor [Töltse le a "Core" "zip" Tomcat disztribúciót](https://tomcat.apache.org/download-10.cgi) 
        (ami nem zavarja a Windows regisztert, és amit egy DOS parancssorból irányítasz) és kipakolja egy megfelelő könyvtárba.
        (A fejlesztéshez a "Core" "zip" disztribúciót használjuk. Készítünk egy '/ programok' könyvtárat, és ott csomagoljuk ki.) 
Vagy letöltheti a "Core" "64- bit Windows zip" disztribúciót, amely több funkciót tartalmaz.
Ha a disztribúció egy Windows telepítő, akkor valószínűleg a Tomcat, például, "/ Program fájlok / apache- tomcat- 10.0.23".
             
### szerver.xml{#serverxml} 

*  [szerver.xml](#serverxml) - A 'tomcat / conf / server.xml' file-ban két változtatást kell végrehajtanod a két <Connector> 'címkék
   (egy "&lt; Connector port =" 8080 "és egy" &lt; Conector port = "8443" ") .
   1.  (Ajánlott) A "connectionTimeout" paraméter értékének növelése, talán 300000-re (milliszekundum, ami 5 perc.) .
   2.  (Ajánlott) Új paraméter hozzáadása: 'relaxedQueryChars = "[] | "". Ez nem kötelező és kevésbé biztonságos,
de eltávolítja annak szükségességét, hogy a felhasználók titkosítsák ezeket a karaktereket, amikor azok előfordulnak a paraméterekben a felhasználó kérésére URL.
             
### content.xml{#contentxml} 

* context.xml -- Források gyorsítótár - A 'tomcat / conf / context.xml' -ban, közvetlenül a ' </Context> 'tag, változtatni a Források tag
   (vagy add hozzá, ha még nincs ott.) a gyorsítótár beállítása MaxSize paraméter 80000-re:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Ez elkerüli a catalinai figyelmeztetéseket. Ki, hogy minden kezdődik a
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache időszámítás{#apache-timeout} 

* Linux számítógépeken változtasd meg az Apache időkimaradási beállításokat, így az időigényes felhasználói kérések nem időznek
   ("Proxy" vagy "Bad Gateway" hibával) . Mint a root felhasználó:
  * Az Apache módosítása " http d.conf 'file (általában "/ etc / http d / conf / ') :
    * A meglévő változtatás " <Timeout> "beállítás (vagy adjon hozzá egyet a fájl végén) 3600-3600 (másodperc) 60 vagy 120 másodperc helyett.
    * A meglévő változtatás " <ProxyTimeout> "beállítás (vagy adjon hozzá egyet a fájl végén) 3600-3600 (másodperc) 60 vagy 120 másodperc helyett.
  * Újraindítás Apache: '/ usr / sbin / apachectl -k kecses' (de néha egy másik könyvtárban van.) .

### Biztonság{#security} 
         
* Biztonsági ajánlás: Lásd [Ezek az utasítások](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) a
a Tomcat telepítés, különösen a nyilvános szerverek.
         
* A nyilvánosság számára ERDDAP™ installációk Linux és Macs, a legjobb, ha a Tomcat (a program) a felhasználó macskájához tartozik '
   (korlátozott jogosultsággal rendelkező, külön felhasználó, [nincs jelszava](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Így csak a szuper felhasználó válthat át a felhasználó "tomcat". Ez lehetetlenné teszi a hackerek számára, hogy bejelentkezzenek a szerverükre, mint felhasználó "tomcat".
És minden esetben, meg kell, hogy ez úgy, hogy a 'tomcat' felhasználó nagyon korlátozott jogosultságai a szerver fájlrendszerben (read + write + végrehajtási jogosultságok
az 'apache- tomcat' könyvtárfa és ' <bigParentDirectory> 'és csak olvasási jogosultságokat könyvtárak adatok ERDDAP™ hozzáférést igényel).
  * Létrehozhatod a 'tomcat' felhasználói fiókot (amelynek nincs jelszava) a parancs használatával:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Átválthatsz arra, hogy a felhasználó "tomcat" a parancs használatával
    ```
    sudo su - tomcat
    ```
     (Kérni fogja a superuser jelszót, hogy engedélyezze ezt.) 
    * A parancs használatával abbahagyhatja a felhasználó tomcat munkát
    ```
    exit
    ````
    * A legtöbb Tomcat és ERDDAP™ beállítási utasítások felhasználóként "tomcat". Később futtasd le a 'startupsh' és a 'shutdow.sh' szkripteket felhasználóként 'tomcat'
Így Tomcat jogosult írni a naplófájljaira.
    * A Tomcat kicsomagolása után az 'apache- tomcat' könyvtár szülőjétől:
      * Az apache- tomcat könyvtárfa tulajdonjogának megváltoztatása a Tomcat felhasználóra.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (de helyettesítse a valódi nevét a tomcat könyvtár) .
      * Változtassa meg a "csoport", hogy a tomcat, a felhasználóneved, vagy a nevét egy kis csoport, amely magában foglalja tomcat és az összes adminisztrátor Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Az engedélyek módosítása, hogy a Tomcat és a csoport olvasson, írjon, hajtson végre jogosultságokat:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Távolítsa el az "egyéb" felhasználó jogosultságait olvasni, írni vagy végrehajtani:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Ez fontos, mert megakadályozza, hogy más felhasználók esetleg érzékeny információkat ERDDAP™ beállító fájlok.

### Memória{#memory} 

A Tomcat környezeti változóinak beállítása

* A Linux és Macs:
Hozzon létre egy fájlt 'tomcat / bin / setenv.sh' (vagy Red Hat Enterprise Linux \\[ RHEL \\] , edit '~ tomcat / conf / tomcat10.conf') Tomcat környezeti változóinak beállítása.
Ezt a fájlt a 'tomcat / bin / startup.sh' és a 'shutdow.sh' fogja használni. A fájlnak a következőket kell tartalmaznia:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (de helyettesítse a könyvtárneveket a számítógépéről) .
   (Ha korábban beállítod a 'JRE _ HOME' -t, azt eltávolíthatod.) 
A Macs-en valószínűleg nem kell "JAVA _ HOME" -t beállítani.

* A Windows-on:
Hozzon létre egy 'tomcat\\ bin\\ setenv.bat' fájlt a Tomcat környezeti változóinak beállításához.
Ezt a fájlt a 'tomcat\\ bin\\ startup.bat' és ' shutdown.bat ".
A fájlnak a következőket kell tartalmaznia:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (de helyettesítse a könyvtárneveket a számítógépéről) .
Ha ez csak helyi tesztelés, távolítsa el a "-server".
   (Ha korábban beállítod a 'JRE _ HOME' -t, azt eltávolíthatod.) 

A '-Xmx' és '-Xms' memória beállításai azért fontosak, mert ERDDAP™ Több memóriával jobban működik.
Mindig állítsuk be a '-Xms' -t ugyanabba az értékre, mint a '-Xmx'.

* 32 bites operációs rendszerek és 32 bites Java :
64 bit Java sokkal jobb, mint 32 bit Java , de 32 bit Java működni fog, amíg a szerver nem igazán elfoglalt.
Minél több fizikai memória a szerver annál jobb: 4 + GB nagyon jó, 2 GB rendben van, kevesebb nem ajánlott.
32 bittel Java , még bőséges fizikai memória, Tomcat és Java nem fut, ha megpróbál '-Xmx' sokkal több mint 1500M (1200M egyes számítógépeken) .
Ha a szervernek kevesebb mint 2GB memóriája van, csökkentse a '-Xmx' értéket (in 'M' egaBytes) a számítógép fizikai memóriájának 1 / 2-éig.

* 64 bites operációs rendszerek és 64 bites Java :
64 bit Java csak 64 bites operációs rendszeren működik.
  * A Java 8, hozzá kell adni '-d64' a Tomcat 'CATALINA _ OPTS' paraméter 'setenv.bat'.
  * A Java 21, te választasz 64 bitet. Java amikor letöltöd a Java 64 bites.

64 bittel Java , Tomcat és Java nagyon magas '-Xmx' és '-Xms' beállításokat használhat. Minél több fizikai memória van a szerveren, annál jobb.
Leegyszerűsítő javaslatként: azt javasoljuk, hogy állítsuk be a '-Xmx' és '-Xms' értéket (in 'M' egaBytes) 1 / 2 (vagy kevesebb) a számítógép fizikai memóriájáról.
Láthatod, ha Tomcat, Java , és ERDDAP™ valóban fut 64 bit módban keres "bit", ERDDAP 'Napi jelentés e-mail
vagy a "bigParentDirectory / logs / [log.txt](/docs/server-admin/additional-information#log) 'fájl (A "bigParentDirectory" a következő meghatározásban szerepel: [szetup.xml](#setupxml) ) .

#### Szemétgyűjtemény{#garbage-collection} 

* In ERDDAP™ s [log.txt](/docs/server-admin/additional-information#log) file, sok "GC (Kiosztási hiba) "üzenetek.
Ez általában nem probléma. Ez egy gyakori üzenet egy normálisan működő Java Azt mondta, hogy most végzett egy kis szeméttel.
Gyűjtemény, mert elfogyott a szoba Eden (cikk) Java halom nagyon fiatal tárgyak) . Általában az üzenet megmutatja
"memoryUseBee- &gt; memoryUseAfter". Ha ez a két szám közel van egymáshoz, az azt jelenti, hogy a szemétgyűjtemény nem volt eredményes.
Az üzenet csak a baj jele, ha nagyon gyakori. (másodpercenként) , nem produktív, és a számok nagy, és nem növekszik,
amelyek együttesen jelzik, hogy Java szüksége van több memória, küzd, hogy felszabadítsa memória, és nem képes felszabadítani memória.
Ez történhet egy stresszes időszakban, aztán menj el. De ha ez megmarad, az a baj jele.
* Ha látod 'java.lang.OutOfMemoryError van ERDDAP™ s [log.txt](/docs/server-admin/additional-information#log) fájl,
Látod? [OutOfMemoryError](/docs/server-admin/additional-information#outofmemoryerror) a problémák diagnosztizálására és megoldására vonatkozó tippeket.
         
### Jogosultságok{#permissions} 

*  [A Linux és Macs, változtatni a jogosultságokat](#permissions) a 'tomcat / bin /' -ben található '.sh' fájlok közül a tulajdonos által végrehajtható:
  ```
  chmod +x *.sh
  ```

### Betűtípusok{#fonts} 

*  [A képek betűtípusai:](#fonts) Erősen szeretjük a szabad [DejaVu betűtípusok](https://dejavu-fonts.github.io/) a másik Java betűtípusok.
Ezek a betűtípusok használata erősen ajánlott, de nem szükséges.

Ha úgy dönt, hogy nem használja a DejaVu betűtípusok, meg kell változtatni a fontFamily beállítás setup.xml " <fontFamily> SansSerif </fontFamily> ",
amely elérhető az összes Java eloszlás. Ha beállít <fontFamily> "egy nem elérhető betűtípus nevére, ERDDAP™ nem tölt
és kinyomtatja az elérhető betűtípusok listáját a 'log.txt' fájlban. Használnod kell az egyik betűtípust.

Ha úgy dönt, hogy használja a DejaVu betűtípusok, győződjön meg arról, hogy a " <fontFamily> 'set in setup.xml is' <fontFamily> DejaVu Sans </fontFamily> ".

A DejaVu betűtípusok telepítéséhez kérjük, töltse le [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5,522,795 bájt, MD5 = 33E1E61FAB06A547851ED308B4FFEF42) 
és húzza ki a betűtípus fájlokat egy ideiglenes könyvtárba.

  * Linux:
    * Linux Adoptium Java disztribúciók, lásd [Ezek az utasítások](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Más Java felosztások: Mint a 'tomcat' felhasználó, másolja le a betűtípus fájlokat '$JAVA _ HOME / lib / betűtípusok', így Java megtalálja a betűtípusokat.
Ne feledje: ha / amikor később frissíti egy újabb verziója Java , újra kell telepíteni ezeket a betűtípusokat.
  * Macs: minden betűtípus fájl, kattintson duplán, majd kattintson Install Betűtípus.
  * Windows 7 és 10: Windows Explorer, válassza ki az összes betűtípus fájlokat. Jobb klikk. Kattintson az Install gombra.
             
### Test Tomcat{#test-tomcat} 

* Tesztelje a Tomcat telepítés.
  * Linux:
    * Felhasználóként "tomcat", fut 'tomcat / bin / startupsh ".
    * Tekintse meg URL + ": 8080 /" a böngészőben (például: [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (fut tomcat, mint a rendszergazda felhasználó) :
    * Fuss 'tomcat / bin / startupsh'.
    * Tekintse meg URL + ": 8080 /" a böngészőben (például: [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Megjegyzés, hogy alapértelmezés szerint a Tomcat csak az Ön által elérhető. Nyilvánosan nem hozzáférhető.
  * Windows localhost:
    * Jobb klikk a Tomcat ikon a rendszer tálcán, és válassza "Start szolgáltatás".
    * Nézet [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , vagy talán [http://localhost:8080/](http://localhost:8080/) a böngésződben. Megjegyzés, hogy alapértelmezés szerint a Tomcat csak az Ön által elérhető. Nyilvánosan nem hozzáférhető.

Látnod kéne a Tomcat "Gratulálunk" oldalt.

Ha baj van, lásd a Tomcat naplófájlt a 'tomcat / logs / catalina.out' címen.

### Problémák a Tomcat telepítés?{#troubles-with-the-tomcat-installation} 

* A Linux és Mac, ha nem tudja elérni Tomcat vagy ERDDAP™   (vagy talán csak nem tudod elérni őket a tűzfalon kívüli számítógépből.) ,
akkor tesztelje, ha Tomcat hallgat port 8080, gépeléssel (gyökér) a kiszolgáló parancssorában:

  ```
  netstat -tuplen | grep 8080
  ```

Ez egy mondatot ad vissza:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (ahol a '#' egy számjegy) "java" eljárás feltüntetésével (Feltehetően Tomcat) "8080" -t hallgat a "tcp" forgalom miatt.
Ha nem adtak vissza vonalakat, ha a visszaadott vonal jelentősen eltér, vagy ha két vagy több sort adtak vissza, akkor probléma lehet a port beállításaival.

* Lásd a Tomcat naplófájlt: 'tomcat / log / catalina.out'. Tomcat problémák és néhány ERDDAP™ Az indulási problémák szinte mindig jelzik.
Ez gyakori, amikor az első beállítás ERDDAP™ .

* Lásd a [Tomcat](https://tomcat.apache.org/) website or search the web for help, but please know us the problems you had and the solutions you found.

* Lásd a mi [szakasz a kiegészítő támogatás megszerzéséről](/docs/intro#support) .
             
###  ERDDAP™ Tartalom{#erddap-content} 
3.   [Állítsa be a 'tomcat / content / erddap' konfigurációs fájlokat.](#erddap-content) 
A Linux, Mac és Windows, letöltés [erddapTartalom .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
és kihúzza a 'tomcat' könyvtárba, létrehozva a 'tomcat / content / erddap' -t.

_ _ Version 1.0.0, 20333 bytes, MD5 = 2B8D2A5AE5ED73E3A42B529C168C60B5, dated 2024- 10- 14 _ _

Néhány korábbi verzió is elérhető:

    *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bájt, MD5 = 8F892616BAEEF 2DF0F4BB036DCB4AD7C, 2022- 02- 16) 
    *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bájt, MD5 = 8F892616BAEEF 2DF0F4BB036DCB4AD7C, 2022- 02- 16) 
    *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bájt, MD5 = 1E26F62E7A06191EE6868C40B9A29362, 2022- 10- 09) 
    *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bájt, MD5 = 1E26F62E7A06191EE6868C40B9A29362, 2022- 12- 08) 
    *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bájt, MD5 = 1E26F62E7A06191EE6868C40B9A29362, 2023- 02- 27) 

#### Más könyvtár{#other-directory} 

Red Hat Enterprise Linux (RHEL) vagy más helyzetekben, amikor nem engedélyezett a Tomcat könyvtár módosítása, vagy ahol szeretné / szükség
a ERDDAP™ tartalomjegyzék más helyen valamilyen más okból (például, ha a Jetty helyett Tomcat) ,
unzip 'erddapContent .zip 'a kívánt könyvtárba (amelyhez csak a 'tomcat' felhasználó férhet hozzá) és állítsa be a " erddapContentDirectory "rendszertulajdon
 (például " erddapContentDirectory  =~tomcat/content/erddap ') így ERDDAP™ megtalálja ezt az új tartalomjegyzéket.

### szetup.xml{#setupxml} 

*  [Olvassa el a "tomcat / content / erddap / setup.xml '](#setupxml) és elvégzi a kért változtatásokat. setup.xml a fájl az összes beállítással, amely meghatározza, hogyan ERDDAP™ Viselkedik.

A kezdeti beállításhoz legalább ezeket a beállításokat meg kell változtatnia:
      * ' <bigParentDirectory> '
      * ' <emailEverythingTo> '
      * ' <baseUrl> '
      * ' <email...> 'beállítások
      * ' <admin...> 'beállítások
      * ' <baseHttpsUrl> ' (amikor beállítasz https ) 

Amikor létrehozod a bigParentDirectory-t, a BigParentDirectory szülőkönyvtárából:

    * Legyen a 'tomcat' felhasználó a 'bigParentDirectory' tulajdonosa:
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Változtassa meg a "csoport", hogy a tomcat, a felhasználóneved, vagy a nevét egy kis csoport, amely magában foglalja tomcat és az összes adminisztrátor Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Az engedélyek módosítása, hogy a Tomcat és a csoport olvasson, írjon, hajtson végre jogosultságokat:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Távolítsa el az "egyéb" felhasználó jogosultságát az olvasásra, írásra vagy végrehajtásra. Ez fontos, hogy megakadályozza az olvasást esetleg érzékeny információk
in ERDDAP™ log fájlok és fájlok információkat a privát adatkészletek.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Környezetvédelmi változók{#environment-variables} 

Kezdve ERDDAP™ v2.13, ERDDAP™ A rendszergazdák felülbírálhatják a setup.xml értéket egy környezeti változó megadásával
Neve: ERDDAP _ értéknév "futás előtt ERDDAP™ . Például, használat " ERDDAP _ baseUrl 'felülírja a' <baseUrl> "érték.
Ez hasznos lehet, amikor a telepítés ERDDAP™ egy konténer, mint a Docker, mint akkor tegye standard beállítások setup.xml
majd speciális beállításokat biztosít környezeti változókkal. Ha titkos információt szolgáltat ERDDAP™ e módszerrel,
Ellenőrizze, hogy az információ titokban marad-e. ERDDAP™ csak indításonként egyszer olvassa el a környezeti változókat,
az első másodpercben indítás, így az egyik módja annak, hogy ezt használja: állítsa be a környezeti változók, start ERDDAP ,
Várj, amíg ERDDAP™ megkezdődött, majd kibontja a környezeti változókat.

###  datasets.xml  {#datasetsxml} 

* Olvassa el a hozzászólásokat: [ **Együttműködés a datasets.xml Fájl** ](/docs/server-admin/datasets) . Később, miután ERDDAP™ futó
Most először (általában csak az alapértelmezett adatok) , akkor módosítsa az XML 'tomcat / content / erddap / datasets.xml '
megadni az összes adatot, amit szeretne ERDDAP™ hogy szolgáljak. Itt fogod tölteni az időd nagy részét.
a felállítás alatt ERDDAP™ és később, miközben a ERDDAP™ .

Láthatsz egy példát. [ datasets.xml a GitHub-ról](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Nem valószínű) Most vagy (valamivel valószínűbb) a jövőben, ha módosítani szeretné az erddap CSS fájlt, másolja
'tomcat / content / erddap / images / erddapStart2.css' to 'tomcat / content / erddap / images / erddap2.css' and do changes to it.
Az 'erddap2.css' változtatása csak akkor lép hatályba, ha ERDDAP™ újraindul, és gyakran azt is megköveteli a felhasználótól, hogy törölje a böngésző tárolt fájljait.
     
 ERDDAP™ nem működik megfelelően, ha a setup.xml vagy datasets.xml A fájl nem egy jól kidolgozott XML fájl. Szóval, miután átszerkesztetted ezeket a fájlokat,
jó ötlet ellenőrizni, hogy az eredmény jól alakult XML azáltal, hogy az XML szöveg egy XML ellenőrző, mint [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Telepítsd az erddap-ot. háborús akták{#install-the-erddapwar-file} 

4. A Linux, Mac és Windows, _ _ letöltés [Erddap. War](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) _ _ be 'tomcat / webapps':

_ _ Version 2.28.0, 620,824,288 bytes, MD5 = f948b2ba603f65a83ac67af43da9e4c2, dated 2025- 08- 29 _

A .war fájl nagy, mert tartalmaz nagy felbontású partvonal, határ, és magassági adatok szükségesek a térképek létrehozásához.

Néhány korábbi verzió is elérhető.

   *  [2, 17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 bájt, MD5 = 5FEA912B5D42E50EAB9591F773EA848D, 2022- 02- 16) 
   *  [2, 18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 bájt, MD5 = 461325E97E7577EC671DD50246CCFB8B, 2022- 02- 23) 
   *  [2, 21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 bájt, MD5 = F2CFF805893146E932E498FDD519B6, 2022- 10- 09) 
   *  [2, 22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 bájt, MD5 = 2B33354F633294213AE2AFDCF4DA6D0, 2022- 12- 08) 
   *  [2, 23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 bájt, MD5 = D843A043C506725EBD6F8EFDCCA8FD5F, 2023- 03- 03) 
   *  [2, 24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 bájt, MD5 = 970fbee172e28b0b8a07756eecbc898e, 2024- 06- 07) 
   *  [2, 25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bájt, MD5 = 652AFC9D1421F00B5F789DA2C4732D4C, 2024- 11- 07) 
   *  [2, 26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 bájt, MD5 = 99a725108b37708e5420986c1616a119, 2025- 03- 31) 
   *  [2, 27, 0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 bájt, MD5 = 3b2086c659eee4145ca2dff447bf4ef7, 2025- 06- 11) 

### A proxy beállítása (telepítési specifikus)  {#proxy} 

 ERDDAP™ jellemzően egy webszerver fordított proxy mögött telepítik, hogy azt a standard HTTP portokon lehessen kiszolgálni (80 és 443) .
SSL / TLS terminál gyakran kiosztja a webszerver proxy réteg is. A specifikációk az egyes telepítések követelményeitől függenek.

#### Apache{#apache} 

1. Biztosítani kell, hogy a 'mod _ proxy' és 'mod _ proxy' http "meg vannak töltve:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Módosítsa a meglévő " <VirtualHost> 'tag (ha van) vagy adjon hozzá egyet a fájl végén:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Ha ERDDAP™ az 'erddap' -től eltérő útvonalon szolgál, az 'X- Forwarded- Prefix' fejlécet is be kell állítani a
"path szegmens _ before _ '/ erddap". Ez a beállítás a ERDDAP™ kézbesítve:
"/ subpath / erddap":

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Ezután indítsa újra az Apache-t: '/ usr / sbin / apachectl -k kecses' (de néha egy másik könyvtárban van.) .
         
#### NGINX{#nginx} 

Az nginx config fájlban állítsa be ezeket a fejléceket:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Ha ERDDAP™ az 'erddap' -től eltérő útvonalon szolgál, az 'X- Forwarded- Prefix' fejlécet is be kell állítani a
"path szegmens _ before _ '/ erddap". Ez a beállítás a ERDDAP™ kézbesítve:
"/ subpath / erddap":

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Annak érdekében, hogy az NGINX és ERDDAP™ megfelelően működik https , akkor tegye a következő snippet a Tomcat server.xml " <Host> 'blokk:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### A Tomcat indítása{#start-tomcat} 

*  (Nem ajánlom, hogy a Tomcat Webes Alkalmazási Menedzsert használd. Ha nem teljesen leáll és indul Tomcat, előbb vagy utóbb lesz PermGen memória problémák.) 
*  (Linuxban vagy Mac OS-ban, ha létrehoztál egy speciális felhasználót a Tomcat futtatására, pl., tomcat, ne feledd megtenni a következő lépéseket, mint a felhasználó.) 
* Ha Tomcat már fut, állítsa le Tomcat (Linux vagy Mac OS) "tomcat / bin / shutdown"
vagy (Windows) 'tomcat\\ bin\\ shutdown.bat '

Linux-on 'ps -ef | grep tomcat 'előtt és után' shutdow.sh ', hogy megbizonyosodjon arról, hogy a tomcat folyamat megállt.
A folyamatot a leállítás előtt kell felsorolni, és végül a leállítás után nem.
Eltarthat egy-két percig. ERDDAP™ hogy teljesen leálljanak. Légy türelmes. Vagy ha úgy tűnik, nem áll meg magától, használd:
'kill -9 <processID> '
* Kezdje Tomcat (Linux vagy Mac OS) "tomcat / bin / startupsh" vagy (Windows) 'tomcat\\ bin\\ startup.bat'

## Is ERDDAP™ Futni?{#is-erddap-running} 

A böngésző segítségével próbálja megtekintenihttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ Az adatok betöltése nélkül indul. Az adatbázisok háttérszálba vannak betöltve, így elérhetőkké válnak.

### Problémamegoldás{#troubleshooting} 

* Ha egy felhasználó kéri, az Apache-ba megy. (a Linux és Mac OS számítógépeken) aztán Tomcat, akkor ERDDAP™ .
* Láthatod, mi jön Apache-ba. (és kapcsolódó hibák) az Apache naplófájlokban.
*    [Te&#33;](/docs/server-admin/additional-information#tomcat-logs) Látod, mi jön Tomcat-ba? (és kapcsolódó hibák) 
a Tomcat naplófájlban ("tomcat / log / catalina.out" és más fájlok abban a könyvtárban) .
*    [Te&#33;](/docs/server-admin/additional-information#log) látni, hogy mi jön ERDDAP , diagnosztikai üzenetek ERDDAP ,
és hibaüzenetek ERDDAP , a ERDDAP™ ' <bigParentDirectory> / log.txt 'file.
* Tomcat nem indul ERDDAP™ amíg Tomcat nem kap egy kérelmet ERDDAP™ . Tehát láthatja a Tomcat naplófájlokban, ha
indítás ERDDAP™ vagy ha a kísérlethez hibaüzenet kapcsolódik.
* Mikor? ERDDAP™ start up, it renales the old ERDDAP™ log.txt fájl ('logArchived A <CurrentTime> .txt ") és létrehoz egy új log.txt fájlt.
Tehát ha a 'log.txt' fájl régi, az egy jel arra, hogy ERDDAP™ nem kezdte újra. ERDDAP™ naplóadatokat ír egy pufferbe
és csak írja a pufferet a naplófájlba rendszeres időközönként, de lehet kényszeríteni ERDDAP™ hogy írja a pufferet a naplófájlba látogatással
' /erddap/status.html ".

### Probléma: régi verziója Java  {#trouble-old-version-of-java} 

Ha a Java Ez túl öreg ahhoz, hogy ERDDAP , ERDDAP™ nem fut, és látni fogsz egy hibaüzenetet Tomcat naplófájljában, mint

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

A megoldás az, hogy frissítse a legújabb változata a Java És győződjön meg róla, hogy Tomcat használja.

### Probléma: Lassú első alkalom{#trouble-slow-startup-first-time} 

Tomcat kell csinálni egy csomó munkát az első alkalommal egy alkalmazás, mint ERDDAP™ Elkezdődött; nevezetesen ki kell csomagolnia az "erddap.war" fájlt
 (ami olyan, mint a .zip fájl) . Egyes szervereken, az első kísérlet a megtekintésre ERDDAP™ standok (30 másodperc?) amíg ez a munka be nem fejeződik.
Más szervereken az első kísérlet azonnal megbukik. De ha vársz 30 másodpercet, és újra megpróbálod, sikerülni fog, ha ERDDAP™ helyesen szerelték fel.

Erre nincs megoldás. A Tomcat egyszerűen így működik. De ez csak akkor fordul elő az első alkalommal, miután telepít egy új változata ERDDAP™ .

## Állítsa le és indítsa újra.{#shut-down-and-restart} 

A jövőben, hogy bezárják (és újraindul)   ERDDAP™ Látod? [Hogyan kell bezárni és visszaállítani Tomcat és ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Baj van?{#trouble} 

Problémák telepítése Tomcat vagy ERDDAP™ ? Lásd a mi [szakasz a kiegészítő támogatás megszerzéséről](/docs/intro#support) .

## Új verziók e-mail bejelentése ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Ha szeretne kapni egy e-mailt, amikor egy új változata ERDDAP™ rendelkezésre áll vagy más fontos ERDDAP™ bejelentések,
csatlakozhat a ERDDAP™ A bejelentések listája [Tessék.](https://groups.google.com/g/erddap-announce) . Ez a lista háromhavonta átlagosan egy e-mailt tartalmaz.

## Egyéni{#customize} 

*  [Testreszabása ERDDAP™ hogy kiemelje a szervezet (nem NOAA   ERD ) .](#customize) 
* Változtassa meg a zászlót, hogy megjelenik a tetején az összes ERDDAP™ html oldalak szerkesztésével a " <startBodyHtml5> 'tag in your' datasets.xml 'fájl.
(Ha nincs, másolja le az alapértelmezett ERDDAP™ 'tomcat / webapps / erddap / WEB- INF / class / gov / noaa / pfel / erddap / util / messages.xml' fájl
' datasets.xml "és szerkeszti.) Például:
  * Más kép használata (azaz a szervezet logója) .
  * A háttérszín megváltoztatása.
  * Változás " ERDDAP™ "to" _ YourOrganization _ 's ERDDAP™ "
  * A tudományos adatokhoz való könnyebb hozzáférés módosítása a _ YourOrganization _ 's adatokhoz való könnyebb hozzáférés felé.
  * Változtassa meg a "által hozott" linkek, hogy linkek a szervezet és a finanszírozási források.
* A honlap bal oldalán található információk módosítása a " <theShortDescriptionHtml> 'tag in your' datasets.xml 'fájl.
(Ha nincs, másolja le az alapértelmezett ERDDAP™ 'tomcat / webapps / erddap / WEB- INF / class / gov / noaa / pfel / erddap / util / messages.xml' fájl
' datasets.xml "és szerkeszti.) Például:
  * Írja le, mit csinál a szervezet és / vagy csoport.
  * Írja le, milyen adatok ezek ERDDAP™ Igen.
  * A böngésző fülein megjelenő ikon megváltoztatásához helyezze a szervezet kedvencét. ico in 'tomcat / content / erddap / images /'.
Lásdhttps://en.wikipedia.org/wiki/Favicon.
