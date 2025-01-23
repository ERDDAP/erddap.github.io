---
sidebar_position: 2
---

# Programozó útmutató

Ezek olyan dolgok, amelyek csak egy programozó, aki dolgozni akarERDDAPAJavaAz osztályoknak tudniuk kell.

###  **A Forráskód megszerzése**  {#getting-the-source-code} 
   

  - Via Forráskód GitHub
A friss nyilvános verziók és fejlesztési verziók forráskódja szintén elérhető a[GitHub](https://github.com/ERDDAP)... Kérjük, olvassa el a[Wiki](https://github.com/ERDDAP/erddap/wiki)erre a projektre. Ha módosítani szeretné a forráskódot (és esetleg a szabványba beillesztett változásokERDDAP™elosztás) Ez az ajánlott megközelítés.

###  **ERDDAP™függőségek**  {#erddap-dependencies} 
ERDDAP™használja a Maven-t a kódfüggőségek betöltésére, valamint néhány statikus referenciafájl (WEB-INF/ref) ... Ez azért történik, hogy elkerülje sok nagy fájl tárolását a repositoryban.
Használhatja a `mvn compile'-t, és ez megfontolja a függőségeket és a ref fájlokat. Használhatja a "mvn csomagot", hogy létrehozzon egy háborús fájlt.
Manuálisan letöltheti a ref fájlokat:

  - [etopo1\\_ice\\_g\\_i2.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip)és bezárja a /WEB-INF/ref/

  - [ref_files.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip)és bezárja a /WEB-INF/ref/

  - [erddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 2024-10-14) és zipogd be _tomcat_, teremtés_tomcat_/content/erddap...

MEGJEGYZÉS: Az alapértelmezett Maven statikus referenciát és teszteli az adatarchívum letöltését, és csak akkor vonja ki őket, ha egy új verziót letöltenek. Ahhoz, hogy teljesen lemondjon, beállíthatja a "skipResourceDownload" és / vagy "skipTestResourceDownload" tulajdonságokat a Maven számára (pl. `mvn -DskipResourceDownload csomag `) ... Erősítse a kitermelést, állítsa be a "Ddownload.unpack=true" és a "Ddownload.unpackWhenChanged=false".

- ERDDAP™és alkomponensei nagyon liberálisak, nyílt forráskódúak[licencek](/license)Így bármilyen célra használhatja és módosíthatja a forráskódot, profitra vagy nonprofitra. Vegyük észre, hogyERDDAP™és sok alkomponens rendelkezik licencekkel, amelyek megkövetelik, hogy elismerje a kód forrását, amelyet használ. Lásd[Hitelek](/credits)... Függetlenül attól, hogy szükség van-e vagy sem, csak jó formában ismerjük el ezeket a közreműködőket.
  

-  **Használja a kódot más projektekhez** 

Míg szívesen használja a részeitERDDAP™Más projektek kódját figyelmeztetni kell arra, hogy a kód képes és meg fog változni. Nem ígérjük, hogy támogassuk a kódunk más felhasználását. Git és GitHub lesz a fő megoldások foglalkozni ezzel - Git lehetővé teszi, hogy egyesítse a változásokat a változásokat.
   **Sok helyzetben, ahol lehet, hogy kísértés, hogy használja részeit.ERDDAP™a projektben azt gondoljuk, hogy sokkal könnyebb lesz telepíteni és használniERDDAP™mint** Ezután írjon más szolgáltatásokat, amelyekERDDAPSzolgáltatások. Beállíthatja sajátjátERDDAP™a telepítés kegyetlenül egy-két órában. Beállíthatja a sajátjátERDDAP™telepítés egy csiszolt módon néhány nap alatt (az adatkészletek számától és bonyolultságától függően) ... De hacking out részeiERDDAP™a saját projektje valószínűleg hetekig tart (hónapok a finomságok elkapására) és elveszíti a képességét, hogy beépítse a változásokat és a hibajavításokat későbbERDDAP™kiadások. Mi vagyunk (nyilvánvalóan) gondolja, hogy sok előnye van a használatnakERDDAP™és a teERDDAP™a telepítés nyilvánosan hozzáférhető. Bizonyos körülmények között azonban előfordulhat, hogy nem akarja, hogy a teERDDAP™a telepítés nyilvánosan hozzáférhető. Ezután a szolgáltatás hozzáférhet és használja a privátERDDAP™és az ügyfeleknek nem kell tudniukERDDAP™...

  ####  **Félúton** 

Vagy van egy másik megközelítés, amelyet hasznosnak találhat, ami félúton van eltévesztveERDDAPkód és használatERDDAP™önálló webszolgáltatásként: Az EDD osztályban van egy statikus módszer, amely lehetővé teszi egy adatkészlet példáját (a specifikáció alapjándatasets.xml) :
Az egyik FromDataset Xml (String tDatasetID) 
Visszatér egy EDDTable vagyEDDGridadatkészlet. Tekintettel erre az esetre, hívhatsz\\
"makeNewFileForDapQuery (String felhasználóDapQuery, String dir, String fileName, String fájl TypeName) 
"Mondja el az esetet, hogy egy adatfájl, egy adott fájltípus, az eredményeket egy felhasználó lekérdezés. Így ez egy egyszerű módja annak, hogy használjaERDDAP"Az adatok kérésére szolgáló módszerek, és válaszul kapnak egy fájlt, ahogy az ügyfél használja aERDDAP™webes alkalmazás. De ez a megközelítés az Önén belül működikJavaprogram és megkerüli a szükségességét egy alkalmazásszerver, mint a Tomcat. Ezt a megközelítést használjuk az EDDTable ésEDDGridalosztályok, így látható példák erre a forráskódban az összes osztály.

###  **Fejlesztési környezet**  {#development-environment} 

  - Vannak konfigurációk[Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty)és[Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker)GitHubban, bár a kiadások várhatóan Tomcatban futnak.

  -  **Opcionális** : BeállításERDDAP™Tomcat\\
ótaERDDAP™főként Tomcatban futó szervként javasoljuk, hogy kövesse a szabványt[telepítési utasítások](/docs/server-admin/deploy-install)telepíteni Tomcat, majd telepíteniERDDAP™Tomcat webapps könyvtárában. Többek között,ERDDAP™Úgy tervezték, hogy telepítve van Tomcat könyvtári struktúrájában, és elvárja, hogy a Tomcat néhány .jar fájlt nyújtson.

  - ERDDAP™nem igényel konkrét IDE (Chris főként Visual Studio kódot használ, a Bob használt EditPlus) ... Nem használjuk az Eclipse-t, az Ant-t stb.; és nem ajánljuk felERDDAP- támogatást nekik. A projekt Mavent használja.

  - Olyan tételfájlt használunk, amely törli az összes .class fájlt a forrásfa-ban, hogy biztosítsuk, hogy tiszta kompile (javac) ...

  - Jelenleg az Adoptium javac jdk-21.0.3+9-et használjuk a gov.noaa.pfeg.coastwatch.TestAll számára (néhány osztályhoz kapcsolódik, amelyek egyébként nem fognak összeállítani) és futtassa a teszteket. Biztonsági okokból szinte mindig a legjobb, ha a legújabb verziókat használjaJava21 és Tomcat 10.

    - Amikor javac-ot vagy javát futtatjuk, a jelenlegi könyvtár _tomcat_/webapps/erddap/WEB-INF.

    - A javac és a java osztálypath
„osztályok;../.../lib/servlet-api.jar;lib/*”

    - Tehát a javac parancssora valami ilyesmi lesz
`javac - kódolás UTF-8 -cp osztályok;./../lib/servlet-api.jar;lib/* osztályok/gov/noa/pfel/coastwatch/TestAll.java

    - És a java parancssor lesz valami \"
`java -cp osztályok;./.../lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M osztályok/gov/noa/pfel/partwatch/TestAll
"Opcionális: hozzáadhatja a "verbose:gc"-t, ami megmondjaJavanyomtatni szemet gyűjtési statisztikákat.

    - Ha teszt Minden összetétel, mindenERDDAP™Az igényeket összeállították. Néhány osztályt összeállítanak, amelyek nem szükségesekERDDAP™... Ha a TestAll összeállítása sikerrel jár, de nem képes egyes osztályokat összeállítani, akkor az osztály nem szükséges. (Vannak befejezetlen / nem használt osztályok.) 

  - Néhány esetben a .jar fájlok helyett a 3. fél forráskódot használjuk. (különösenDODS) és kissé módosította őket, hogy elkerüljék a problémákat, amelyek összefüggnekJava21. Gyakran tettünk más enyhe módosításokat (nevezetesenDODS) egyéb okokból.

  - A legtöbb osztálynak van tesztmódja a kapcsolódó src/test fájlban. Futtathatja a JUnit teszteket a "mvn teszt" parancsgal. Ez több zip adatfájlot letölt, amelyeket a tesztek a legújabb kiadástól támaszkodnak[ERDDAP/erddap Test](https://github.com/ERDDAP/erddapTest/releases/).
     
MEGJEGYZÉS: Maven caches letöltése, de lezárja a letöltött archívumokat minden végrehajtásra, ami időt vesz igénybe. Kihagyni a letöltést
és a zipping teszt adatok archívumok, lehet, hogy megadja a "skipTestResourceDownload" tulajdon Maven (pl. `mvn -DskipTestResourceDownload csomag `) ...

###   **Fontos osztályok**  {#important-classes} 

Ha meg szeretné nézni a forráskódot, és próbálja kitalálni, hogyanERDDAP™munkák, kérlek.

  - A kódJavaDoc megjegyzések, de aJavaAz okok nem keletkeztek. Érezz szabadon létrehozni őket.

  - A legfontosabb osztályok (beleértve az alábbiakban említetteket) a gov/noa/pfel/erddap.

  - AERDDAP™Az osztály rendelkezik a legmagasabb szintű módszerekkel. Ez kiterjeszti a HttpServlet-et.

  - ERDDAP™átadja a kérelmeket az alosztályok eseteireEDDGridvagy EDDTable, amely egyedi adatkészleteket képvisel.

  - Az EDStatic a legtöbb statikus információval és beállítással rendelkezik (pl. a setup.xml és az üzenetek.xml fájlokból) statikus szolgáltatások nyújtása (pl. e-mailek küldése) ...

  - EDDGridés az EDDTable alosztályok elválasztják a kérést, adatokat kapnak az alosztályspecifikus módszerekről, majd formázzák az adatokat a válaszra.

  - EDDGridalá: beadás éve (évszám) (a belső adatkonténer a rácsolt adatokhoz) ...

  - EDDTable alosztályok tolják az adatokat a TableWriter alosztályokba, amelyek az adatokat egy adott fájltípusra írják.

  - Egyéb osztályok (pl. alacsony szintű osztályok) is fontos, de kevésbé valószínű, hogy dolgozol, hogy megváltoztassa őket.
     

###  **Kódex hozzájárulások**  {#code-contributions} 

- GitHub kérdések
Ha szeretne hozzájárulni, de nincs projektje, lásd a listát[GitHub kérdések](https://github.com/ERDDAP/erddap/issues)Ezek közül sokan olyan projektek, amelyeket megtehetsz. Ha egy kérdésben szeretnél dolgozni, kérlek, add meg magadnak, hogy jelezd másoknak, akiken dolgozol rajta. A GitHub kérdés a legjobb hely, hogy megvitassák minden kérdést, hogyan kell folytatni a munkát az adott kérdésben.

- Ha a változás, amit meg akarsz csinálni, az az alábbi közös esetek egyike, hozzon létre egy[GitHub kérdés](https://github.com/ERDDAP/erddap/issues)jelezve a változást, amit szándékozol tenni. Ezután, ha a változás befejeződik, húzza meg a kérést az egyesülés kérésére. A közös változások magukban foglalják:

  - Egy másik alosztályt akarsz írniEDDGridvagy EDDTable egy másik adatforrástípus kezelésére. Ha igen, javasoljuk, hogy megtalálja a legközelebbi meglévő alosztályt, és használja ezt a kódot kezdő pontként.

  - Szeretné írni egy másik mentőAs_FileType_ módszert. Ha igen, javasoljuk, hogy megtalálja a legközelebbi meglévő mentőAs_FileType_ módszertEDDGridvagy EDDTable, és használja ezt a kódot kezdőpontként.

Ezeknek a helyzeteknek az az előnye, hogy az általad írt kód önmagát tartalmazza. Nem kell tudnia az összes részletetERDDAPBelsők. És könnyű lesz számunkra, hogy beépítsük a kódját aERDDAP... Vegye figyelembe, hogy ha benyújtja a kódot, a licenc kompatibilis leszERDDAP™ [licenc](/license)  (pl.:[Apache](https://www.apache.org/licenses/),[BSD](https://www.opensource.org/licenses/bsd-license.php)vagy[MIT-X](https://www.opensource.org/licenses/mit-license.php)) ... Felsoroljuk a hozzájárulásodat a[hitelek](/credits)...

- Ha van egy funkció nem fedi le, hogy szeretné hozzáadniERDDAPJavasoljuk, hogy először hozzon létre egy vita szálat[GitHub viták](https://github.com/ERDDAP/erddap/discussions/categories/ideas)... Jelentős jellemzőkért/változásokért a Műszaki Testület megvitatja őket, és eldönti, hogy jóváhagyja-e hozzáadását.ERDDAP™...

###  **A kódex hozzájárulásának megítélése**  {#judging-your-code-contributions} 
Ha kódot vagy egyéb változtatásokat szeretne benyújtani, amelyeket bele kell foglalniERDDAPEz nagyszerű. Hozzájárulásodnak meg kell felelnie bizonyos kritériumoknak annak érdekében, hogy elfogadjuk. Ha követed az alábbi iránymutatásokat, akkor nagyban növeled az elfogadott hozzájárulásod esélyét.
   

  - AERDDAP™A projektet egy NATD kezeli (NOAAKinevezett műszaki igazgató) bemenettel egy Technikai Testületből.
2007-től (kezdeteERDDAP) 2022-re ez Bob Simons volt (Alapító-vezető) ... 2023 januárjában kezdődően ez Chris John. Alapvetően a NATD felelős aERDDAP, tehát ő a végső szó a döntésekrőlERDDAP™kód, nevezetesen a tervezésről és arról, hogy egy adott húzási kérelmet elfogadnak-e vagy sem. Ennek részben a hatékonysági okokból kell lennie (nagyszerűen működik a Linus Torvalds és a Linux számára) részben biztonsági okokból: Valakinek meg kell mondania az informatikai biztonsági embereket, akik a kód biztonságáért és integritásáért felelnek.
     

  - A NATD nem garantálja, hogy elfogadja a kódját.
Ha egy projekt nem működik, és reméltük, és ha nem lehet megmenteni, a NATD nem tartalmazza a projektet a projektben.ERDDAP™elosztás. Kérjük, ne érezze rosszul. Néha a projektek nem dolgoznak ki, és remélik. Ez történik minden szoftverfejlesztővel. Ha követi az alábbi iránymutatásokat, akkor nagyban növeli a siker esélyeit.
     

  - A legjobb, ha a változások általános érdekűek és hasznosak.
Ha a kód specifikus a szervezet számára, akkor valószínűleg a legjobb, ha fenntartja a különálló fiókotERDDAP™Használatához. Axiom ezt teszi. Szerencsére Git megkönnyíti ezt. A NATD egy következetes jövőképet akar fenntartaniERDDAPNem engedi, hogy konyhai süllyesztő projekt legyen, ahol mindenki hozzáad egy egyedi funkciót a projekthez.
     

  - Kövesse aJavaKód Egyezmények.
Általában a kódnak jó minőségűnek kell lennie, és követnie kell az eredeti[JavaKódexegyezmények](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf): tedd .class fájlokat a megfelelő helyre a könyvtári struktúrában, adjon .class fájlokat megfelelő nevet, beleértve a megfelelő helyetJavaDoc megjegyzések, beleértve //kommentek a kód egyes bekezdésének kezdetén, 4 helyet tartalmazva (nem fül) Kerülje a sorokat &gt; 80 karakter, stb. Az egyezmények változása és a forráskód nem mindig teljes mértékben naprakész. Ha kétség merül fel, illeszkedjen a kódhoz az egyezményekhez, és nem létező kódhoz.

- Használjon leíró osztályt, módszert és változó neveket.
Ez megkönnyíti a kódot mások számára, hogy olvassák.
   

- Kerülje a fancy kódot.
Hosszú távon neked vagy más embereknek ki kell találniuk a kódot annak érdekében, hogy fenntartsák. Kérjük, használja egyszerű kódolási módszereket, amelyek így könnyebbek mások számára (beleértve Önt a jövőben) kitalálni. Nyilvánvaló, hogy ha van egy igazi előnye, hogy valamilyen fantáziaJavaprogramozási funkció, használja, de részletesen dokumentálja, amit csinált, miért és hogyan működik.
   

- Dolgozzon a Technikai Testülettel, mielőtt elkezdené.
Ha reméled, hogy a kódod megváltozik, behúzódikERDDAP™A Műszaki Testület határozottan arról akar beszélni, hogy mit fog tenni, és hogyan fogod megtenni, mielőtt bármilyen változtatást teszel a kódhoz. Így elkerülhetjük, hogy megváltoztassuk, amit a NATD végül nem fogad el. Amikor a munkát végzi, a NATD és a Technikai Testület hajlandó válaszolni a kérdésekre, hogy segítsen kitalálni a meglévő kódot és (általános) hogyan kell kezelni a projektet.
   

- önállóan dolgozik (a lehető legtöbbet) utána indulsz.
A fenti "Work with the Technical Board"-val ellentétben, miután elkezdte a projektet, a NATD arra ösztönzi Önt, hogy a lehető legfüggetlenebb módon dolgozzon. Ha a NATD-nek szinte mindent el kell mondania, és sok kérdésre válaszol (különösen azok, akiket a dokumentáció vagy a kód olvasásával válaszolhattál) Akkor az erőfeszítéseid nem egy időmegtakarítás a NATD számára, és ő is elvégezheti a munkát. Ez a[Mítoszi Ember Month](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)probléma. Természetesen még mindig kommunikálnunk kell. Nagyszerű lenne rendszeresen látni a munkáját, hogy megbizonyosodjon arról, hogy a projekt a pályán van. Minél többet tudsz önállóan dolgozni (miután a Technikai Testület elfogadja a feladatot, és az általános megközelítés) Jobb.
   

- Kerülje a hibákat.
Ha egy hiba nem fogott el a kiadás előtt, problémát okoz a felhasználók számára (a legjobb) visszatér a rossz információhoz (a legrosszabb) , egy robbanásERDDAPHírnév, és továbbra is kimarad a dátumbólERDDAP™berendezések évekig. Nagyon nehéz elkerülni a hibákat. Része ennek írása tiszta kód (így könnyebb látni a problémákat) ... Ennek egy része az írási egység tesztek. Ennek egy része a hibás elkerülés állandó hozzáállása, amikor kódot ír. Ne tedd a NATD sajnálatát, hogy hozzáadd a kódodatERDDAP™...
   

- Írjon egy egység tesztet vagy tesztet.
Új kódhoz írjon JUnit teszteket egy tesztfájlban.
Kérjük, írjon legalább egy egyéni tesztmódszert, amely alaposan teszteli a kódot, amelyet ír, és adja hozzá az osztály JUnit tesztfájljához, hogy automatikusan futjon. Egység (és kapcsolódó) a tesztek az egyik legjobb módja a hibák elkapásának, kezdetben és hosszú távon (mint más dolgok megváltoznakERDDAP™) ... Ahogy Bob mondta: "Az egységes tesztek az, ami éjszaka alszanak."
   

- Könnyűvé tenni a NATD számára, hogy megértse és elfogadja a húzási kérelem változásait.
Ennek egy része egy egység-teszt módszert ír (s) ... Ennek egy része korlátozza a változásokat a kód egyik szakaszára (vagy egy osztály) ha lehetséges. A NATD nem fogad el semmilyen húzási kérelmet több száz változtatással a kódban. A NATD elmondja az informatikai biztonsági embereknek, hogy vállalja a felelősséget a kód biztonságáért és integritásáért. Ha túl sok változás van, vagy túl nehéz kitalálni, akkor túl nehéz ellenőrizni a változásokat, és nem vezet be hibákat vagy biztonsági kérdéseket.
   

- Tartsa egyszerű.
Egy jó általános téma a kód: Tartsa egyszerű. Egyszerű kód könnyen mások számára (beleértve Önt a jövőben) olvasni és fenntartani. Könnyű megérteni és elfogadni a NATD-t.
   

- Tegyük fel a hosszú távú felelősséget a kódodért.
Hosszú távon a legjobb, ha folyamatosan vállalja a felelősséget a kód fenntartása és a kérdések megválaszolása miatt. (pl. aERDDAP™Google Csoport) ... Ahogy egyes szerzők megjegyzik, a kód felelősség, valamint eszköz. Ha egy hibát fedeznek fel a jövőben, akkor a legjobb, ha rögzíti, mert senki sem tudja jobban a kódját, mint te (is, hogy van egy ösztönző, hogy elkerüljék a hibákat az első helyen) ... A NATD nem kér szilárd elkötelezettséget a folyamatos karbantartás mellett. A NATD csak azt mondja, hogy a karbantartást nagyra értékelik.
